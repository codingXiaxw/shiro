package controller;

import exception.CustomException;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.UnknownAccountException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import po.ActiveUser;
import service.SysService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 * Created by codingBoy on 16/11/18.
 * 完成登陆和退出
 */
@Controller
public class LoginController
{

    @Autowired
    private SysService sysService;

    //用户登陆提交方法
//    @RequestMapping("/login")
//    public String login(HttpSession session,String randomcode,String usercode, String password) throws Exception
//    {
//
//        //校验验证码，防止恶性攻击
//        //丛session中获取正确验证码
//        String validateCode= (String) session.getAttribute("validateCode");
//
//        if (!randomcode.equals(validateCode))
//        {
//            throw new CustomException("验证码不正确");
//        }
//
//
//        //调用service校验用户帐号和密码的正确性
//        //这个东西我们讲shiro的时候再写
//        ActiveUser activeUser=sysService.authenticat(usercode,password);
//
//
//        //如果service校验通过，将用户身份记录到session
//        session.setAttribute("activeUser",activeUser);
//
//        //重定向到商品查询页面
//        return "redirect:/first.action";
//    }


    //登录提交地址，和application-shiro中配置的loginurl一致
    @RequestMapping("login")
    public String login(HttpServletRequest request) throws Exception
    {
        //如果登录失败从request中获取认证异常信息,shiroLoginFailure就是shiro异常类的全限定名
        String exceptionClassName= (String) request.getAttribute("shiroLoginFailure");

        //根据shiro返回的异常类路径判断，抛出指定异常信息
        if(exceptionClassName!=null){
            if (UnknownAccountException.class.getName().equals(exceptionClassName)) {
                //最终会抛给异常处理器
                throw new CustomException("账号不存在");
            } else if (IncorrectCredentialsException.class.getName().equals(
                    exceptionClassName)) {
                throw new CustomException("用户名/密码错误");
            } else if("randomCodeError".equals(exceptionClassName)){
                throw new CustomException("验证码错误");
            } else{
                throw new Exception();//最终在异常处理器生成未知错误
            }
        }

        //此方法不处理登录成功，shiro认证成功会自动跳转到上一个路径

        //登录失败返回到login页面
        return "login";
    }
//
//    //用户退出
//    @RequestMapping("/logout")
//    public String logout(HttpSession session) throws Exception
//    {
//        //session失效
//        session.invalidate();
//
//        //重定向到商品查询页面
//        return "redirect:/first.action";
//    }
}
