var VERSION = "4.0.1";
var UPDATE_TIME = "2011-05-22";

function prt(str) {
	document.write(str);
}
function writeTop() {
	prt("<table class=\"HeaderTable\" width=\"760\" cellpadding=\"4\" align=\"center\">");
	prt("<tr>");
    prt("<td width=\"100%\" height=\"36\">jQuery formValidator表单验证插件</td> ");
	prt("<td class=\"VersionText\" valign=\"bottom\">"+VERSION+"</td>");
	prt("</tr>");
	prt("</table>");
}


function writeNav() {
	var str = "";
	str+="::导航::";
	str+="<ul>";
	str+="<li><a href=\"index.html\">首页</a></li>";
	str+="<li><a href=\"update.html\">更新记录</a></li>";
	str+="<li><a href=\"download.html\">下载</a></li>";
	str+="<li><a href=\"userguide.html\">用户手册</a></li>";
	//str+="<li><a href=\"devguide.html\">开发指南</a></li>";
	str+="<li><a href=\"demo.html\">演示</a></li>";
	str+="<li><a href=\"faq.html\">FAQ</a></li>";
	str+="<li><a href=\"money.html\">贡献者</a></li>";
	str+="<li><a target=\"_blank\" href=\"http://qun.qq.com/#jointhegroup/gid/74106519\">加入QQ群</a></li>";
	str+="</ul>";

	prt(str);
}

function writeBottom() {
prt("<table width=\"760\" align=\"center\" cellpadding=\"2\" cellspacing=\"2\" class=\"BottomTable\">");
prt("  <tr> ");
prt("    <td align=\"center\"><font size=\"3\">Powered by: 猫冬 Copyright &reg;2011 猫冬</font> ");
prt("    </td>");
prt("  </tr>");
prt("  <tr>");
prt("    <td align=\"center\"><font size=\"3\">请访问我的博客 <a href=\"http://www.cnblogs.com/wzmaodong\">http://www.cnblogs.com/wzmaodong</a> ");
prt("      来更新插件</font></td>");
prt("  </tr>");
prt("</table>");
}