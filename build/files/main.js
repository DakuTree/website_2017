/* jshint jquery:true*/
$(function() {
	// $('#slide-5 .bcg3 .wallpaper2').toggleClass('triggerNavIn'); //trigger animation

	//TODO: Only load this if cookie not exist / equals 0
	//TODO: Show text on Projects/About click.

	texttype("header", wt(500)+"<div id=\"iheader\"></div>", 80, 100, 1500);

	$("#iheader").livequery(function(){
		texttype("iheader", wt(500)+"4 ``8 ``15 ``16 ``23 42``````@``<!-- Insert fancy header code here -->``````````@<span style=\"font-size: 144px;"+fake_text("\">CodeAnimu</span>"+wt(2000))+" color: #00b232;\">CodeAnimu</span>", 65, 100, 1500);
	});

	$("#iheader > span[style*='font-size']").livequery(function(){
		texttype("content", "<nav id=\"icontent\"><a href=\"#\">"+fake_text("Blog"+wt(2000))+fake_text("Diary"+wt(2000))+"Mindless Ramblings"+wt(1000)+"</a> | <a href=\"https://github.com/DakuTree\">Github</a> | <a href=\"#\">Projects</a> | <a href=\"#\">About</a>", 50, 100, 2500);
	});
});

function fake_text(text, count){
	count = typeof count !== 'undefined' ? count : text.replace(/`/g, '').length;
	for(var x = 0; x<count; x++){ text += "¬"; }
	return text;
}

function wt(count){
	var text = "";
	count = count / 100;
	for(var x = 0; x<count; x++){ text += "`"; }
	return text;
}