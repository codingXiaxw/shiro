CONTEXT_URL = "/XXLTEST";
var pathName = window.location.pathname.substring(1); 
var webName = pathName == '' ? '' : pathName.substring(0, pathName.indexOf('/')); 
var BaseUrl= window.location.protocol + '//' + window.location.host + '/'+ webName + '/'; 
/**
 * ajax请求时的参数设定
 * 
 * 参数说明：
 * requestDataType------------------提交ajax请求的数据类型[form:以FORM形式提交数据,json:以JSON形式提交数据,pame:以URL参数形式提交数据]
 * requestData----------------------提交ajax请求的数据[requestDataType是form时此为form的ID,是json时此为json数据,是pame时此为URL参数]
 * requestUrl-----------------------ajax请求的URL
 * asyncFlg-------------------------ajax请求是否是异步请求[true:异步请求，false：同步请求]
 * isLoadingFlg---------------------ajax请求时是否显示页面遮挡层[true:显示,false:不显示]
 * returnDataType-------------------返回数据的类型[html:返回纯文本HTML信息,json:返回JSON数据]
 * htmlElementId--------------------要设置值的页面元素Id
 * callBackMethodParameter----------在回调方法是function的时候，每一个方法传递的参数，由此变量来传递
 * 
 */
function AjaxOption() {
    this.requestType = ''; 
    this.requestDataType = ''; // [form:以FORM形式提交数据,json:以JSON形式提交数据,pame:以URL参数形式提交数据]
    this.requestData = ''; // [requestDataType是form时此为form的ID,是json时此为json数据,是pame时此为URL参数]
    this.requestUrl = null;
    this.asyncFlg = null; // [true:异步请求，false：同步请求]
    //this.isLoadingFlg = null; // ajax请求时是否显示页面遮挡层[true:显示,false:不显示]
    this.returnDataType = ''; // [html:返回纯文本HTML信息,json:返回JSON数据]
    this.callBackMethodParameter = null; // 在回调方法是function的时候，每一个方法传递的参数，由此变量来传递（在异步请求时，回调方法带参数时使用）
    this._getRequestData = function(){
        if(this.requestDataType == 'form'){
            return $("#" + this.requestData).serialize();
        }else if(this.requestDataType == 'json'){
            return JSON.stringify(this.requestData);
        }else if(this.requestDataType == 'pame'){
            return this.requestData;
        }
    };
    this._getContentType = function(){
        if(this.requestDataType == 'json'){
            return "application/json; charset=utf-8";
        }else{
            return "application/x-www-form-urlencoded; charset=utf-8";
        }
        
    };
    
    this._initGetRequest = function(async,url,requestDataType,returnDataType){
    	this.asyncFlg = async;
    	this.requestType = 'GET';
    	this.requestUrl = url;
    	this.requestDataType = requestDataType;
    	this.returnDataType = returnDataType;
    	this.requestData = 'pame';
    };
    
    //post方式
    this._initPostRequest = function(async,url,requestDataType,returnDataType,requestData){
    	this.asyncFlg = async;
    	this.requestType = 'POST';
    	this.requestUrl = url;
    	this.requestDataType = requestDataType;
    	this.returnDataType = returnDataType;
    	this.requestData = requestData;
    };

    // get方式取得页面模板静态缓存HTML(此方法不要使用URL传递参数)
    this._initGetRequestReturnStaticHtml = function(async, isLoading, url){
        this.requestType = 'GET';
        this.requestDataType = 'pame';
        this.requestUrl = url;//追加静态资源过期时间
	    this.asyncFlg = async;
	    //this.isLoadingFlg = isLoading;
	    this.returnDataType = 'html';
    };
   
    // post方式提交，取得HTML资源
    this._initPostRequestReturnHtml = function(dataType, requestdata, async, isLoading, url){
        this.requestType = 'POST';
        this.requestDataType = dataType;
        this.requestData = requestdata;
        this.requestUrl = url;
        this.asyncFlg = async;
        //this.isLoadingFlg = isLoading;
        this.returnDataType = 'html';
    };
    // post方式提交，取得JSON资源
    this._initPostRequestReturnJson = function(dataType, requestdata, async, isLoading, url){
        this.requestType = 'POST';
        this.requestDataType = dataType;
        this.requestData = requestdata;
        this.requestUrl = url;
        this.asyncFlg = async;
        //this.isLoadingFlg = isLoading;
        this.returnDataType = 'json';
    };
};

