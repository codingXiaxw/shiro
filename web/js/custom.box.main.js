//加载数据字典信息，value值为id
function getDictinfoIdlist(typecode,id){
		var selectobj = document.getElementById(id);
		selectobj.length = 0; 
		selectobj.options[0] = new Option('全部','');
		if(selectedvalue == ''){
			selectobj.options[selectobj.length-1].selected = true;
		}
		dwrService.getDictinfoIdlist(typecode,{
		     callback:function(data) {
		     	if(data){
		           	for(var m=0;m<data.length;m++){
		           		var info = data[m].info;
		           		var value = data[m].value;
		           		selectobj.options[selectobj.length] = new Option(info,value);
		           		if(selectedvalue == value){
		        			selectobj.options[selectobj.length-1].selected = true;
		        		}
		           	}
		       	}
		     }});
	}
//加载数据字典信息，value值为code
/**
 * typecode为数据字典的typecode
 * id：select下拉框的id
 * 
 */
	function getDictinfoCodelist(typecode,id,selectedvalue){
		var selectobj = document.getElementById(id);//通过id获取下拉框的对象
		selectobj.length = 0; 
		selectobj.options[0] = new Option('全部','');//向下拉框中放入option
		dwrService.getDictinfoCodelist(typecode,{
		     callback:function(data) {
		     	if(data){
		     		//遍历dwr获取数据
		           	for(var m=0;m<data.length;m++){
		           		var info = data[m].info;//拿到map中的info
		           		var value = data[m].value;//拿到map中的value
		           		//alert(info+"  "+value);
		           		
		           		selectobj.options[selectobj.length] = new Option(info,value);//向下拉框中放入option
		           		//如果selectedvalue和dwr获取的值相同，让option选中
		           		if(selectedvalue == value){
		        			selectobj.options[selectobj.length-1].selected = true;
		        		}
		           	}
		           //selectobj.options.length=0; 
		           
		       	}
		     }});
	}
	//加载最近5年时间
	/**
	 * id:年份下拉框的id
	 */
	function businessyearlist(id){
		//获取select对象
		var selectobj = document.getElementById(id);
		//给下拉框里边的option数量清0
		selectobj.length = 0; 
		//调用dwr的方法
		dwrService.businessyear({
		     callback:function(data) {
		     	if(data){
		           	for(var m=0;m<data.length;m++){
		           		var info = data[m].info;
		           		var value = data[m].value;
		           		//在select下拉框中创建option
		           		//alert(selectobj.length);
		           		selectobj.options[selectobj.length] = new Option(info,value);
		           		
		           	}
		           	//选中下拉框最后一个值
		           	selectobj.options[selectobj.length-1].selected = true;
		       	}
		     }});
	}

	
//统一封装方法，作用：提示信息
function message_alert(data){
	//从返回的json数据中获取结果信息
	var data_v = data.resultInfo;
	
	//提交结果类型
	var type=data_v.type;
	//结果提示信息
	var message=data_v.message;
	//alert(message);
	if(type==0){
		//如果type等于0表示失败，调用 jquery easyui的信息提示组件
		$.messager.alert('提示信息',message,'error');
	}else if(type==1){
		$.messager.alert('提示信息',message,'success');
	}else if(type==2){
		$.messager.alert('提示信息',message,'warning');
	}else if(type==3){
		$.messager.alert('提示信息',message,'info');
	}
}



//jqueryeasyui messager封装
var alert_success = function(message){
	alert_base(message,"success");
};

var alert_error = function(message){
	alert_base(message,"error");
};

var alert_info = function(message){
	alert_base(message,"info");
};

var alert_warn = function(message){
	alert_base(message,"warning");
};

var alert_none = function(message){
	alert_base(message);
};

var alert_base = function(message,iconType,details){
	$.messager.alert('系统提示信息',message,iconType);
};

/**
 * 系统提交统一提示窗口，采用jquery easyui的模式window实现
 */
var TYPE_RESULT_FAIL = 0;
var TYPE_RESULT_SUCCESS = 1;
var TYPE_RESULT_WARN = 2;
var TYPE_RESULT_INFO = 3;

