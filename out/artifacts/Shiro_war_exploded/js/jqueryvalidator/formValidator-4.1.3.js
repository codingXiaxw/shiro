//====================================================================================================
// [插件名称] jQuery formValidator
//----------------------------------------------------------------------------------------------------
// [描    述] jQuery formValidator表单验证插件，它是基于jQuery类库，实现了js脚本于页面的分离。对一个表
//            单对象，你只需要写一行代码就可以轻松实现20种以上的脚本控制。现支持一个表单元素累加很多种
//            校验方式,采用配置信息的思想，而不是把信息写在表单元素上，能比较完美的实现ajax请求。
//----------------------------------------------------------------------------------------------------
// [作者网名] 猫冬	
// [邮    箱] wzmaodong@126.com
// [作者博客] http://wzmaodong.cnblogs.com
// [插件主页] http://www.yhuan.com
// [QQ群交流] 72280458、74106519
// [更新日期] 2011-07-24
// [版 本 号] ver4.1.3 内部测试版
// [开源协议] LGPL
//====================================================================================================

(function($) {
$.formValidator = 
{
	//全局配置
	initConfig : function(controlOptions)
	{
		var settings = {};
		$.extend(true, settings, initConfig_setting, controlOptions || {});
		//如果是精简模式，发生错误的时候，第一个错误的控件就不获得焦点
		if(settings.mode == "SingleTip"){settings.errorFocus=false};
		//如果填写了表单和按钮，就注册验证事件
		if(settings.formID!=""){
		    $("#"+settings.formID).submit(function(){
		        if(settings.ajaxForm!=null){
		            $.formValidator.ajaxForm(settings.validatorGroup,settings.ajaxForm);
			        return false;
				}
		        else
				{
					if (settings.ajaxCountValid > 0) {
						settings.onAlert(settings.ajaxPrompt);
						return false;
					}
					return $.formValidator.pageIsValid(settings.validatorGroup);
                }
            });
		}
		$("body").data(settings.validatorGroup, settings);
		if(settings.theme==""){return}
		//读取主题对应的脚本
		var scriptSrcArray = fv_scriptSrc.split('/');
		var jsName = scriptSrcArray[scriptSrcArray.length-1];
    	var themedir = fv_scriptSrc.replace(jsName,'');
		$.ajax({async:false,type: "GET",url: themedir + "themes/"+settings.theme+"/js/theme.js",dataType: "script",
			error :function(){alert('当前皮肤加载出错，请确认皮肤【'+settings.theme+'】是否存在')}
		}); 
		//读取主题对应的样式
		if($.browser.msie)
		{
			var css=document.createElement("link");
			css.rel="stylesheet";
			css.type="text/css";
			css.href=themedir+"themes/"+settings.theme+"/style/style.css";
			document.getElementsByTagName("head")[0].appendChild(css);
		}
		else
		{
			var style=document.createElement('style'); 
			style.setAttribute("type", "text/css"); 
			var styCss = "@import url('"+themedir+"themes/"+settings.theme+"/style/style.css');";
			if (style.styleSheet) {style.styleSheet.cssText=styCss} else {style.appendChild(document.createTextNode(styCss))} 
			document.getElementsByTagName("head")[0].appendChild(style); 
		}
	},
	
	//各种校验方式支持的控件类型
	sustainType : function(elem,validateType)
	{
		var srcTag = elem.tagName;
		var stype = elem.type;
		switch(validateType)
		{
			case "formValidator":
				return true;
			case "inputValidator":
				return (srcTag == "INPUT" || srcTag == "TEXTAREA" || srcTag == "SELECT");
			case "compareValidator":
				return ((srcTag == "INPUT" || srcTag == "TEXTAREA") ? (stype != "checkbox" && stype != "radio") : false);
			case "ajaxValidator":
				return (stype == "text" || stype == "textarea" || stype == "file" || stype == "password" || stype == "select-one");
			case "regexValidator":
				return ((srcTag == "INPUT" || srcTag == "TEXTAREA") ? (stype != "checkbox" && stype != "radio") : false);
			case "functionValidator":
			    return true;
			case "passwordValidator":
			    return stype == "password";
		}
	},
    
	//如果validator对象对应的element对象的validator属性追加要进行的校验。
	appendValid : function(id, setting )
	{
		//如果是各种校验不支持的类型，就不追加到。返回-1表示没有追加成功
		var elem = $("#"+id).get(0);   
		var validateType = setting.validateType;
		if(!$.formValidator.sustainType(elem,validateType)){return -1}
		//重新初始化
		if (validateType=="formValidator" || elem.settings == undefined ){elem.settings = new Array()}   
		var len = elem.settings.push( setting );
		elem.settings[len - 1].index = len - 1;
		return len - 1;
	},
	
	//设置显示信息
	setTipState : function(elem,showclass,showmsg)
	{
		var initConfig = $("body").data(elem.validatorGroup);

		if(initConfig.mode == "SingleTip")
		{
			//显示和保存提示信息
			$("#fv_content").html(showmsg);
			elem.Tooltip = showmsg;
			if(showclass!="onError"){tip.hide()}
		}
		else
		{
			var tip = $("#"+elem.settings[0].tipID);
			var html = showclass == "onShow" ? onShowHtml : (showclass == "onFocus" ? onFocusHtml : (showclass == "onCorrect" ? onCorrectHtml : onErrorHtml));
			if(html.length = 0)
			{
				tip.hide()
			}
			else
			{
				if(elem.validatorPasswordIndex > 0 && showclass =="onCorrect"){
					var setting = elem.settings[elem.validatorPasswordIndex];
					var level = $.formValidator.passwordValid(elem);
					showmsg = "";
					if(level==-1 && setting.onErrorContinueChar!=""){
						showmsg=setting.onErrorContinueChar
					}else if(level==-2 && setting.onErrorSameChar!=""){
						showmsg=setting.onErrorSameChar
					}else if(level==-3 && setting.onErrorCompareSame!=""){
						showmsg=setting.onErrorCompareSame
					}
					if(showmsg!="")
					{
						$.formValidator.setTipState(elem,'onError',showmsg);
						return
					}
					showmsg = passwordStrengthText[level<=0?0:level - 1];
				}
				html = html.replace(/\$class\$/g, showclass).replace(/\$data\$/g, showmsg);
				if(showclass!=""){
					tip.html(html).removeClass().addClass(showclass).show();
				}else{
					tip.html(html).show();
				}
			}
			var stype = elem.type;
			if(stype == "password" || stype == "text" || stype == "file")
			{
				jqobj = $(elem);
				if(onShowClass!="" && showclass == "onShow"){jqobj.removeClass().addClass(onShowClass)};
				if(onFocusClass!="" && showclass == "onFocus"){jqobj.removeClass().addClass(onFocusClass)};
				if(onCorrectClass!="" && showclass == "onCorrect"){jqobj.removeClass().addClass(onCorrectClass)};
				if(onErrorClass!="" && showclass == "onError"){jqobj.removeClass().addClass(onErrorClass)};
			}
		}
	},
		
	//把提示层重置成原始提示(如果有defaultPassed,应该设置为onCorrect)
	resetTipState : function(validatorGroup)
	{
		if(validatorGroup == undefined){validatorGroup = "1"};
		var initConfig = $("body").data(validatorGroup);
		$.each(initConfig.validObjects,function(){
			var setting = this.settings[0];
			var passed = setting.defaultPassed;
			$.formValidator.setTipState(this, passed ? "onCorrect" : "onShow", passed ? $.formValidator.getStatusText(this,setting.onCorrect) : setting.onShow );	
		});
	},
	
	//设置错误的显示信息
	setFailState : function(tipID,showmsg)
	{
		$.formValidator.setTipState($("#"+tipID).get(0), "onError", showmsg);
	},

	//根据单个对象,正确:正确提示,错误:错误提示
	showMessage : function(returnObj)
	{
	    var id = returnObj.id;
		var elem = $("#"+id).get(0);
		var isValid = returnObj.isValid;
		var setting = returnObj.setting;//正确:setting[0],错误:对应的setting[i]
		var showmsg = "",showclass = "";
		var intiConfig = $("body").data(elem.validatorGroup);
		if (!isValid)
		{		
			showclass = "onError";
			if(setting.validateType=="ajaxValidator")
			{
				if(setting.lastValid=="")
				{
				    showclass = "onLoad";
				    showmsg = setting.onWait;
				}
				else
				{
				    showmsg = $.formValidator.getStatusText(elem,setting.onError);
				}
			}
			else
			{
				showmsg = (returnObj.errormsg==""? $.formValidator.getStatusText(elem,setting.onError) : returnObj.errormsg);
				
			}
			if(intiConfig.mode == "AlertTip")		
			{
				if(elem.validValueOld!=$(elem).val()){intiConfig.onAlert(showmsg);}   
			}
			else
			{
				$.formValidator.setTipState(elem,showclass,showmsg);
			}
		}
		else
		{		
			//验证成功后,如果没有设置成功提示信息,则给出默认提示,否则给出自定义提示;允许为空,值为空的提示
			showmsg = $.formValidator.isEmpty(id) ? setting.onEmpty : $.formValidator.getStatusText(elem,setting.onCorrect);
			$.formValidator.setTipState(elem,"onCorrect",showmsg);
		}
		return showmsg;
	},

	showAjaxMessage : function(e)
	{
		var elem = $("#"+e.id).get(0);
		var setting = elem.settings[e.ajax];
		var validValueOld = elem.validValueOld;
		var validvalue = $(elem).val();
		e.setting = setting;
		//defaultPassed还未处理
		if(validValueOld!= validvalue || validValueOld == validvalue && elem.onceValided == undefined)
		{
			$.formValidator.ajaxValid(e);
		}
		else
		{
			if(setting.isValid!=undefined && !setting.isValid){
				elem.lastshowclass = "onError"; 
				elem.lastshowmsg = $.formValidator.getStatusText(elem,setting.onError);
			}
			$.formValidator.setTipState(elem,elem.lastshowclass,elem.lastshowmsg);
		}
	},

	//获取指定字符串的长度
    getLength : function(id)
    {
        var srcjo = $("#"+id);
		var elem = srcjo.get(0);
        var sType = elem.type;
        var len = 0;
        switch(sType)
		{
			case "text":
			case "hidden":
			case "password":
			case "textarea":
			case "file":
		        var val = srcjo.val();
				var setting = elem.settings[0];
				//如果有显示提示内容的，要忽略掉
				if(elem.isInputControl && elem.value == setting.onShowText){val=""}
				var initConfig = $("body").data(elem.validatorGroup);
				if (initConfig.wideWord)
				{
					for (var i = 0; i < val.length; i++) 
					{
						len = len + ((val.charCodeAt(i) >= 0x4e00 && val.charCodeAt(i) <= 0x9fa5) ? 2 : 1); 
					}
				}
				else{
					len = val.length;
				}
		        break;
			case "checkbox":
			case "radio": 
				len = $("input[type='"+sType+"'][name='"+srcjo.attr("name")+"']:checked").length;
				break;
		    case "select-one":
		        len = elem.options ? elem.options.selectedIndex : -1;
				break;
			case "select-multiple":
				len = $("select[name="+elem.name+"] option:selected").length;
				break;
	    }
		return len;
    },
    
	//结合empty这个属性，判断仅仅是否为空的校验情况。
    isEmpty : function(id)
    {
        return ($("#"+id).get(0).settings[0].empty && $.formValidator.getLength(id)==0);
    },
    
	//对外调用：判断单个表单元素是否验证通过，不带回调函数
    isOneValid : function(id)
    {
	    return $.formValidator.oneIsValid(id).isValid;
    },
    
	//验证单个是否验证通过,正确返回settings[0],错误返回对应的settings[i]
	oneIsValid : function (id)
	{
		var e = {};
		e.id = id;
		e.dom = $("#"+id).get(0);
		e.initConfig = $("body").data(e.dom.validatorGroup);
		e.ajax = -1;
		e.errormsg = "";       //自定义错误信息
	    e.settings = e.dom.settings;
	    var settingslen = e.settings.length;
		var validateType;
		//只有一个formValidator的时候不检验
		if (settingslen==1){e.settings[0].bind=false;}
		if(!e.settings[0].bind){return null;}
		$.formValidator.resetInputValue(true,e.initConfig,id);
		for ( var i = 0 ; i < settingslen ; i ++ )
		{   
			if(i==0){
				//如果为空，直接返回正确
				if($.formValidator.isEmpty(id)){
					e.isValid = true;
					e.setting = e.settings[0];
					break;
				}
				continue;
			}
			e.setting = e.settings[i];
			validateType = e.settings[i].validateType;
			//根据类型触发校验
			switch(validateType)
			{
				case "inputValidator":
					$.formValidator.inputValid(e);
					break;
				case "compareValidator":
					$.formValidator.compareValid(e);
					break;
				case "regexValidator":
					$.formValidator.regexValid(e);
					break;
				case "functionValidator":
					$.formValidator.functionValid(e);
					break;
				case "ajaxValidator":
					//如果是ajax校验，这里直接取上次的结果值
					e.ajax = i;
					break;
				case "passwordValidator":
					break;
			}
			if(!e.settings[i].isValid) {
				e.isValid = false;
				e.setting = e.settings[i];
				break;
			}else{
				e.isValid = true;
				e.setting = e.settings[0];
				if (e.settings[i].validateType == "ajaxValidator"){break};
			}
		}
		$.formValidator.resetInputValue(false,e.initConfig,id);
		return e;
	},

	//验证所有需要验证的对象，并返回是否验证成功（如果曾经触发过ajaxValidator，提交的时候就不触发校验，直接读取结果）
	pageIsValid : function (validatorGroup)
	{
	    if(validatorGroup == undefined){validatorGroup = "1"};
		var isValid = true,returnObj,firstErrorMessage="",errorMessage;
		var error_tip = "^",thefirstid,name,name_list="^"; 	
		var errorlist = new Array();
		//设置提交状态、ajax是否出错、错误列表
		var initConfig = $("body").data(validatorGroup);
		initConfig.status = "sumbiting";
		initConfig.ajaxCountSubmit = 0;
		//遍历所有要校验的控件,如果存在ajaxValidator就先直接触发
		$.each(initConfig.validObjects,function()
		{
			if($(this).length==0){return true};
			if (this.settings[0].bind && this.validatorAjaxIndex!=undefined && this.onceValided == undefined) {
				returnObj = $.formValidator.oneIsValid(this.id);
				if (returnObj.ajax == this.validatorAjaxIndex) {
					initConfig.status = "sumbitingWithAjax";
					$.formValidator.ajaxValid(returnObj);
				}
			}
		});
		//如果有提交的时候有触发ajaxValidator，所有的处理都放在ajax里处理
		if(initConfig.ajaxCountSubmit > 0){return false}
		//遍历所有要校验的控件
		$.each(initConfig.validObjects,function()
		{
			//只校验绑定的控件
			if($(this).length==0){return true};
			if(this.settings[0].bind){
				name = this.name;
				//相同name只校验一次
				if (name_list.indexOf("^"+name+"^") == -1) {
					onceValided = this.onceValided == undefined ? false : this.onceValided;
					if(name){name_list = name_list + name + "^"};
					returnObj = $.formValidator.oneIsValid(this.id);
					if (returnObj) {
						//校验失败,获取第一个发生错误的信息和ID
						if (!returnObj.isValid) {
							//记录不含ajaxValidator校验函数的校验结果
							isValid = false;
							errorMessage = returnObj.errormsg == "" ? returnObj.setting.onError : returnObj.errormsg;
							errorlist[errorlist.length] = errorMessage;
							if (thefirstid == null) {thefirstid = returnObj.id};
							if(firstErrorMessage==""){firstErrorMessage=errorMessage};
						}
						//为了解决使用同个TIP提示问题:后面的成功或失败都不覆盖前面的失败
						if (initConfig.mode != "AlertTip") {
							var tipID = this.settings[0].tipID;
							if (error_tip.indexOf("^" + tipID + "^") == -1) {
								if (!returnObj.isValid) {error_tip = error_tip + tipID + "^"};
								$.formValidator.showMessage(returnObj);
							}
						}
						//如果是逐个校验的，且当前校验失败，就直接返回
						if(initConfig.oneByOneVerify && !returnObj.isValid){return false}
					}
				}
			}
		});
		
		//成功或失败进行回调函数的处理，以及成功后的灰掉提交按钮的功能
		if(isValid)
		{
            if(!initConfig.onSuccess()){return false};
			if(initConfig.submitOnce){$(":submit,:button,:reset").attr("disabled",true);}
		}
		else
		{
			initConfig.onError(firstErrorMessage, $("#" + thefirstid).get(0), errorlist);
			if (thefirstid && initConfig.errorFocus) {$("#" + thefirstid).focus()};
		}
		initConfig.status="init";
		if(isValid && initConfig.debug){alert("现在正处于调试模式(debug:true)，不能提交");}
		return !initConfig.debug && isValid;
	},
	
	//整个表单
	ajaxForm : function(validatorGroup,option,formid)
	{
		if(validatorGroup == undefined){validatorGroup = "1"};
		var setting = {};
		$.extend(true, setting, ajaxForm_setting, option || {});
		var initConfig = $("body").data(validatorGroup);	
		if(formid==undefined){
			formid = initConfig.formID;
			if(formid==""){alert('表单ID未传入');return false;};
		};
		if(!$.formValidator.pageIsValid(validatorGroup)){return false};
		var ls_url = setting.url;
		var ls_data = setting.data;
		var parm = $.formValidator.serialize('#'+formid);
		if(setting.type=="POST"){
			ls_data = ls_data + (ls_data != "" ? ("&" + parm) : parm)
		}else{
			ls_url = ls_url + (ls_url.indexOf("?") > -1 ? ("&" + parm) : ("?" + parm))
		}
        $.ajax(
		{	
			type : setting.type, 
			url : ls_url, 
			cache : setting.cache,
			data : ls_data, 
			async : setting.async, 
			timeout : setting.timeout, 
			dataType : setting.dataType, 
			beforeSend : function(jqXHR, configs){//再服务器没有返回数据之前，先回调提交按钮
				if(setting.buttons && setting.buttons.length > 0){setting.buttons.attr({"disabled":true})};
				return setting.beforeSend(jqXHR, configs);
			},
			success : function(data, textStatus, jqXHR){setting.success(data, textStatus, jqXHR);},
			complete : function(jqXHR, textStatus){
				if(setting.buttons && setting.buttons.length > 0){setting.buttons.attr({"disabled":false})};
				setting.complete(jqXHR, textStatus);
			},
			error : function(jqXHR, textStatus, errorThrown){setting.error(jqXHR, textStatus, errorThrown);}
		});
	},
	
	//把编码decodeURIComponent反转之后，再escape
	serialize : function(objs,initConfig)
	{
		if(initConfig!=undefined){$.formValidator.resetInputValue(true,initConfig)};
		var parmString = $(objs).serialize();
		if(initConfig!=undefined){$.formValidator.resetInputValue(false,initConfig)};
		var parmArray = parmString.split("&");
		var parmStringNew="";
		$.each(parmArray,function(index,data){
			var li_pos = data.indexOf("=");	
			if(li_pos >0){
				var name = data.substring(0,li_pos);
				var value = escape(decodeURIComponent(data.substr(li_pos+1)));
				var parm = name+"="+value;
				parmStringNew = parmStringNew=="" ? parm : parmStringNew + '&' + parm;
			}
		});
		return parmStringNew;
	},

	//ajax校验
	ajaxValid : function(e)
	{
		var id = e.id;
	    var srcjo = $("#"+id);
		var elem = srcjo.get(0);
		var initConfig = e.initConfig;
		var settings = elem.settings;
		var setting = settings[e.ajax];
		var ls_url = setting.url;
		var ls_data = setting.data;
		//获取要传递的参数
		var validatorGroup = elem.validatorGroup;
		var initConfig = $("body").data(validatorGroup);
		var parm = $.formValidator.serialize(initConfig.ajaxObjects);
		//添加触发的控件名、随机数、传递的参数
		parm = "clientid=" + id + "&" +(setting.randNumberName ? setting.randNumberName+"="+((new Date().getTime())+Math.round(Math.random() * 10000)) : "") + (parm.length > 0 ? "&" + parm : "");
		if(setting.type=="POST"){
			ls_data = ls_data + (ls_data != "" ? ("&" + parm) : parm)
		}else{
			ls_url = ls_url + (ls_url.indexOf("?") > -1 ? ("&" + parm) : ("?" + parm))
		}
		//发送ajax请求
		$.ajax(
		{	
			type : setting.type, 
			url : ls_url, 
			cache : setting.cache,
			data : ls_data, 
			async : setting.async, 
			timeout : setting.timeout, 
			dataType : setting.dataType, 
			success : function(data, textStatus, jqXHR){
				var lb_ret,ls_status,ls_msg,lb_isValid = false;
				$.formValidator.dealAjaxRequestCount(validatorGroup,-1);
				e.dom.onceValided = true;
				//根据业务判断设置显示信息
				lb_ret = setting.success(data, textStatus, jqXHR);
				if((typeof lb_ret)=="string")
				{
					ls_status = "onError";
					ls_msg = lb_ret;
				}
				else if(lb_ret){
					lb_isValid = true;
					ls_status = "onCorrect";
					ls_msg = settings[0].onCorrect;
				}else{
					ls_status = "onError";
					ls_msg = $.formValidator.getStatusText(elem,setting.onError);
				}
				setting.isValid = lb_isValid;
				$.formValidator.setTipState(elem,ls_status,ls_msg);
				//提交的时候触发了ajax校验，等ajax校验完成，无条件重新校验
				if(e.initConfig.status=="sumbitingWithAjax" && e.initConfig.ajaxCountSubmit == 0)
				{
					if (initConfig.formID != "") {
						$('#' + initConfig.formID).trigger('submit');
					}
				}
			},
			complete : function(jqXHR, textStatus){
				if(setting.buttons && setting.buttons.length > 0){setting.buttons.attr({"disabled":false})};
				setting.complete(jqXHR, textStatus);
			}, 
			beforeSend : function(jqXHR, configs){
				//本控件如果正在校验，就中断上次
				if (this.lastXMLHttpRequest) {this.lastXMLHttpRequest.abort()};
				this.lastXMLHttpRequest = jqXHR;
				//再服务器没有返回数据之前，先回调提交按钮
				if(setting.buttons && setting.buttons.length > 0){setting.buttons.attr({"disabled":true})};
				var lb_ret = setting.beforeSend(jqXHR,configs);
				var isValid = false;
				//无论是否成功都当做失败处理
				setting.isValid = false;
				if((typeof lb_ret)=="boolean" && lb_ret)
				{
					isValid = true;
					$.formValidator.setTipState(elem,"onLoad",settings[e.ajax].onWait);
				}else
				{
					isValid = false;
					$.formValidator.setTipState(elem,"onError",lb_ret);
				}
				setting.lastValid = "-1";
				if(isValid){$.formValidator.dealAjaxRequestCount(validatorGroup,1);}
				return isValid;
			}, 
			error : function(jqXHR, textStatus, errorThrown){
				$.formValidator.dealAjaxRequestCount(validatorGroup,-1);
			    $.formValidator.setTipState(elem,"onError",$.formValidator.getStatusText(elem,setting.onError));
			    setting.isValid = false;
				e.dom.onceValided = true;
				setting.error(jqXHR, textStatus, errorThrown);
			},
			processData : setting.processData 
		});
	},
	
	//处理ajax的请求个数
	dealAjaxRequestCount : function(validatorGroup,val)
	{
		var initConfig = $("body").data(validatorGroup);
		initConfig.ajaxCountValid = initConfig.ajaxCountValid + val;
		if (initConfig.status == "sumbitingWithAjax") {
			initConfig.ajaxCountSubmit = initConfig.ajaxCountSubmit + val;
		}
	},

	//对正则表达式进行校验（目前只针对input和textarea）
	regexValid : function(returnObj)
	{
		var id = returnObj.id;
		var setting = returnObj.setting;
		var srcTag = $("#"+id).get(0).tagName;
		var elem = $("#"+id).get(0);
		var isValid;
		//如果有输入正则表达式，就进行表达式校验
		if(elem.settings[0].empty && elem.value==""){
			setting.isValid = true;
		}
		else 
		{
			var regexArray = setting.regExp;
			setting.isValid = false;
			if((typeof regexArray)=="string") regexArray = [regexArray];
			$.each(regexArray, function() {
			    var r = this;
			    if(setting.dataType=="enum"){r = eval("regexEnum."+r);}			
			    if(r==undefined || r=="") 
			    {
			        return false;
			    }
			    isValid = (new RegExp(r, setting.param)).test($(elem).val());
			    
			    if(setting.compareType=="||" && isValid)
			    {
			        setting.isValid = true;
			        return false;
			    }
			    if(setting.compareType=="&&" && !isValid) 
			    {
			        return false
			    }
            });
            if(!setting.isValid) setting.isValid = isValid;
		}
	},
	
	//函数校验。返回true/false表示校验是否成功;返回字符串表示错误信息，校验失败;如果没有返回值表示处理函数，校验成功
	functionValid : function(returnObj)
	{
		var id = returnObj.id;
		var setting = returnObj.setting;
	    var srcjo = $("#"+id);
		var lb_ret = setting.fun(srcjo.val(),srcjo.get(0));
		if(lb_ret != undefined) 
		{
			if((typeof lb_ret) === "string"){
				setting.isValid = false;
				returnObj.errormsg = lb_ret;
			}else{
				setting.isValid = lb_ret;
			}
		}else{
		    setting.isValid = true;
		}
	},
	
	//对input和select类型控件进行校验
	inputValid : function(returnObj)
	{
		var id = returnObj.id;
		var setting = returnObj.setting;
		var srcjo = $("#"+id);
		var elem = srcjo.get(0);
		var val = srcjo.val();
		var sType = elem.type;
		var len = $.formValidator.getLength(id);
		var empty = setting.empty,emptyError = false;
		switch(sType)
		{
			case "text":
			case "hidden":
			case "password":
			case "textarea":
			case "file":
				if (setting.type == "size") {
					empty = setting.empty;
					if(!empty.leftEmpty){
						emptyError = (val.replace(/^[ \s]+/, '').length != val.length);
					}
					if(!emptyError && !empty.rightEmpty){
						emptyError = (val.replace(/[ \s]+$/, '').length != val.length);
					}
					if(emptyError && empty.emptyError){returnObj.errormsg= empty.emptyError}
				}
			case "checkbox":
			case "select-one":
			case "select-multiple":
			case "radio":
				var lb_go_on = false;
				if(sType=="select-one" || sType=="select-multiple"){setting.type = "size";}
				var type = setting.type;
				if (type == "size") {		//获得输入的字符长度，并进行校验
					if(!emptyError){lb_go_on = true}
					if(lb_go_on){val = len}
				}
				else if (type =="date" || type =="datetime")
				{
					var isok = false;
					if(type=="date"){lb_go_on = isDate(val)};
					if(type=="datetime"){lb_go_on = isDate(val)};
					if(lb_go_on){val = new Date(val);setting.min=new Date(setting.min);setting.max=new Date(setting.max);};
				}else{
					stype = (typeof setting.min);
					if(stype =="number")
					{
						val = (new Number(val)).valueOf();
						if(!isNaN(val)){lb_go_on = true;}
					}
					if(stype =="string"){lb_go_on = true;}
				}
				setting.isValid = false;
				if(lb_go_on)
				{
					if(val < setting.min || val > setting.max){
						if(val < setting.min && setting.onErrorMin){
							returnObj.errormsg= setting.onErrorMin;
						}
						if(val > setting.min && setting.onErrorMax){
							returnObj.errormsg= setting.onErrorMax;
						}
					}
					else{
						setting.isValid = true;
					}
				}
				break;
		}
	},
	
	//对两个控件进行比较校验
	compareValid : function(returnObj)
	{
		var id = returnObj.id;
		var setting = returnObj.setting;
		var srcjo = $("#"+id);
	    var desjo = $("#"+setting.desID );
		var ls_dataType = setting.dataType;
		
		curvalue = srcjo.val();
		ls_data = desjo.val();
		if(ls_dataType=="number")
        {
            if(!isNaN(curvalue) && !isNaN(ls_data)){
				curvalue = parseFloat(curvalue);
                ls_data = parseFloat(ls_data);
			}
			else{
			    return;
			}
        }
		if(ls_dataType=="date" || ls_dataType=="datetime")
		{
			var isok = false;
			if(ls_dataType=="date"){isok = (isDate(curvalue) && isDate(ls_data))};
			if(ls_dataType=="datetime"){isok = (isDateTime(curvalue) && isDateTime(ls_data))};
			if(isok){
				curvalue = new Date(curvalue);
				ls_data = new Date(ls_data)
			}
			else{
				return;
			}
		}
		
	    switch(setting.operateor)
	    {
	        case "=":
	            setting.isValid = (curvalue == ls_data);
	            break;
	        case "!=":
	            setting.isValid = (curvalue != ls_data);
	            break;
	        case ">":
	            setting.isValid = (curvalue > ls_data);
	            break;
	        case ">=":
	            setting.isValid = (curvalue >= ls_data);
	            break;
	        case "<": 
	            setting.isValid = (curvalue < ls_data);
	            break;
	        case "<=":
	            setting.isValid = (curvalue <= ls_data);
	            break;
			default :
				setting.isValid = false;
				break; 
	    }
	},
	
	//获取密码校验等级
	passwordValid : function(elem)
	{
	    var setting = elem.settings[elem.validatorPasswordIndex];
	    var pwd = elem.value;
	    //是否为连续字符
	    function isContinuousChar(str){
		    var str = str.toLowerCase();
		    var flag = 0;
		    for(var i=0;i<str.length;i++){
			    if(str.charCodeAt(i) != flag+1 && flag!=0)
				    return false;
			    else
				    flag = str.charCodeAt(i);
		    }
		    return true;
	    }
	    //是否字符都相同
	    function isSameChar(str){
		    var str = str.toLowerCase();
		    var flag = 0;
		    for(var i=0;i<str.length;i++){
			    if(str.charCodeAt(i) != flag && flag!=0)
				    return false;
			    else
				    flag = str.charCodeAt(i);
		    }
		    return true;
	    }
	    //获取标记所在的位置，用1表示
	    function getFlag(val,sum,index)
	    {
		    if(sum==undefined){sum=[0,0,0,0]}
		    if(index==undefined){index=-1};
		    index ++;
		    sum[index] = val % 2;
		    val = Math.floor(val / 2);
		    if(val==1 || val==0){sum[index+1] = val;return sum}
		    sum = getFlag(val,sum,index);
		    return sum;
	    }
    	
	    //判断密码各个位置的组成情况
        if(pwd==""){return 0};
	    if(setting.onErrorContinueChar!="" && isContinuousChar(pwd)){return -1};
	    if(setting.onErrorSameChar!="" && isSameChar(pwd)){return -2};
		if(setting.compareID!="" && $("#"+setting.compareID).val()==pwd){return -3};
	    var sum1 = [0, 0, 0, 0];
	    var specicalChars = "!,@,#,$,%,\^,&,*,?,_,~";
	    var len = pwd.length;
	    for (var i=0; i< len; i++) {
		    var c = pwd.charCodeAt(i);
		    if (c >=48 && c <=57){  //数字
			    sum1[0] += 1;
		    }else if (c >=97 && c <=122){ //小写字母
			    sum1[1] += 1;
		    }else if (c >=65 && c <=90){ //大写字母
			    sum1[2] += 1;
		    }else if(specicalChars.indexOf(pwd.substr(i,1))>=0){ //特殊字符
			    sum1[3] += 1; 
		    }
	    }
	    
	    //遍历json变量获取字符串
	    var returnLevel = 0;
	    var hasFind = true;
	    $.each(passwordStrengthRule,function(j,n){
		    var level = n.level;
		    var rules = n.rule;
		    $.each(rules,function(i,rule){
			    var index = 0;
			    //依次编译所有的、有配置(该位置==1)的节点
			    hasFind = true;
			    $.each(getFlag(rule.flag),function(k,value){
				    if(value==1){
					    val = rule.value[index++];
					    var val = val == 0 ? len : (val > len ? len : val);
					    if(sum1[k] < val){hasFind = false;return false;}
				    }
			    });
			    if(hasFind){returnLevel = level;return false;}
		    });
		    if(hasFind){returnLevel = level;}
	    });
	    return returnLevel;
	},
	
	//定位漂浮层
	localTooltip : function(e)
	{
		e = e || window.event;
		var mouseX = e.pageX || (e.clientX ? e.clientX + document.body.scrollLeft : 0);
		var mouseY = e.pageY || (e.clientY ? e.clientY + document.body.scrollTop : 0);
		$("#fvtt").css({"top":(mouseY+2)+"px","left":(mouseX-40)+"px"});
	},
	
	reloadAutoTip : function(validatorGroup)
	{
		if(validatorGroup == undefined) validatorGroup = "1";
		var initConfig = $("body").data(validatorGroup);
		$.each(initConfig.validObjects,function()
		{
			if(initConfig.mode == "AutoTip")
			{
				//获取层的ID、相对定位控件的ID和坐标
				var setting = this.settings[0];
				var relativeID = "#"+setting.relativeID;
				var offset = $(relativeID ).offset();
				var y = offset.top;
				var x = $(relativeID ).width() + offset.left;
				$("#"+setting.tipID).parent().show().css({left: x+"px", top: y+"px"});			
			}
		});
	},
	
	getStatusText : function(elem,obj)
	{
		return ($.isFunction(obj) ? obj($(elem).val()) : obj);
	},
	
	resetInputValue : function(real,initConfig,id)
	{
		var showTextObjects;
		if(id){
			showTextObjects = $("#"+id);
		}else{
			showTextObjects = $(initConfig.showTextObjects);
		}
		showTextObjects.each(function(index,elem){
			if(elem.isInputControl){
				var showText = elem.settings[0].onShowText;
				if(real && showText==elem.value){elem.value = ""};
				if(!real && showText!="" && elem.value == ""){elem.value = showText};
			}
		});
	}
};

//每个校验控件必须初始化的
$.fn.formValidator = function(cs) 
{
	cs = cs || {};
	var setting = {};

	//获取该校验组的全局配置信息
	if(cs.validatorGroup == undefined){cs.validatorGroup = "1"};
	
	//先合并整个配置(深度拷贝)
	$.extend(true,setting, formValidator_setting);
	
	var initConfig = $("body").data(cs.validatorGroup);
	
	//校验索引号，和总记录数
	initConfig.validCount += 1;
	
	//如果为精简模式，tipCss要重新设置初始值
	if(initConfig.mode == "SingleTip"){setting.tipCss = {left:10,top:1,width:22,height:22,display:"none"}};
	
	//弹出消息提示模式，自动修复错误
	if(initConfig.mode == "AlertTip"){setting.autoModify=true};
	
	//先合并整个配置(深度拷贝)
	$.extend(true,setting, cs || {});
	return this.each(function(e)
	{
		//记录该控件的校验顺序号和校验组号
		this.validatorIndex = initConfig.validCount - 1;
		this.validatorGroup = cs.validatorGroup;
		var jqobj = $(this);
		//自动形成TIP
		var setting_temp = {};
		$.extend(true,setting_temp, setting);
		//判断是否有ID
		var id = jqobj.attr('id');
		if(!id)
		{ 
			id = Math.ceil(Math.random()*50000000); 
			jqobj.attr('id', id);
		}
		var tip = setting_temp.tipID ? setting_temp.tipID : id+"Tip";
        
		if(initConfig.mode == "AutoTip" || initConfig.mode == "FixTip")
		{			
			var tipDiv = $("#"+tip);
			//获取层的ID、相对定位控件的ID和坐标
			if(initConfig.mode == "AutoTip" && tipDiv.length==0)
			{		
				var relativeID = setting_temp.relativeID ? setting_temp.relativeID : id;
				var offset = $("#"+relativeID ).offset();
				setting_temp.tipCss.top = offset.top + setting_temp.tipCss.top;
				setting_temp.tipCss.left = $("#"+relativeID ).width() + offset.left + setting_temp.tipCss.left;
				tipDiv = $("<div style='position:absolute;' id='"+tip+"'></div>").appendTo($("body"));
				tipDiv.css(setting_temp.tipCss);
				setting.relativeID = relativeID ;
			}
			tipDiv.css("margin","0px").css("padding","0px").css("background","transparent");
		}else if(initConfig.mode == "SingleTip"){
			jqobj.showTooltips();
		}
		
		//每个控件都要保存这个配置信息、为了取数方便，冗余一份控件总体配置到控件上
		setting.tipID = tip;
		setting.pwdTipID = setting_temp.pwdTipID ? setting_temp.pwdTipID : setting.tipID;
		setting.fixTipID = setting_temp.fixTipID ? setting_temp.fixTipID : id+"FixTip";
		$.formValidator.appendValid(id,setting);

		//保存控件ID
		var validIndex = $.inArray(jqobj,initConfig.validObjects);
		if(validIndex == -1)
		{
			if (setting_temp.ajax) {initConfig.ajaxObjects.push(this)}
			initConfig.validObjects.push(this);
		}else{
			initConfig.validObjects[validIndex] = this;
		}

		//初始化显示信息
		if(initConfig.mode != "AlertTip"){
			$.formValidator.setTipState(this,"onShow",setting.onShow);
		}

		var srcTag = this.tagName.toLowerCase();
		var stype = this.type;
		var defaultval = setting.defaultValue;
		var isInputControl = stype == "password" || stype == "text" || stype == "textarea";
		this.isInputControl = isInputControl;
		//处理默认值
		if(defaultval){
			jqobj.val(defaultval);
		}
		//固定提示内容
		var fixTip = $("#"+setting.fixTipID);
		var showFixText = setting.onShowFixText;
		if(fixTip.length==1 && onMouseOutFixTextHtml!="" && onMouseOnFixTextHtml!="" && showFixText != "")
		{
			jqobj.hover(
				function () {
					fixTip.html(onMouseOnFixTextHtml.replace(/\$data\$/g, showFixText));
				},
				function () {
					fixTip.html(onMouseOutFixTextHtml.replace(/\$data\$/g, showFixText));
				}
			);
			fixTip.css("padding","0px 0px 0px 0px").css("margin","0px 0px 0px 0px").html(onMouseOutFixTextHtml.replace(/\$data\$/g, setting.onShowFixText)); 
		}
		//获取输入框内的提示内容
        var showText = setting.onShowText;
		if(srcTag == "input" || srcTag=="textarea")
		{
			if (isInputControl) {
				if(showText !="" && jqobj.val() == ""){
					showObjs = initConfig.showTextObjects;
					initConfig.showTextObjects = showObjs + (showObjs != "" ? ",#" : "#") + id;
					jqobj.val(showText);
					jqobj.css("color",setting.onShowTextColor.mouseOutColor);
				}
			}
			//注册获得焦点的事件。改变提示对象的文字和样式，保存原值
			jqobj.focus(function()
			{	
				if (isInputControl) {
					var val = jqobj.val();
					this.validValueOld = val;
					if(showText==val){
						this.value = "";
						jqobj.css("color",setting.onShowTextColor.mouseOnColor);
					}
				};
				if(initConfig.mode != "AlertTip"){
					//保存原来的状态
					var tipjq = $("#"+tip);
					this.lastshowclass = tipjq.attr("class");
					this.lastshowmsg = tipjq.text();
					$.formValidator.setTipState(this,"onFocus",setting.onFocus);
				};
				if(this.validatorPasswordIndex > 0){$("#"+setting.pwdTipID).show();jqobj.trigger('keyup');}
			});
			//按键时候触发校验
		    jqobj.bind("keyup",function(){
		        if(this.validatorPasswordIndex > 0)
		        {
					try{
						var returnObj = $.formValidator.oneIsValid(id);
						var level = $.formValidator.passwordValid(this);
						if(level < 0){level=0};
						if(!returnObj.isValid){level = 0};
						$("#"+setting.pwdTipID).show();
						$("#"+setting.pwdTipID).html(passwordStrengthStatusHtml[level]);
					}catch(e)
					{
						alert("密码强度校验失败,错误原因:变量passwordStrengthStatusHtml语法错误或者为设置)");
					}
	            }
		    });
			//注册失去焦点的事件。进行校验，改变提示对象的文字和样式；出错就提示处理
			jqobj.bind(setting.triggerEvent, function(){
				var settings = this.settings;
				//根据配置截掉左右的空格
				if(settings[0].leftTrim){this.value = this.value.replace(/^\s*/g, "")}
				if(settings[0].rightTrim){this.value = this.value.replace(/\s*$/g, "")}
				//恢复默认值
				if(isInputControl){
					if(this.value == "" && showText != ""){this.value = showText}
					if(this.value == showText){jqobj.css("color",setting.onShowTextColor.mouseOutColor)}
				}
				//进行有效性校验
				var returnObj = $.formValidator.oneIsValid(id);
				if(returnObj==null){return}
				if(returnObj.ajax >= 0) 
				{
					$.formValidator.showAjaxMessage(returnObj);
				}
				else
				{
					var showmsg = $.formValidator.showMessage(returnObj);
					if(!returnObj.isValid)
					{
						//自动修正错误
						var auto = setting.autoModify && isInputControl;
						if(auto)
						{
							$(this).val(this.validValueOld);
							if(initConfig.mode != "AlertTip"){$.formValidator.setTipState(this,"onShow",$.formValidator.getStatusText(this,setting.onCorrect))};
						}
						else
						{
							if(initConfig.forceValid || setting.forceValid){
								intiConfig.onAlert(showmsg);this.focus();
							}
						}
					}
				}
			});
		} 
		else if (srcTag == "select")
		{
			jqobj.bind({
				//获得焦点
				focus: function(){	
					if (initConfig.mode != "AlertTip") {
						$.formValidator.setTipState(this, "onFocus", setting.onFocus)
					};
				},
				//失去焦点
				blur: function(){
					if(this.validValueOld==undefined || this.validValueOld==jqobj.val()){$(this).trigger("change")}
				},
				//选择项目后触发
				change: function(){
					var returnObj = $.formValidator.oneIsValid(id);	
					if(returnObj==null){return;}
					if ( returnObj.ajax >= 0){
						$.formValidator.showAjaxMessage(returnObj);
					}else{
						$.formValidator.showMessage(returnObj); 
					}
				}
			});
		}
	});
}; 

$.fn.inputValidator = function(controlOptions)
{
	var settings = {};
	$.extend(true, settings, inputValidator_setting, controlOptions || {});
	return this.each(function(){
		$.formValidator.appendValid(this.id,settings);
	});
};

$.fn.compareValidator = function(controlOptions)
{
	var settings = {};
	$.extend(true, settings, compareValidator_setting, controlOptions || {});
	return this.each(function(){
		$.formValidator.appendValid(this.id,settings);
	});
};

$.fn.regexValidator = function(controlOptions)
{
	var settings = {};
	$.extend(true, settings, regexValidator_setting, controlOptions || {});
	return this.each(function(){
		$.formValidator.appendValid(this.id,settings);
	});
};

$.fn.functionValidator = function(controlOptions)
{
	var settings = {};
	$.extend(true, settings, functionValidator_setting, controlOptions || {});
	return this.each(function(){
		$.formValidator.appendValid(this.id,settings);
	});
};

$.fn.ajaxValidator = function(controlOptions)
{
	var settings = {};
	$.extend(true, settings, ajaxValidator_setting, controlOptions || {});
	return this.each(function()
	{
		var initConfig = $("body").data(this.validatorGroup);
		if($.inArray(this,initConfig.ajaxObjects) == -1)
		{
			initConfig.ajaxObjects.push(this);
		}
		this.validatorAjaxIndex = $.formValidator.appendValid(this.id,settings);
	});
};

$.fn.passwordValidator = function(controlOptions)
{
	//默认配置
	var settings = {};
	$.extend(true, settings, passwordValidator_setting, controlOptions || {});
	return this.each(function()
	{
	    this.validatorPasswordIndex = $.formValidator.appendValid(this.id,settings);
	});
};

//指定控件显示通过或不通过样式
$.fn.defaultPassed = function(onShow)
{
	return this.each(function()
	{
		var settings = this.settings;
		settings[0].defaultPassed = true;
		this.onceValided = true;
		for ( var i = 1 ; i < settings.length ; i ++ )
		{   
			settings[i].isValid = true;
			if(!($("body").data(settings[0].validatorGroup).mode == "AlertTip")){
				this.lastshowclass = onShow ? "onShow" : "onCorrect";
				this.lastshowmsg = onShow ? settings[0].onShow : settings[0].onCorrect;
				$.formValidator.setTipState(this,this.lastshowclass, this.lastshowmsg);
			}
		}
	});
};

//指定控件不参加校验
$.fn.unFormValidator = function(unbind)
{
	return this.each(function()
	{
	    if(this.settings)
	    {
		    this.settings[0].bind = !unbind;
		    if(unbind){
			    $("#"+this.settings[0].tipID).hide();
		    }else{
			    $("#"+this.settings[0].tipID).show();
		    }
		}
	});
};

//显示漂浮显示层
$.fn.showTooltips = function()
{
	if($("body [id=fvtt]").length==0){
		fvtt = $("<div id='fvtt' style='position:absolute;z-index:56002'></div>");
		$("body").append(fvtt);
		fvtt.before("<iframe index=0 src='about:blank' class='fv_iframe' scrolling='no' frameborder='0'></iframe>");
		
	}
	return this.each(function()
	{
		jqobj = $(this);
		s = $("<span class='top' id=fv_content style='display:block'></span>");
		b = $("<b class='bottom' style='display:block' />");
		this.tooltip = $("<span class='fv_tooltip' style='display:block'></span>").append(s).append(b).css({"filter":"alpha(opacity:95)","KHTMLOpacity":"0.95","MozOpacity":"0.95","opacity":"0.95"});
		//注册事件
		jqobj.bind({
			mouseover : function(e){
				$("#fvtt").empty().append(this.tooltip).show();
				$("#fv_content").html(this.Tooltip);
				$.formValidator.localTooltip(e);
			},
			mouseout : function(){
				$("#fvtt").hide();
			},
			mousemove: function(e){
				$.formValidator.localTooltip(e);
			}
		});
	});
}
})(jQuery);

