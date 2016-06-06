var Ui_Palette =
{
	selected_colors: ["#000000", "#ffffff"], // Couleurs selectionnees en hexa
	selected_colors_rgb: [0, 0, 0, 255, 255, 255], // Couleurs selectionnees en rgb
	left_color_preview: document.getElementById("left_color_preview"),
	right_color_preview: document.getElementById("right_color_preview"),
	left_color_span: document.getElementById("left_color_span"),
	right_color_span: document.getElementById("right_color_span"),

	init: function()
	{
		this.left_color_preview.style.background = this.selected_colors[0];
		this.left_color_span.innerHTML = this.selected_colors[0];

		this.right_color_preview.style.background = this.selected_colors[1];
		this.right_color_span.innerHTML = this.selected_colors[1];

		this.add_color("#000000");
		this.add_color("#222222");
		this.add_color("#444444");
		this.add_color("#666666");
		this.add_color("#888888");
		this.add_color("#aaaaaa");
		this.add_color("#cccccc");
		this.add_color("#ffffff");

		this.add_color("#cc5555");
		this.add_color("#5555cc");
		this.add_color("#55cc55");
		this.add_color("#55cccc");
		this.add_color("#cccc55");
		this.add_color("#cc55cc");
		this.add_color("#5c5c5c");
		this.add_color("#c5c5c5");
	},

	set_left_color: function(color)
	{
		this.selected_colors[0] = color;
		this.left_color_preview.style.background = this.selected_colors[0];
		this.left_color_span.innerHTML = this.selected_colors[0];

		this.add_color(color);
	},

	set_right_color: function(color)
	{
		this.selected_colors[1] = color;
		this.right_color_preview.style.background = this.selected_colors[1];
		this.right_color_span.innerHTML = this.selected_colors[1];

		this.add_color(color);
	},

	select_left_color: function(r, g, b)
	{
		var hex_color = "#" + r.toString(16) + g.toString(16) + b.toString(16);

		this.selected_colors[0] = hex_color;
		this.selected_colors_rgb[0] = r;
		this.selected_colors_rgb[1] = g;
		this.selected_colors_rgb[2] = b;
		this.left_color_preview.style.background = hex_color;
		this.left_color_span.innerHTML = hex_color;
	},

	select_right_color: function(r, g, b)
	{
		// toString passe une valeur en string, ici en hexa avec 16
		var hex_color = "#" + r.toString(16) + g.toString(16) + b.toString(16);

		this.selected_colors[1] = hex_color;
		this.selected_colors_rgb[3] = r;
		this.selected_colors_rgb[4] = g;
		this.selected_colors_rgb[5] = b;
		this.right_color_preview.style.background = hex_color;
		this.right_color_span.innerHTML = hex_color;
	},

	add_color: function(color)
	{
		var new_color = document.createElement("span");
		new_color.className = "color";
		new_color.style.background = color;
		new_color.onclick = function()
		{
			// met a jour la couleur gauche en hexa
			Ui_Palette.selected_colors[0] = color;
			// substr recuper les caracters 1 a 2 de la valeur hexa
			// parseInt peut prendre un deuxieme parametre, la base a convertir (de 16 (hexa) a 10 (decimal) ici)
			Ui_Palette.selected_colors_rgb[0] = parseInt(color.substr(1, 2), 16);
			Ui_Palette.selected_colors_rgb[1] = parseInt(color.substr(3, 2), 16);
			Ui_Palette.selected_colors_rgb[2] = parseInt(color.substr(5, 2), 16);
			Ui_Palette.left_color_preview.style.background = Ui_Palette.selected_colors[0];
			Ui_Palette.left_color_span.innerHTML = Ui_Palette.selected_colors[0];
		}
		new_color.oncontextmenu = function(e)
		{
			Ui_Palette.selected_colors[1] = color;
			Ui_Palette.selected_colors_rgb[3] = parseInt(color.substr(1, 2), 16);
			Ui_Palette.selected_colors_rgb[4] = parseInt(color.substr(3, 2), 16);
			Ui_Palette.selected_colors_rgb[5] = parseInt(color.substr(5, 2), 16);
			Ui_Palette.right_color_preview.style.background = Ui_Palette.selected_colors[1];
			Ui_Palette.right_color_span.innerHTML = Ui_Palette.selected_colors[1];
			return (false);
		}
		new_color.ondblclick = function()
		{
			this.parentNode.removeChild(this);
		}
		document.getElementById("palette").appendChild(new_color);
	}
}
