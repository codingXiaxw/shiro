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
function _1(_2,_3){
var _4=$.data(_2,"window").options;
if(_3){
if(_3.width){
_4.width=_3.width;
}
if(_3.height){
_4.height=_3.height;
}
if(_3.left!=null){
_4.left=_3.left;
}
if(_3.top!=null){
_4.top=_3.top;
}
}
$(_2).panel("resize",_4);
};
function _5(_6,_7){
var _8=$.data(_6,"window");
if(_7){
if(_7.left!=null){
_8.options.left=_7.left;
}
if(_7.top!=null){
_8.options.top=_7.top;
}
}
$(_6).panel("move",_8.options);
if(_8.shadow){
_8.shadow.css({left:_8.options.left,top:_8.options.top});
}
};
function _9(_a){
var _b=$.data(_a,"window");
var _c=$(_a).panel($.extend({},_b.options,{border:false,doSize:true,closed:true,cls:"window",headerCls:"window-header",bodyCls:"window-body",onBeforeDestroy:function(){
if(_b.options.onBeforeDestroy.call(_a)==false){
return false;
}
if(_b.shadow){
_b.shadow.remove();
}
if(_b.mask){
_b.mask.remove();
}
},onClose:function(){
if(_b.shadow){
_b.shadow.hide();
}
if(_b.mask){
_b.mask.hide();
}
_b.options.onClose.call(_a);
},onOpen:function(){
if(_b.mask){
_b.mask.css({display:"block",zIndex:$.fn.window.defaults.zIndex++});
}
if(_b.shadow){
_b.shadow.css({display:"block",zIndex:$.fn.window.defaults.zIndex++,left:_b.options.left,top:_b.options.top,width:_b.window.outerWidth(),height:_b.window.outerHeight()});
}
_b.window.css("z-index",$.fn.window.defaults.zIndex++);
_b.options.onOpen.call(_a);
},onResize:function(_d,_e){
var _f=$(_a).panel("options");
_b.options.width=_f.width;
_b.options.height=_f.height;
_b.options.left=_f.left;
_b.options.top=_f.top;
if(_b.shadow){
_b.shadow.css({left:_b.options.left,top:_b.options.top,width:_b.window.outerWidth(),height:_b.window.outerHeight()});
}
_b.options.onResize.call(_a,_d,_e);
},onMinimize:function(){
if(_b.shadow){
_b.shadow.hide();
}
if(_b.mask){
_b.mask.hide();
}
_b.options.onMinimize.call(_a);
},onBeforeCollapse:function(){
if(_b.options.onBeforeCollapse.call(_a)==false){
return false;
}
if(_b.shadow){
_b.shadow.hide();
}
},onExpand:function(){
if(_b.shadow){
_b.shadow.show();
}
_b.options.onExpand.call(_a);
}}));
_b.window=_c.panel("panel");
if(_b.mask){
_b.mask.remove();
}
if(_b.options.modal==true){
_b.mask=$("<div class=\"window-mask\"></div>").insertAfter(_b.window);
_b.mask.css({width:(_b.options.inline?_b.mask.parent().width():_10().width),height:(_b.options.inline?_b.mask.parent().height():_10().height),display:"none"});
}
if(_b.shadow){
_b.shadow.remove();
}
if(_b.options.shadow==true){
_b.shadow=$("<div class=\"window-shadow\"></div>").insertAfter(_b.window);
_b.shadow.css({display:"none"});
}
if(_b.options.left==null){
var _11=_b.options.width;
if(isNaN(_11)){
_11=_b.window.outerWidth();
}
if(_b.options.inline){
var _12=_b.window.parent();
_b.options.left=(_12.width()-_11)/2+_12.scrollLeft();
}else{
_b.options.left=($(window).width()-_11)/2+$(document).scrollLeft();
}
}
if(_b.options.top==null){
var _13=_b.window.height;
if(isNaN(_13)){
_13=_b.window.outerHeight();
}
if(_b.options.inline){
var _12=_b.window.parent();
_b.options.top=(_12.height()-_13)/2+_12.scrollTop();
}else{
_b.options.top=($(window).height()-_13)/2+$(document).scrollTop();
}
}
_5(_a);
if(_b.options.closed==false){
_c.window("open");
}
};
function _14(_15){
var _16=$.data(_15,"window");
_16.window.draggable({handle:">div.panel-header>div.panel-title",disabled:_16.options.draggable==false,onStartDrag:function(e){
if(_16.mask){
_16.mask.css("z-index",$.fn.window.defaults.zIndex++);
}
if(_16.shadow){
_16.shadow.css("z-index",$.fn.window.defaults.zIndex++);
}
_16.window.css("z-index",$.fn.window.defaults.zIndex++);
if(!_16.proxy){
_16.proxy=$("<div class=\"window-proxy\"></div>").insertAfter(_16.window);
}
_16.proxy.css({display:"none",zIndex:$.fn.window.defaults.zIndex++,left:e.data.left,top:e.data.top,width:($.boxModel==true?(_16.window.outerWidth()-(_16.proxy.outerWidth()-_16.proxy.width())):_16.window.outerWidth()),height:($.boxModel==true?(_16.window.outerHeight()-(_16.proxy.outerHeight()-_16.proxy.height())):_16.window.outerHeight())});
setTimeout(function(){
if(_16.proxy){
_16.proxy.show();
}
},500);
},onDrag:function(e){
_16.proxy.css({display:"block",left:e.data.left,top:e.data.top});
return false;
},onStopDrag:function(e){
_16.options.left=e.data.left;
_16.options.top=e.data.top;
$(_15).window("move");
_16.proxy.remove();
_16.proxy=null;
}});
_16.window.resizable({disabled:_16.options.resizable==false,onStartResize:function(e){
if(!_16.proxy){
_16.proxy=$("<div class=\"window-proxy\"></div>").insertAfter(_16.window);
}
_16.proxy.css({zIndex:$.fn.window.defaults.zIndex++,left:e.data.left,top:e.data.top,width:($.boxModel==true?(e.data.width-(_16.proxy.outerWidth()-_16.proxy.width())):e.data.width),height:($.boxModel==true?(e.data.height-(_16.proxy.outerHeight()-_16.proxy.height())):e.data.height)});
},onResize:function(e){
_16.proxy.css({left:e.data.left,top:e.data.top,width:($.boxModel==true?(e.data.width-(_16.proxy.outerWidth()-_16.proxy.width())):e.data.width),height:($.boxModel==true?(e.data.height-(_16.proxy.outerHeight()-_16.proxy.height())):e.data.height)});
return false;
},onStopResize:function(e){
_16.options.left=e.data.left;
_16.options.top=e.data.top;
_16.options.width=e.data.width;
_16.options.height=e.data.height;
_1(_15);
_16.proxy.remove();
_16.proxy=null;
}});
};
function _10(){
if(document.compatMode=="BackCompat"){
return {width:Math.max(document.body.scrollWidth,document.body.clientWidth),height:Math.max(document.body.scrollHeight,document.body.clientHeight)};
}else{
return {width:Math.max(document.documentElement.scrollWidth,document.documentElement.clientWidth),height:Math.max(document.documentElement.scrollHeight,document.documentElement.clientHeight)};
}
};
$(window).resize(function(){
$("body>div.window-mask").css({width:$(window).width(),height:$(window).height()});
setTimeout(function(){
$("body>div.window-mask").css({width:_10().width,height:_10().height});
},50);
});
$.fn.window=function(_17,_18){
if(typeof _17=="string"){
var _19=$.fn.window.methods[_17];
if(_19){
return _19(this,_18);
}else{
return this.panel(_17,_18);
}
}
_17=_17||{};
return this.each(function(){
var _1a=$.data(this,"window");
if(_1a){
$.extend(_1a.options,_17);
}else{
_1a=$.data(this,"window",{options:$.extend({},$.fn.window.defaults,$.fn.window.parseOptions(this),_17)});
if(!_1a.options.inline){
$(this).appendTo("body");
}
}
_9(this);
_14(this);
});
};
$.fn.window.methods={options:function(jq){
var _1b=jq.panel("options");
var _1c=$.data(jq[0],"window").options;
return $.extend(_1c,{closed:_1b.closed,collapsed:_1b.collapsed,minimized:_1b.minimized,maximized:_1b.maximized});
},window:function(jq){
return $.data(jq[0],"window").window;
},resize:function(jq,_1d){
return jq.each(function(){
_1(this,_1d);
});
},move:function(jq,_1e){
return jq.each(function(){
_5(this,_1e);
});
}};
$.fn.window.parseOptions=function(_1f){
var t=$(_1f);
return $.extend({},$.fn.panel.parseOptions(_1f),{draggable:(t.attr("draggable")?t.attr("draggable")=="true":undefined),resizable:(t.attr("resizable")?t.attr("resizable")=="true":undefined),shadow:(t.attr("shadow")?t.attr("shadow")=="true":undefined),modal:(t.attr("modal")?t.attr("modal")=="true":undefined),inline:(t.attr("inline")?t.attr("inline")=="true":undefined)});
};
$.fn.window.defaults=$.extend({},$.fn.panel.defaults,{zIndex:9000,draggable:true,resizable:true,shadow:true,modal:false,inline:false,title:"New Window",collapsible:true,minimizable:true,maximizable:true,closable:true,closed:false});
})(jQuery);