var initConfig_setting = 
{
	theme:"Default",
	validatorGroup : "1",						//分组号
	formID:"",					//表单ID
	submitOnce:false,							//页面是否提交一次，不会停留
	ajaxForm : null,       //如果不为null，表示整个表单ajax提交
	mode : "FixTip",			//显示模式
	errorFocus:true,			//第一个错误的控件获得焦点
	wideWord:true,				//一个汉字当做2个长
	forceValid:false,							//控件输入正确之后，才允许失去焦
	debug:false,								//调试模式点
	inIframe:false,
	onSuccess: function() {return true},		//提交成功后的回调函数
	onError: $.noop,						//提交失败的回调函数度
	onAlert: function() {alert(arguments[0])},
	status:"",					//提交的状态：submited、sumbiting、sumbitingWithAjax
	ajaxPrompt : "当前有数据正在进行服务器端校验，请稍候",	//控件失去焦点后，触发ajax校验，没有返回结果前的错误提示
	validCount:0,			//含ajaxValidator的控件个数
	ajaxCountSubmit:0,		//提交的时候触发的ajax验证个数
	ajaxCountValid:0,		//失去焦点时候触发的ajax验证个数
	validObjects:[],							//参加校验的控件集合
	ajaxObjects:[],							//传到服务器的控件列表
	showTextObjects:"",
	validateType : "initConfig",
	offsetChrome : {left:42,top:0},
	oneByOneVerify : false
};