var _alert = function(resultInfo) {
	var type = resultInfo.type;
	
	switch (type) {
		case TYPE_RESULT_FAIL:
			submit_alert_error(resultInfo);
			break;
		case TYPE_RESULT_SUCCESS:
			submit_alert_success(resultInfo);
			break;
		case TYPE_RESULT_WARN:
			submit_alert_warn(resultInfo);
			break;
		case TYPE_RESULT_INFO:
			submit_alert_info(resultInfo);
			break;
		default:submit_alert_info(resultInfo);
	}
	;
	//取消加载框，某些情况自动取消不了这里需要再次调用
	$("#load").remove();
};

var submit_alert_success = function(resultInfo){
	submit_alert_base(resultInfo,"success");
};

var submit_alert_error = function(resultInfo){
	submit_alert_base(resultInfo,"error");
};

var submit_alert_info = function(resultInfo){
	submit_alert_base(resultInfo,"info");
};

var submit_alert_warn = function(resultInfo){
	submit_alert_base(resultInfo,"warning");
};



var submit_alert_base = function(resultInfo,iconType){
	
	//提示代码
	var messageCode = resultInfo.messageCode;
	//提示信息
	var message = resultInfo.message;
	//提示信息明细
	var details= resultInfo.details;
	
	
	submit_alert_show(iconType,messageCode,message,details,350,250);
};

//明细提示窗口
function messagewindow(title,width,height,html){
	this.title=title;
	this.width=width; 
	this.height=height;
	this.html=html;
	var id = new Date().getMilliseconds();
	this.windowid="message_win_"+id;

}
messagewindow.prototype.createWindow = function(){
	var active = document.createElement("div");
	active.id="active";
	document.body.appendChild(active);
	active.innerHTML="<div id="+this.windowid+" class=\"easyui-window\" modal='true' closed='true'  iconCls=\"icon-save\" >"+this.html+"</div>";


	$('#'+this.windowid).window({
		title: this.title,
		width: this.width,
		modal: true,
		shadow: false,
		minimizable:false,
		collapsible:false,
		closed: true,
		height: this.height
	});
	this.open();

};
messagewindow.prototype.open = function(){
	$('#'+this.windowid).window('open');
};
messagewindow.prototype.close = function(){
	$('#'+this.windowid).window('close');
};

//模式窗口单一实例
var messagewindow_singleobj;
//系统提交提示窗口显示
function submit_alert_show(iconType,messageCode,message,messagelist,width,height){
	
	var html='<div style="width: 93%; height: auto;padding:10px" title="" >';
	//icon
	html +='<div class="messager-icon messager-'+iconType+'"></div>';
	//系统代码
	html +='<div>提示代码：'+messageCode+'</div>';
	html +='<div>提示信息：'+message+'</div>';
	html +='<div style="clear:both;"></div>';
	//详细信息
	var deltail='';
	
	if(messagelist){
		for(var index=0;index<messagelist.length;index++){
			deltail+='<div style="width: 100%;">';
			if(messagelist[index].index){
				deltail+='序号：'+messagelist[index].index+' ';
			}
			deltail+=messagelist[index].message+'</div>';
		}
	}
	html +=deltail;
	//按钮
	html +='<div style="width: 100%;"><div class="dialog-button" style="text-align:center;"><a href="javascript:closemessagewindow()" class="l-btn"><span class="l-btn-left"><span class="l-btn-text">确定</span></span></a></div></div>';
	//结束
	html +='</div>';
	
		
	/*
	var html='<div style="width: 93%; height: auto;padding:10px" title="" >'
				+'<div class="messager-icon messager-success"></div>'
				+'<div>系统代码：907，操作成功0条，失败2条</div><div style="clear:both;"></div>'
			//+'<div style="width: 100%;">ffsdsfdsfds</div>'
			//+'<div style="width: 100%;">ffsdsfdsfds</div>'
			//+'<div style="width: 100%;">ffsdsfdsfds</div>'
			//+'<div style="width: 100%;">ffsdsfdsfds</div>'
			+'<div style="width: 100%;"><div class="dialog-button" style="text-align:center;"><a href="javascript:closemessagewindow()" class="l-btn"><span class="l-btn-left"><span class="l-btn-text">确定</span></span></a></div></div>';
		+'</div>';*/

	messagewindow_singleobj = new messagewindow("系统提示",width,height,html);
	messagewindow_singleobj.createWindow();

}
//关闭模式窗口
function closemessagewindow(){
	if(messagewindow_singleobj){
		messagewindow_singleobj.close();
	}
}




