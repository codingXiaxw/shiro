

//打开标签窗口
var opentabwindow = function(tabTitle,url){
	addTab(tabTitle,url,'icon icon-null');
};
//菜单单击事件
var menuclick = function(){
		//var tabTitle = $(this).children('.nav').text();
	    //获取二级菜单的title,数据从后台的menu.json中获取
		var tabTitle = $(this).attr("title");
		//获取二级菜单的url,rel是获取json数据时拼接成的html的一部分
		var url = $(this).attr("rel");
		var menuid = $(this).attr("ref");
		var icon = 'icon '+$(this).attr("icon");
		addTab(tabTitle,url,icon);
		$('.easyui-accordion li div').removeClass("selected");
		$(this).parent().addClass("selected");
};
//将后台获取的json菜单数据，组织成html
function initMenu(menus_var) {
		
	$("#nav").accordion({animate:false}); 
	//循环处理json的菜单数据，组织成html
    $.each(menus_var.menus, function(i, n) {//外层循环处理一级菜单
		var menulist ='';
		menulist +='<ul>';
        $.each(n.menus, function(j, o) {//二层处理二级菜单
        	//这里自定义了一些属性存放菜单的内容：title存放菜单名称rel存放菜单地址，这些在属性在点击菜单 时要取出值使用
			menulist += '<li><div><a title="'+o.menuname+'" ref="'+o.menuid+'" href="#" rel="' + o.url + '" icon="' + o.icon + '"  ><span class="icon '+o.icon+'" >&nbsp;</span><span class="nav">' + o.menuname + '</span></a></div></li> ';
        });
		menulist += '</ul>';//生成了菜单的html
		//自动创建菜单
		$('#nav').accordion('add', {
            title: n.menuname,
            content: menulist,//二级菜单的内容
            iconCls: 'icon ' + n.icon
        });

    });
    
    //鼠标移动效果
    //指定a的点击事件是menuclick
	$('.easyui-accordion li a').click(menuclick).hover(function(){
		$(this).parent().addClass("hover");
	},function(){
		$(this).parent().removeClass("hover");
	});

}


/**
 * 
 * @param subtitle 标题
 * @param url 访问地址
 * @param icon 图标
 */
function addTab(subtitle,url,icon){
	//如果指定标题的tab不存则添加一个新的
	if(!$('#tabs').tabs('exists',subtitle)){
		$('#tabs').tabs('add',{
			title:subtitle,
			content:createFrame(url),
			closable:true,
			icon:icon
		});
	}else{
		//如果tabs已创建则选中
		$('#tabs').tabs('select',subtitle);
	}
}

function createFrame(url)
{
	var s = '<iframe scrolling="auto" frameborder="0"  src="'+url+'" style="width:100%;height:100%;"></iframe>';
	return s;
}




