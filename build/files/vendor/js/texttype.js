// Original script: https://augiegardner.wordpress.com/2012/09/17/javascript-text-typing-animation/
function texttype(targetDiv, text, intervalStart, intervalRange, endTimeout, callback) {
	var textTyperID = ++window.textTyperID;
	endTimeout = typeof endTimeout !== 'undefined' ? endTimeout : 3000;
	window.textTyper[textTyperID] = new function () {
		var textFinished = false;
		this.init = function () {
			var innerString = "";
			for (var i = 0; i < text.length; i++) {
				innerString += "<span class='texttype-hidden'>" + text[i] + "</span>";
			}
			var pipe = document.createElement('span');
			pipe.setAttribute('id', "pipe" + textTyperID);
			pipe.textContent = '|';
			pipe.style.marginLeft = '1px';
			document.getElementById(targetDiv).innerHTML = innerString;
			document.getElementById(targetDiv).appendChild(pipe);
			window.textTyper[textTyperID].type(0);
			window.textTyper[textTyperID].animatePipe(true);
		}
		this.type = function (i) {
			var target = document.getElementById(targetDiv).childNodes;
			if (i < text.length) {
				var to = intervalStart - (intervalRange / 2);
				var from = intervalStart + (intervalRange / 2);
				var interval = Math.floor(Math.random() * (to - from + 1) + from);
				if (target[i].innerText == "¬") {
					$('#' + targetDiv + ' > span[style*="display: inline"]').last().css('display', 'none');
				} else if (target[i].innerText == "`") {
					//do nothing
				} else if (target[i].innerText == "@") {
					$('#' + targetDiv + ' > span[style*="display: inline"]').each(function () {$(this).css('display', 'none')});
				} else {
					target[i].style.display = 'inline';
				}
				setTimeout(function () {
					window.textTyper[textTyperID].type(++i);
					document.getElementById("pipe" + textTyperID).style.visibility = '';
				}, interval);
			}
			else {
				setTimeout(function () {
					textFinished = true;
					// $('#'+targetDiv).html($('#'+targetDiv+' > span[style*="display: inline"]').text()+"<span id=\"pipe"+textTyperID+"\" style=\"margin-left: 1px;\">|</span>"); /* Change text to CSS */
					$('#' + targetDiv).html($('#' + targetDiv + ' > span[style*="display: inline"]').text());
					/* Change text to CSS */
				}, endTimeout);
				if (callback) callback();
			}
		}
		this.animatePipe = function (visible, timer) {
			if ($('#' + "pipe" + textTyperID).length > 0) {
				if (!visible)
					document.getElementById("pipe" + textTyperID).style.visibility = 'hidden';
				else
					document.getElementById("pipe" + textTyperID).style.visibility = '';

				if (!textFinished) {
					setTimeout(function () {
						window.textTyper[textTyperID].animatePipe(!visible);
					}, 500);
				}
				else
					document.getElementById("pipe" + textTyperID).style.visibility = 'hidden';
			}
		}
	};
	window.textTyper[textTyperID].init();
}
(function () { /*Function to prep variables on page load */
	window.textTyperID = 0;
	window.textTyper = new Array();
})();