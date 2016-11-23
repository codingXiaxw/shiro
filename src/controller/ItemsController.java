package controller;

import com.sun.org.apache.xpath.internal.operations.Mod;
import controller.validation.ValidGroup1;
import exception.CustomException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;
import po.Items;
import po.ItemsCustom;
import po.ItemsQueryVo;
import service.ItemsService;

import javax.annotation.Resource;
import javax.jws.WebParam;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by codingBoy on 16/11/15.
 */
@Controller
//定义url的根路径，访问时根路径+方法名的url
@RequestMapping("/items")
public class ItemsController {

    //注入service
    @Autowired
    private ItemsService itemsService;

    //单独将商品类型的方法提取出来，将方法返回值填充到request域，在页面提示
    @ModelAttribute("itemsType")
    public Map<String,String> getItemsType() throws Exception{

        HashMap<String,String> itemsType=new HashMap<>();
        itemsType.put("001","data type");
        itemsType.put("002","clothes");
        return itemsType;
    }

    @RequestMapping("/queryItems")
    public ModelAndView queryItems() throws Exception {
        //调用servie来查询商品列表
        List<ItemsCustom> itemsList=itemsService.findItemsList(null);

        ModelAndView modelAndView=new ModelAndView();
        modelAndView.addObject("itemsList",itemsList);
        //指定逻辑视图名itemsList.jsp
        modelAndView.setViewName("itemsList");

        return modelAndView;
    }

    //批量修改商品查询
    @RequestMapping("/editItemsList")
    public ModelAndView editItemsList() throws Exception {
        //调用servie来查询商品列表
        List<ItemsCustom> itemsList=itemsService.findItemsList(null);

        ModelAndView modelAndView=new ModelAndView();
        modelAndView.addObject("itemsList",itemsList);
        //指定逻辑视图名itemsList.jsp
        modelAndView.setViewName("editItemsList");

        return modelAndView;
    }

    //批量修改商品的提交

    @RequestMapping("/editItemsListSubmit")
    public String editItemsListSubmit(ItemsQueryVo itemsQueryVo) throws Exception{
        return "success";
    }


    //商品修改页面提示
    //使用method = RequestMethod.GET来限制使用get方法
//    @RequestMapping(value = "/editItems",method = RequestMethod.GET)
//    public ModelAndView editItems() throws Exception
//    {
//        ModelAndView modelAndView=new ModelAndView();
//
//        //调用service查询商品的信息
//        ItemsCustom itemsCustom=itemsService.findItemsById(1);
//        //将模型数据传到jsp
//        modelAndView.addObject("item",itemsCustom);
//        //指定逻辑视图名
//        modelAndView.setViewName("editItem");
//
//        return modelAndView;
//    }

    //方法返回字符串，字符串就是逻辑视图名，Model作用时将数据填充到request域，在页面显示
    @RequestMapping(value = "/editItems",method = RequestMethod.GET)
    public String editItems(Model model, Integer id) throws Exception
    {

        //将id传到页面
        model.addAttribute("id",id);

        //调用service查询商品的信息
        ItemsCustom itemsCustom=itemsService.findItemsById(id);



        model.addAttribute("itemsCustom",itemsCustom);

        return "editItem";
    }

    //更具商品id查看商品信息rest接口
    //@requestMapping中指定restful方式的url中的参数，参数需要用{}包起来
    //@PathVariable将url中的参数和形参进行绑定
    @RequestMapping("/viewItems/{id}")
    public @ResponseBody ItemsCustom viewItems(@PathVariable("id") Integer id) throws Exception
    {
        //调用service查询商品的信息
        ItemsCustom itemsCustom=itemsService.findItemsById(id);


        return itemsCustom;
    }


//    @RequestMapping(value = "/editItems",method = RequestMethod.GET)
//    public void editItems(HttpServletRequest request, HttpServletResponse response,
////                          @RequestParam(value = "item_id",required = false,defaultValue = "1")
//                                  Integer id) throws Exception
//    {
//
//        //调用service查询商品的信息
//        ItemsCustom itemsCustom=itemsService.findItemsById(id);
//
//        request.setAttribute("item",itemsCustom);
//
//        //zhuyi如果使用request转向页面，这里需要指定页面的完整路径
//        request.getRequestDispatcher("/WEB-INF/jsp/editItem.jsp").forward(request,response);
//    }

    //商品提交页面
    //itemsQueryVo是包装类型的pojo
    //在@Validated中定义使用ValidGroup1组下边的校验
    @RequestMapping("/editItemSubmit")
    public String editItemSubmit(Model model,Integer id,
                                 @Validated(value = {ValidGroup1.class}) @ModelAttribute(value = "itemsCustom") ItemsCustom itemsCustom,
                                 BindingResult bindingResult,
                                 //上传图片
                                 MultipartFile pictureFile
                                 ) throws Exception
    {
        //输出校验错误信息
        //如果参数绑定时出错
        if (bindingResult.hasErrors())
        {
            //获取错误
            List<ObjectError> errors=bindingResult.getAllErrors();

            model.addAttribute("errors",errors);

            for (ObjectError error:errors)
            {
                //输出错误信息
                System.out.println(error.getDefaultMessage());
            }

            //如果校验错误，仍然回到商品修改页面
            return "editItem";

        }


        //进行数据回显
        model.addAttribute("id",id);
//        model.addAttribute("item",itemsCustom);

        //进行图片的上传
        if (pictureFile!=null&&pictureFile.getOriginalFilename()!=null&&pictureFile.getOriginalFilename().length()>0)
        {
            //图片上传成功后，将图片的地址写到数据库
            String filePath="/Users/codingBoy/Pictures/";
            String originalFilename=pictureFile.getOriginalFilename();

            String newFileName= UUID.randomUUID()+originalFilename.substring(originalFilename.lastIndexOf("."));

            //新文件
            File file=new File(filePath+newFileName);

            //将内存中的文件写入磁盘
            pictureFile.transferTo(file);

            //图片上传成功
            itemsCustom.setPic(newFileName);
        }


        itemsService.updateItems(id,itemsCustom);
        //请求转发
//        return "forward:queryItems.action";


//        return "editItem";
        //重定向
        return "redirect:queryItems.action";
    }
//
//    //自定义属性编辑器
//    @InitBinder
//    public void initBinder(WebDataBinder binder) throws  Exception{
//
//        //Date.class必须是与controller方法形参pojo属性一致的date类型，这里是java.util.Date
//        binder.registerCustomEditor(Date.class,new CustomDateEditor(new SimpleDateFormat("yyyy-MM-dd HH-mm-ss"),true));
//
//    }

    //删除商品
    @RequestMapping("/deleteItems")
    public String deleteItems(Integer[] delete_id) throws Exception
    {
        //调用serive方法删除商品

        return "success";
    }
}
