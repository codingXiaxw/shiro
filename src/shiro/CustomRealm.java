package shiro;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationInfo;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.SimpleAuthenticationInfo;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.apache.shiro.util.ByteSource;
import org.springframework.beans.factory.annotation.Autowired;
import po.ActiveUser;
import po.SysPermission;
import po.SysUser;
import service.SysService;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by codingBoy on 16/11/20.
 */
public class CustomRealm extends AuthorizingRealm
{

    //注入service
    @Autowired
    private SysService sysService;

    //设置realm的名称
    @Override
    public void setName(String name) {
        super.setName("customRealm");
    }

    //realm的认证方法，从数据库查询用户信息
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {

        //token是用户输入的
        //第一步:丛token中取出身份信息
        String userCode= (String) token.getPrincipal();

        //第二步:根据用户输入的userCode丛数据库查询
        SysUser sysUser =null;
        try {
            sysUser=sysService.findSysUserByUserCode(userCode);
        } catch (Exception e) {
            e.printStackTrace();
        }


        //判断是否从数据库中查询到用户信息
        if (sysService==null)
        {
            return null;
        }

        //从数据库查询到的密码
        String password=sysUser.getPassword();

        //盐salt
        String salt=sysUser.getSalt();
        System.out.println(salt);

       //activeUser就是用户的身份信息
        ActiveUser activeUser=new ActiveUser();
        activeUser.setUserid(sysUser.getId());
        activeUser.setUsercode(sysUser.getUsercode());
        activeUser.setUsername(sysUser.getUsername());

        //根据用户id取出菜单
        //通过service取出菜单
        List<SysPermission> menus=null;
        try {
            menus=sysService.findMenuListByUserId(sysUser.getId());

        } catch (Exception e) {
            e.printStackTrace();
        }

        //将用户菜单设置到activeUser
        activeUser.setMenus(menus);


        //如果查不到返回null，

        //如果查询到，返回认证信息AuthenticationInfo

        ///将activeUser设置到simpleAuthenticationInfo
        SimpleAuthenticationInfo simpleAuthenticationInfo=new
                SimpleAuthenticationInfo(activeUser,password, ByteSource.Util.bytes(salt),this.getName());


        return simpleAuthenticationInfo;
    }

    //用于授权
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {

        //从principals获取主身份信息
        //将getPrimaryPrincipal方法返回值转为真实身份类型(在上边的goGetAuthenticationInfo认证通过填充到SimpleAuthenticationInfo)
        ActiveUser activeUser= (ActiveUser) principals.getPrimaryPrincipal();

        //根据身份信息获取权限信息,
        //从数据库中获取到的动态权限数据
        List<SysPermission> permissionList=null;
        try {
            permissionList=sysService.findPermissionListByUserId(activeUser.getUserid());
        } catch (Exception e) {
            e.printStackTrace();
        }

        List<String> permissions=new ArrayList<>();

        if (permissionList!=null)
        {
            for (SysPermission sysPermission:permissionList)
            {
                //将数据库中的权限标签符放入集合
                permissions.add(sysPermission.getPercode());
            }
        }

        //查到权限数据，返回授权信息(包括上边的permissions)
        SimpleAuthorizationInfo simpleAuthorizationInfo=new SimpleAuthorizationInfo();

        //将上边查询到授权信息填充到simpleAuthorizationInfo对象中
        simpleAuthorizationInfo.addStringPermissions(permissions);

        return simpleAuthorizationInfo;
    }

    //清除缓存
    public void clearCached() {
        PrincipalCollection principals = SecurityUtils.getSubject().getPrincipals();
        super.clearCache(principals);
    }



}
