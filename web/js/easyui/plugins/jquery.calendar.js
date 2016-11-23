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
var _3=$.data(_2,"calendar").options;
var t=$(_2);
if(_3.fit==true){
var p=t.parent();
_3.width=p.width();
_3.height=p.height();
}
var _4=t.find(".calendar-header");
if($.boxModel==true){
t.width(_3.width-(t.outerWidth()-t.width()));
t.height(_3.height-(t.outerHeight()-t.height()));
}else{
t.width(_3.width);
t.height(_3.height);
}
var _5=t.find(".calendar-body");
var _6=t.height()-_4.outerHeight();
if($.boxModel==true){
_5.height(_6-(_5.outerHeight()-_5.height()));
}else{
_5.height(_6);
}
};
function _7(_8){
$(_8).addClass("calendar").wrapInner("<div class=\"calendar-header\">"+"<div class=\"calendar-prevmonth\"></div>"+"<div class=\"calendar-nextmonth\"></div>"+"<div class=\"calendar-prevyear\"></div>"+"<div class=\"calendar-nextyear\"></div>"+"<div class=\"calendar-title\">"+"<span>Aprial 2010</span>"+"</div>"+"</div>"+"<div class=\"calendar-body\">"+"<div class=\"calendar-menu\">"+"<div class=\"calendar-menu-year-inner\">"+"<span class=\"calendar-menu-prev\"></span>"+"<span><input class=\"calendar-menu-year\" type=\"text\"></input></span>"+"<span class=\"calendar-menu-next\"></span>"+"</div>"+"<div class=\"calendar-menu-month-inner\">"+"</div>"+"</div>"+"</div>");
$(_8).find(".calendar-title span").hover(function(){
$(this).addClass("calendar-menu-hover");
},function(){
$(this).removeClass("calendar-menu-hover");
}).click(function(){
var _9=$(_8).find(".calendar-menu");
if(_9.is(":visible")){
_9.hide();
}else{
_16(_8);
}
});
$(".calendar-prevmonth,.calendar-nextmonth,.calendar-prevyear,.calendar-nextyear",_8).hover(function(){
$(this).addClass("calendar-nav-hover");
},function(){
$(this).removeClass("calendar-nav-hover");
});
$(_8).find(".calendar-nextmonth").click(function(){
_b(_8,1);
});
$(_8).find(".calendar-prevmonth").click(function(){
_b(_8,-1);
});
$(_8).find(".calendar-nextyear").click(function(){
_11(_8,1);
});
$(_8).find(".calendar-prevyear").click(function(){
_11(_8,-1);
});
$(_8).bind("_resize",function(){
var _a=$.data(_8,"calendar").options;
if(_a.fit==true){
_1(_8);
}
return false;
});
};
function _b(_c,_d){
var _e=$.data(_c,"calendar").options;
_e.month+=_d;
if(_e.month>12){
_e.year++;
_e.month=1;
}else{
if(_e.month<1){
_e.year--;
_e.month=12;
}
}
_f(_c);
var _10=$(_c).find(".calendar-menu-month-inner");
_10.find("td.calendar-selected").removeClass("calendar-selected");
_10.find("td:eq("+(_e.month-1)+")").addClass("calendar-selected");
};
function _11(_12,_13){
var _14=$.data(_12,"calendar").options;
_14.year+=_13;
_f(_12);
var _15=$(_12).find(".calendar-menu-year");
_15.val(_14.year);
};
function _16(_17){
var _18=$.data(_17,"calendar").options;
$(_17).find(".calendar-menu").show();
if($(_17).find(".calendar-menu-month-inner").is(":empty")){
$(_17).find(".calendar-menu-month-inner").empty();
var t=$("<table></table>").appendTo($(_17).find(".calendar-menu-month-inner"));
var idx=0;
for(var i=0;i<3;i++){
var tr=$("<tr></tr>").appendTo(t);
for(var j=0;j<4;j++){
$("<td class=\"calendar-menu-month\"></td>").html(_18.months[idx++]).attr("abbr",idx).appendTo(tr);
}
}
$(_17).find(".calendar-menu-prev,.calendar-menu-next").hover(function(){
$(this).addClass("calendar-menu-hover");
},function(){
$(this).removeClass("calendar-menu-hover");
});
$(_17).find(".calendar-menu-next").click(function(){
var y=$(_17).find(".calendar-menu-year");
if(!isNaN(y.val())){
y.val(parseInt(y.val())+1);
}
});
$(_17).find(".calendar-menu-prev").click(function(){
var y=$(_17).find(".calendar-menu-year");
if(!isNaN(y.val())){
y.val(parseInt(y.val()-1));
}
});
$(_17).find(".calendar-menu-year").keypress(function(e){
if(e.keyCode==13){
_19();
}
});
$(_17).find(".calendar-menu-month").hover(function(){
$(this).addClass("calendar-menu-hover");
},function(){
$(this).removeClass("calendar-menu-hover");
}).click(function(){
var _1a=$(_17).find(".calendar-menu");
_1a.find(".calendar-selected").removeClass("calendar-selected");
$(this).addClass("calendar-selected");
_19();
});
}
function _19(){
var _1b=$(_17).find(".calendar-menu");
var _1c=_1b.find(".calendar-menu-year").val();
var _1d=_1b.find(".calendar-selected").attr("abbr");
if(!isNaN(_1c)){
_18.year=parseInt(_1c);
_18.month=parseInt(_1d);
_f(_17);
}
_1b.hide();
};
var _1e=$(_17).find(".calendar-body");
var _1f=$(_17).find(".calendar-menu");
var _20=_1f.find(".calendar-menu-year-inner");
var _21=_1f.find(".calendar-menu-month-inner");
_20.find("input").val(_18.year).focus();
_21.find("td.calendar-selected").removeClass("calendar-selected");
_21.find("td:eq("+(_18.month-1)+")").addClass("calendar-selected");
if($.boxModel==true){
_1f.width(_1e.outerWidth()-(_1f.outerWidth()-_1f.width()));
_1f.height(_1e.outerHeight()-(_1f.outerHeight()-_1f.height()));
_21.height(_1f.height()-(_21.outerHeight()-_21.height())-_20.outerHeight());
}else{
_1f.width(_1e.outerWidth());
_1f.height(_1e.outerHeight());
_21.height(_1f.height()-_20.outerHeight());
}
};
function _22(_23,_24){
var _25=[];
var _26=new Date(_23,_24,0).getDate();
for(var i=1;i<=_26;i++){
_25.push([_23,_24,i]);
}
var _27=[],_28=[];
while(_25.length>0){
var _29=_25.shift();
_28.push(_29);
if(new Date(_29[0],_29[1]-1,_29[2]).getDay()==6){
_27.push(_28);
_28=[];
}
}
if(_28.length){
_27.push(_28);
}
var _2a=_27[0];
if(_2a.length<7){
while(_2a.length<7){
var _2b=_2a[0];
var _29=new Date(_2b[0],_2b[1]-1,_2b[2]-1);
_2a.unshift([_29.getFullYear(),_29.getMonth()+1,_29.getDate()]);
}
}else{
var _2b=_2a[0];
var _28=[];
for(var i=1;i<=7;i++){
var _29=new Date(_2b[0],_2b[1]-1,_2b[2]-i);
_28.unshift([_29.getFullYear(),_29.getMonth()+1,_29.getDate()]);
}
_27.unshift(_28);
}
var _2c=_27[_27.length-1];
while(_2c.length<7){
var _2d=_2c[_2c.length-1];
var _29=new Date(_2d[0],_2d[1]-1,_2d[2]+1);
_2c.push([_29.getFullYear(),_29.getMonth()+1,_29.getDate()]);
}
if(_27.length<6){
var _2d=_2c[_2c.length-1];
var _28=[];
for(var i=1;i<=7;i++){
var _29=new Date(_2d[0],_2d[1]-1,_2d[2]+i);
_28.push([_29.getFullYear(),_29.getMonth()+1,_29.getDate()]);
}
_27.push(_28);
}
return _27;
};
function _f(_2e){
var _2f=$.data(_2e,"calendar").options;
$(_2e).find(".calendar-title span").html(_2f.months[_2f.month-1]+" "+_2f.year);
var _30=$(_2e).find("div.calendar-body");
_30.find(">table").remove();
var t=$("<table cellspacing=\"0\" cellpadding=\"0\" border=\"0\"><thead></thead><tbody></tbody></table>").prependTo(_30);
var tr=$("<tr></tr>").appendTo(t.find("thead"));
for(var i=0;i<_2f.weeks.length;i++){
tr.append("<th>"+_2f.weeks[i]+"</th>");
}
var _31=_22(_2f.year,_2f.month);
for(var i=0;i<_31.length;i++){
var _32=_31[i];
var tr=$("<tr></tr>").appendTo(t.find("tbody"));
for(var j=0;j<_32.length;j++){
var day=_32[j];
$("<td class=\"calendar-day calendar-other-month\"></td>").attr("abbr",day[0]+","+day[1]+","+day[2]).html(day[2]).appendTo(tr);
}
}
t.find("td[abbr^="+_2f.year+","+_2f.month+"]").removeClass("calendar-other-month");
var now=new Date();
var _33=now.getFullYear()+","+(now.getMonth()+1)+","+now.getDate();
t.find("td[abbr="+_33+"]").addClass("calendar-today");
if(_2f.current){
t.find(".calendar-selected").removeClass("calendar-selected");
var _34=_2f.current.getFullYear()+","+(_2f.current.getMonth()+1)+","+_2f.current.getDate();
t.find("td[abbr="+_34+"]").addClass("calendar-selected");
}
t.find("tr").find("td:first").addClass("calendar-sunday");
t.find("tr").find("td:last").addClass("calendar-saturday");
t.find("td").hover(function(){
$(this).addClass("calendar-hover");
},function(){
$(this).removeClass("calendar-hover");
}).click(function(){
t.find(".calendar-selected").removeClass("calendar-selected");
$(this).addClass("calendar-selected");
var _35=$(this).attr("abbr").split(",");
_2f.current=new Date(_35[0],parseInt(_35[1])-1,_35[2]);
_2f.onSelect.call(_2e,_2f.current);
});
};
$.fn.calendar=function(_36,_37){
if(typeof _36=="string"){
return $.fn.calendar.methods[_36](this,_37);
}
_36=_36||{};
return this.each(function(){
var _38=$.data(this,"calendar");
if(_38){
$.extend(_38.options,_36);
}else{
_38=$.data(this,"calendar",{options:$.extend({},$.fn.calendar.defaults,$.fn.calendar.parseOptions(this),_36)});
_7(this);
}
if(_38.options.border==false){
$(this).addClass("calendar-noborder");
}
_1(this);
_f(this);
$(this).find("div.calendar-menu").hide();
});
};
$.fn.calendar.methods={options:function(jq){
return $.data(jq[0],"calendar").options;
},resize:function(jq){
return jq.each(function(){
_1(this);
});
},moveTo:function(jq,_39){
return jq.each(function(){
$(this).calendar({year:_39.getFullYear(),month:_39.getMonth()+1,current:_39});
});
}};
$.fn.calendar.parseOptions=function(_3a){
var t=$(_3a);
return {width:(parseInt(_3a.style.width)||undefined),height:(parseInt(_3a.style.height)||undefined),fit:(t.attr("fit")?t.attr("fit")=="true":undefined),border:(t.attr("border")?t.attr("border")=="true":undefined)};
};
$.fn.calendar.defaults={width:180,height:180,fit:false,border:true,weeks:["S","M","T","W","T","F","S"],months:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],year:new Date().getFullYear(),month:new Date().getMonth()+1,current:new Date(),onSelect:function(_3b){
}};
})(jQuery);

