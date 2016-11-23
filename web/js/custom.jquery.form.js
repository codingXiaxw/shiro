var pathName = window.location.pathname.substring(1); 
var webName = pathName == '' ? '' : pathName.substring(0, pathName.indexOf('/')); 
var BaseUrl= window.location.protocol + '//' + window.location.host + '/'+ webName + '/'; 

/*
*jquery预读方法
*/
jQuery(document).ready(function(){
	loadingReady();
}); 
function loading(){
	$("body").append('<div  id="load" style="width:100%;position:absolute;top:250px;text-align:center;"><img src="'+BaseUrl+'images/loading2.gif" /></div>');
}
function removeLoading(){
	$("#load").remove();
}
function loadingReady(){
	jQuery("body").ajaxSend(function(request,settings,uu){
		loading();
	});
	jQuery("body").ajaxComplete(function(request, settings){
		removeLoading();
	
	});
	jQuery("body").ajaxError(function(request, settings){
		removeLoading();
	});
}
/*
*form提交(post方式)
*
*formname form Name
*callbackfn 回调函数名(要求函数必须有参数且不能多与两个,一个参数时参数为响应文本,两个参数时第一个参数为响应文本)
*param 回调函数参数(如果为null,那么调用一个参数的回调函数,否则调用两个参数的回调函数)
*/
function jquerySubByFName(formName,callbackFn,param){
	var formObj = jQuery("form[@name=" + formName + "]");
	var options = {success: function(responseText) {
		if(param === null){
			callbackFn(responseText);
		}else{
			callbackFn(responseText,param);
		}
	}}; 
	formObj.ajaxSubmit(options); 
}
/*
*form提交(post方式)
*
*formId form Id
*callbackfn 回调函数名(要求函数必须有参数且不能多与两个,一个参数时参数为响应文本,两个参数时第一个参数为响应文本)
*param 回调函数参数(如果为null,那么调用一个参数的回调函数,否则调用两个参数的回调函数)
*/
function jquerySubByFId(formId,callbackFn,param,dataType){
	var formObj = jQuery("#" + formId);
	var options = {
            dataType:  ("undefined"!=dataType && null!=dataType)?dataType:"json",
			success: function(responseText) {
				if(param === null){
					callbackFn(responseText);
				}else{
					callbackFn(responseText,param);
				}
			}
	};
	formObj.ajaxSubmit(options); 
}
