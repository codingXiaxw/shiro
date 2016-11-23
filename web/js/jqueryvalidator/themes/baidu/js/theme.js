var onShowHtml = '';
var onFocusHtml = '<div class="user_div_on"><div class="user_div_on_1"></div><div class="user_div_on_txt">$data$</div></div>';
var onErrorHtml = '<div class="user_div_off"><div class="user_div_off_txt">$data$</div></div>';
var onCorrectHtml = '';
var onShowClass = "user_input";
var onFocusClass = "user_input_focus";
var onErrorClass = "user_input_error";
var onCorrectClass = "user_input";


//初始状态，加其它几种状态
var passwordStrengthStatusHtml = [
'<div class="user_div_on"><div class="user_div_on_1"></div><div class="user_div_on_txt"><P id=passStrong class="pswState">强度：<EM class=st1>弱</EM><B class="progressImage prog0"></B><EM class=st2>强</EM></P>6~16个字符，包括字母、数字、特殊符号，区分大小写</div></div>',
'<div class="user_div_on"><div class="user_div_on_1"></div><div class="user_div_on_txt"><P id=passStrong class="pswState">强度：<EM class=st1>弱</EM><B class="progressImage prog1"></B><EM class=st2>强</EM></P6~16个字符，包括字母、数字、特殊符号，区分大小写></div></div>',
'<div class="user_div_on"><div class="user_div_on_1"></div><div class="user_div_on_txt"><P id=passStrong class="pswState">强度：<EM class=st1>弱</EM><B class="progressImage prog2"></B><EM class=st2>强</EM></P>6~16个字符，包括字母、数字、特殊符号，区分大小写</div></div>',
'<div class="user_div_on"><div class="user_div_on_1"></div><div class="user_div_on_txt"><P id=passStrong class="pswState">强度：<EM class=st1>弱</EM><B class="progressImage prog3"></B><EM class=st2>强</EM></P>6~16个字符，包括字母、数字、特殊符号，区分大小写</div></div>'
							  ];

var passwordStrengthText = ['密码强度：弱','密码强度：中','密码强度：强']
//密码强度校验规则(flag=1(数字)+2(小写)+4(大写)+8(特殊字符)的组合，value里的0表示跟密码一样长,1表示起码1个长度)
var passwordStrengthRule = [
	{level:1,rule:[
				   {flag:1,value:[0]},			//数字
				   {flag:2,value:[0]},				//小写字符
				   {flag:4,value:[0]}			//大写字符
				  ]
	},
	{level:2,rule:[
				   {flag:8,value:[0]},				//特符
				   {flag:9,value:[1,1]},		//数字(>=1)+特符>=1)
				   {flag:10,value:[1,1]},		//小写(>=1)+特符>=1)
				   {flag:12,value:[1,1]},		//大写(>=1)+特符>=1)
				   {flag:3,value:[1,1]},	//数字(>=1)+小写(>=1)
				   {flag:5,value:[1,1]},	//数字(>=1)+大写(>=1)
				   {flag:6,value:[1,1]}			//小写(>=1)+大写(>=1)
				  ]
	},
	{level:3,rule:[
				   {flag:11,value:[1,1,1]},	//数字(>=1)+小写(>=1)+特符(>=1)
				   {flag:13,value:[1,1,1]},	//数字(>=1)+大写(>=1)+特符(>=1)
				   {flag:14,value:[1,1,1]},	//小写(>=1)+大写(>=1)+特符(>=1)
				   {flag:7,value:[1,1,1]}	//数字(>=1)+小写(>=1)+大写(>=1)
				  ]
	}
];