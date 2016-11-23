/**
 * jQuery EasyUI 1.2.2
 * 
 * Licensed under the GPL:
 *   http://www.gnu.org/licenses/gpl.txt
 *
 * Copyright 2010 stworthy [ stworthy@gmail.com ] 
 * 
 */
(function($){
function _1(el,_2,_3,_4){
var _5=$(el).window("window");
if(!_5){
return;
}
switch(_2){
case null:
_5.show();
break;
case "slide":
_5.slideDown(_3);
break;
case "fade":
_5.fadeIn(_3);
break;
case "show":
_5.show(_3);
break;
}
var _6=null;
if(_4>0){
_6=setTimeout(function(){
_7(el,_2,_3);
},_4);
}
_5.hover(function(){
if(_6){
clearTimeout(_6);
}
},function(){
if(_4>0){
_6=setTimeout(function(){
_7(el,_2,_3);
},_4);
}
});
};
function _7(el,_8,_9){
if(el.locked==true){
return;
}
el.locked=true;
var _a=$(el).window("window");
if(!_a){
return;
}
switch(_8){
case null:
_a.hide();
break;
case "slide":
_a.slideUp(_9);
break;
case "fade":
_a.fadeOut(_9);
break;
case "show":
_a.hide(_9);
break;
}
setTimeout(function(){
$(el).window("destroy");
},_9);
};
function _b(_c,_d,_e){
var _f=$("<div class=\"messager-body\"></div>").appendTo("body");
_f.append(_d);
if(_e){
var tb=$("<div class=\"messager-button\"></div>").appendTo(_f);
for(var _10 in _e){
$("<a></a>").attr("href","javascript:void(0)").text(_10).css("margin-left",10).bind("click",eval(_e[_10])).appendTo(tb).linkbutton();
}
}
_f.window({title:_c,width:300,height:"auto",modal:true,collapsible:false,minimizable:false,maximizable:false,resizable:false,onClose:function(){
setTimeout(function(){
_f.window("destroy");
},100);
}});
return _f;
};
$.messager={show:function(_11){
var _12=$.extend({showType:"slide",showSpeed:600,width:250,height:100,msg:"",title:"",timeout:4000},_11||{});
var win=$("<div class=\"messager-body\"></div>").html(_12.msg).appendTo("body");
win.window({title:_12.title,width:_12.width,height:_12.height,collapsible:false,minimizable:false,maximizable:false,shadow:false,draggable:false,resizable:false,closed:true,onBeforeOpen:function(){
_1(this,_12.showType,_12.showSpeed,_12.timeout);
return false;
},onBeforeClose:function(){
_7(this,_12.showType,_12.showSpeed);
return false;
}});
win.window("window").css({left:"",top:"",right:0,zIndex:$.fn.window.defaults.zIndex++,bottom:-document.body.scrollTop-document.documentElement.scrollTop});
win.window("open");
},alert:function(_13,msg,_14,fn){
var _15="<div>"+msg+"</div>";
switch(_14){
case "error":
_15="<div class=\"messager-icon messager-error\"></div>"+_15;
break;
case "info":
_15="<div class=\"messager-icon messager-info\"></div>"+_15;
break;
case "question":
_15="<div class=\"messager-icon messager-question\"></div>"+_15;
break;
case "warning":
_15="<div class=\"messager-icon messager-warning\"></div>"+_15;
break;
}
_15+="<div style=\"clear:both;\"/>";
var _16={};
_16[$.messager.defaults.ok]=function(){
win.dialog({closed:true});
if(fn){
fn();
return false;
}
};
_16[$.messager.defaults.ok]=function(){
win.window("close");
if(fn){
fn();
return false;
}
};
var win=_b(_13,_15,_16);
},confirm:function(_17,msg,fn){
var _18="<div class=\"messager-icon messager-question\"></div>"+"<div>"+msg+"</div>"+"<div style=\"clear:both;\"/>";
var _19={};
_19[$.messager.defaults.ok]=function(){
win.window("close");
if(fn){
fn(true);
return false;
}
};
_19[$.messager.defaults.cancel]=function(){
win.window("close");
if(fn){
fn(false);
return false;
}
};
var win=_b(_17,_18,_19);
},prompt:function(_1a,msg,fn){
var _1b="<div class=\"messager-icon messager-question\"></div>"+"<div>"+msg+"</div>"+"<br/>"+"<input class=\"messager-input\" type=\"text\"/>"+"<div style=\"clear:both;\"/>";
var _1c={};
_1c[$.messager.defaults.ok]=function(){
win.window("close");
if(fn){
fn($(".messager-input",win).val());
return false;
}
};
_1c[$.messager.defaults.cancel]=function(){
win.window("close");
if(fn){
fn();
return false;
}
};
var win=_b(_1a,_1b,_1c);
}};
$.messager.defaults={ok:"Ok",cancel:"Cancel"};
})(jQuery);

