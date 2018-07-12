require('./index.scss');
require('bootstrap/dist/css/bootstrap.min.css');

$(function(){
	$('#btn').click(function(){
		$('#msg').text('用jQuery数据改变了');
	});
})
