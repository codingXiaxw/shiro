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
var _3=$.data(_2,"treegrid").options;
$(_2).datagrid($.extend({},_3,{url:null,onLoadSuccess:function(){
},onResizeColumn:function(_4,_5){
_6(_2);
_3.onResizeColumn.call(_2,_4,_5);
}}));
};
function _6(_7,_8){
var _9=$.data(_7,"datagrid").options;
var _a=$.data(_7,"datagrid").panel;
var _b=_a.children("div.datagrid-view");
var _c=_b.children("div.datagrid-view1");
var _d=_b.children("div.datagrid-view2");
if(_9.rownumbers||(_9.frozenColumns&&_9.frozenColumns.length>0)){
if(_8){
_e(_8);
_d.find("tr[node-id="+_8+"]").next("tr.treegrid-tr-tree").find("tr[node-id]").each(function(){
_e($(this).attr("node-id"));
});
}else{
_d.find("tr[node-id]").each(function(){
_e($(this).attr("node-id"));
});
}
}
if(_9.height=="auto"){
var _f=_d.find("div.datagrid-body table").height()+18;
_c.find("div.datagrid-body").height(_f);
_d.find("div.datagrid-body").height(_f);
_b.height(_d.height());
}
function _e(_10){
var tr1=_c.find("tr[node-id="+_10+"]");
var tr2=_d.find("tr[node-id="+_10+"]");
tr1.css("height","");
tr2.css("height","");
var _11=Math.max(tr1.height(),tr2.height());
tr1.css("height",_11);
tr2.css("height",_11);
};
};
function _12(_13){
var _14=$.data(_13,"treegrid").options;
if(!_14.rownumbers){
return;
}
$(_13).datagrid("getPanel").find("div.datagrid-view1 div.datagrid-body div.datagrid-cell-rownumber").each(function(i){
$(this).html(i+1);
});
};
function _15(_16){
var _17=$.data(_16,"treegrid").options;
var _18=$(_16).datagrid("getPanel");
var _19=_18.find("div.datagrid-body");
_19.find("span.tree-hit").unbind(".treegrid").bind("click.treegrid",function(){
var tr=$(this).parent().parent().parent();
var id=tr.attr("node-id");
_99(_16,id);
return false;
}).bind("mouseenter.treegrid",function(){
if($(this).hasClass("tree-expanded")){
$(this).addClass("tree-expanded-hover");
}else{
$(this).addClass("tree-collapsed-hover");
}
}).bind("mouseleave.treegrid",function(){
if($(this).hasClass("tree-expanded")){
$(this).removeClass("tree-expanded-hover");
}else{
$(this).removeClass("tree-collapsed-hover");
}
});
_19.find("tr[node-id]").unbind(".treegrid").bind("mouseenter.treegrid",function(){
var id=$(this).attr("node-id");
_19.find("tr[node-id="+id+"]").addClass("datagrid-row-over");
}).bind("mouseleave.treegrid",function(){
var id=$(this).attr("node-id");
_19.find("tr[node-id="+id+"]").removeClass("datagrid-row-over");
}).bind("click.treegrid",function(){
var id=$(this).attr("node-id");
if(_17.singleSelect){
_1c(_16);
_83(_16,id);
}else{
if($(this).hasClass("datagrid-row-selected")){
_87(_16,id);
}else{
_83(_16,id);
}
}
_17.onClickRow.call(_16,_42(_16,id));
return false;
}).bind("dblclick.treegrid",function(){
var id=$(this).attr("node-id");
_17.onDblClickRow.call(_16,_42(_16,id));
return false;
}).bind("contextmenu.treegrid",function(e){
var id=$(this).attr("node-id");
_17.onContextMenu.call(_16,e,_42(_16,id));
});
_19.find("div.datagrid-cell-check input[type=checkbox]").unbind(".treegrid").bind("click.treegrid",function(e){
var id=$(this).parent().parent().parent().attr("node-id");
if(_17.singleSelect){
_1c(_16);
_83(_16,id);
}else{
if($(this).attr("checked")){
_83(_16,id);
}else{
_87(_16,id);
}
}
e.stopPropagation();
});
var _1a=_18.find("div.datagrid-header");
_1a.find("input[type=checkbox]").unbind().bind("click.treegrid",function(){
if(_17.singleSelect){
return false;
}
if($(this).attr("checked")){
_1b(_16);
}else{
_1c(_16);
}
});
};
function _1d(_1e,_1f){
var _20=$.data(_1e,"datagrid").options;
var _21=$(_1e).datagrid("getPanel").children("div.datagrid-view");
var _22=_21.children("div.datagrid-view1");
var _23=_21.children("div.datagrid-view2");
var tr1=_22.children("div.datagrid-body").find("tr[node-id="+_1f+"]");
var tr2=_23.children("div.datagrid-body").find("tr[node-id="+_1f+"]");
var _24=tr1.next("tr.treegrid-tr-tree");
var _25=tr2.next("tr.treegrid-tr-tree");
var _26=_24.children("td").find("div");
var _27=_25.children("td").find("div");
var td1=tr1.find("td[field="+_20.treeField+"]");
var td2=tr2.find("td[field="+_20.treeField+"]");
var _28=td1.find("span.tree-indent,span.tree-hit").length+td2.find("span.tree-indent,span.tree-hit").length;
return [_26,_27,_28];
};
function _29(_2a,_2b){
var _2c=$.data(_2a,"treegrid").options;
var _2d=$(_2a).datagrid("getPanel").children("div.datagrid-view");
var _2e=_2d.children("div.datagrid-view1");
var _2f=_2d.children("div.datagrid-view2");
var tr1=_2e.children("div.datagrid-body").find("tr[node-id="+_2b+"]");
var tr2=_2f.children("div.datagrid-body").find("tr[node-id="+_2b+"]");
var _30=$(_2a).datagrid("getColumnFields",true).length+(_2c.rownumbers?1:0);
var _31=$(_2a).datagrid("getColumnFields",false).length;
_32(tr1,_30);
_32(tr2,_31);
function _32(tr,_33){
$("<tr class=\"treegrid-tr-tree\">"+"<td style=\"border:0px\" colspan=\""+_33+"\">"+"<div></div>"+"</td>"+"</tr>").insertAfter(tr);
};
};
function _34(_35,_36,_37,_38){
var _39=$.data(_35,"treegrid").options;
var _3a=$.data(_35,"datagrid").panel;
var _3b=_3a.children("div.datagrid-view");
var _3c=_3b.children("div.datagrid-view1");
var _3d=_3b.children("div.datagrid-view2");
var _3e=$(_35).datagrid("getColumnFields",true);
var _3f=$(_35).datagrid("getColumnFields",false);
_40(_37,_36);
var _41=_42(_35,_36);
if(_41){
if(_41.children){
_41.children=_41.children.concat(_37);
}else{
_41.children=_37;
}
var _43=_1d(_35,_36);
var cc1=_43[0];
var cc2=_43[1];
var _44=_43[2];
}else{
$.data(_35,"treegrid").data=$.data(_35,"treegrid").data.concat(_37);
var cc1=_3c.children("div.datagrid-body").children("div.datagrid-body-inner");
var cc2=_3d.children("div.datagrid-body");
var _44=0;
}
if(!_38){
$.data(_35,"treegrid").data=_37;
cc1.empty();
cc2.empty();
}
var _45=_46(_37,_44);
cc1.html(cc1.html()+_45[0].join(""));
cc2.html(cc2.html()+_45[1].join(""));
_39.onLoadSuccess.call(_35,_41,_37);
_6(_35);
_12(_35);
_47();
_15(_35);
function _40(_48,_49){
for(var i=0;i<_48.length;i++){
var row=_48[i];
row._parentId=_49;
if(row.children&&row.children.length){
_40(row.children,row[_39.idField]);
}
}
};
function _46(_4a,_4b){
var _4c=["<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>"];
var _4d=["<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><tbody>"];
var _4e=[_4c,_4d];
for(var i=0;i<_4a.length;i++){
var row=_4a[i];
if(row.state!="open"&&row.state!="closed"){
row.state="open";
}
_4e[0]=_4e[0].concat(_4f(row,_3e,_4b,_39.rownumbers));
_4e[1]=_4e[1].concat(_4f(row,_3f,_4b));
if(row.children&&row.children.length){
var tt=_46(row.children,_4b+1);
var v=row.state=="closed"?"none":"block";
_4e[0].push("<tr class=\"treegrid-tr-tree\"><td style=\"border:0px\" colspan="+(_3e.length+(_39.rownumbers?1:0))+"><div style=\"display:"+v+"\">");
_4e[0]=_4e[0].concat(tt[0]);
_4e[0].push("</div></td></tr>");
_4e[1].push("<tr class=\"treegrid-tr-tree\"><td style=\"border:0px\" colspan="+_3f.length+"><div style=\"display:"+v+"\">");
_4e[1]=_4e[1].concat(tt[1]);
_4e[1].push("</div></td></tr>");
}
}
_4e[0].push("</tbody></table>");
_4e[1].push("</tbody></table>");
return _4e;
};
function _4f(row,_50,_51,_52){
var _53=["<tr node-id="+row[_39.idField]+">"];
if(_52){
_53.push("<td class=\"datagrid-td-rownumber\"><div class=\"datagrid-cell-rownumber\">0</div></td>");
}
for(var i=0;i<_50.length;i++){
var _54=_50[i];
var col=$(_35).datagrid("getColumnOption",_54);
if(col){
var _55="width:"+(col.boxWidth)+"px;";
_55+="text-align:"+(col.align||"left")+";";
_55+=_39.nowrap==false?"white-space:normal;":"";
_53.push("<td field=\""+_54+"\">");
_53.push("<div style=\""+_55+"\" ");
if(col.checkbox){
_53.push("class=\"datagrid-cell-check ");
}else{
_53.push("class=\"datagrid-cell ");
}
_53.push("\">");
if(col.checkbox){
if(row.checked){
_53.push("<input type=\"checkbox\" checked=\"checked\"/>");
}else{
_53.push("<input type=\"checkbox\"/>");
}
}
var val=null;
if(col.formatter){
val=col.formatter(row[_54],row);
}else{
val=row[_54]||"&nbsp;";
}
if(_54==_39.treeField){
for(var j=0;j<_51;j++){
_53.push("<span class=\"tree-indent\"></span>");
}
if(row.state=="closed"){
_53.push("<span class=\"tree-hit tree-collapsed\"></span>");
_53.push("<span class=\"tree-icon tree-folder "+(row.iconCls?row.iconCls:"")+"\"></span>");
}else{
if(row.children&&row.children.length){
_53.push("<span class=\"tree-hit tree-expanded\"></span>");
_53.push("<span class=\"tree-icon tree-folder tree-folder-open "+(row.iconCls?row.iconCls:"")+"\"></span>");
}else{
_53.push("<span class=\"tree-indent\"></span>");
_53.push("<span class=\"tree-icon tree-file "+(row.iconCls?row.iconCls:"")+"\"></span>");
}
}
_53.push("<span class=\"tree-title\">"+val+"</span>");
}else{
_53.push(val);
}
_53.push("</div>");
_53.push("</td>");
}
}
_53.push("</tr>");
return _53;
};
function _47(){
var _56=_3b.find("div.datagrid-header");
var _57=_3b.find("div.datagrid-body");
var _58=_56.find("div.datagrid-header-check");
if(_58.length){
var ck=_57.find("div.datagrid-cell-check");
if($.boxModel){
ck.width(_58.width());
ck.height(_58.height());
}else{
ck.width(_58.outerWidth());
ck.height(_58.outerHeight());
}
}
};
};
function _59(_5a,_5b,_5c,_5d,_5e){
var _5f=$.data(_5a,"treegrid").options;
var _60=$(_5a).datagrid("getPanel").find("div.datagrid-body");
if(_5c){
_5f.queryParams=_5c;
}
var _61=$.extend({},_5f.queryParams);
var row=_42(_5a,_5b);
if(_5f.onBeforeLoad.call(_5a,row,_61)==false){
return;
}
if(!_5f.url){
return;
}
var _62=_60.find("tr[node-id="+_5b+"] span.tree-folder");
_62.addClass("tree-loading");
$.ajax({type:_5f.method,url:_5f.url,data:_61,dataType:"json",success:function(_63){
_62.removeClass("tree-loading");
_34(_5a,_5b,_63,_5d);
if(_5e){
_5e();
}
},error:function(){
_62.removeClass("tree-loading");
_5f.onLoadError.apply(_5a,arguments);
if(_5e){
_5e();
}
}});
};
function _64(_65){
var _66=_67(_65);
if(_66.length){
return _66[0];
}else{
return null;
}
};
function _67(_68){
return $.data(_68,"treegrid").data;
};
function _69(_6a,_6b){
var row=_42(_6a,_6b);
if(row._parentId){
return _42(_6a,row._parentId);
}else{
return null;
}
};
function _6c(_6d,_6e){
var _6f=$.data(_6d,"treegrid").options;
var _70=$(_6d).datagrid("getPanel").find("div.datagrid-view2 div.datagrid-body");
var _71=[];
if(_6e){
_72(_6e);
}else{
var _73=_67(_6d);
for(var i=0;i<_73.length;i++){
_71.push(_73[i]);
_72(_73[i][_6f.idField]);
}
}
function _72(_74){
var _75=_42(_6d,_74);
if(_75&&_75.children){
for(var i=0,len=_75.children.length;i<len;i++){
var _76=_75.children[i];
_71.push(_76);
_72(_76[_6f.idField]);
}
}
};
return _71;
};
function _77(_78){
var _79=_7a(_78);
if(_79.length){
return _79[0];
}else{
return null;
}
};
function _7a(_7b){
var _7c=[];
var _7d=$(_7b).datagrid("getPanel");
_7d.find("div.datagrid-view2 div.datagrid-body tr.datagrid-row-selected").each(function(){
var id=$(this).attr("node-id");
_7c.push(_42(_7b,id));
});
return _7c;
};
function _42(_7e,_7f){
var _80=$.data(_7e,"treegrid").options;
var _81=$.data(_7e,"treegrid").data;
var cc=[_81];
while(cc.length){
var c=cc.shift();
for(var i=0;i<c.length;i++){
var _82=c[i];
if(_82[_80.idField]==_7f){
return _82;
}else{
if(_82["children"]){
cc.push(_82["children"]);
}
}
}
}
return null;
};
function _83(_84,_85){
var _86=$(_84).datagrid("getPanel").find("div.datagrid-body");
var tr=_86.find("tr[node-id="+_85+"]");
tr.addClass("datagrid-row-selected");
tr.find("div.datagrid-cell-check input[type=checkbox]").attr("checked",true);
};
function _87(_88,_89){
var _8a=$(_88).datagrid("getPanel").find("div.datagrid-body");
var tr=_8a.find("tr[node-id="+_89+"]");
tr.removeClass("datagrid-row-selected");
tr.find("div.datagrid-cell-check input[type=checkbox]").attr("checked",false);
};
function _1b(_8b){
var tr=$(_8b).datagrid("getPanel").find("div.datagrid-body tr[node-id]");
tr.addClass("datagrid-row-selected");
tr.find("div.datagrid-cell-check input[type=checkbox]").attr("checked",true);
};
function _1c(_8c){
var tr=$(_8c).datagrid("getPanel").find("div.datagrid-body tr[node-id]");
tr.removeClass("datagrid-row-selected");
tr.find("div.datagrid-cell-check input[type=checkbox]").attr("checked",false);
};
function _8d(_8e,_8f){
var _90=$.data(_8e,"treegrid").options;
var _91=$(_8e).datagrid("getPanel").find("div.datagrid-body");
var row=_42(_8e,_8f);
var tr=_91.find("tr[node-id="+_8f+"]");
var hit=tr.find("span.tree-hit");
if(hit.length==0){
return;
}
if(hit.hasClass("tree-collapsed")){
return;
}
if(_90.onBeforeCollapse.call(_8e,row)==false){
return;
}
hit.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
hit.next().removeClass("tree-folder-open");
row.state="closed";
tr=tr.next("tr.treegrid-tr-tree");
var cc=tr.children("td").children("div");
if(_90.animate){
cc.slideUp("normal",function(){
_90.onCollapse.call(_8e,row);
});
}else{
cc.hide();
_90.onCollapse.call(_8e,row);
}
};
function _92(_93,_94){
var _95=$.data(_93,"treegrid").options;
var _96=$(_93).datagrid("getPanel").find("div.datagrid-body");
var tr=_96.find("tr[node-id="+_94+"]");
var hit=tr.find("span.tree-hit");
var row=_42(_93,_94);
if(hit.length==0){
return;
}
if(hit.hasClass("tree-expanded")){
return;
}
if(_95.onBeforeExpand.call(_93,row)==false){
return;
}
hit.removeClass("tree-collapsed tree-collapsed-hover").addClass("tree-expanded");
hit.next().addClass("tree-folder-open");
var _97=tr.next("tr.treegrid-tr-tree");
if(_97.length){
var cc=_97.children("td").children("div");
_98(cc);
}else{
_29(_93,row[_95.idField]);
var _97=tr.next("tr.treegrid-tr-tree");
var cc=_97.children("td").children("div");
cc.hide();
_59(_93,row[_95.idField],{id:row[_95.idField]},true,function(){
_98(cc);
});
}
function _98(cc){
row.state="open";
if(_95.animate){
cc.slideDown("normal",function(){
_6(_93,_94);
_95.onExpand.call(_93,row);
});
}else{
cc.show();
_6(_93,_94);
_95.onExpand.call(_93,row);
}
};
};
function _99(_9a,_9b){
var _9c=$(_9a).datagrid("getPanel").find("div.datagrid-body");
var tr=_9c.find("tr[node-id="+_9b+"]");
var hit=tr.find("span.tree-hit");
if(hit.hasClass("tree-expanded")){
_8d(_9a,_9b);
}else{
_92(_9a,_9b);
}
};
function _9d(_9e,_9f){
var _a0=$.data(_9e,"treegrid").options;
var _a1=_6c(_9e,_9f);
if(_9f){
_a1.unshift(_42(_9e,_9f));
}
for(var i=0;i<_a1.length;i++){
_8d(_9e,_a1[i][_a0.idField]);
}
};
function _a2(_a3,_a4){
var _a5=$.data(_a3,"treegrid").options;
var _a6=_6c(_a3,_a4);
if(_a4){
_a6.unshift(_42(_a3,_a4));
}
for(var i=0;i<_a6.length;i++){
_92(_a3,_a6[i][_a5.idField]);
}
};
function _a7(_a8,_a9){
var _aa=$.data(_a8,"treegrid").options;
var ids=[];
var p=_69(_a8,_a9);
while(p){
var id=p[_aa.idField];
ids.unshift(id);
p=_69(_a8,id);
}
for(var i=0;i<ids.length;i++){
_92(_a8,ids[i]);
}
};
function _ab(_ac,_ad){
var _ae=$.data(_ac,"treegrid").options;
if(_ad.parent){
var _af=$(_ac).datagrid("getPanel").find("div.datagrid-body");
var tr=_af.find("tr[node-id="+_ad.parent+"]");
if(tr.next("tr.treegrid-tr-tree").length==0){
_29(_ac,_ad.parent);
}
var _b0=tr.children("td[field="+_ae.treeField+"]").children("div.datagrid-cell");
var _b1=_b0.children("span.tree-icon");
if(_b1.hasClass("tree-file")){
_b1.removeClass("tree-file").addClass("tree-folder");
var hit=$("<span class=\"tree-hit tree-expanded\"></span>").insertBefore(_b1);
if(hit.prev().length){
hit.prev().remove();
}
}
}
_34(_ac,_ad.parent,_ad.data,true);
};
function _b2(_b3,_b4){
var _b5=$.data(_b3,"treegrid").options;
var _b6=$(_b3).datagrid("getPanel").find("div.datagrid-body");
var tr=_b6.find("tr[node-id="+_b4+"]");
tr.next("tr.treegrid-tr-tree").remove();
tr.remove();
var _b7=del(_b4);
if(_b7){
if(_b7.children.length==0){
tr=_b6.find("tr[node-id="+_b7[_b5.treeField]+"]");
var _b8=tr.children("td[field="+_b5.treeField+"]").children("div.datagrid-cell");
_b8.find(".tree-icon").removeClass("tree-folder").addClass("tree-file");
_b8.find(".tree-hit").remove();
$("<span class=\"tree-indent\"></span>").prependTo(_b8);
}
}
_12(_b3);
function del(id){
var cc;
var _b9=_69(_b3,_b4);
if(_b9){
cc=_b9.children;
}else{
cc=$(_b3).treegrid("getData");
}
for(var i=0;i<cc.length;i++){
if(cc[i][_b5.treeField]==id){
cc.splice(i,1);
break;
}
}
return _b9;
};
};
function _ba(_bb,_bc){
var row=_42(_bb,_bc);
var _bd=$.data(_bb,"treegrid").options;
var _be=$(_bb).datagrid("getPanel").find("div.datagrid-body");
var tr=_be.find("tr[node-id="+_bc+"]");
tr.children("td").each(function(){
var _bf=$(this).find("div.datagrid-cell");
var _c0=$(this).attr("field");
var col=$(_bb).datagrid("getColumnOption",_c0);
if(col){
var val=null;
if(col.formatter){
val=col.formatter(row[_c0],row);
}else{
val=row[_c0]||"&nbsp;";
}
if(_c0==_bd.treeField){
_bf.children("span.tree-title").html(val);
var cls="tree-icon";
var _c1=_bf.children("span.tree-icon");
if(_c1.hasClass("tree-folder")){
cls+=" tree-folder";
}
if(_c1.hasClass("tree-folder-open")){
cls+=" tree-folder-open";
}
if(_c1.hasClass("tree-file")){
cls+=" tree-file";
}
if(row.iconCls){
cls+=" "+row.iconCls;
}
_c1.attr("class",cls);
}else{
_bf.html(val);
}
}
});
_6(_bb,_bc);
};
$.fn.treegrid=function(_c2,_c3){
if(typeof _c2=="string"){
return $.fn.treegrid.methods[_c2](this,_c3);
}
_c2=_c2||{};
return this.each(function(){
var _c4=$.data(this,"treegrid");
if(_c4){
$.extend(_c4.options,_c2);
}else{
$.data(this,"treegrid",{options:$.extend({},$.fn.treegrid.defaults,$.fn.treegrid.parseOptions(this),_c2),data:[]});
}
_1(this);
_59(this);
});
};
$.fn.treegrid.methods={options:function(jq){
return $.data(jq[0],"treegrid").options;
},resize:function(jq,_c5){
return jq.each(function(){
$(this).datagrid("resize",_c5);
});
},loadData:function(jq,_c6){
return jq.each(function(){
_34(this,null,_c6);
});
},reload:function(jq,id){
return jq.each(function(){
if(id){
var _c7=$(this).treegrid("find",id);
if(_c7.children){
_c7.children.splice(0,_c7.children.length);
}
var _c8=$(this).datagrid("getPanel").find("div.datagrid-body");
var tr=_c8.find("tr[node-id="+id+"]");
tr.next("tr.treegrid-tr-tree").remove();
var hit=tr.find("span.tree-hit");
hit.removeClass("tree-expanded tree-expanded-hover").addClass("tree-collapsed");
_92(this,id);
}else{
_59(this);
}
});
},getData:function(jq){
return $.data(jq[0],"treegrid").data;
},getRoot:function(jq){
return _64(jq[0]);
},getRoots:function(jq){
return _67(jq[0]);
},getParent:function(jq,id){
return _69(jq[0],id);
},getChildren:function(jq,id){
return _6c(jq[0],id);
},getSelected:function(jq){
return _77(jq[0]);
},getSelections:function(jq){
return _7a(jq[0]);
},find:function(jq,id){
return _42(jq[0],id);
},select:function(jq,id){
return jq.each(function(){
_83(this,id);
});
},unselect:function(jq,id){
return jq.each(function(){
_87(this,id);
});
},selectAll:function(jq){
return jq.each(function(){
_1b(this);
});
},unselectAll:function(jq){
return jq.each(function(){
_1c(this);
});
},collapse:function(jq,id){
return jq.each(function(){
_8d(this,id);
});
},expand:function(jq,id){
return jq.each(function(){
_92(this,id);
});
},toggle:function(jq,id){
return jq.each(function(){
_99(this,id);
});
},collapseAll:function(jq,id){
return jq.each(function(){
_9d(this,id);
});
},expandAll:function(jq,id){
return jq.each(function(){
_a2(this,id);
});
},expandTo:function(jq,id){
return jq.each(function(){
_a7(this,id);
});
},append:function(jq,_c9){
return jq.each(function(){
_ab(this,_c9);
});
},remove:function(jq,id){
return jq.each(function(){
_b2(this,id);
});
},refresh:function(jq,id){
return jq.each(function(){
_ba(this,id);
});
}};
$.fn.treegrid.parseOptions=function(_ca){
var t=$(_ca);
return $.extend({},$.fn.datagrid.parseOptions(_ca),{treeField:t.attr("treeField"),animate:(t.attr("animate")?t.attr("animate")=="true":undefined)});
};
$.fn.treegrid.defaults=$.extend({},$.fn.datagrid.defaults,{treeField:null,animate:false,singleSelect:true,onBeforeLoad:function(row,_cb){
},onLoadSuccess:function(row,_cc){
},onLoadError:function(){
},onBeforeCollapse:function(row){
},onCollapse:function(row){
},onBeforeExpand:function(row){
},onExpand:function(row){
},onClickRow:function(row){
},onDblClickRow:function(row){
},onContextMenu:function(e,row){
}});
})(jQuery);

