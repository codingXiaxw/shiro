package controller.interceptor;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by codingBoy on 16/11/18.
 */
public class HandlerInterceptor2 implements HandlerInterceptor
{
    //在执行handler之前来执行的
    //用于用户认证校验、用户权限校验
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {


        System.out.println("HandlerInterceptor2....postHandle");

        //返回false表示拦截不继续执行handler，返回true表示放行
        return false;
    }


    //在执行handerl但是返回modelandview之前来执行
    //如果需要向页面提供一些公用的数据或配置一些视图信息，使用此方法实现从modelAndView入手
    @Override
    public void postHandle(HttpServletRequest request,
                           HttpServletResponse response, Object handler,
                           ModelAndView modelAndView) throws Exception {

        System.out.println("HandlerInterceptor2....postHandler");

    }


    //执行handler之后执行此方法
    //做系统统一异常处理，进行方法执行性能监控，在prehandler中设置一个时间点，在afterCompletion设置一个时间点，两个时间点的差就是执行时长
    //实现系统统一日志记录
    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler,
                                Exception ex) throws Exception {

        System.out.println("HandlerInterceptor2....afterCompletion");

    }
}
