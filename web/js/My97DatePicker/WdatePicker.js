/*
 * My97 DatePicker 4.2
 * SITE: http://dp.my97.net
 * BLOG: http://my97.cnblogs.com
 * MAIL: smallcarrot@163.com
 */
var pathName = window.location.pathname.substring(1); 
var webName = pathName == '' ? '' : pathName.substring(0, pathName.indexOf('/')); 
var BaseUrl= window.location.protocol + '//' + window.location.host + '/'+ webName + '/'; 

var $dp,WdatePicker;(function(){var $={

$wdate:true,
$crossFrame:false,
$dpPath:"",
position:{},
lang:"auto",
skin:"whyGreen",
dateFmt:"yyyy-MM-dd",
realDateFmt:"yyyy-MM-dd",
realTimeFmt:"HH:mm:ss",
realFullFmt:"%Date %Time",
minDate:"1900-01-01 00:00:00",
maxDate:"2099-12-31 23:59:59",
startDate:"",
alwaysUseStartDate:false,
yearOffset:1911,
isShowWeek:false,
highLineWeekDay:true,
isShowClear:true,
isShowToday:true,
isShowOthers:true,
readOnly:false,
errDealMode:0,
autoPickDate:null,
qsEnabled:true,

disabledDates:null,disabledDays:null,opposite:false,onpicking:null,onpicked:null,onclearing:null,oncleared:null,eCont:null,vel:null,errMsg:"",quickSel:[],has:{}};WdatePicker=S;var V=window,N="document",H="documentElement",A="getElementsByTagName",T,_,R,G,Z;switch(navigator.appName){case"Microsoft Internet Explorer":R=true;break;case"Opera":Z=true;break;default:G=true;break}T=V;if($.$crossFrame){try{while(T.parent[N]!=T[N]&&T.parent[N][A]("frameset").length==0)T=T.parent}catch(P){}}_=J();if($.$wdate)K(_+BaseUrl+"skin/WdatePicker.css");var L;if(T.$dp){try{T.$dp.$("my97")}catch(P){L=P.number==-2146823277?true:false}}if(!T.$dp||L){$dp=Q({ff:G,ie:R,opera:Z,el:null,win:V,status:L?2:0,defMinDate:$.minDate,defMaxDate:$.maxDate,$:function($){return(typeof $=="string")?this.win[N].getElementById($):$},$D:function($,_){return this.$DV(this.$($).value,_)},$DV:function(_,$){if(_!=""){this.dt=$dp.cal.splitDate(_,$dp.cal.dateFmt);if($)for(var A in $){if(this.dt[A]===undefined)this.errMsg="invalid property:"+A;this.dt[A]+=$[A]}if(this.dt.refresh())return this.dt}return""},show:function(){if(this.dd)this.dd.style.display="block"},hide:function(){if(this.dd)this.dd.style.display="none"},attachEvent:C});if(!L)X(T,function(){S(null,true)})}else $dp=T.$dp;if(!V[N].docMD){C(V[N],"onmousedown",B);V[N].docMD=true}if(!T[N].docMD){C(T[N],"onmousedown",B);T[N].docMD=true}C(V,"onunload",function(){$dp.hide()});function Q(_){T.$dp=T.$dp||{};for(var $ in _)T.$dp[$]=_[$];return T.$dp}function C(A,$,_){if(R)A.attachEvent($,_);else{var B=$.replace(/on/,"");_._ieEmuEventHandler=function($){return _($)};A.addEventListener(B,_._ieEmuEventHandler,false)}}function J(){var _,A,$=document.getElementsByTagName("script");for(var B=0;B<$.length;B++){_=$[B].src.substring(0,$[B].src.toLowerCase().indexOf("wdatepicker.js"));A=_.lastIndexOf("/");if(A>0)_=_.substring(0,A+1);if(_)break}return _}function D(F){var E,C;if(F.substring(0,1)!="/"&&F.indexOf("://")==-1){E=T.location.href;C=location.href;if(E.indexOf("?")>-1)E=E.substring(0,E.indexOf("?"));if(C.indexOf("?")>-1)C=C.substring(0,C.indexOf("?"));var _="",D="",A="",H,G,B="";for(H=0;H<Math.max(E.length,C.length);H++)if(E.charAt(H).toLowerCase()!=C.charAt(H).toLowerCase()){G=H;while(E.charAt(G)!="/"){if(G==0)break;G-=1}_=E.substring(G+1,E.length);_=_.substring(0,_.lastIndexOf("/"));D=C.substring(G+1,C.length);D=D.substring(0,D.lastIndexOf("/"));break}if(_!="")for(H=0;H<_.split("/").length;H++)B+="../";if(D!="")B+=D+"/";F=E.substring(0,E.lastIndexOf("/")+1)+B+F}$.$dpPath=F}function K(C,$,D){var B=V[N],E=B[A]("HEAD").item(0),_=B.createElement("link");_.href=C;_.rel="stylesheet";_.type="text/css";if($)_.title=$;if(D)_.charset=D;E.appendChild(_)}function X($,_){C($,"onload",_)}function E($){$=$||T;var B=0,_=0;while($!=T){var D=$.parent[N][A]("iframe");for(var F=0;F<D.length;F++){try{if(D[F].contentWindow==$){var E=U(D[F]);B+=E.left;_+=E.top;break}}catch(C){}}$=$.parent}return{"leftM":B,"topM":_}}function U(E){if(R)return E.getBoundingClientRect();else{var A={ROOT_TAG:/^body|html$/i,OP_SCROLL:/^(?:inline|table-row)$/i},G=null,_=E.offsetTop,F=E.offsetLeft,D=E.offsetWidth,B=E.offsetHeight,C=E.offsetParent;if(C!=E)while(C){F+=C.offsetLeft;_+=C.offsetTop;if(C.tagName.toLowerCase()=="body")G=C.ownerDocument.defaultView;C=C.offsetParent}C=E.parentNode;while(C.tagName&&!A.ROOT_TAG.test(C.tagName)){if(C.scrollTop||C.scrollLeft)if(!A.OP_SCROLL.test(C.style.display))if(!Z||C.style.overflow!=="visible"){F-=C.scrollLeft;_-=C.scrollTop}C=C.parentNode}var $=Y(G);F-=$.left;_-=$.top;D+=F;B+=_;return{"left":F,"top":_,"right":D,"bottom":B}}}function M($){$=$||T;var _=$[N];_=_[H]&&_[H].clientHeight&&_[H].clientHeight<=_.body.clientHeight?_[H]:_.body;return{"width":_.clientWidth,"height":_.clientHeight}}function Y($){$=$||T;var B=$[N],A=B[H],_=B.body;B=(A&&A.scrollTop!=null&&(A.scrollTop>_.scrollLeft||A.scrollLeft>_.scrollLeft))?A:_;return{"top":B.scrollTop,"left":B.scrollLeft}}function B(_){src=_?(_.srcElement||_.target):null;if($dp&&$dp.dd&&$dp.dd.style.display=="block"&&src!=$dp.el){var A=$dp.el,B=$dp.cal,$=$dp.el[$dp.elProp];if($!=null){$dp.$w.hideSel();if($!=""&&!$dp.readOnly)B.date.loadFromDate(B.splitDate($,B.dateFmt));if($==""||(B.isDate(B.date)&&B.isTime(B.date)&&B.checkValid(B.date))){B.mark(true);if($!="")B.update();else B.setRealValue("");$dp.hide()}else B.mark(false)}else $dp.hide()}}var O=[];function W(){$dp.status=2;F()}function F(){if(O.length>0){var $=O.shift();$.el={innerHTML:""};$.eCont=$dp.$($.eCont);$.autoPickDate=true;$.qsEnabled=false;I($)}}function S(C,$){$dp.win=V;C=C||{};if($){$dp.status=1;I({el:{innerHTML:""}},true)}else if(C.eCont){O.push(C);if($dp.status==2)F()}else{if($dp.status==0)$dp.status=1;if($dp.status!=2)return;var B,A=_();if(A){B=A.srcElement||A.target;A.cancelBubble=true}C.el=$dp.$(C.el||B);if(!C.el||C.el&&C.el.disabled||(C.el==$dp.el&&$dp.dd.style.display!="none"&&$dp.dd.style.left!="-1970px"))return;I(C)}function _(){if(G){func=_.caller;while(func!=null){var $=func.arguments[0];if($&&($+"").indexOf("Event")>=0)return $;func=func.caller}return null}return event}}function I(G,A){for(var F in $)if(F.substring(0,1)!="$")$dp[F]=$[F];for(F in G)if($dp[F]===undefined)$dp.errMsg="invalid property:"+F;else $dp[F]=G[F];$dp.elProp=$dp.el&&$dp.el.nodeName=="INPUT"?"value":"innerHTML";if($dp.el[$dp.elProp]==null)return;if($dp.lang=="auto")$dp.lang=R?navigator.browserLanguage.toLowerCase():navigator.language.toLowerCase();if(!$dp.dd||$dp.eCont||($dp.lang&&$dp.realLang&&$dp.realLang.name!=$dp.lang)){if($dp.dd&&!$dp.eCont)T[N].body.removeChild($dp.dd);if($.$dpPath=="")D(_);var B="<iframe src=\""+$.$dpPath+"My97DatePicker.htm\" frameborder=\"0\" border=\"0\" scrolling=\"no\"></iframe>";if($dp.eCont){$dp.eCont.innerHTML=B;X($dp.eCont.childNodes[0],W)}else{$dp.dd=T[N].createElement("DIV");$dp.dd.style.cssText="position:absolute;z-index:19700";$dp.dd.innerHTML=B;T[N].body.appendChild($dp.dd);X($dp.dd.childNodes[0],W);if(A)$dp.dd.style.left=$dp.dd.style.top="-1970px";else{$dp.show();C()}}}else if($dp.cal){$dp.show();$dp.cal.init();C()}function C(){var F=$dp.position.left,B=$dp.position.top,G=U($dp.el),$=E(V),C=M(T),A=Y(T),D=$dp.dd.offsetHeight,_=$dp.dd.offsetWidth;if(isNaN(B)){if(B=="above"||(B!="under"&&(($.topM+G.bottom+D>C.height)&&($.topM+G.top-D>0))))B=A.top+$.topM+G.top-D-3;else B=A.top+$.topM+G.bottom;B+=R?-1:1}else B+=A.top+$.topM;if(isNaN(F))F=A.left+Math.min($.leftM+G.left,C.width-_-5)-(R?2:0);else F+=A.left+$.leftM;$dp.dd.style.top=B+"px";$dp.dd.style.left=F+"px"}}})()