var _confirm = function(question,method_cancel,method_ok){
	$.messager.confirm('系统提示', question, function(r) {
		if (r) {
			if(method_ok){
				method_ok();
			}
		}else{
			if(method_cancel){
				method_cancel();
			}
		}
	});
	
};

//获取返回结果信息对象
function getCallbackData(data){
	return data.resultInfo;
}

//form表单数据转成json
(function($){  
    $.fn.serializeJson=function(){  
        var serializeObj={};  
        var array=this.serializeArray();  
        var str=this.serialize();  
        $(array).each(function(){  
            if(serializeObj[this.name]){  
                if($.isArray(serializeObj[this.name])){  
                    serializeObj[this.name].push(this.value);  
                }else{  
                    serializeObj[this.name]=[serializeObj[this.name],this.value];  
                }  
            }else{  
                serializeObj[this.name]=this.value;   
            }  
        });  
        return serializeObj;  
    };  
})(jQuery); 

//********模式窗口类***********

function modalwindow(title,width,height,url){
	this.title=title;
	this.width=width;
	this.height=height;
	this.url=url;
	var id = new Date().getMilliseconds();
	this.windowid="win_"+id;
	this.iframeid="iframe_"+id;

}
modalwindow.prototype.createWindow = function(){
	var active = document.createElement("div");
	active.id="active";
	document.body.appendChild(active);
	active.innerHTML="<div id="+this.windowid+" class=\"easyui-window\" modal='true' closed='true'  iconCls=\"icon-save\" ><iframe scrolling='yes' style='overflow-x:hidden;' id='"+this.iframeid+"' src='"+this.url+"' frameborder='0' width='100%' height='100%'></iframe></div>";

	$('#'+this.windowid).window({
		title: this.title,
		width: this.width,
		modal: true,
		shadow: false,
		minimizable:false,
		collapsible:false,
		closed: true,
		height: this.height
	});
	this.open();

};
modalwindow.prototype.open = function(){
	$('#'+this.windowid).window('open');
};
modalwindow.prototype.close = function(){
	$('#'+this.windowid).window('close');
};

//模式窗口单一实例
var modalwindow_singleobj;
//创建模式窗口
function createmodalwindow(title,width,height,url){
	modalwindow_singleobj = new modalwindow(title,width,height,url);
	modalwindow_singleobj.createWindow();

}
//关闭模式窗口
function closemodalwindow(){
	if(modalwindow_singleobj){
		modalwindow_singleobj.close();
	}
}
//************以上为模式窗口类*************



//***********ztree封装类*****************
function createSyncTree(treeareaid,treeid,textid,valid,setting,zNodes,onclickLevel,selectevent,startNodes){
	this.treeareaid =treeareaid;//树所在区域
	this.treeid = treeid;//树本身
	this.textid = textid;//选择树显示区
	this.valid = valid;//选择树存储区
	this.setting = setting;//树参数
	this.zNodes = zNodes;//结点
	this.onclickLevel = onclickLevel;//单击树的层级
	this.treeareaObj = $("#"+this.treeareaid);//树所在区域的div对象
	this.treeObj = $("#"+this.treeid);//树本身对象
	this.textObj = $("#"+this.textid);//选择树后显示文本框的对象
	this.valObj = $("#"+this.valid);//选择树后存放value值的对象
	this.selectevent = selectevent;//选中结点事件方式：onClick  onCheck
	this.textObjOffset = this.textObj.offset();//获取文本框的偏移量
	
	
	//定义的onclick方法
	if(this.selectevent == "onClick"){
		this.setting.callback.onClick=this.onClick();
	}
	//定义的onCheck方法
	if(this.selectevent == "onCheck"){
		this.setting.callback.onCheck=this.onCheck();
	}
	//初始化树中的结点
	$.fn.zTree.init(this.treeObj, this.setting,this.zNodes);
	//获取树对象
	this.zTree = $.fn.zTree.getZTreeObj(this.treeid);
	
	
	//初始化结点
	if(startNodes){
		var startNodes_l = startNodes.split(',');//获取需要选择的节点
		for(var vi=0;vi<startNodes_l.length-1;vi++)  
        {   
            var nodetm=this.zTree.getNodeByParam("id", startNodes_l[vi], null);//根据属性查找出对应的结点对象
            this.zTree.checkNode(nodetm, true, true);//执行选择节点
        }
	}
}


