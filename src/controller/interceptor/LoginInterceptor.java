package controller.interceptor;

import org.springframework.beans.support.PagedListHolder;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;
import po.ActiveUser;
import util.ResourcesUtil;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.List;

/**
 * Created by codingBoy on 16/11/18.
 */
public class LoginInterceptor implements HandlerInterceptor
{
    //在执行handler之前来执行的
    //用于用户认证校验、用户权限校验
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        String url=request.getRequestURI();

        //判断是否是公开地址
        //实际开发中需要将公开地址配置在配置文件中
        //丛配置文件中取出匿名访问的url
        List<String> open_urls=ResourcesUtil.gekeyList("anonymousURL");

        //遍历公开地址，如果是公开地址则放行
        for (String open_url:open_urls)
        {
            if (url.indexOf(open_url)>=0)
            {
                //如果是公开地址则放行
                return true;
            }
        }



        //判断用户身份在session中是否存在
        HttpSession session=request.getSession();
        ActiveUser activeUser= (ActiveUser) session.getAttribute("activeUser");

        //如果用户身份在session中存在则放行
        if (activeUser!=null)
        {
            return true;
        }

        //执行到这里就拦截，跳转到登陆页面，用户进行登陆
        request.getRequestDispatcher("/WEB-INF/jsp/login.jsp").forward(request,response);

        return false;
    }


    //在执行handerl但是返回modelandview之前来执行
    //如果需要向页面提供一些公用的数据或配置一些视图信息，使用此方法实现从modelAndView入手
    @Override
    public void postHandle(HttpServletRequest request,
                           HttpServletResponse response, Object handler,
                           ModelAndView modelAndView) throws Exception {

        System.out.println("HandlerInterceptor1....postHandle");
    }


    //执行handler之后执行此方法
    //做系统统一异常处理，进行方法执行性能监控，在prehandler中设置一个时间点，在afterCompletion设置一个时间点，两个时间点的差就是执行时长
    //实现系统统一日志记录
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler,
                                Exception ex) throws Exception {

        System.out.println("HandlerInterceptor1....afterCompletion");

    }
}
