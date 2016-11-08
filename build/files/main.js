/* jshint jquery:true */
/* global texttype */
$(function() {
	"use strict";

	$.ajax({
		url: "../build/files/img/test.jpg",
	}).done(function(data) {
		console.log(data);
	});

	//http://stackoverflow.com/a/5639455
	function C(k){return(document.cookie.match('(^|; )'+k+'=([^;]*)')||0)[2];}
});