createSyncTree.prototype.onCheck =function () {
	 //文本框对象
    var textObj= this.textObj;
    //存放值对象
    var valObj= this.valObj;
    //单击树的层次
    var onclickLevel = this.onclickLevel;
    var treeOnCheck = function(e, treeId, treeNode){
    	
    	var zTree = $.fn.zTree.getZTreeObj(treeId);
    	
		var nodes = zTree.getCheckedNodes();
		var v = "";
		var v_id="";
    	
		nodes.sort(function compare(a,b){return a.id-b.id;});
		for (var i=0, l=nodes.length; i<l; i++) {
			if(onclickLevel){
				if(onclickLevel==nodes[i].level){
					v += nodes[i].name + ",";
					v_id += nodes[i].id + ",";
				}
			}else{
				v += nodes[i].name + ",";
				v_id += nodes[i].id + ",";
			}
		}
		if (v.length > 0 ) v = v.substring(0, v.length-1);
		if (v_id.length > 0 ) v_id = v_id.substring(0, v_id.length-1);
		textObj.attr("value", v);//树结点名称填入文本框
		valObj.attr("value", v_id);//树结点id填入值框
    };
    return treeOnCheck;
};
//树单击事件
createSyncTree.prototype.onClick =function () {
	    //文本框对象
	    var textObj= this.textObj;
	    //存放值对象
	    var valObj= this.valObj;
	    //单击树的层次
	    var onclickLevel = this.onclickLevel;
		var treeOnclick = function(e, treeId, treeNode){
			//如果单击限定了层级则在这里判断拦截
			if(onclickLevel){
				if(onclickLevel!=treeNode.level){
					alert("对不起，只允许选择树的第"+(onclickLevel+1)+"级!");
					return ;
				}
			}
			
			var zTree = $.fn.zTree.getZTreeObj(treeId);
	
			var nodes = zTree.getSelectedNodes();
			var v = "";
			var v_id="";
			nodes.sort(function compare(a,b){return a.id-b.id;});
			for (var i=0, l=nodes.length; i<l; i++) {
				v += nodes[i].name + ",";
				v_id += nodes[i].id + ",";
			}
			if (v.length > 0 ) v = v.substring(0, v.length-1);
			if (v_id.length > 0 ) v_id = v_id.substring(0, v_id.length-1);
			textObj.attr("value", v);//树结点名称填入文本框
			valObj.attr("value", v_id);//树结点id填入值框
		};
	return treeOnclick;
};

createSyncTree.prototype.onBodyDown = function(){
	var textid=this.textid;
	var treeareaid = this.treeareaid;
	var createSyncTreeObj= this;
	var onBodyDown = function(event) {
		if (!( event.target.id == treeareaid || $(event.target).parents("#"+treeareaid).length>0)) {
			createSyncTreeObj.hideMenu();
		}
	};
	return onBodyDown;
};

createSyncTree.prototype.hideMenu = function() {
	this.treeareaObj.fadeOut("fast");
	$("body").unbind("mousedown", this.onBodyDown);
};

createSyncTree.prototype.showMenu = function() {
	//根据文本框的偏移量定位树区域的位置
	this.treeareaObj.css({left:this.textObjOffset.left + "px", top:this.textObjOffset.top + this.textObj.outerHeight() + "px"}).slideDown("fast");
	//绑定鼠标按下事件
	$("body").bind("mousedown", this.onBodyDown());
};
