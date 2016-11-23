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
function _1(_2){
_2.each(function(){
$(this).remove();
if($.browser.msie){
this.outerHTML="";
}
});
};
function _3(_4,_5){
var _6=$.data(_4,"panel").options;
var _7=$.data(_4,"panel").panel;
var _8=_7.children("div.panel-header");
var _9=_7.children("div.panel-body");
if(_5){
if(_5.width){
_6.width=_5.width;
}
if(_5.height){
_6.height=_5.height;
}
if(_5.left!=null){
_6.left=_5.left;
}
if(_5.top!=null){
_6.top=_5.top;
}
}
if(_6.fit==true){
var p=_7.parent();
_6.width=p.width();
_6.height=p.height();
}
_7.css({left:_6.left,top:_6.top});
if(!isNaN(_6.width)){
if($.boxModel==true){
_7.width(_6.width-(_7.outerWidth()-_7.width()));
}else{
_7.width(_6.width);
}
}else{
_7.width("auto");
}
if($.boxModel==true){
_8.width(_7.width()-(_8.outerWidth()-_8.width()));
_9.width(_7.width()-(_9.outerWidth()-_9.width()));
}else{
_8.width(_7.width());
_9.width(_7.width());
}
if(!isNaN(_6.height)){
if($.boxModel==true){
_7.height(_6.height-(_7.outerHeight()-_7.height()));
_9.height(_7.height()-_8.outerHeight()-(_9.outerHeight()-_9.height()));
}else{
_7.height(_6.height);
_9.height(_7.height()-_8.outerHeight());
}
}else{
_9.height("auto");
}
_7.css("height","");
_6.onResize.apply(_4,[_6.width,_6.height]);
_7.find(">div.panel-body>div").triggerHandler("_resize");
};
function _a(_b,_c){
var _d=$.data(_b,"panel").options;
var _e=$.data(_b,"panel").panel;
if(_c){
if(_c.left!=null){
_d.left=_c.left;
}
if(_c.top!=null){
_d.top=_c.top;
}
}
_e.css({left:_d.left,top:_d.top});
_d.onMove.apply(_b,[_d.left,_d.top]);
};
function _f(_10){
var _11=$(_10).addClass("panel-body").wrap("<div class=\"panel\"></div>").parent();
_11.bind("_resize",function(){
var _12=$.data(_10,"panel").options;
if(_12.fit==true){
_3(_10);
}
return false;
});
return _11;
};
function _13(_14){
var _15=$.data(_14,"panel").options;
var _16=$.data(_14,"panel").panel;
_1(_16.find(">div.panel-header"));
if(_15.title&&!_15.noheader){
var _17=$("<div class=\"panel-header\"><div class=\"panel-title\">"+_15.title+"</div></div>").prependTo(_16);
if(_15.iconCls){
_17.find(".panel-title").addClass("panel-with-icon");
$("<div class=\"panel-icon\"></div>").addClass(_15.iconCls).appendTo(_17);
}
var _18=$("<div class=\"panel-tool\"></div>").appendTo(_17);
if(_15.closable){
$("<div class=\"panel-tool-close\"></div>").appendTo(_18).bind("click",_19);
}
if(_15.maximizable){
$("<div class=\"panel-tool-max\"></div>").appendTo(_18).bind("click",_1a);
}
if(_15.minimizable){
$("<div class=\"panel-tool-min\"></div>").appendTo(_18).bind("click",_1b);
}
if(_15.collapsible){
$("<div class=\"panel-tool-collapse\"></div>").appendTo(_18).bind("click",_1c);
}
if(_15.tools){
for(var i=_15.tools.length-1;i>=0;i--){
var t=$("<div></div>").addClass(_15.tools[i].iconCls).appendTo(_18);
if(_15.tools[i].handler){
t.bind("click",eval(_15.tools[i].handler));
}
}
}
_18.find("div").hover(function(){
$(this).addClass("panel-tool-over");
},function(){
$(this).removeClass("panel-tool-over");
});
_16.find(">div.panel-body").removeClass("panel-body-noheader");
}else{
_16.find(">div.panel-body").addClass("panel-body-noheader");
}
function _1c(){
if(_15.collapsed==true){
_3b(_14,true);
}else{
_2b(_14,true);
}
return false;
};
function _1b(){
_46(_14);
return false;
};
function _1a(){
if(_15.maximized==true){
_4a(_14);
}else{
_2a(_14);
}
return false;
};
function _19(){
_1d(_14);
return false;
};
};
function _1e(_1f){
var _20=$.data(_1f,"panel");
if(_20.options.href&&(!_20.isLoaded||!_20.options.cache)){
_20.isLoaded=false;
var _21=_20.panel.find(">div.panel-body");
_21.html($("<div class=\"panel-loading\"></div>").html(_20.options.loadingMessage));
$.ajax({url:_20.options.href,cache:false,success:function(_22){
_21.html(_22);
if($.parser){
$.parser.parse(_21);
}
_20.options.onLoad.apply(_1f,arguments);
_20.isLoaded=true;
}});
}
};
function _23(_24){
$(_24).find("div.panel:visible,div.accordion:visible,div.tabs-container:visible,div.layout:visible").each(function(){
$(this).triggerHandler("_resize",[true]);
});
};
function _25(_26,_27){
var _28=$.data(_26,"panel").options;
var _29=$.data(_26,"panel").panel;
if(_27!=true){
if(_28.onBeforeOpen.call(_26)==false){
return;
}
}
_29.show();
_28.closed=false;
_28.minimized=false;
_28.onOpen.call(_26);
if(_28.maximized==true){
_28.maximized=false;
_2a(_26);
}
if(_28.collapsed==true){
_28.collapsed=false;
_2b(_26);
}
if(!_28.collapsed){
_1e(_26);
_23(_26);
}
};
function _1d(_2c,_2d){
var _2e=$.data(_2c,"panel").options;
var _2f=$.data(_2c,"panel").panel;
if(_2d!=true){
if(_2e.onBeforeClose.call(_2c)==false){
return;
}
}
_2f.hide();
_2e.closed=true;
_2e.onClose.call(_2c);
};
function _30(_31,_32){
var _33=$.data(_31,"panel").options;
var _34=$.data(_31,"panel").panel;
if(_32!=true){
if(_33.onBeforeDestroy.call(_31)==false){
return;
}
}
_1(_34);
_33.onDestroy.call(_31);
};
function _2b(_35,_36){
var _37=$.data(_35,"panel").options;
var _38=$.data(_35,"panel").panel;
var _39=_38.children("div.panel-body");
var _3a=_38.children("div.panel-header").find("div.panel-tool-collapse");
if(_37.collapsed==true){
return;
}
_39.stop(true,true);
if(_37.onBeforeCollapse.call(_35)==false){
return;
}
_3a.addClass("panel-tool-expand");
if(_36==true){
_39.slideUp("normal",function(){
_37.collapsed=true;
_37.onCollapse.call(_35);
});
}else{
_39.hide();
_37.collapsed=true;
_37.onCollapse.call(_35);
}
};
function _3b(_3c,_3d){
var _3e=$.data(_3c,"panel").options;
var _3f=$.data(_3c,"panel").panel;
var _40=_3f.children("div.panel-body");
var _41=_3f.children("div.panel-header").find("div.panel-tool-collapse");
if(_3e.collapsed==false){
return;
}
_40.stop(true,true);
if(_3e.onBeforeExpand.call(_3c)==false){
return;
}
_41.removeClass("panel-tool-expand");
if(_3d==true){
_40.slideDown("normal",function(){
_3e.collapsed=false;
_3e.onExpand.call(_3c);
_1e(_3c);
_23(_3c);
});
}else{
_40.show();
_3e.collapsed=false;
_3e.onExpand.call(_3c);
_1e(_3c);
_23(_3c);
}
};
function _2a(_42){
var _43=$.data(_42,"panel").options;
var _44=$.data(_42,"panel").panel;
var _45=_44.children("div.panel-header").find("div.panel-tool-max");
if(_43.maximized==true){
return;
}
_45.addClass("panel-tool-restore");
$.data(_42,"panel").original={width:_43.width,height:_43.height,left:_43.left,top:_43.top,fit:_43.fit};
_43.left=0;
_43.top=0;
_43.fit=true;
_3(_42);
_43.minimized=false;
_43.maximized=true;
_43.onMaximize.call(_42);
};
function _46(_47){
var _48=$.data(_47,"panel").options;
var _49=$.data(_47,"panel").panel;
_49.hide();
_48.minimized=true;
_48.maximized=false;
_48.onMinimize.call(_47);
};
function _4a(_4b){
var _4c=$.data(_4b,"panel").options;
var _4d=$.data(_4b,"panel").panel;
var _4e=_4d.children("div.panel-header").find("div.panel-tool-max");
if(_4c.maximized==false){
return;
}
_4d.show();
_4e.removeClass("panel-tool-restore");
var _4f=$.data(_4b,"panel").original;
_4c.width=_4f.width;
_4c.height=_4f.height;
_4c.left=_4f.left;
_4c.top=_4f.top;
_4c.fit=_4f.fit;
_3(_4b);
_4c.minimized=false;
_4c.maximized=false;
_4c.onRestore.call(_4b);
};
function _50(_51){
var _52=$.data(_51,"panel").options;
var _53=$.data(_51,"panel").panel;
if(_52.border==true){
_53.children("div.panel-header").removeClass("panel-header-noborder");
_53.children("div.panel-body").removeClass("panel-body-noborder");
}else{
_53.children("div.panel-header").addClass("panel-header-noborder");
_53.children("div.panel-body").addClass("panel-body-noborder");
}
_53.css(_52.style);
_53.addClass(_52.cls);
_53.children("div.panel-header").addClass(_52.headerCls);
_53.children("div.panel-body").addClass(_52.bodyCls);
};
function _54(_55,_56){
$.data(_55,"panel").options.title=_56;
$(_55).panel("header").find("div.panel-title").html(_56);
};
var TO=false;
var _57=true;
$(window).unbind(".panel").bind("resize.panel",function(){
if(!_57){
return;
}
if(TO!==false){
clearTimeout(TO);
}
TO=setTimeout(function(){
_57=false;
var _58=$("body.layout");
if(_58.length){
_58.layout("resize");
}else{
$("body>div.panel").triggerHandler("_resize");
}
_57=true;
TO=false;
},200);
});
$.fn.panel=function(_59,_5a){
if(typeof _59=="string"){
return $.fn.panel.methods[_59](this,_5a);
}
_59=_59||{};
return this.each(function(){
var _5b=$.data(this,"panel");
var _5c;
if(_5b){
_5c=$.extend(_5b.options,_59);
}else{
_5c=$.extend({},$.fn.panel.defaults,$.fn.panel.parseOptions(this),_59);
$(this).attr("title","");
_5b=$.data(this,"panel",{options:_5c,panel:_f(this),isLoaded:false});
}
if(_5c.content){
$(this).html(_5c.content);
if($.parser){
$.parser.parse(this);
}
}
_13(this);
_50(this);
if(_5c.doSize==true){
_5b.panel.css("display","block");
_3(this);
}
if(_5c.closed==true||_5c.minimized==true){
_5b.panel.hide();
}else{
_25(this);
}
});
};
$.fn.panel.methods={options:function(jq){
return $.data(jq[0],"panel").options;
},panel:function(jq){
return $.data(jq[0],"panel").panel;
},header:function(jq){
return $.data(jq[0],"panel").panel.find(">div.panel-header");
},body:function(jq){
return $.data(jq[0],"panel").panel.find(">div.panel-body");
},setTitle:function(jq,_5d){
return jq.each(function(){
_54(this,_5d);
});
},open:function(jq,_5e){
return jq.each(function(){
_25(this,_5e);
});
},close:function(jq,_5f){
return jq.each(function(){
_1d(this,_5f);
});
},destroy:function(jq,_60){
return jq.each(function(){
_30(this,_60);
});
},refresh:function(jq,_61){
return jq.each(function(){
$.data(this,"panel").isLoaded=false;
if(_61){
$.data(this,"panel").options.href=_61;
}
_1e(this);
});
},resize:function(jq,_62){
return jq.each(function(){
_3(this,_62);
});
},move:function(jq,_63){
return jq.each(function(){
_a(this,_63);
});
},maximize:function(jq){
return jq.each(function(){
_2a(this);
});
},minimize:function(jq){
return jq.each(function(){
_46(this);
});
},restore:function(jq){
return jq.each(function(){
_4a(this);
});
},collapse:function(jq,_64){
return jq.each(function(){
_2b(this,_64);
});
},expand:function(jq,_65){
return jq.each(function(){
_3b(this,_65);
});
}};
$.fn.panel.parseOptions=function(_66){
var t=$(_66);
return {width:(parseInt(_66.style.width)||undefined),height:(parseInt(_66.style.height)||undefined),left:(parseInt(_66.style.left)||undefined),top:(parseInt(_66.style.top)||undefined),title:(t.attr("title")||undefined),iconCls:(t.attr("iconCls")||t.attr("icon")),cls:t.attr("cls"),headerCls:t.attr("headerCls"),bodyCls:t.attr("bodyCls"),href:t.attr("href"),cache:(t.attr("cache")?t.attr("cache")=="true":undefined),fit:(t.attr("fit")?t.attr("fit")=="true":undefined),border:(t.attr("border")?t.attr("border")=="true":undefined),noheader:(t.attr("noheader")?t.attr("noheader")=="true":undefined),collapsible:(t.attr("collapsible")?t.attr("collapsible")=="true":undefined),minimizable:(t.attr("minimizable")?t.attr("minimizable")=="true":undefined),maximizable:(t.attr("maximizable")?t.attr("maximizable")=="true":undefined),closable:(t.attr("closable")?t.attr("closable")=="true":undefined),collapsed:(t.attr("collapsed")?t.attr("collapsed")=="true":undefined),minimized:(t.attr("minimized")?t.attr("minimized")=="true":undefined),maximized:(t.attr("maximized")?t.attr("maximized")=="true":undefined),closed:(t.attr("closed")?t.attr("closed")=="true":undefined)};
};
$.fn.panel.defaults={title:null,iconCls:null,width:"auto",height:"auto",left:null,top:null,cls:null,headerCls:null,bodyCls:null,style:{},href:null,cache:true,fit:false,border:true,doSize:true,noheader:false,content:null,collapsible:false,minimizable:false,maximizable:false,closable:false,collapsed:false,minimized:false,maximized:false,closed:false,tools:[],href:null,loadingMessage:"Loading...",onLoad:function(){
},onBeforeOpen:function(){
},onOpen:function(){
},onBeforeClose:function(){
},onClose:function(){
},onBeforeDestroy:function(){
},onDestroy:function(){
},onResize:function(_67,_68){
},onMove:function(_69,top){
},onMaximize:function(){
},onRestore:function(){
},onMinimize:function(){
},onBeforeCollapse:function(){
},onBeforeExpand:function(){
},onCollapse:function(){
},onExpand:function(){
}};
})(jQuery);

