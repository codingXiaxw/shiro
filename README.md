## Shiro整合Web项目及整合后的开发

将Shiro框架整合到新的web项目中很简单，就是在web项目中导入Shiro的相关jar包以及整合jar包即可完成整合(是不是很简单...哈哈就是这么简单)。难的就是整合了Shiro框架后的web项目该如何进行开发，关于这一点，我将在下方通过一个demo演示用户的登录与退出及登录后的权限管理带你入门加入了Shiro框架后的web项目开发。

博客上也放了详细解讲，[点击这里前往我的博客](http://codingxiaxw.cn/2016/11/23/50-Shiro-Integration/)

**写在前边的话:**我在github上已经放了一个整合了Spring+SpringMVC+Mybatis的web项目(就是关于商品的增、删、改、查操作)，接下来我要讲解的就是如何在这个项目中整合进我的Shiro框架，整合Shiro框架前的项目源码[请点击这里](https://github.com/codingXiaxw/ssm2)前往我的github，并讲解了整合了Shiro框架后的web项目该如何进行开发，整合了Shiro框架后的完整源码[请点击这里](https://github.com/codingXiaxw/shiro)前往我的github。  

用于创建表的sql语句见github上src包下的sql包。  


## 开发环境
IDEA Spring3.x+SpringMVC+Mybatis+Shiro 
没有用到maven管理工具。

## 1.需求
在一个整合了Spring+SpringMVC+Mybatis三个框架的web项目中再整合进Shiro框架，实现基于Shiro的权限管理机制。  

## 2.导入jar包
在原先的项目基础上只需导入三个jar包即可:1.shiro-spring.jar。2.shiro-web.jar。3.shiro-core.jar。jar包见我github上的源代码。成功导入jar包，好，下一步，整合完毕。  

项目相关jsp页面请在github上自行下载，我们这里只进行web后端功能的讲解。接下来在原先的项目基础上通过增加用户登录和退出的功能对用户进行权限管理来讲解如何使用Shiro 进行开发。

## 3.在web.xml中配置shiro的filter
在web系统中，shiro也是通过filter进行拦截的。filter拦截后将操作权交给Spring中配置的filterChain(过滤链儿)，shiro提供了很多的filter。  

在web.xml中配置shiro的filter，加入如下内容:
```xml
 <!--在这里配置shiro的filter-->
    <!-- shiro过虑器，DelegatingFilterProxy通过代理模式将spring容器中的bean和filter关联起来 -->
    <filter>
        <filter-name>shiroFilter</filter-name>
        <filter-class>org.springframework.web.filter.DelegatingFilterProxy</filter-class>
        <!-- 设置true由servlet容器控制filter的生命周期 -->
        <init-param>
            <param-name>targetFilterLifecycle</param-name>
            <param-value>true</param-value>
        </init-param>
        <!-- 设置spring容器filter的bean id，如果不设置则找与filter-name一致的bean-->
        <init-param>
            <param-name>targetBeanName</param-name>
            <param-value>shiroFilter</param-value>
        </init-param>
    </filter>
    <filter-mapping>
        <filter-name>shiroFilter</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>
```

## 4.applicationContext-shiro.xml
在src包下的config包下创建applicationContext-shiro.xml，在applicationContext-shiro.xml中配置web.xml中fitler对应spring容器中的bean以及SecurityManeger和自定义Realm的配置。内容如下:
```xml

<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:mvc="http://www.springframework.org/schema/mvc"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:aop="http://www.springframework.org/schema/aop" xmlns:tx="http://www.springframework.org/schema/tx"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
		http://www.springframework.org/schema/beans/spring-beans-3.2.xsd
		http://www.springframework.org/schema/mvc
		http://www.springframework.org/schema/mvc/spring-mvc-3.2.xsd
		http://www.springframework.org/schema/context
		http://www.springframework.org/schema/context/spring-context-3.2.xsd
		http://www.springframework.org/schema/aop
		http://www.springframework.org/schema/aop/spring-aop-3.2.xsd
		http://www.springframework.org/schema/tx
		http://www.springframework.org/schema/tx/spring-tx-3.2.xsd ">


    <!--web.xml中shiro的filter对应的bean-->
    <!-- Shiro 的Web过滤器 -->
    <bean id="shiroFilter" class="org.apache.shiro.spring.web.ShiroFilterFactoryBean">
        <property name="securityManager" ref="securityManager" />
        <!-- loginUrl认证提交地址，如果没有认证将会请求此地址进行认证，请求此地址将由formAuthenticationFilter进行表单认证 -->
        <property name="loginUrl" value="/login.action" />
        <!--认证成功统一跳转到first.actio，建议不配置，不配置的话shiro认证成功会自动到上一个请求路径-->
       <property name="successUrl" value="/first.action"/>
        <property name="unauthorizedUrl" value="/refuse.jsp" />
        <!-- 过虑器链定义，从上向下顺序执行，一般将/**放在最下边 -->
        <property name="filterChainDefinitions">
            <value>
                <!--对静态资源设置匿名访问-->
                /images/**=anon
                /js/**=anon
                /style/**=anon

                <!--/**=anon 表示所有的url都可以匿名访问，anon是shiro中一个过滤器的简写，关于shiro中的过滤器介绍见-->
                /**=anon
            </value>
        </property>
    </bean>

    <!--securityManage-->
    <!-- 安全管理器 -->
    <bean id="securityManager" class="org.apache.shiro.web.mgt.DefaultWebSecurityManager">
        <property name="realm" ref="customRealm" />
    </bean>

    <!--自定义realm-->
    <bean id="customRealm" class="shiro.CustomRealm">
    </bean>
</beans>
```

在applicationContext-shiro.xml的配置文件中，我们对系统的任何资源进行拦截，即通过`/**=anon`设置系统的任何资源都可以进行匿名访问。运行程序，在浏览器中输入`http://localhost:8080/Shiro/`即可访问系统，发现没有任何拦截即可以正常访问系统，因为shiro的过滤器没有对系统任何资源进行拦截，若想进行拦截，可以在上述配置文件中的`<value></value>`标签之间加入相应的拦截语句。下面就通过增加用户的登录实现通过Shiro的filter进行认证拦截的功能。即当访问被shiro拦截的系统资源时，系统会自动跳转到登录页面提醒用户需要经过用户登录认证后才能正常访问。  

## 5.用Shiro实现登录认证
### 5.1原理
用户登录是在一个表单进行的，所以这里我们需要通过shiro的一个表单过滤器(FormAuthenticationFilter)进行实现，原理如下:  

用户没有认证时，请求loginurl进行认证，输入用户名和密码点击登录时将用户身份和用户密码提交数据到loginurl，然后FormAuthenticationFilter进行拦截取出request中的username和password（FormAuthenticationFilter源码中将username和password两个参数名称写死了，而我们今后是可以将这两个参数名称写在配置文件中的），然后FormAuthenticationFilter会调用realm传入一个token（将username和password传入到token中），realm认证时根据username在数据库中查询用户信息（将在数据库中查询到的信息保存在在Activeuser.java对象中，包括 userid、usercode、username、menus），然后返回一个authenticationInfo。如果查询不到，realm就返回null，同时FormAuthenticationFilter会向request域中填充一个参数（记录了异常信息）。  

### 5.2登录的代码实现
可想而知该代码在控制器Controller中实现，创建一个LoginController.java，代码如下:
```java
@Controller
public class LoginController
{
 	@RequestMapping("/login")
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
}
```

### 5.3配置认证拦截过滤器
在applicationContext.xml的`<bean>标签`中加入如下标签配置:
```xml
 <!-- loginUrl认证提交地址，如果没有认证将会请求此地址进行认证，请求此地址将由formAuthenticationFilter进行表单认证 -->
        <property name="loginUrl" value="/login.action" />
```

并在`<value>`标签之间加入相应的拦截语句:

```xml
                <!-- -/**=authc 表示所有的url都必须认证通过才可以访问- -->
                /** = authc


                <!--/**=anon 表示所有的url都可以匿名访问-->
               可以匿名访问的页面我们以后再配置
```

运行服务器，访问系统首页发现系统会对我们访问的资源进行拦截并退回到登录页面，但是这里会有个问题发现登录页面的静态资源也被拦截了，所以我们应在`<value>`标签之间加入对静态资源设置匿名访问的设置:
```xml
 <!--对静态资源设置匿名访问-->
                /images/**=anon
                /js/**=anon
                /style/**=anon

                <!--请求这个地址就自动退出-->
                /logout.action=logout

                <!--商品查询需要商品查询权限-->
                /items/queryItems.action=perms[item:query]

                /items/editItems.action=perms[item:edit]


                <!-- -/**=authc 表示所有的url都必须认证通过才可以访问- -->
                /** = authc

                <!--/**=anon 表示所有的url都可以匿名访问-->
                可以匿名访问的页面我们以后再配置
```

然后运行程序，访问系统资源时系统发现用户信息没有得到认证所以会退回到登录页面让你进行登录，你只有输入了密码为111111后才能成功完成登录，因为我们在自定义CustomRealm.java文件中只是模拟从数据库中查到的数据(我们设置查到的密码为111111)。登录成功后便可进行系统的访问了，但是登录成功后只能访问系统的首页，因为我们还没有对该用户进行权限分配指定该用户可以对系统的哪些资源进行操作了，所以这里当然只能访问系统首页。当然运行程序之前你得完成自定义CustomRealm的代码，我们采用前篇文章的自定义CustomRealm的内容，如下:
```java
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

    //用于认证
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken token) throws AuthenticationException {

        //token是用户输入的
        //第一步:丛token中取出身份信息
        String userCode= (String) token.getPrincipal();

        //第二步:根据用户输入的userCode丛数据库查询


        //模拟丛数据库查询到的密码
        String password="111111";

      

        //如果查不到返回null，

        //如果查询到，返回认证信息AuthenticationInfo

        ///将activeUser设置到simpleAuthenticationInfo
        SimpleAuthenticationInfo simpleAuthenticationInfo=new
                SimpleAuthenticationInfo(userCode,password,this.getName());


        return simpleAuthenticationInfo;
    }

    //用于授权
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) 	{
    	return null;
	}
}
```

这样便完成用户的认证功能，接下来是退出功能。

## 6.退出
退出功能就是当用户点击退出按钮时清楚保存在session中信息，这个功能不用我们实现，交给Shiro的LogoutFilter过滤器即可实现:当我们访问一个退出的url时，由LogoutFilter拦截住，然后清楚session。  

### 6.1配置退出过滤器
在applicationContext-shiro.xml的`<value>`标签中加入如下内容:
```xml
<!--请求这个地址就自动退出-->
                /logout.action=logout
```

即完成清楚session即退出系统的功能。  

## 7.实现用户成功登录后将认证信息显示在页面上
需求:1.认证后用户菜单在首页显示。2.认证后用户的信息(例如用户名)在页头显示。

### 7.1修改自定义Realm设置完整的认证信息
先前我们通过realm在数据库中通过用户名查询到的用户信息只有密码，而现在我们需要查询到的数据包括用户可以操作的用户菜单、usercode用户id、username用户名等。  

我们先将这些信息用静态代码实现(即仍然没有涉及到数据库的查询):  
```java
    //模拟丛数据库查询到的密码
        String password="111111";

       //activeUser就是用户的身份信息
        ActiveUser activeUser=new ActiveUser();
        activeUser.setUserid("zhangsan");
        activeUser.setUsercode("zhangsan");
        activeUser.setUsername("张三");

        //根据用户id取出菜单
        //通过service取出菜单
        List<SysPermission> menus=null;
        try {
            menus=sysService.findMenuListByUserId("zhangsan");

        } catch (Exception e) {
            e.printStackTrace();
        }

        //将用户菜单设置到activeUser
        activeUser.setMenus(menus);


        //如果查不到返回null，

        //如果查询到，返回认证信息AuthenticationInfo

        ///将activeUser设置到simpleAuthenticationInfo
        SimpleAuthenticationInfo simpleAuthenticationInfo=new
                SimpleAuthenticationInfo(activeUser,password,this.getName());
```

然后修改first.action(在控制器FirstAction.java中实现该方法，当访问系统主页index.jsp时该index.jsp页面中设置将页面进行跳转到first.action)将认证信息在页面中进行显示:
```java
@Controller
public class FirstAction {
	//系统首页
	@RequestMapping("/first")
	public String first(Model model)throws Exception{

		//从shiro的session中取出activeUser
		Subject subject= SecurityUtils.getSubject();
		//取出身份信息
		ActiveUser activeUser= (ActiveUser) subject.getPrincipal();
		//通过model传到页面
		model.addAttribute("activeUser",activeUser);
		
		return "/first";
	}
	
	//欢迎页面
	@RequestMapping("/welcome")
	public String welcome(Model model)throws Exception{
		
		return "/welcome";
		
	}
}	
```

运行程序，登录该系统后发现出现商品管理的菜单，我们仍然没有对商品进行操作的权限，所以接下来要讲解通过Shiro如何对用户进行授权操作。仍然在自定义Realm中模拟从数据库查询到的用户权限。  

## 8.授权过滤器的测试
在Shiro中使用PermissionsAuthorizationFilter对用户进行授权，首先在applicationContext-shiro.xml中进行配置，加入如下内容:
```xml
<!--商品查询需要商品查询权限-->
                /items/queryItems.action=perms[item:query]
                <!--商品修改需要商品修改权限-->
                /items/editItems.action=perms[item:edit]
```

通过上述配置，用户在认证通过后请求`/items/queryItems.action`的资源时会被PermissionsAuthorizationFilter拦截，发现需要“item:query”权限，然后PermissionsAuthorizationFilter调用realm中的doGetAuthorizationInfo获取数据库中正确的权限，对二者进行对比，如果“item:query”在realm返回的权限列表中，授权通过。如果不通过，则授权失败，跳转到refuse.jsp页面。所以我们还需要在applicationContext-shiro.xml进行授权失败后跳转到的页面配置:
```xml
   <property name="unauthorizedUrl" value="/refuse.jsp" />
```

在自定义Realm中的授权方法中加入如下内容模拟从数据库中查到的用户权限，内容如下:
```java
  //用于授权
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principals) {

        //从principals获取主身份信息
        //将getPrimaryPrincipal方法返回值转为真实身份类型(在上边的goGetAuthenticationInfo认证通过填充到SimpleAuthenticationInfo)
        ActiveUser activeUser= (ActiveUser) principals.getPrimaryPrincipal();

        //根据身份信息获取权限信息,
        //模拟从数据库中获取到的动态权限数据
        List<String> permissions=new ArrayList<>();
        permissions.add("user:create");//模拟user的创建权限
        permissions.add("item:query");//模拟查询权限
        permissions.add("item:add");//模拟商品的添加权限
        permissions.add("item:edit");//模拟修改权限

        //查到权限数据，返回授权信息(包括上边的permissions)
        SimpleAuthorizationInfo simpleAuthorizationInfo=new SimpleAuthorizationInfo();

        //将上边查询到授权信息填充到simpleAuthorizationInfo对象中
        simpleAuthorizationInfo.addStringPermissions(permissions);

        return simpleAuthorizationInfo;
    }
```

在该自定义Realm中设置从数据库中查询到的用户权限有创建用户、查询商品、添加商品、编辑商品等权限，所以我们在运行程序后访问服务器后就会得到这些权限。  

## 9.问题总结
1、在applicationContext-shiro.xml中配置过虑器链接，需要将全部的url和权限对应起来进行配置，比较发麻不方便使用。  

2、每次授权都需要调用realm查询数据库，对于系统性能有很大影响，可以通过shiro缓存来解决。  

## 10.Shiro的过滤器
| 过滤器简称 | 对应的java类 |
|--|:--:|
| anon | org.apache.shiro.web.filter.authc.AnonymousFilter |
| authc | org.apache.shiro.web.filter.authc.FormAuthenticationFilter |
| authcBasic | org.apache.shiro.web.filter.authc.BasicHttpAuthenticationFilter |
| perms | org.apache.shiro.web.filter.authz.PermissionsAuthorizationFilter |
| port | org.apache.shiro.web.filter.authz.PortFilter |
| rest | org.apache.shiro.web.filter.authz.HttpMethodPermissionFilter |
| roles | org.apache.shiro.web.filter.authz.RolesAuthorizationFilter |
| ssl | org.apache.shiro.web.filter.authz.SslFilter |
| user | org.apache.shiro.web.filter.authc.UserFilter |
| logout | org.apache.shiro.web.filter.authc.LogoutFilter |  

`anon:`例子`/admins/**=anon`,anon后面没有参数，表示该路径下的资源可以匿名使用。  

`authc:`例如`/admins/user/**=authc`,authc后面没有参数，表示该路径下的资源需要认证(登录)才能使用，FormAuthenticationFilter是表单认证，没有参数。  

`perms:`例子`/admins/user/**=perms[user:add:*]`,参数可以写多个，多个时必须加上引号，并且参数之间用逗号分割，例如`/admins/user/**=perms["user:add:*,user:modify:*"]`，当有多个参数时必须每个参数都通过才通过，想当于isPermitedAll()方法。  

`user:`例如`/admins/user/**=user`,user后面没有参数，表示必须存在用户, 身份认证通过或通过记住我认证通过的可以访问，当登入操作时不做检查。  

`roles:`例如`/admins/user/**=roles[admin]`,参数可以写多个，多个时必须加上引号，并且参数之间用逗号分割，当有多个参数时，例如`admins/user/**=roles["admin,guest"]`,每个参数通过才算通过，相当于hasAllRoles()方法。  

`rest:`例如`/admins/user/**=rest[user]`,根据请求的方法，相当于`/admins/user/**=perms[user:method]`,其中method为post，get，delete等。  

上述涉及到的过滤器中:`anon，authcBasic，auchc，user`是认证过滤器，`perms，roles，ssl，rest，port`是授权过滤器。

上面我们自定义的Realm进行认证和授权时都是通过将用户输入的信息和我们自己给的数据进行比对，而没有从数据库中查询到相关信息。所以接下来要讲通过Realm从数据库中查询认证数据和权限数据的开发重新实现上述的登录和授权功能。  

## 11.通过查询数据库完成认证
### 11.1需求
修改realm的doGetAuthenticationInfo()方法，从数据库查询用户信息，realm返回的用户信息中包括(数据库库中经过md5加密后的串和salt），实现让shiro进行散列串的校验。  

### 11.2修改doGetAuthenticationInfo从数据库查询用户信息
修改自定义CustomRealm代码，由于要向数据库中查询数据，所以需要在CustomRealm中注入SysService对象。修改后的代码如下:
```java
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
}
```

就是将之前的静态数据换成从数据库中查询到的动态数据。  

### 11.3设置凭证匹配器
数据库中存储到的md5的散列值，在realm中需要设置数据库中的散列值它使用散列算法及散列次数，让shiro进行散列对比时和原始数据库中的散列值使用的算法一致。在applicationContext-shiro.xml中配置如下内容:
```xml
    <!-- 凭证匹配器 -->
    <bean id="credentialsMatcher" class="org.apache.shiro.authc.credential.HashedCredentialsMatcher">
        <property name="hashAlgorithmName" value="md5" />
        <property name="hashIterations" value="1" />
    </bean>
```

并将凭证匹配器设置到我们自定义realm的配置中，在自定义realm的标签中加入如下标签:
```xml
  <!--自定义realm-->
    <bean id="customRealm" class="shiro.CustomRealm">
        <!--将凭证匹配器设置到realm中，realm按照凭证匹配器要求进行散列-->
        <property name="credentialsMatcher" ref="credentialsMatcher"/>
    </bean>
```

这样我们便通过realm将用户输入的信息和从数据库中查到的数据进行对比从而完成了认证。  

## 12.通过查询数据库完成授权
### 12.1需求
修改realm的doGetAuthorizationInfo()方法从数据库查询权限信息。授权的方式上面介绍过三种，正式开发中我们使用注解式授权方法和jsp标签授权方法。  

### 12.2修改doGetAuthorizationInfo从数据库查询权限
修改自定义Realm中的doGetAuthorizationInfo授权方法，修改后的代码如下:
```java
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
```

我们之前给用户授权是在applicationContext-shiro.xml中的`<value>`标签中采用:
```xml
 /items/queryItems.action=perms[item:query]
 <!--商品修改需要商品修改权限-->
 /items/editItems.action=perms[item:edit]
```

的方式给用户访问的资源进行授权，所以接下来我们讲解注解授权，将上述进行授权的内容注释掉，注解授权的步骤如下。

### 12.3开启controller类aop支持
对系统中类的方法给用户授权，建议在controller层进行方法授权，在springmvc.xml中配置:
```xml
 <!-- 开启aop，对类代理 -->
    <aop:config proxy-target-class="true"> </aop:config>
    <!-- 开启shiro注解支持 -->
    <bean class="org.apache.shiro.spring.security.interceptor.AuthorizationAttributeSourceAdvisor">
        <property name="securityManager" ref="securityManager" />
    </bean>
```

### 12.4在controller方法中添加注解
给商品查询方法添加查询商品权限:
```java
@RequestMapping("/queryItems")
@RequiresPermissions("item:query")
public ModelAndView queryItems() throws Exception {
...
}
```

给商品修改方法添加商品更新权限:
```java
@RequestMapping(value = "/editItems",method = RequestMethod.GET)
@RequiresPermissions("item:update")//执行此方法需要item:update权限
public String editItems(Model model, Integer id) throws Exception
{
...
}
```

给商品修改页面的提交方法添加商品更新权限:
```java
@RequestMapping("/editItemSubmit")
@RequiresPermissions("item:update")//执行此方法需要item:update权限
public String editItemSubmit(Model model,Integer id,
                                 @Validated(value = {ValidGroup1.class}) @ModelAttribute(value = "itemsCustom") ItemsCustom itemsCustom,
                                 BindingResult bindingResult,
                                 //上传图片
                                 MultipartFile pictureFile
                                 ) throws Exception
{
...
}
```

另一种方式在jsp标签授权。

### 12.5jsp标签授权
在itemsList.jsp页面最上方添加如下标签:
```xml
<%@ taglib uri="http://shiro.apache.org/tags" prefix="shiro" %>
```

然后修改itemsList.jsp页面部分内容:
```xml
<td>
<!--有item:update权限才现实修改链接，没有权限则不显示修改链接-->
<shiro:hasPermission name="item:update">
	<a href="${pageContext.request.contextPath }/items/editItems.action?id=${item.id}">修改</a>
</shiro:hasPermission>
</td>
```

相关jsp标签授权的解释如下表:  

| 标签名称 | 标签条件（均是显示标签内容） |
| -- | :--- |
| `<shiro:authenticated>` | 登录之后 |
| `<shiro:notAuthenticated>` | 不在登录状态时 |
| `<shiro:guest>` | 用户在没有RememberMe时 |
| `<shiro:user>` | 用户在RememberMe时 |
| `<shiro:hasAnyRoles name="abc,123" >` | 在有abc或者123角色时 |
| `<shiro:hasRole name="abc">` | 拥有角色abc |
| `<shiro:lacksRole name="abc">` | 没有角色abc |
| `<shiro:hasPermission name="abc">` | 拥有权限资源abc |
| `<shiro:lacksPermission name="abc">` | 没有abc权限资源 |
| `<shiro:principal>` | 显示用户身份名称 |
| `<shiro:principal property="username"/>` | 显示用户身份中的属性值 |  

### 12.6授权测试
当调用controller的一个方法(比如ItemsController的queryItems()方法)，由于该方法加了`@RequiresPermissions("item:query")` ，shiro调用realm获取数据库中的权限信息，看"item:query"是否在权限数据中存在，如果不存在就拒绝访问，如果存在就授权通过。  

当展示一个jsp页面时，页面中如果遇到`<shiro:hasPermission name="item:update">`，shiro调用realm获取数据库中的权限信息，看item:update是否在权限数据中存在，如果不存在就拒绝访问，如果存在就授权通过。  

问题:只要遇到注解或jsp标签的授权，都会调用realm方法查询数据库，需要使用缓存解决此问题。  

## 13.Shiro缓存
需求:针对上边授权频繁查询数据库，需要使用shiro缓存。

### 13.1缓存流程
shiro中提供了对认证信息和授权信息的缓存。shiro默认是关闭认证信息缓存的，对于授权信息的缓存shiro默认开启的。主要研究授权信息缓存，因为授权的数据量大。  

当用户认证通过时，该用户第一次授权:调用realm查询数据库查询该用户的授权信息然后给该用户授权。该用户第二次授权时:不调用realm查询数据库，直接从缓存中取出授权信息（权限标识符）然后给该用户授权。

### 13.2使用ehcache缓存

#### 13.2.1添加jar包
包括ehcache-core.jar和整合包shiro-ehcache.jar。  

#### 13.2.2配置cacheManager
在application-shiro.xml中加入ehcache的缓存管理器配置，如下:
```xml
 <!-- 缓存管理器 -->
    <bean id="cacheManager" class="org.apache.shiro.cache.ehcache.EhCacheManager">
        <property name="cacheManagerConfigFile" value="classpath:shiro-ehcache.xml"/>
    </bean>
```

然后将缓存管理器注入到securityManager安全管理器中，在安全管理器中加入如下内容:
```xml
  <!--securityManage-->
    <!-- 安全管理器 -->
    <bean id="securityManager" class="org.apache.shiro.web.mgt.DefaultWebSecurityManager">
        <property name="realm" ref="customRealm" />

        <!--注入缓存管理器-->
        <property name="cacheManager" ref="cacheManager"/>
     </bean>
```

然后需要进行shiro-ecache的配置，跟我们在Mybatis中整合ehcache的内容一样，在config包下创建一个shiro-ehcache.xml文件，内容如下:
```xml
<ehcache xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:noNamespaceSchemaLocation="../config/ehcache.xsd">
    <!--diskStore：缓存数据持久化的目录 地址  -->
    <diskStore path="/Users/codingboy/develop/ehcache" />
    <defaultCache
            maxElementsInMemory="1000"
            maxElementsOnDisk="10000000"
            eternal="false"
            overflowToDisk="false"
            diskPersistent="false"
            timeToIdleSeconds="120"
            timeToLiveSeconds="120"
            diskExpiryThreadIntervalSeconds="120"
            memoryStoreEvictionPolicy="LRU">
    </defaultCache>
</ehcache>
```

#### 13.2.3缓存清空
需求:如果用户正常退出，缓存自动清空;如果用户非正常退出，缓存自动清空。如果修改了用户的权限，而用户不退出系统，修改的权限无法立即生效,需要手动进行编程实现:  

在权限修改后调用realm的clearCache方法清除缓存，下边的代码正常开发时要放在service中调用。这里我们只是进行一下测试。  

在realm中添加如下方法:
```java
//清除缓存
    public void clearCached() {
        PrincipalCollection principals = SecurityUtils.getSubject().getPrincipals();
        super.clearCache(principals);
    }
```

然后便可以进行测试类的编写了，在controller包下创建一个ClearShiroCache.java，代码如下:
```java
@Controller
public class ClearShiroCache
{
    @Autowired
    private CustomRealm customRealm;

    @RequestMapping("/clearShiroCache")
    public String clearShiroCache()
    {

        //清除缓存,将来开发要在service调用
        customRealm.clearCached();
        return "success";
    }
}
```

然后进行测试，在服务器中输入`http://localhost:8080/Shiro`，进行登录，访问系统首页。此时再输入`http://localhost:8080/Shiro/clearShiroCache`即可清除该用户的权限。这里我们只进行测试，以后是在service中进行。  

## 14.会话管理器sessionManager
和shiro整合后，使用shiro的sessionManager对会话session进行管理，此外shiro还提供sessionDao操作会话数据。  

配置sessionManager，在application-shiro.xml中加入会话管理器的配置内容:
```xml
   <!-- 会话管理器 -->
    <bean id="sessionManager" class="org.apache.shiro.web.session.mgt.DefaultWebSessionManager">
        <!-- session的失效时长，单位毫秒 -->
        <property name="globalSessionTimeout" value="600000"/>
        <!-- 删除失效的session -->
        <property name="deleteInvalidSessions" value="true"/>
    </bean>
```

然后将该管理器注入到安全管理器中:
```xml
  <!--securityManage-->
    <!-- 安全管理器 -->
    <bean id="securityManager" class="org.apache.shiro.web.mgt.DefaultWebSecurityManager">
        <property name="realm" ref="customRealm" />

        <!--注入缓存管理器-->
        <property name="cacheManager" ref="cacheManager"/>

        <!--注入会话管理器-->
        <property name="sessionManager" ref="sessionManager" />
    </bean>
```

## 15.实现验证码
### 15.1思路
shiro使用FormAuthenticationFilter进行表单认证，验证校验的功能应该加在FormAuthenticationFilter中，在认证之前进行验证码校验，而shiro为我们提供的FormAuthenticationFilter中没有对验证码进行认证。所以我们需要写FormAuthenticationFilter的子类，继承FormAuthenticationFilter，改写它的认证方法，在认证之前进行验证码校验。  

### 15.2自定义FormAuthenticationFilter
在src包下的shiro包下创建一个CustomFormAuthenticationFilter.java，内容如下:
```java
public class CustomFromAuthenticationFilter extends FormAuthenticationFilter
{
    @Override
    protected boolean onAccessDenied(ServletRequest request,
                                     ServletResponse response) throws Exception {

        //在这里进行验证码的校验
        HttpServletRequest httpServletRequest= (HttpServletRequest) request;
        HttpSession session=httpServletRequest.getSession();
        //取出session中的正确验证码
        String validateCode= (String) session.getAttribute("validateCode");

        //取出页面的验证码
        String randomcode=httpServletRequest.getParameter("randomcode");
        if (randomcode!=null&&validateCode!=null&&!randomcode.equals(validateCode))
        {
            //如果校验失败，将验证码错误的失败信息，通过shiroLoginFailure设置到request中
            httpServletRequest.setAttribute("shiroLoginFailure","randomCodeError");

            //拒绝访问，不再校验账号和密码
            return true;

        }

        return super.onAccessDenied(request, response);
    }
}
```

### 15.3配置自定义FormAuthenticationFilter
在shiro中加入配置信息:
```xml
 <!--自定义form认证过滤器-->
    <bean id="formAuthenticationFilter"
          class="shiro.CustomFromAuthenticationFilter">
        <!-- 表单中账号的input名称 -->
        <property name="usernameParam" value="username" />
        <!-- 表单中密码的input名称 -->
        <property name="passwordParam" value="password" />
        <!--记住我input的名称-->
        <property name="rememberMeParam" value="rememberMe"/>
    </bean>
```

然后将它注入到Shiro的过滤器中，在`<bean id="shiroFilter">`中加入自定义filter的配置:
```xml
<!--自定义filter-->
<property name="filters">
    <map>
        !-- 将自定义的FormAuthenticationFilter注入shiroFiler中 -->
        <entry key="authc" value-ref="formAuthenticationFilter" />
    </map>
</property>
```

然后在login.action中对验证错误进行解析:
```java
else if("randomCodeError".equals(exceptionClassName)){
                throw new CustomException("验证码错误");
} 
```

在登录页面中添加验证码:
```xml
<TR>
	<TD>密 码：</TD>
	<TD><input type="password" id="pwd" name="password" style="WIDTH: 130px" />
	</TD>
</TR>
<TR>
	<TD>验证码：</TD>
	<TD><input id="randomcode" name="randomcode" size="8" /> <img id="randomcode_img" src="${baseurl}validatecode.jsp" alt="" width="56" height="20" align='absMiddle' /> 
	<a href=javascript:randomcode_refresh()>刷新</a></TD>
</TR>
```

在shiro的过滤器filter中配置匿名访问验证码的图片资源:
```xml
 			<value>
                <!--对静态资源设置匿名访问-->
                /images/**=anon
                /js/**=anon
                /style/**=anon

                <!--验证码-->
                /validatecode.jsp=anon

                <!--请求这个地址就自动退出-->
                /logout.action=logout

                <!--商品查询需要商品查询权限，取消url拦截配置，采用注解授权-->
                <!--/items/queryItems.action=perms[item:query]-->
                <!--&lt;!&ndash;商品修改需要商品修改权限&ndash;&gt;-->
                <!--/items/editItems.action=perms[item:edit]-->
                <!-- -/**=authc 表示所有的url都必须认证通过才可以访问- -->
                /** = authc
                <!--/**=anon 表示所有的url都可以匿名访问-->

            </value>
```

## 16.实现"记住我"功能
用户登陆选择“自动登陆”本次登陆成功会向cookie写身份信息，下次登陆从cookie中取出身份信息实现自动登陆。

这里涉及到session的序列化与反序列化，所以涉及到的pojo类都应该实现java.io.Serializable接口。首先让ActiveUser.java实现java.io.Serializable接口，然后让SysPermission.java实现java.io.Serializable接口。  

### 16.1配置rememberMeManager
在application-shiro.xml中加入记住我的管理器，内容如下:
```xml
<!-- rememberMeManager管理器 -->
    <bean id="rememberMeManager" class="org.apache.shiro.web.mgt.CookieRememberMeManager">
        <property name="cookie" ref="rememberMeCookie" />
    </bean>
    <!-- 记住我cookie -->
    <bean id="rememberMeCookie" class="org.apache.shiro.web.servlet.SimpleCookie">
        <!--rememberMe时cookie的名字-->
        <constructor-arg value="rememberMe" />
        <!-- 记住我cookie生效时间30天 -->
        <property name="maxAge" value="2592000" />
    </bean>
```

并注入到securityManager中:
```xml
 <!--securityManage-->
    <!-- 安全管理器 -->
    <bean id="securityManager" class="org.apache.shiro.web.mgt.DefaultWebSecurityManager">
        <property name="realm" ref="customRealm" />

        <!--注入缓存管理器-->
        <property name="cacheManager" ref="cacheManager"/>

        <!--注入会话管理器-->
        <property name="sessionManager" ref="sessionManager" />

        <!-- 记住我 -->
        <property name="rememberMeManager" ref="rememberMeManager"/>
    </bean>
```

然后修改登录页面，加入记住我的按钮，然后在application-shiro.xml的我们自定义form认证过滤器的配置中加入rememberMe的input名称配置:
```xml
 <!--自定义form认证过滤器-->
    <bean id="formAuthenticationFilter"
          class="shiro.CustomFromAuthenticationFilter">
        <!-- 表单中账号的input名称 -->
        <property name="usernameParam" value="username" />
        <!-- 表单中密码的input名称 -->
        <property name="passwordParam" value="password" />
        <!--记住我input的名称-->
        <property name="rememberMeParam" value="rememberMe"/>
    </bean>
```

然后便可以进行测试，在登录页面输入登录信息后点击下次自动登录，登录成功后我们查看浏览器的cookie缓存会发现多了一个名叫rememberMe的cookie信息。然而此时我们若退出登录，退回到登录页面，按理说此时浏览器已经存在该cookie了所以此时若我们直接访问系统主页是可以直接访问的，然而测试结果仍然不行，因为该请求被`/**=authc`拦截了，所以我们要使用UserFilter，将记住我即可访问的地址配置让UserFilter拦截。  

### 16.2使用UserFilter
在application-shiro.xml的`<value>`中加入UserFilter拦截的资源配置:
```xml
				<value>
                <!--对静态资源设置匿名访问-->
                /images/**=anon
                /js/**=anon
                /style/**=anon

                <!--验证码-->
                /validatecode.jsp=anon

                <!--请求这个地址就自动退出-->
                /logout.action=logout

                <!--商品查询需要商品查询权限，取消url拦截配置，采用注解授权-->
                <!--/items/queryItems.action=perms[item:query]-->
                <!--&lt;!&ndash;商品修改需要商品修改权限&ndash;&gt;-->
                <!--/items/editItems.action=perms[item:edit]-->
                <!--配置记住我或认证通过可以访问的资源url-->
                /index.jsp=user
                /first.action=user
                /welcome.jsp=user
                <!-- -/**=authc 表示所有的url都必须认证通过才可以访问- -->
                /** = authc
                <!--/**=anon 表示所有的url都可以匿名访问-->

            </value>
```

此时登录时点击记住我，成功登录后关掉浏览器，再次输入系统的主页地址即可直接访问系统的这三个资源:`/index.jsp`、`/first.action`、`welcome.jsp`。到此，我们便简单的入门了整合了Shiro框架的SSM的web项目该如何进行开发。


## 17.联系

  If you have some questions after you see this article,you can tell your doubts in the comments area or you can find some info by  clicking these links.


- [Blog@codingXiaxw's blog](http://codingxiaxw.cn)

- [Weibo@codingXiaxw](http://weibo.com/u/5023661572?from=hissimilar_home&refer_flag=1005050003_)

- [Zhihu@codingXiaxw](http://www.zhihu.com/people/e9f78fa34b8002652811ac348da3f671)  
- [Github@codingXiaxw](https://github.com/codingXiaxw)