var formValidator_setting = 
{
	validatorGroup : "1",
	onShowText : "",
	onShowTextColor:{mouseOnColor:"#000000",mouseOutColor:"#999999"},
	onShowFixText:"",
	onShow :"请输入内容",
	onFocus: "请输入内容",
	onCorrect: "输入正确",
	onEmpty: "输入内容为空",
	empty :false,
	autoModify : false,
	defaultValue : null,
	bind : true,
	ajax : false,
	validateType : "formValidator",
	tipCss : 
	{
		left:10,
		top:-4,
		height:20,
		width:280
	},
	triggerEvent:"blur",
	forceValid : false,
	tipID : null,
	pwdTipID : null,
	fixTipID : null,
	relativeID : null,
	index : 0,
	leftTrim : false,
	rightTrim : false
};

var inputValidator_setting = 
{
	isValid : false,
	type : "size",
	min : 0,
	max : 99999,
	onError:"输入错误",
	validateType:"inputValidator",
	empty:{leftEmpty:true,rightEmpty:true,leftEmptyError:null,rightEmptyError:null}
};

var compareValidator_setting = 
{
	isValid : false,
	desID : "",
	operateor :"=",
	onError:"输入错误",
	validateType:"compareValidator"
};

var regexValidator_setting = 
{
	isValid : false,
	regExp : "",
	param : "i",
	dataType : "string",
	compareType : "||",
	onError:"输入的格式不正确",
	validateType:"regexValidator"
};

var ajaxForm_setting = 
{
	type : "GET",
	url : window.location.href,
	dataType : "html",
	timeout : 100000,
	data : null,
	type : "GET",
	async : true,
	cache : false,
	buttons : null,
	beforeSend : function(){return true;},
	success : function(){return true;},
	complete : $.noop,
	processData : true,
	error : $.noop
};

var ajaxValidator_setting = 
{
	isValid : false,
	lastValid : "",
	oneceValid : false,
	randNumberName : "rand",
	onError:"服务器校验没有通过",
	onWait:"正在等待服务器返回数据",
	validateType:"ajaxValidator"
};
$.extend(true,ajaxValidator_setting,ajaxForm_setting);

var functionValidator_setting = 
{
	isValid : true,
	fun : function(){this.isValid = true;},
	validateType:"functionValidator",
	onError:"输入错误"
};

var passwordValidator_setting = {
	isValid : true,
	compareID : "",
	validateType:"passwordValidator",
	onErrorContinueChar:"密码字符为连续字符不被允许",
	onErrorSameChar:"密码字符都相同不被允许",
	onErrorCompareSame:"密码于用户名相同不被允许"
};

var fv_scriptSrc = document.getElementsByTagName('script')[document.getElementsByTagName('script').length - 1].src;