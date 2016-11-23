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
var _4=$.data(_2,"combo").options;
var _5=$.data(_2,"combo").combo;
var _6=$.data(_2,"combo").panel;
if(_3){
_4.width=_3;
}
_5.appendTo("body");
if(isNaN(_4.width)){
_4.width=_5.find("input.combo-text").outerWidth();
}
var _7=0;
if(_4.hasDownArrow){
_7=_5.find(".combo-arrow").outerWidth();
}
var _3=_4.width-_7;
if($.boxModel==true){
_3-=_5.outerWidth()-_5.width();
}
_5.find("input.combo-text").width(_3);
_6.panel("resize",{width:(_4.panelWidth?_4.panelWidth:_5.outerWidth()),height:_4.panelHeight});
_5.insertAfter(_2);
};
function _8(_9){
var _a=$.data(_9,"combo").options;
var _b=$.data(_9,"combo").combo;
if(_a.hasDownArrow){
_b.find(".combo-arrow").show();
}else{
_b.find(".combo-arrow").hide();
}
};
function _c(_d){
$(_d).addClass("combo-f").hide();
var _e=$("<span class=\"combo\"></span>").insertAfter(_d);
var _f=$("<input type=\"text\" class=\"combo-text\">").appendTo(_e);
$("<span><span class=\"combo-arrow\"></span></span>").appendTo(_e);
$("<input type=\"hidden\" class=\"combo-value\">").appendTo(_e);
var _10=$("<div class=\"combo-panel\"></div>").appendTo("body");
_10.panel({doSize:false,closed:true,style:{position:"absolute",zIndex:10},onOpen:function(){
$(this).panel("resize");
}});
var _11=$(_d).attr("name");
if(_11){
_e.find("input.combo-value").attr("name",_11);
$(_d).removeAttr("name").attr("comboName",_11);
}
_f.attr("autocomplete","off");
return {combo:_e,panel:_10};
};
function _12(_13){
var _14=$.data(_13,"combo").combo.find("input.combo-text");
_14.validatebox("destroy");
$.data(_13,"combo").panel.panel("destroy");
$.data(_13,"combo").combo.remove();
$(_13).remove();
};
function _15(_16){
var _17=$.data(_16,"combo").options;
var _18=$.data(_16,"combo").combo;
var _19=$.data(_16,"combo").panel;
var _1a=_18.find(".combo-text");
var _1b=_18.find(".combo-arrow");
$(document).unbind(".combo");
_18.unbind(".combo");
_19.unbind(".combo");
_1a.unbind(".combo");
_1b.unbind(".combo");
if(!_17.disabled){
$(document).bind("mousedown.combo",function(e){
$("div.combo-panel").panel("close");
});
_19.bind("mousedown.combo",function(e){
return false;
});
_1a.bind("mousedown.combo",function(e){
e.stopPropagation();
}).bind("keydown.combo",function(e){
switch(e.keyCode){
case 38:
_17.keyHandler.up.call(_16);
break;
case 40:
_17.keyHandler.down.call(_16);
break;
case 13:
e.preventDefault();
_17.keyHandler.enter.call(_16);
return false;
case 9:
case 27:
_22(_16);
break;
default:
if(_17.editable){
setTimeout(function(){
var q=_1a.val();
if($.data(_16,"combo").previousValue!=q){
$.data(_16,"combo").previousValue=q;
_1c(_16);
_17.keyHandler.query.call(_16,_1a.val());
_26(_16,true);
}
},10);
}
}
});
_1b.bind("click.combo",function(){
_1a.focus();
_1c(_16);
}).bind("mouseenter.combo",function(){
$(this).addClass("combo-arrow-hover");
}).bind("mouseleave.combo",function(){
$(this).removeClass("combo-arrow-hover");
});
}
};
function _1c(_1d){
var _1e=$.data(_1d,"combo").options;
var _1f=$.data(_1d,"combo").combo;
var _20=$.data(_1d,"combo").panel;
if($.fn.window){
_20.panel("panel").css("z-index",$.fn.window.defaults.zIndex++);
}
_20.panel("move",{left:_1f.offset().left,top:_21()});
_20.panel("open");
_1e.onShowPanel.call(_1d);
(function(){
if(_20.is(":visible")){
_20.panel("move",{left:_1f.offset().left,top:_21()});
setTimeout(arguments.callee,200);
}
})();
function _21(){
var top=_1f.offset().top+_1f.outerHeight();
if(top+_20.outerHeight()>$(window).height()+$(document).scrollTop()){
top=_1f.offset().top-_20.outerHeight();
}
if(top<$(document).scrollTop()){
top=_1f.offset().top+_1f.outerHeight();
}
return top;
};
};
function _22(_23){
var _24=$.data(_23,"combo").options;
var _25=$.data(_23,"combo").panel;
_25.panel("close");
_24.onHidePanel.call(_23);
};
function _26(_27,_28){
var _29=$.data(_27,"combo").options;
var _2a=$.data(_27,"combo").combo.find("input.combo-text");
_2a.validatebox(_29);
if(_28){
_2a.validatebox("validate");
_2a.trigger("mouseleave");
}
};
function _2b(_2c,_2d){
var _2e=$.data(_2c,"combo").options;
var _2f=$.data(_2c,"combo").combo;
if(_2d){
_2e.disabled=true;
$(_2c).attr("disabled",true);
_2f.find(".combo-value").attr("disabled",true);
_2f.find(".combo-text").attr("disabled",true);
}else{
_2e.disabled=false;
$(_2c).removeAttr("disabled");
_2f.find(".combo-value").removeAttr("disabled");
_2f.find(".combo-text").removeAttr("disabled");
}
};
function _30(_31){
var _32=$.data(_31,"combo").options;
var _33=$.data(_31,"combo").combo;
if(_32.multiple){
_33.find("input.combo-value").remove();
}else{
_33.find("input.combo-value").val("");
}
_33.find("input.combo-text").val("");
};
function _34(_35){
var _36=$.data(_35,"combo").combo;
return _36.find("input.combo-text").val();
};
function _37(_38,_39){
var _3a=$.data(_38,"combo").combo;
_3a.find("input.combo-text").val(_39);
_26(_38,true);
$.data(_38,"combo").previousValue=_39;
};
function _3b(_3c){
var _3d=[];
var _3e=$.data(_3c,"combo").combo;
_3e.find("input.combo-value").each(function(){
_3d.push($(this).val());
});
return _3d;
};
function _3f(_40,_41){
var _42=$.data(_40,"combo").options;
var _43=_3b(_40);
var _44=$.data(_40,"combo").combo;
_44.find("input.combo-value").remove();
var _45=$(_40).attr("comboName");
for(var i=0;i<_41.length;i++){
var _46=$("<input type=\"hidden\" class=\"combo-value\">").appendTo(_44);
if(_45){
_46.attr("name",_45);
}
_46.val(_41[i]);
}
var tmp=[];
for(var i=0;i<_43.length;i++){
tmp[i]=_43[i];
}
var aa=[];
for(var i=0;i<_41.length;i++){
for(var j=0;j<tmp.length;j++){
if(_41[i]==tmp[j]){
aa.push(_41[i]);
tmp.splice(j,1);
break;
}
}
}
if(aa.length!=_41.length||_41.length!=_43.length){
if(_42.multiple){
_42.onChange.call(_40,_41,_43);
}else{
_42.onChange.call(_40,_41[0],_43[0]);
}
}
};
function _47(_48){
var _49=_3b(_48);
return _49[0];
};
function _4a(_4b,_4c){
_3f(_4b,[_4c]);
};
function _4d(_4e){
var _4f=$.data(_4e,"combo").options;
if(_4f.multiple){
if(_4f.value){
if(typeof _4f.value=="object"){
_3f(_4e,_4f.value);
}else{
_4a(_4e,_4f.value);
}
}else{
_3f(_4e,[]);
}
}else{
_4a(_4e,_4f.value);
}
};
$.fn.combo=function(_50,_51){
if(typeof _50=="string"){
return $.fn.combo.methods[_50](this,_51);
}
_50=_50||{};
return this.each(function(){
var _52=$.data(this,"combo");
if(_52){
$.extend(_52.options,_50);
}else{
var r=_c(this);
_52=$.data(this,"combo",{options:$.extend({},$.fn.combo.defaults,$.fn.combo.parseOptions(this),_50),combo:r.combo,panel:r.panel,previousValue:null});
$(this).removeAttr("disabled");
}
$("input.combo-text",_52.combo).attr("readonly",!_52.options.editable);
_8(this);
_2b(this,_52.options.disabled);
_1(this);
_15(this);
_26(this);
_4d(this);
});
};
$.fn.combo.methods={options:function(jq){
return $.data(jq[0],"combo").options;
},panel:function(jq){
return $.data(jq[0],"combo").panel;
},textbox:function(jq){
return $.data(jq[0],"combo").combo.find("input.combo-text");
},destroy:function(jq){
return jq.each(function(){
_12(this);
});
},resize:function(jq,_53){
return jq.each(function(){
_1(this,_53);
});
},showPanel:function(jq){
return jq.each(function(){
_1c(this);
});
},hidePanel:function(jq){
return jq.each(function(){
_22(this);
});
},disable:function(jq){
return jq.each(function(){
_2b(this,true);
_15(this);
});
},enable:function(jq){
return jq.each(function(){
_2b(this,false);
_15(this);
});
},validate:function(jq){
return jq.each(function(){
_26(this,true);
});
},isValid:function(jq){
var _54=$.data(jq[0],"combo").combo.find("input.combo-text");
return _54.validatebox("isValid");
},clear:function(jq){
return jq.each(function(){
_30(this);
});
},getText:function(jq){
return _34(jq[0]);
},setText:function(jq,_55){
return jq.each(function(){
_37(this,_55);
});
},getValues:function(jq){
return _3b(jq[0]);
},setValues:function(jq,_56){
return jq.each(function(){
_3f(this,_56);
});
},getValue:function(jq){
return _47(jq[0]);
},setValue:function(jq,_57){
return jq.each(function(){
_4a(this,_57);
});
}};
$.fn.combo.parseOptions=function(_58){
var t=$(_58);
return $.extend({},$.fn.validatebox.parseOptions(_58),{width:(parseInt(_58.style.width)||undefined),panelWidth:(parseInt(t.attr("panelWidth"))||undefined),panelHeight:(t.attr("panelHeight")=="auto"?"auto":parseInt(t.attr("panelHeight"))||undefined),separator:(t.attr("separator")||undefined),multiple:(t.attr("multiple")?(t.attr("multiple")=="true"||t.attr("multiple")==true):undefined),editable:(t.attr("editable")?t.attr("editable")=="true":undefined),disabled:(t.attr("disabled")?true:undefined),hasDownArrow:(t.attr("hasDownArrow")?t.attr("hasDownArrow")=="true":undefined),value:(t.val()||undefined)});
};
$.fn.combo.defaults=$.extend({},$.fn.validatebox.defaults,{width:"auto",panelWidth:null,panelHeight:200,multiple:false,separator:",",editable:true,disabled:false,hasDownArrow:true,value:"",keyHandler:{up:function(){
},down:function(){
},enter:function(){
},query:function(q){
}},onShowPanel:function(){
},onHidePanel:function(){
},onChange:function(_59,_5a){
}});
})(jQuery);