/**
 * ajax请求：通过GET方式取得静态缓存资源
 * 
 * 参数说明：
 * url-------------------------------ajax请求时的参数
 * htmlElementId---------------------要设置值的页面元素Id
 * callBackMethod--------------------回调函数名
 * 
 */
function _ajaxGetRequest(ajaxOption, htmlElementId, callBackMethod) {
    $.ajax({
        async : ajaxOption.asyncFlg,
        cache : true,
        type : ajaxOption.requestType,
        url : ajaxOption.requestUrl,
        data : ajaxOption._getRequestData(),
        dataType : ajaxOption.returnDataType,
        contentType : ajaxOption._getContentType(),
        timeout :30000,
        beforeSend : function(XMLHttpRequest) {
//            currentlyAjaxRequestCount += 1;
            // keep-Alive 是为了减少每一次http请求，服务器都要打开一个socket连接
            // 追加此请求头后，可以在一个单独的连接上进行多个请求。
            XMLHttpRequest.setRequestHeader('Connection', 'keep-alive');
           /* if(ajaxOption.isLoadingFlg == true){
                showLoadingNew();
            }*/
        },
        success : function(returnData, textStatus) {
//            currentlyAjaxRequestCount -= 1;
            if(typeof callBackMethod == 'function'){// 如何回写页面的方法参数，传递得是一个function的话，只把请求回来的数据传给这个function，共通不会自动调用回写画面方法。
                callBackMethod(returnData, ajaxOption.callBackMethodParameter);
            }else{// 如何回写页面的方法参数，传递得是一个方法名的话，共通会自动调用回写画面方法。
                if(ajaxOption.returnDataType == 'json'){
                    _callBackObjForJson(returnData, htmlElementId);
                }else{
                    _callBackObjForHtml(returnData, htmlElementId);
                }
                if(callBackMethod){
                    eval(callBackMethod + "()");
                }
            }
        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
//            currentlyAjaxRequestCount -= 1;
            //reportErrorNew(XMLHttpRequest, textStatus, errorThrown);
        }
    }).done(function(){
        hideLoadingNew();
    });
}
/**
 * ajax请求：通过POST方式取得资源
 * 
 * 参数说明：
 * url-------------------------------ajax请求时的参数
 * htmlElementId---------------------要设置值的页面元素Id
 * callBackMethod--------------------回调函数名
 * 
 */
function _ajaxPostRequest(ajaxOption, htmlElementId, callBackMethod) {
    $.ajax({
        async : ajaxOption.asyncFlg,
        cache : false,
        type : ajaxOption.requestType,
        url : ajaxOption.requestUrl,
        data : ajaxOption._getRequestData(),
        dataType : ajaxOption.returnDataType,
        contentType : ajaxOption._getContentType(),
        timeout : 30000,
        beforeSend : function(XMLHttpRequest) {
//            currentlyAjaxRequestCount += 1;
            // keep-Alive 是为了减少每一次http请求，服务器都要打开一个socket连接
            // 追加此请求头后，可以在一个单独的连接上进行多个请求。
            XMLHttpRequest.setRequestHeader('Connection', 'keep-alive');
            //$("body").append('<div  id="load" style="left:400px; position:absolute; top:250px"><img src="'+BaseUrl+'images/loading2.gif" /></div>'); 
        },
        success : function(returnData, textStatus) {
//            currentlyAjaxRequestCount -= 1;
            if(typeof callBackMethod == 'function'){// 如何回写页面的方法参数，传递得是一个function的话，只把请求回来的数据传给这个function，共通不会自动调用回写画面方法。
            	callBackMethod(returnData, ajaxOption.callBackMethodParameter);
            }else{// 如何回写页面的方法参数，传递得是一个方法名的话，共通会自动调用回写画面方法。
                if(ajaxOption.returnDataType == 'json'){
                    _callBackObjForJson(returnData, htmlElementId);
                }else{
                    _callBackObjForHtml(returnData, htmlElementId);
                }
                if(callBackMethod){
                    eval(callBackMethod + "()");
                }
            }
        },
        error : function(XMLHttpRequest, textStatus, errorThrown) {
//            currentlyAjaxRequestCount -= 1;
            //reportErrorNew(XMLHttpRequest, textStatus, errorThrown);
        }
    });
}


