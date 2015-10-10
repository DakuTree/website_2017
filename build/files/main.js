/* jshint jquery:true */
/* global texttype */
$(function() {
	"use strict";
	//This entire thing is an ugly mess. Lots of bad things are done here due to lazyness, also due to it originally being made several years ago.
	//I plan on making something new at some point, but for now, we're stuck with this.

	var raw_html = '' +
	'<div id="wrapper">'+
		'<div id="header">'+
			'<div id="iheader"><span style="font-size: 144px; color: #00b232;">CodeAnimu</span></div>'+
		'</div>'+
		'<div id="content">'+
			'<nav id="icontent"><a href="#">Mindless Ramblings</a> | <a href="https://github.com/DakuTree">Github</a> | <a href="#">Projects</a> | <a href="#">About</a></nav>'+
		'</div>'+
	'</div>';

	if(C('viewed_gen')) {
		$('main').html(raw_html);
	} else {
		generate_page();
		document.cookie = "viewed_gen=1; expires=Fri, 31 Dec 2020 23:59:59 GMT;"; //does JS really have no proper way of creating cookies...?
	}

	function generate_page() {
		$('#header').html("");
		$('#content').html("");

		texttype("header", wait_text(500)+"<div id=\"iheader\"></div>", 80, 100, 1500);

		$("#iheader").livequery(function(){
			texttype("iheader", wait_text(500)+"4 ``8 ``15 ``16 ``23 42``````@``<!-- Insert fancy header code here -->``````````@<span style=\"font-size: 144px;"+fake_text("\">CodeAnimu</span>"+wait_text(2000))+" color: #00b232;\">CodeAnimu</span>", 65, 100, 1500);
		});

		$("#iheader > span[style*='font-size']").livequery(function(){
			texttype("content", "<nav id=\"icontent\"><a href=\"#\">"+fake_text("Blog"+wait_text(2000))+fake_text("Diary"+wait_text(2000))+"Mindless Ramblings"+wait_text(1000)+"</a> | <a href=\"https://github.com/DakuTree\">Github</a> | <a href=\"#\">Projects</a> | <a href=\"#\">About</a>", 50, 100, 2500);
		});
	}

	function fake_text(text, count){
		count = typeof count !== 'undefined' ? count : text.replace(/`/g, '').length;
		for(var x = 0; x<count; x++){ text += "¬"; }
		return text;
	}

	function wait_text(count){
		var text = "";
		count = count / 100;
		for(var x = 0; x<count; x++){ text += "`"; }
		return text;
	}

	//http://stackoverflow.com/a/5639455
	function C(k){return(document.cookie.match('(^|; )'+k+'=([^;]*)')||0)[2];}
});
