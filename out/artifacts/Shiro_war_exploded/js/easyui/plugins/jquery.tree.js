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
var _3=$(_2);
_3.addClass("tree");
return _3;
};
function _4(_5){
var _6=[];
_7(_6,$(_5));
function _7(aa,_8){
_8.children("li").each(function(){
var _9=$(this);
var _a={};
_a.text=_9.children("span").html();
if(!_a.text){
_a.text=_9.html();
}
_a.id=_9.attr("id");
_a.iconCls=_9.attr("iconCls")||_9.attr("icon");
_a.checked=_9.attr("checked")=="true";
_a.state=_9.attr("state")||"open";
var _b=_9.children("ul");
if(_b.length){
_a.children=[];
_7(_a.children,_b);
}
aa.push(_a);
});
};
return _6;
};
function _c(_d){
var _e=$.data(_d,"tree").options;
var _f=$.data(_d,"tree").tree;
$("div.tree-node",_f).unbind(".tree").bind("dblclick.tree",function(){
_b1(_d,this);
_e.onDblClick.call(_d,_8e(_d));
}).bind("click.tree",function(){
_b1(_d,this);
_e.onClick.call(_d,_8e(_d));
}).bind("mouseenter.tree",function(){
$(this).addClass("tree-node-hover");
return false;
}).bind("mouseleave.tree",function(){
$(this).removeClass("tree-node-hover");
return false;
}).bind("contextmenu.tree",function(e){
_e.onContextMenu.call(_d,e,_36(_d,this));
});
$("span.tree-hit",_f).unbind(".tree").bind("click.tree",function(){
var _10=$(this).parent();
_6b(_d,_10[0]);
return false;
}).bind("mouseenter.tree",function(){
if($(this).hasClass("tree-expanded")){
$(this).addClass("tree-expanded-hover");
}else{
$(this).addClass("tree-collapsed-hover");
}
}).bind("mouseleave.tree",function(){
if($(this).hasClass("tree-expanded")){
$(this).removeClass("tree-expanded-hover");
}else{
$(this).removeClass("tree-collapsed-hover");
}
}).bind("mousedown.tree",function(){
return false;
});
$("span.tree-checkbox",_f).unbind(".tree").bind("click.tree",function(){
var _11=$(this).parent();
_2d(_d,_11[0],!$(this).hasClass("tree-checkbox1"));
return false;
}).bind("mousedown.tree",function(){
return false;
});
};
function _12(_13){
var _14=$(_13).find("div.tree-node");
_14.draggable("disable");
_14.css("cursor","pointer");
};
function _15(_16){
var _17=$.data(_16,"tree").options;
var _18=$.data(_16,"tree").tree;
_18.find("div.tree-node").draggable({disabled:false,revert:true,cursor:"pointer",proxy:function(_19){
var p=$("<div class=\"tree-node-proxy tree-dnd-no\"></div>").appendTo("body");
p.html($(_19).find(".tree-title").html());
p.hide();
return p;
},deltaX:15,deltaY:15,onStartDrag:function(){
$(this).draggable("proxy").css({left:-10000,top:-10000});
},onDrag:function(e){
$(this).draggable("proxy").show();
this.pageY=e.pageY;
}}).droppable({accept:"div.tree-node",onDragOver:function(e,_1a){
var _1b=_1a.pageY;
var top=$(this).offset().top;
var _1c=top+$(this).outerHeight();
$(_1a).draggable("proxy").removeClass("tree-dnd-no").addClass("tree-dnd-yes");
$(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
if(_1b>top+(_1c-top)/2){
if(_1c-_1b<5){
$(this).addClass("tree-node-bottom");
}else{
$(this).addClass("tree-node-append");
}
}else{
if(_1b-top<5){
$(this).addClass("tree-node-top");
}else{
$(this).addClass("tree-node-append");
}
}
},onDragLeave:function(e,_1d){
$(_1d).draggable("proxy").removeClass("tree-dnd-yes").addClass("tree-dnd-no");
$(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
},onDrop:function(e,_1e){
var _1f=this;
var _20,_21;
if($(this).hasClass("tree-node-append")){
_20=_22;
}else{
_20=_23;
_21=$(this).hasClass("tree-node-top")?"top":"bottom";
}
setTimeout(function(){
_20(_1e,_1f,_21);
},0);
$(this).removeClass("tree-node-append tree-node-top tree-node-bottom");
}});
function _22(_24,_25){
if(_36(_16,_25).state=="closed"){
_5f(_16,_25,function(){
_26();
});
}else{
_26();
}
function _26(){
var _27=$(_16).tree("pop",_24);
$(_16).tree("append",{parent:_25,data:[_27]});
_17.onDrop.call(_16,_25,_27,"append");
};
};
function _23(_28,_29,_2a){
var _2b={};
if(_2a=="top"){
_2b.before=_29;
}else{
_2b.after=_29;
}
var _2c=$(_16).tree("pop",_28);
_2b.data=_2c;
$(_16).tree("insert",_2b);
_17.onDrop.call(_16,_29,_2c,_2a);
};
};
function _2d(_2e,_2f,_30){
var _31=$.data(_2e,"tree").options;
if(!_31.checkbox){
return;
}
var _32=$(_2f);
var ck=_32.find(".tree-checkbox");
ck.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2");
if(_30){
ck.addClass("tree-checkbox1");
}else{
ck.addClass("tree-checkbox0");
}
if(_31.cascadeCheck){
_33(_32);
_34(_32);
}
var _35=_36(_2e,_2f);
_31.onCheck.call(_2e,_35,_30);
function _34(_37){
var _38=_37.next().find(".tree-checkbox");
_38.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2");
if(_37.find(".tree-checkbox").hasClass("tree-checkbox1")){
_38.addClass("tree-checkbox1");
}else{
_38.addClass("tree-checkbox0");
}
};
function _33(_39){
var _3a=_76(_2e,_39[0]);
if(_3a){
var ck=$(_3a.target).find(".tree-checkbox");
ck.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2");
if(_3b(_39)){
ck.addClass("tree-checkbox1");
}else{
if(_3c(_39)){
ck.addClass("tree-checkbox0");
}else{
ck.addClass("tree-checkbox2");
}
}
_33($(_3a.target));
}
function _3b(n){
var ck=n.find(".tree-checkbox");
if(ck.hasClass("tree-checkbox0")||ck.hasClass("tree-checkbox2")){
return false;
}
var b=true;
n.parent().siblings().each(function(){
if(!$(this).children("div.tree-node").children(".tree-checkbox").hasClass("tree-checkbox1")){
b=false;
}
});
return b;
};
function _3c(n){
var ck=n.find(".tree-checkbox");
if(ck.hasClass("tree-checkbox1")||ck.hasClass("tree-checkbox2")){
return false;
}
var b=true;
n.parent().siblings().each(function(){
if(!$(this).children("div.tree-node").children(".tree-checkbox").hasClass("tree-checkbox0")){
b=false;
}
});
return b;
};
};
};
function _3d(_3e,_3f){
var _40=$.data(_3e,"tree").options;
var _41=$(_3f);
if(_42(_3e,_3f)){
var ck=_41.find(".tree-checkbox");
if(ck.length){
if(ck.hasClass("tree-checkbox1")){
_2d(_3e,_3f,true);
}else{
_2d(_3e,_3f,false);
}
}else{
if(_40.onlyLeafCheck){
$("<span class=\"tree-checkbox tree-checkbox0\"></span>").insertBefore(_41.find(".tree-title"));
_c(_3e);
}
}
}else{
var ck=_41.find(".tree-checkbox");
if(_40.onlyLeafCheck){
ck.remove();
}else{
if(ck.hasClass("tree-checkbox1")){
_2d(_3e,_3f,true);
}else{
if(ck.hasClass("tree-checkbox2")){
var _43=true;
var _44=true;
var _45=_46(_3e,_3f);
for(var i=0;i<_45.length;i++){
if(_45[i].checked){
_44=false;
}else{
_43=false;
}
}
if(_43){
_2d(_3e,_3f,true);
}
if(_44){
_2d(_3e,_3f,false);
}
}
}
}
}
};
function _47(_48,ul,_49,_4a){
var _4b=$.data(_48,"tree").options;
if(!_4a){
$(ul).empty();
}
var _4c=[];
var _4d=$(ul).prev("div.tree-node").find("span.tree-indent, span.tree-hit").length;
_4e(ul,_49,_4d);
_c(_48);
if(_4b.dnd){
_15(_48);
}else{
_12(_48);
}
for(var i=0;i<_4c.length;i++){
_2d(_48,_4c[i],true);
}
var _4f=null;
if(_48!=ul){
var _50=$(ul).prev();
_4f=_36(_48,_50[0]);
}
_4b.onLoadSuccess.call(_48,_4f,_49);
function _4e(ul,_51,_52){
for(var i=0;i<_51.length;i++){
var li=$("<li></li>").appendTo(ul);
var _53=_51[i];
if(_53.state!="open"&&_53.state!="closed"){
_53.state="open";
}
var _54=$("<div class=\"tree-node\"></div>").appendTo(li);
_54.attr("node-id",_53.id);
$.data(_54[0],"tree-node",{id:_53.id,text:_53.text,iconCls:_53.iconCls,attributes:_53.attributes});
$("<span class=\"tree-title\"></span>").html(_53.text).appendTo(_54);
if(_4b.checkbox){
if(_4b.onlyLeafCheck){
if(_53.state=="open"&&(!_53.children||!_53.children.length)){
if(_53.checked){
$("<span class=\"tree-checkbox tree-checkbox1\"></span>").prependTo(_54);
}else{
$("<span class=\"tree-checkbox tree-checkbox0\"></span>").prependTo(_54);
}
}
}else{
if(_53.checked){
$("<span class=\"tree-checkbox tree-checkbox1\"></span>").prependTo(_54);
_4c.push(_54[0]);
}else{
$("<span class=\"tree-checkbox tree-checkbox0\"></span>").prependTo(_54);
}
}
}
if(_53.children&&_53.children.length){
var _55=$("<ul></ul>").appendTo(li);
if(_53.state=="open"){
$("<span class=\"tree-icon tree-folder tree-folder-open\"></span>").addClass(_53.iconCls).prependTo(_54);
$("<span class=\"tree-hit tree-expanded\"></span>").prependTo(_54);
}else{
$("<span class=\"tree-icon tree-folder\"></span>").addClass(_53.iconCls).prependTo(_54);
$("<span class=\"tree-hit tree-collapsed\"></span>").prependTo(_54);
_55.css("display","none");
}
_4e(_55,_53.children,_52+1);
}else{
if(_53.state=="closed"){
$("<span class=\"tree-icon tree-folder\"></span>").addClass(_53.iconCls).prependTo(_54);
$("<span class=\"tree-hit tree-collapsed\"></span>").prependTo(_54);
}else{
$("<span class=\"tree-icon tree-file\"></span>").addClass(_53.iconCls).prependTo(_54);
$("<span class=\"tree-indent\"></span>").prependTo(_54);
}
}
for(var j=0;j<_52;j++){
$("<span class=\"tree-indent\"></span>").prependTo(_54);
}
}
};
};
function _56(_57,ul,_58,_59){
var _5a=$.data(_57,"tree").options;
_58=_58||{};
var _5b=null;
if(_57!=ul){
var _5c=$(ul).prev();
_5b=_36(_57,_5c[0]);
}
if(_5a.onBeforeLoad.call(_57,_5b,_58)==false){
return;
}
if(!_5a.url){
return;
}
var _5d=$(ul).prev().children("span.tree-folder");
_5d.addClass("tree-loading");
$.ajax({type:_5a.method,url:_5a.url,data:_58,dataType:"json",success:function(_5e){
_5d.removeClass("tree-loading");
_47(_57,ul,_5e);
if(_59){
_59();
}
},error:function(){
_5d.removeClass("tree-loading");
_5a.onLoadError.apply(_57,arguments);
if(_59){
_59();
}
}});
};
function _5f(_60,_61,_62){
var _63=$.data(_60,"tree").options;
var hit=$(_61).children("span.tree-hit");
if(hit.length==0){
return;
}
if(hit.hasClass("tree-expanded")){
return;
}
var _64=_36(_60,_61);
if(_63.onBeforeExpand.call(_60,_64)==false){
return;
}
hit.removeClass("tree-collapsed tree-collapsed-hover").addClass("tree-expanded");
hit.next().addClass("tree-folder-open");
var ul=$(_61).next();
if(ul.length){
if(_63.animate){
ul.slideDown("normal",function(){
_63.onExpand.call(_60,_64);
if(_62){
_62();
}
});
}else{
ul.css("display","block");
_63.onExpand.call(_60,_64);
if(_62){
_62();
}
}
}else{
var _65=$("<ul style=\"display:none\"></ul>").insertAfter(_61);
_56(_60,_65[0],{id:_64.id},function(){
if(_63.animate){
_65.slideDown("normal",function(){
_63.onExpand.call(_60,_64);
if(_62){
_62();
}
});
}else{
_65.css("display","block");
_63.onExpand.call(_60,_64);
if(_62){
_62();
}
}
});
}
};
function _66(_67,_68){
var _69=$.data(_67,"tree").options;
var hit=$(_68).children("span.tree-hit");
if(hit.length==0){
return;
}
if(hit.hasClass("tree-collapsed")){
return;
}
var _6a=_36(_67,_68);
if(_69.onBeforeCollapse.call(_67,_6a)==false){
return;
}
hit.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
hit.next().removeClass("tree-folder-open");
var ul=$(_68).next();
if(_69.animate){
ul.slideUp("normal",function(){
_69.onCollapse.call(_67,_6a);
});
}else{
ul.css("display","none");
_69.onCollapse.call(_67,_6a);
}
};
function _6b(_6c,_6d){
var hit=$(_6d).children("span.tree-hit");
if(hit.length==0){
return;
}
if(hit.hasClass("tree-expanded")){
_66(_6c,_6d);
}else{
_5f(_6c,_6d);
}
};
function _6e(_6f,_70){
var _71=_46(_6f,_70);
if(_70){
_71.unshift(_36(_6f,_70));
}
for(var i=0;i<_71.length;i++){
_5f(_6f,_71[i].target);
}
};
function _72(_73,_74){
var _75=[];
var p=_76(_73,_74);
while(p){
_75.unshift(p);
p=_76(_73,p.target);
}
for(var i=0;i<_75.length;i++){
_5f(_73,_75[i].target);
}
};
function _77(_78,_79){
var _7a=_46(_78,_79);
if(_79){
_7a.unshift(_36(_78,_79));
}
for(var i=0;i<_7a.length;i++){
_66(_78,_7a[i].target);
}
};
function _7b(_7c){
var _7d=_7e(_7c);
if(_7d.length){
return _7d[0];
}else{
return null;
}
};
function _7e(_7f){
var _80=[];
$(_7f).children("li").each(function(){
var _81=$(this).children("div.tree-node");
_80.push(_36(_7f,_81[0]));
});
return _80;
};
function _46(_82,_83){
var _84=[];
if(_83){
_85($(_83));
}else{
var _86=_7e(_82);
for(var i=0;i<_86.length;i++){
_84.push(_86[i]);
_85($(_86[i].target));
}
}
function _85(_87){
_87.next().find("div.tree-node").each(function(){
_84.push(_36(_82,this));
});
};
return _84;
};
function _76(_88,_89){
var ul=$(_89).parent().parent();
if(ul[0]==_88){
return null;
}else{
return _36(_88,ul.prev()[0]);
}
};
function _8a(_8b){
var _8c=[];
$(_8b).find(".tree-checkbox1").each(function(){
var _8d=$(this).parent();
_8c.push(_36(_8b,_8d[0]));
});
return _8c;
};
function _8e(_8f){
var _90=$(_8f).find("div.tree-node-selected");
if(_90.length){
return _36(_8f,_90[0]);
}else{
return null;
}
};
function _91(_92,_93){
var _94=$(_93.parent);
var ul;
if(_94.length==0){
ul=$(_92);
}else{
ul=_94.next();
if(ul.length==0){
ul=$("<ul></ul>").insertAfter(_94);
}
}
if(_93.data&&_93.data.length){
var _95=_94.find("span.tree-icon");
if(_95.hasClass("tree-file")){
_95.removeClass("tree-file").addClass("tree-folder");
var hit=$("<span class=\"tree-hit tree-expanded\"></span>").insertBefore(_95);
if(hit.prev().length){
hit.prev().remove();
}
}
}
_47(_92,ul[0],_93.data,true);
_3d(_92,ul.prev());
};
function _96(_97,_98){
var ref=_98.before||_98.after;
var _99=_76(_97,ref);
var li;
if(_99){
_91(_97,{parent:_99.target,data:[_98.data]});
li=$(_99.target).next().children("li:last");
}else{
_91(_97,{parent:null,data:[_98.data]});
li=$(_97).children("li:last");
}
if(_98.before){
li.insertBefore($(ref).parent());
}else{
li.insertAfter($(ref).parent());
}
};
function _9a(_9b,_9c){
var _9d=_76(_9b,_9c);
var _9e=$(_9c);
var li=_9e.parent();
var ul=li.parent();
li.remove();
if(ul.children("li").length==0){
var _9e=ul.prev();
_9e.find(".tree-icon").removeClass("tree-folder").addClass("tree-file");
_9e.find(".tree-hit").remove();
$("<span class=\"tree-indent\"></span>").prependTo(_9e);
if(ul[0]!=_9b){
ul.remove();
}
}
if(_9d){
_3d(_9b,_9d.target);
}
};
function _9f(_a0,_a1){
function _a2(aa,ul){
ul.children("li").each(function(){
var _a3=$(this).children("div.tree-node");
var _a4=_36(_a0,_a3[0]);
var sub=$(this).children("ul");
if(sub.length){
_a4.children=[];
_9f(_a4.children,sub);
}
aa.push(_a4);
});
};
if(_a1){
var _a5=_36(_a0,_a1);
_a5.children=[];
_a2(_a5.children,$(_a1).next());
return _a5;
}else{
return null;
}
};
function _a6(_a7,_a8){
var _a9=$(_a8.target);
var _aa=$.data(_a8.target,"tree-node");
if(_aa.iconCls){
_a9.find(".tree-icon").removeClass(_aa.iconCls);
}
$.extend(_aa,_a8);
$.data(_a8.target,"tree-node",_aa);
_a9.attr("node-id",_aa.id);
_a9.find(".tree-title").html(_aa.text);
if(_aa.iconCls){
_a9.find(".tree-icon").addClass(_aa.iconCls);
}
var ck=_a9.find(".tree-checkbox");
ck.removeClass("tree-checkbox0 tree-checkbox1 tree-checkbox2");
if(_aa.checked){
_2d(_a7,_a8.target,true);
}else{
_2d(_a7,_a8.target,false);
}
};
function _36(_ab,_ac){
var _ad=$.extend({},$.data(_ac,"tree-node"),{target:_ac,checked:$(_ac).find(".tree-checkbox").hasClass("tree-checkbox1")});
if(!_42(_ab,_ac)){
_ad.state=$(_ac).find(".tree-hit").hasClass("tree-expanded")?"open":"closed";
}
return _ad;
};
function _ae(_af,id){
var _b0=$(_af).find("div.tree-node[node-id="+id+"]");
if(_b0.length){
return _36(_af,_b0[0]);
}else{
return null;
}
};
function _b1(_b2,_b3){
var _b4=$.data(_b2,"tree").options;
var _b5=_36(_b2,_b3);
if(_b4.onBeforeSelect.call(_b2,_b5)==false){
return;
}
$("div.tree-node-selected",_b2).removeClass("tree-node-selected");
$(_b3).addClass("tree-node-selected");
_b4.onSelect.call(_b2,_b5);
};
function _42(_b6,_b7){
var _b8=$(_b7);
var hit=_b8.children("span.tree-hit");
return hit.length==0;
};
function _b9(_ba,_bb){
var _bc=$.data(_ba,"tree").options;
var _bd=_36(_ba,_bb);
if(_bc.onBeforeEdit.call(_ba,_bd)==false){
return;
}
$(_bb).css("position","relative");
var nt=$(_bb).find(".tree-title");
var _be=nt.outerWidth();
nt.empty();
var _bf=$("<input class=\"tree-editor\">").appendTo(nt);
_bf.val(_bd.text).focus();
_bf.width(_be+20);
_bf.height(document.compatMode=="CSS1Compat"?(18-(_bf.outerHeight()-_bf.height())):18);
_bf.bind("click",function(e){
return false;
}).bind("mousedown",function(e){
e.stopPropagation();
}).bind("mousemove",function(e){
e.stopPropagation();
}).bind("keydown",function(e){
if(e.keyCode==13){
_c0(_ba,_bb);
return false;
}else{
if(e.keyCode==27){
_c6(_ba,_bb);
return false;
}
}
}).bind("blur",function(e){
e.stopPropagation();
_c0(_ba,_bb);
});
};
function _c0(_c1,_c2){
var _c3=$.data(_c1,"tree").options;
$(_c2).css("position","");
var _c4=$(_c2).find("input.tree-editor");
var val=_c4.val();
_c4.remove();
var _c5=_36(_c1,_c2);
_c5.text=val;
_a6(_c1,_c5);
_c3.onAfterEdit.call(_c1,_c5);
};
function _c6(_c7,_c8){
var _c9=$.data(_c7,"tree").options;
$(_c8).css("position","");
$(_c8).find("input.tree-editor").remove();
var _ca=_36(_c7,_c8);
_a6(_c7,_ca);
_c9.onCancelEdit.call(_c7,_ca);
};
$.fn.tree=function(_cb,_cc){
if(typeof _cb=="string"){
return $.fn.tree.methods[_cb](this,_cc);
}
var _cb=_cb||{};
return this.each(function(){
var _cd=$.data(this,"tree");
var _ce;
if(_cd){
_ce=$.extend(_cd.options,_cb);
_cd.options=_ce;
}else{
_ce=$.extend({},$.fn.tree.defaults,$.fn.tree.parseOptions(this),_cb);
$.data(this,"tree",{options:_ce,tree:_1(this)});
var _cf=_4(this);
_47(this,this,_cf);
}
if(_ce.data){
_47(this,this,_ce.data);
}else{
if(_ce.dnd){
_15(this);
}else{
_12(this);
}
}
if(_ce.url){
_56(this,this);
}
});
};
$.fn.tree.methods={options:function(jq){
return $.data(jq[0],"tree").options;
},loadData:function(jq,_d0){
return jq.each(function(){
_47(this,this,_d0);
});
},getNode:function(jq,_d1){
return _36(jq[0],_d1);
},getData:function(jq,_d2){
return _9f(jq[0],_d2);
},reload:function(jq,_d3){
return jq.each(function(){
if(_d3){
var _d4=$(_d3);
var hit=_d4.children("span.tree-hit");
hit.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
_d4.next().remove();
_5f(this,_d3);
}else{
$(this).empty();
_56(this,this);
}
});
},getRoot:function(jq){
return _7b(jq[0]);
},getRoots:function(jq){
return _7e(jq[0]);
},getParent:function(jq,_d5){
return _76(jq[0],_d5);
},getChildren:function(jq,_d6){
return _46(jq[0],_d6);
},getChecked:function(jq){
return _8a(jq[0]);
},getSelected:function(jq){
return _8e(jq[0]);
},isLeaf:function(jq,_d7){
return _42(jq[0],_d7);
},find:function(jq,id){
return _ae(jq[0],id);
},select:function(jq,_d8){
return jq.each(function(){
_b1(this,_d8);
});
},check:function(jq,_d9){
return jq.each(function(){
_2d(this,_d9,true);
});
},uncheck:function(jq,_da){
return jq.each(function(){
_2d(this,_da,false);
});
},collapse:function(jq,_db){
return jq.each(function(){
_66(this,_db);
});
},expand:function(jq,_dc){
return jq.each(function(){
_5f(this,_dc);
});
},collapseAll:function(jq,_dd){
return jq.each(function(){
_77(this,_dd);
});
},expandAll:function(jq,_de){
return jq.each(function(){
_6e(this,_de);
});
},expandTo:function(jq,_df){
return jq.each(function(){
_72(this,_df);
});
},toggle:function(jq,_e0){
return jq.each(function(){
_6b(this,_e0);
});
},append:function(jq,_e1){
return jq.each(function(){
_91(this,_e1);
});
},insert:function(jq,_e2){
return jq.each(function(){
_96(this,_e2);
});
},remove:function(jq,_e3){
return jq.each(function(){
_9a(this,_e3);
});
},pop:function(jq,_e4){
var _e5=jq.tree("getData",_e4);
jq.tree("remove",_e4);
return _e5;
},update:function(jq,_e6){
return jq.each(function(){
_a6(this,_e6);
});
},enableDnd:function(jq){
return jq.each(function(){
_15(this);
});
},disableDnd:function(jq){
return jq.each(function(){
_12(this);
});
},beginEdit:function(jq,_e7){
return jq.each(function(){
_b9(this,_e7);
});
},endEdit:function(jq,_e8){
return jq.each(function(){
_c0(this,_e8);
});
},cancelEdit:function(jq,_e9){
return jq.each(function(){
_c6(this,_e9);
});
}};
$.fn.tree.parseOptions=function(_ea){
var t=$(_ea);
return {url:t.attr("url"),method:(t.attr("method")?t.attr("method"):undefined),checkbox:(t.attr("checkbox")?t.attr("checkbox")=="true":undefined),cascadeCheck:(t.attr("cascadeCheck")?t.attr("cascadeCheck")=="true":undefined),onlyLeafCheck:(t.attr("onlyLeafCheck")?t.attr("onlyLeafCheck")=="true":undefined),animate:(t.attr("animate")?t.attr("animate")=="true":undefined),dnd:(t.attr("dnd")?t.attr("dnd")=="true":undefined)};
};
$.fn.tree.defaults={url:null,method:"post",animate:false,checkbox:false,cascadeCheck:true,onlyLeafCheck:false,dnd:false,data:null,onBeforeLoad:function(_eb,_ec){
},onLoadSuccess:function(_ed,_ee){
},onLoadError:function(){
},onClick:function(_ef){
},onDblClick:function(_f0){
},onBeforeExpand:function(_f1){
},onExpand:function(_f2){
},onBeforeCollapse:function(_f3){
},onCollapse:function(_f4){
},onCheck:function(_f5,_f6){
},onBeforeSelect:function(_f7){
},onSelect:function(_f8){
},onContextMenu:function(e,_f9){
},onDrop:function(_fa,_fb,_fc){
},onBeforeEdit:function(_fd){
},onAfterEdit:function(_fe){
},onCancelEdit:function(_ff){
}};
})(jQuery);

