package controller;

import java.util.List;

import javax.servlet.http.HttpSession;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import po.ActiveUser;


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
