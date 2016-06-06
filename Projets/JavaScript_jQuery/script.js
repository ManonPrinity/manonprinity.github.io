function initImg(mode)
{
	if (mode == 0)
	{
		$("#slides img").each(function(index)
		{
			 $(this).css({left:index * 800});
			 $(this).css({top:0});
			 activeSlide = 0;
		});
	}
	if (mode == 1)
	{
		$("#slides img").each(function(index)
		{
			 $(this).css({left:0});
			 $(this).css({top:index * 600});
			 activeSlide = 0;
		});
	}
}

var activeBullet = 0;
function initBullets()
{
	var i = 0;

	while (i < $("#slides img").length)
	{
		if (i == 0)
			$("#bullets").append("<span class='bullet activeBullet' id='bullet" + i + "'></span>");
		else
			$("#bullets").append("<span class='bullet' id='bullet" + i + "'></span>");
		++i;
	}
}

var activeMiniature = 0;
function initMiniatures()
{
	var i = 0;

	while (i < $("#slides img").length)
	{
		var newMiniatureT = $("#slides img")[i];
		var newMiniature = newMiniatureT.cloneNode();
		newMiniature.className = "miniature";
		newMiniature.style.width = (798 / $("#slides img").length) - 2 + "px";
		if (i == 0)
			newMiniature.className = newMiniature.className + " activeMiniature";
		$("#miniatures").append(newMiniature);
		++i;
	}
}

function loadSlider()
{
	initImg(0);
	initBullets();
	initMiniatures();
}
loadSlider();

var sliderMode = 0;
$("#sliderMode").change(function()
{
	var mode = $(this).find("option:selected").val();
	initImg(mode);
	sliderMode = mode;
});

function setBullet()
{
	document.getElementsByClassName("bullet activeBullet")[0].className = "bullet";
	document.getElementsByClassName("bullet")[activeSlide].className = "bullet activeBullet";
}

function setMiniature()
{
	document.getElementsByClassName("miniature activeMiniature")[0].className = "miniature";
	document.getElementsByClassName("miniature")[activeSlide].className = "miniature activeMiniature";
}

$(function()
{
	setInterval(slide, 5000);
});

var activeSlide = 0;
function slide(pos)
{
	if (!pos)
	{
		if (activeSlide == $("#slides img").length - 1)
			activeSlide = 0;
		else
			++activeSlide;
	}
	if (sliderMode == 0)
	{
		$("#slides img").each(function(index)
		{
			var slide = $("#slides img")[index];
			slide.style.left = ((index - activeSlide) * 800) + "px";
		});
	}
	else if (sliderMode == 1)
	{
		$("#slides img").each(function(index)
		{
			var slide = $("#slides img")[index];
			slide.style.top = ((index - activeSlide) * 600) + "px";
		});
	}
	else if (sliderMode == 2)
	{
		
	}
	if (activeSlide == $("#slides img").length)
		activeSlide = 0;
	setBullet();
	setMiniature();
}

$(function onclick()
{
	$("#leftArrow").click(function()
	{
		if (activeSlide == 0)
			activeSlide = $("#slides img").length - 1;
		else
			--activeSlide;
		slide(1);
	});

	$("#rightArrow").click(function()
	{
		if (activeSlide == $("#slides img").length - 1)
			activeSlide = 0;
		else
			++activeSlide;
		slide(1);
	});

	$(".bullet").click(function()
	{
		activeSlide = $(this).index();
 		slide(1);
	});

	$(".miniature").click(function()
	{
		activeSlide = $(this).index();
 		slide(1);
	});
});