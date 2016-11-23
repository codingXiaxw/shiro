<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt"  prefix="fmt"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>批量修改商品查询</title>
	<script type="text/javascript">
		function updateItems() {
			//将form的action指向删除商品的地址
			document.itemsForm.action="${pageContext.request.contextPath}/items/deleteItems.action";

			//进行form提交
			document.itemsForm.submit();

		}
	</script>
</head>
<body> 
<form name="itemsForm" action="${pageContext.request.contextPath }/items/queryItem.action" method="post">
查询条件：
<table width="100%" border=1>
<tr>
	<td>
		<select>
			<c:forEach items="${itemsType}" var="item">

				<option value="${item.key}">${item.value}</option>

			</c:forEach>

		</select>
	</td>
<td><input type="submit" value="查询"/>
<input type="button" value="批量修改提交" onclick="updateItems()">
</td>
</tr>
</table>
商品列表：
<table width="100%" border=1>
<tr>
	<td>商品名称</td>
	<td>商品价格</td>
	<td>生产日期</td>
	<td>商品描述</td>
	<td>操作</td>
</tr>
<c:forEach items="${itemsList }" var="item" varStatus="s">
<tr>
	<td><input type="text" name="itemsList[${s.index}].name" value="${item.name}"> </td>
	<td><input type="text" name="itemsList[${s.index}].price" value="${item.price}"> </td>
	<td><fmt:formatDate value="${item.createtime}" pattern="yyyy-MM-dd HH:mm:ss"/></td>
	<td>${item.detail }</td>
	
	<td><a href="${pageContext.request.contextPath }/items/editItems.action?id=${item.id}">修改</a></td>

</tr>
</c:forEach>

</table>
</form>
</body>

</html>