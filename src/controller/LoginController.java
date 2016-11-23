package controller;

import exception.CustomException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import po.ActiveUser;
import service.SysService;

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
    @RequestMapping("/login")
    public String login(HttpSession session,String randomcode,String usercode, String password) throws Exception
    {

        //校验验证码，防止恶性攻击
        //丛session中获取正确验证码
        String validateCode= (String) session.getAttribute("validateCode");

        if (!randomcode.equals(validateCode))
        {
            throw new CustomException("验证码不正确");
        }


        //调用service校验用户帐号和密码的正确性
        //这个东西我们讲shiro的时候再写
        ActiveUser activeUser=sysService.authenticat(usercode,password);


        //如果service校验通过，将用户身份记录到session
        session.setAttribute("activeUser",activeUser);

        //重定向到商品查询页面
        return "redirect:/first.action";
    }

    //用户退出
    @RequestMapping("/logout")
    public String logout(HttpSession session) throws Exception
    {
        //session失效
        session.invalidate();

        //重定向到商品查询页面
        return "redirect:/first.action";
    }
}
