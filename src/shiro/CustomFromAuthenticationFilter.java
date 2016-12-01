package shiro;

import org.apache.shiro.web.filter.authc.FormAuthenticationFilter;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

/**
 * Created by codingBoy on 16/11/23.
 */
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
