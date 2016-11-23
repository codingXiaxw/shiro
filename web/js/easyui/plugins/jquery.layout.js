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
var _1=false;
function _2(_3){
var _4=$.data(_3,"layout").options;
var _5=$.data(_3,"layout").panels;
var cc=$(_3);
if(_4.fit==true){
var p=cc.parent();
cc.width(p.width()).height(p.height());
}
var _6={top:0,left:0,width:cc.width(),height:cc.height()};
function _7(pp){
if(pp.length==0){
return;
}
pp.panel("resize",{width:cc.width(),height:pp.panel("options").height,left:0,top:0});
_6.top+=pp.panel("options").height;
_6.height-=pp.panel("options").height;
};
if(_b(_5.expandNorth)){
_7(_5.expandNorth);
}else{
_7(_5.north);
}
function _8(pp){
if(pp.length==0){
return;
}
pp.panel("resize",{width:cc.width(),height:pp.panel("options").height,left:0,top:cc.height()-pp.panel("options").height});
_6.height-=pp.panel("options").height;
};
if(_b(_5.expandSouth)){
_8(_5.expandSouth);
}else{
_8(_5.south);
}
function _9(pp){
if(pp.length==0){
return;
}
pp.panel("resize",{width:pp.panel("options").width,height:_6.height,left:cc.width()-pp.panel("options").width,top:_6.top});
_6.width-=pp.panel("options").width;
};
if(_b(_5.expandEast)){
_9(_5.expandEast);
}else{
_9(_5.east);
}
function _a(pp){
if(pp.length==0){
return;
}
pp.panel("resize",{width:pp.panel("options").width,height:_6.height,left:0,top:_6.top});
_6.left+=pp.panel("options").width;
_6.width-=pp.panel("options").width;
};
if(_b(_5.expandWest)){
_a(_5.expandWest);
}else{
_a(_5.west);
}
_5.center.panel("resize",_6);
};
function _c(_d){
var cc=$(_d);
if(cc[0].tagName=="BODY"){
$("html").css({height:"100%",overflow:"hidden"});
$("body").css({height:"100%",overflow:"hidden",border:"none"});
}
cc.addClass("layout");
cc.css({margin:0,padding:0});
function _e(_f){
var pp=$(">div[region="+_f+"]",_d).addClass("layout-body");
var _10=null;
if(_f=="north"){
_10="layout-button-up";
}else{
if(_f=="south"){
_10="layout-button-down";
}else{
if(_f=="east"){
_10="layout-button-right";
}else{
if(_f=="west"){
_10="layout-button-left";
}
}
}
}
var cls="layout-panel layout-panel-"+_f;
if(pp.attr("split")=="true"){
cls+=" layout-split-"+_f;
}
pp.panel({cls:cls,doSize:false,border:(pp.attr("border")=="false"?false:true),width:(pp.length?parseInt(pp[0].style.width)||pp.outerWidth():"auto"),height:(pp.length?parseInt(pp[0].style.height)||pp.outerHeight():"auto"),tools:[{iconCls:_10,handler:function(){
_1c(_d,_f);
}}]});
if(pp.attr("split")=="true"){
var _11=pp.panel("panel");
var _12="";
if(_f=="north"){
_12="s";
}
if(_f=="south"){
_12="n";
}
if(_f=="east"){
_12="w";
}
if(_f=="west"){
_12="e";
}
_11.resizable({handles:_12,onStartResize:function(e){
_1=true;
if(_f=="north"||_f=="south"){
var _13=$(">div.layout-split-proxy-v",_d);
}else{
var _13=$(">div.layout-split-proxy-h",_d);
}
var top=0,_14=0,_15=0,_16=0;
var pos={display:"block"};
if(_f=="north"){
pos.top=parseInt(_11.css("top"))+_11.outerHeight()-_13.height();
pos.left=parseInt(_11.css("left"));
pos.width=_11.outerWidth();
pos.height=_13.height();
}else{
if(_f=="south"){
pos.top=parseInt(_11.css("top"));
pos.left=parseInt(_11.css("left"));
pos.width=_11.outerWidth();
pos.height=_13.height();
}else{
if(_f=="east"){
pos.top=parseInt(_11.css("top"))||0;
pos.left=parseInt(_11.css("left"))||0;
pos.width=_13.width();
pos.height=_11.outerHeight();
}else{
if(_f=="west"){
pos.top=parseInt(_11.css("top"))||0;
pos.left=_11.outerWidth()-_13.width();
pos.width=_13.width();
pos.height=_11.outerHeight();
}
}
}
}
_13.css(pos);
$("<div class=\"layout-mask\"></div>").css({left:0,top:0,width:cc.width(),height:cc.height()}).appendTo(cc);
},onResize:function(e){
if(_f=="north"||_f=="south"){
var _17=$(">div.layout-split-proxy-v",_d);
_17.css("top",e.pageY-$(_d).offset().top-_17.height()/2);
}else{
var _17=$(">div.layout-split-proxy-h",_d);
_17.css("left",e.pageX-$(_d).offset().left-_17.width()/2);
}
return false;
},onStopResize:function(){
$(">div.layout-split-proxy-v",_d).css("display","none");
$(">div.layout-split-proxy-h",_d).css("display","none");
var _18=pp.panel("options");
_18.width=_11.outerWidth();
_18.height=_11.outerHeight();
_18.left=_11.css("left");
_18.top=_11.css("top");
pp.panel("resize");
_2(_d);
_1=false;
cc.find(">div.layout-mask").remove();
}});
}
return pp;
};
$("<div class=\"layout-split-proxy-h\"></div>").appendTo(cc);
$("<div class=\"layout-split-proxy-v\"></div>").appendTo(cc);
var _19={center:_e("center")};
_19.north=_e("north");
_19.south=_e("south");
_19.east=_e("east");
_19.west=_e("west");
$(_d).bind("_resize",function(e,_1a){
var _1b=$.data(_d,"layout").options;
if(_1b.fit==true||_1a){
_2(_d);
}
return false;
});
return _19;
};
function _1c(_1d,_1e){
var _1f=$.data(_1d,"layout").panels;
var cc=$(_1d);
function _20(dir){
var _21;
if(dir=="east"){
_21="layout-button-left";
}else{
if(dir=="west"){
_21="layout-button-right";
}else{
if(dir=="north"){
_21="layout-button-down";
}else{
if(dir=="south"){
_21="layout-button-up";
}
}
}
}
var p=$("<div></div>").appendTo(cc).panel({cls:"layout-expand",title:"&nbsp;",closed:true,doSize:false,tools:[{iconCls:_21,handler:function(){
_22(_1d,_1e);
}}]});
p.panel("panel").hover(function(){
$(this).addClass("layout-expand-over");
},function(){
$(this).removeClass("layout-expand-over");
});
return p;
};
if(_1e=="east"){
if(_1f.east.panel("options").onBeforeCollapse.call(_1f.east)==false){
return;
}
_1f.center.panel("resize",{width:_1f.center.panel("options").width+_1f.east.panel("options").width-28});
_1f.east.panel("panel").animate({left:cc.width()},function(){
_1f.east.panel("close");
_1f.expandEast.panel("open").panel("resize",{top:_1f.east.panel("options").top,left:cc.width()-28,width:28,height:_1f.east.panel("options").height});
_1f.east.panel("options").onCollapse.call(_1f.east);
});
if(!_1f.expandEast){
_1f.expandEast=_20("east");
_1f.expandEast.panel("panel").click(function(){
_1f.east.panel("open").panel("resize",{left:cc.width()});
_1f.east.panel("panel").animate({left:cc.width()-_1f.east.panel("options").width});
return false;
});
}
}else{
if(_1e=="west"){
if(_1f.west.panel("options").onBeforeCollapse.call(_1f.west)==false){
return;
}
_1f.center.panel("resize",{width:_1f.center.panel("options").width+_1f.west.panel("options").width-28,left:28});
_1f.west.panel("panel").animate({left:-_1f.west.panel("options").width},function(){
_1f.west.panel("close");
_1f.expandWest.panel("open").panel("resize",{top:_1f.west.panel("options").top,left:0,width:28,height:_1f.west.panel("options").height});
_1f.west.panel("options").onCollapse.call(_1f.west);
});
if(!_1f.expandWest){
_1f.expandWest=_20("west");
_1f.expandWest.panel("panel").click(function(){
_1f.west.panel("open").panel("resize",{left:-_1f.west.panel("options").width});
_1f.west.panel("panel").animate({left:0});
return false;
});
}
}else{
if(_1e=="north"){
if(_1f.north.panel("options").onBeforeCollapse.call(_1f.north)==false){
return;
}
var hh=cc.height()-28;
if(_b(_1f.expandSouth)){
hh-=_1f.expandSouth.panel("options").height;
}else{
if(_b(_1f.south)){
hh-=_1f.south.panel("options").height;
}
}
_1f.center.panel("resize",{top:28,height:hh});
_1f.east.panel("resize",{top:28,height:hh});
_1f.west.panel("resize",{top:28,height:hh});
if(_b(_1f.expandEast)){
_1f.expandEast.panel("resize",{top:28,height:hh});
}
if(_b(_1f.expandWest)){
_1f.expandWest.panel("resize",{top:28,height:hh});
}
_1f.north.panel("panel").animate({top:-_1f.north.panel("options").height},function(){
_1f.north.panel("close");
_1f.expandNorth.panel("open").panel("resize",{top:0,left:0,width:cc.width(),height:28});
_1f.north.panel("options").onCollapse.call(_1f.north);
});
if(!_1f.expandNorth){
_1f.expandNorth=_20("north");
_1f.expandNorth.panel("panel").click(function(){
_1f.north.panel("open").panel("resize",{top:-_1f.north.panel("options").height});
_1f.north.panel("panel").animate({top:0});
return false;
});
}
}else{
if(_1e=="south"){
if(_1f.south.panel("options").onBeforeCollapse.call(_1f.south)==false){
return;
}
var hh=cc.height()-28;
if(_b(_1f.expandNorth)){
hh-=_1f.expandNorth.panel("options").height;
}else{
if(_b(_1f.north)){
hh-=_1f.north.panel("options").height;
}
}
_1f.center.panel("resize",{height:hh});
_1f.east.panel("resize",{height:hh});
_1f.west.panel("resize",{height:hh});
if(_b(_1f.expandEast)){
_1f.expandEast.panel("resize",{height:hh});
}
if(_b(_1f.expandWest)){
_1f.expandWest.panel("resize",{height:hh});
}
_1f.south.panel("panel").animate({top:cc.height()},function(){
_1f.south.panel("close");
_1f.expandSouth.panel("open").panel("resize",{top:cc.height()-28,left:0,width:cc.width(),height:28});
_1f.south.panel("options").onCollapse.call(_1f.south);
});
if(!_1f.expandSouth){
_1f.expandSouth=_20("south");
_1f.expandSouth.panel("panel").click(function(){
_1f.south.panel("open").panel("resize",{top:cc.height()});
_1f.south.panel("panel").animate({top:cc.height()-_1f.south.panel("options").height});
return false;
});
}
}
}
}
}
};
function _22(_23,_24){
var _25=$.data(_23,"layout").panels;
var cc=$(_23);
if(_24=="east"&&_25.expandEast){
if(_25.east.panel("options").onBeforeExpand.call(_25.east)==false){
return;
}
_25.expandEast.panel("close");
_25.east.panel("panel").stop(true,true);
_25.east.panel("open").panel("resize",{left:cc.width()});
_25.east.panel("panel").animate({left:cc.width()-_25.east.panel("options").width},function(){
_2(_23);
_25.east.panel("options").onExpand.call(_25.east);
});
}else{
if(_24=="west"&&_25.expandWest){
if(_25.west.panel("options").onBeforeExpand.call(_25.west)==false){
return;
}
_25.expandWest.panel("close");
_25.west.panel("panel").stop(true,true);
_25.west.panel("open").panel("resize",{left:-_25.west.panel("options").width});
_25.west.panel("panel").animate({left:0},function(){
_2(_23);
_25.west.panel("options").onExpand.call(_25.west);
});
}else{
if(_24=="north"&&_25.expandNorth){
if(_25.north.panel("options").onBeforeExpand.call(_25.north)==false){
return;
}
_25.expandNorth.panel("close");
_25.north.panel("panel").stop(true,true);
_25.north.panel("open").panel("resize",{top:-_25.north.panel("options").height});
_25.north.panel("panel").animate({top:0},function(){
_2(_23);
_25.north.panel("options").onExpand.call(_25.north);
});
}else{
if(_24=="south"&&_25.expandSouth){
if(_25.south.panel("options").onBeforeExpand.call(_25.south)==false){
return;
}
_25.expandSouth.panel("close");
_25.south.panel("panel").stop(true,true);
_25.south.panel("open").panel("resize",{top:cc.height()});
_25.south.panel("panel").animate({top:cc.height()-_25.south.panel("options").height},function(){
_2(_23);
_25.south.panel("options").onExpand.call(_25.south);
});
}
}
}
}
};
function _26(_27){
var _28=$.data(_27,"layout").panels;
var cc=$(_27);
if(_28.east.length){
_28.east.panel("panel").bind("mouseover","east",_1c);
}
if(_28.west.length){
_28.west.panel("panel").bind("mouseover","west",_1c);
}
if(_28.north.length){
_28.north.panel("panel").bind("mouseover","north",_1c);
}
if(_28.south.length){
_28.south.panel("panel").bind("mouseover","south",_1c);
}
_28.center.panel("panel").bind("mouseover","center",_1c);
function _1c(e){
if(_1==true){
return;
}
if(e.data!="east"&&_b(_28.east)&&_b(_28.expandEast)){
_28.east.panel("panel").animate({left:cc.width()},function(){
_28.east.panel("close");
});
}
if(e.data!="west"&&_b(_28.west)&&_b(_28.expandWest)){
_28.west.panel("panel").animate({left:-_28.west.panel("options").width},function(){
_28.west.panel("close");
});
}
if(e.data!="north"&&_b(_28.north)&&_b(_28.expandNorth)){
_28.north.panel("panel").animate({top:-_28.north.panel("options").height},function(){
_28.north.panel("close");
});
}
if(e.data!="south"&&_b(_28.south)&&_b(_28.expandSouth)){
_28.south.panel("panel").animate({top:cc.height()},function(){
_28.south.panel("close");
});
}
return false;
};
};
function _b(pp){
if(!pp){
return false;
}
if(pp.length){
return pp.panel("panel").is(":visible");
}else{
return false;
}
};
$.fn.layout=function(_29,_2a){
if(typeof _29=="string"){
return $.fn.layout.methods[_29](this,_2a);
}
return this.each(function(){
var _2b=$.data(this,"layout");
if(!_2b){
var _2c=$.extend({},{fit:$(this).attr("fit")=="true"});
$.data(this,"layout",{options:_2c,panels:_c(this)});
_26(this);
}
_2(this);
});
};
$.fn.layout.methods={resize:function(jq){
return jq.each(function(){
_2(this);
});
},panel:function(jq,_2d){
return $.data(jq[0],"layout").panels[_2d];
},collapse:function(jq,_2e){
return jq.each(function(){
_1c(this,_2e);
});
},expand:function(jq,_2f){
return jq.each(function(){
_22(this,_2f);
});
}};
})(jQuery);

