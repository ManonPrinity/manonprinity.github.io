var Canvas =
{
	main_canvas: document.getElementById("main_canvas"),
	main_ctx: undefined,
	main_data: undefined,

	preview_canvas: document.getElementById("preview_canvas"),
	preview_ctx: undefined,
	preview_data: undefined,

	layer: undefined,
	temp_layer: undefined,

	left_click: false,
	right_click: false,

	init: function()
	{
		this.main_ctx = this.main_canvas.getContext("2d");
		this.preview_ctx = this.preview_canvas.getContext("2d");

		// Si ue image est importee
		if (Storage.import_image)
		{
			var img = new Image(); // On cree une image
			img.src = Storage.image_url; // On definit la source de l'image a l'image_url (blob)
			img.onload = function() // Apres le chagement de cette image
			{
				console.log("Importing image...");
				var posx = 0;
				var posy = 0;

				// Si l'image est plus petite que la taille du canvas
				if (img.width < Ui_Canvas.canvas_width)
					posx = parseInt((Ui_Canvas.canvas_width - img.width) / 2);
				if (img.height < Ui_Canvas.canvas_height)
					posy = parseInt((Ui_Canvas.canvas_height - img.height) / 2);

				// On dessine l'image dans le canvas
				Canvas.main_ctx.drawImage(img, posx, posy);

				// On cree les data du canvas depuis son context
				Canvas.main_data = Canvas.main_ctx.getImageData(0, 0, Ui_Canvas.canvas_current_width, Ui_Canvas.canvas_current_height);
				Canvas.preview_data = Canvas.preview_ctx.getImageData(0, 0, Ui_Preview.canvas_width, Ui_Preview.canvas_height);

				// On cree le layer (qui contient les pixels en taille reelle)
				Canvas.layer = [];
				Canvas.temp_layer = [];
				// On copie les data dans le layer
				for (var x = 0; x < Ui_Canvas.canvas_width; ++x)
				{
					Canvas.layer[x] = [];
					Canvas.temp_layer[x] = [];
					for (var y = 0; y < Ui_Canvas.canvas_height; ++y)
					{
						var i = (x + (y * Ui_Canvas.canvas_width)) * 4; // Recupere la position du pixel dans les data
						Canvas.layer[x][y] = Canvas.temp_layer[x][y] =
						{
							r: Canvas.main_data.data[i],
							g: Canvas.main_data.data[i + 1],
							b: Canvas.main_data.data[i + 2],
							a: Canvas.main_data.data[i + 3]
						};
					}
				}
			}
		}
		else
		{
			// cree les data
			this.main_data = this.main_ctx.createImageData(Ui_Canvas.canvas_current_width, Ui_Canvas.canvas_current_height);
			this.preview_data = this.preview_ctx.createImageData(Ui_Preview.canvas_width, Ui_Preview.canvas_height);

			// On remplit les data avec des 0
			for (var i = 0; i < this.main_data.data.length; i += 4)
			{
				this.main_data.data[i + 0] = 0;
				this.main_data.data[i + 1] = 0;
				this.main_data.data[i + 2] = 0;
				this.main_data.data[i + 3] = 0;
			}
			// On pose les data dans le ctx
			this.main_ctx.putImageData(this.main_data, 0, 0);

			Canvas.layer = [];
			Canvas.temp_layer = [];
			for (var x = 0; x < Ui_Canvas.canvas_width; ++x)
			{
				Canvas.layer[x] = [];
				Canvas.temp_layer[x] = [];
				for (var y = 0; y < Ui_Canvas.canvas_height; ++y)
				{
					var i = (x + (y * Ui_Canvas.canvas_width)) * 4;
					Canvas.layer[x][y] = Canvas.temp_layer[x][y] =
					{
						r: Canvas.main_data.data[i],
						g: Canvas.main_data.data[i + 1],
						b: Canvas.main_data.data[i + 2],
						a: Canvas.main_data.data[i + 3]
					};
				}
			}
		}

		// Initialise les evenements du canvas
		this.handle_events();
	},

	add_pixel_to_layer: function(x, y, color)
	{
		// Copie une couleur dans un pixel du layer
		this.layer[x][y].r = color.r;
		this.layer[x][y].g = color.g;
		this.layer[x][y].b = color.b;
		this.layer[x][y].a = color.a;

		// Pareil pour les symetries
		if (Ui_Tools.vertical_symetry && !Ui_Tools.horizontal_symetry)
		{
			this.layer[Ui_Canvas.canvas_width - x - 1][y].r = color.r;
			this.layer[Ui_Canvas.canvas_width - x - 1][y].g = color.g;
			this.layer[Ui_Canvas.canvas_width - x - 1][y].b = color.b;
			this.layer[Ui_Canvas.canvas_width - x - 1][y].a = color.a;
		}
		else if (!Ui_Tools.horizontal_symetry && Ui_Tools.vertical_symetry)
		{
			this.layer[x][Ui_Canvas.canvas_height - y - 1].r = color.r;
			this.layer[x][Ui_Canvas.canvas_height - y - 1].g = color.g;
			this.layer[x][Ui_Canvas.canvas_height - y - 1].b = color.b;
			this.layer[x][Ui_Canvas.canvas_height - y - 1].a = color.a;
		}
		else if (Ui_Tools.vertical_symetry && Ui_Tools.horizontal_symetry)
		{
			this.layer[Ui_Canvas.canvas_width - x - 1][y].r = color.r;
			this.layer[Ui_Canvas.canvas_width - x - 1][y].g = color.g;
			this.layer[Ui_Canvas.canvas_width - x - 1][y].b = color.b;
			this.layer[Ui_Canvas.canvas_width - x - 1][y].a = color.a;

			this.layer[x][Ui_Canvas.canvas_height - y - 1].r = color.r;
			this.layer[x][Ui_Canvas.canvas_height - y - 1].g = color.g;
			this.layer[x][Ui_Canvas.canvas_height - y - 1].b = color.b;
			this.layer[x][Ui_Canvas.canvas_height - y - 1].a = color.a;
			
			// this.layer[Ui_Canvas.canvas_width - x - 1][Ui_Canvas.canvas_height - y - 1].r = color.r;
			// this.layer[Ui_Canvas.canvas_width - x - 1][Ui_Canvas.canvas_height - y - 1].g = color.g;
			// this.layer[Ui_Canvas.canvas_width - x - 1][Ui_Canvas.canvas_height - y - 1].b = color.b;
			// this.layer[Ui_Canvas.canvas_width - x - 1][Ui_Canvas.canvas_height - y - 1].a = color.a;
		}
	},


	add_pixel_to_temp_layer: function(x, y, color)
	{
		if (x < 0 || x > Ui_Canvas.canvas_width - 1 || y < 0 || y > Ui_Canvas.canvas_height - 1)
			return ;
		this.temp_layer[x][y].r = color.r;
		this.temp_layer[x][y].g = color.g;
		this.temp_layer[x][y].b = color.b;
		this.temp_layer[x][y].a = color.a;

		if (Ui_Tools.vertical_symetry && !Ui_Tools.horizontal_symetry)
		{
			this.temp_layer[Ui_Canvas.canvas_width - x - 1][y].r = color.r;
			this.temp_layer[Ui_Canvas.canvas_width - x - 1][y].g = color.g;
			this.temp_layer[Ui_Canvas.canvas_width - x - 1][y].b = color.b;
			this.temp_layer[Ui_Canvas.canvas_width - x - 1][y].a = color.a;
		}
		else if (!Ui_Tools.horizontal_symetry && Ui_Tools.vertical_symetry)
		{
			this.temp_layer[x][Ui_Canvas.canvas_height - y - 1].r = color.r;
			this.temp_layer[x][Ui_Canvas.canvas_height - y - 1].g = color.g;
			this.temp_layer[x][Ui_Canvas.canvas_height - y - 1].b = color.b;
			this.temp_layer[x][Ui_Canvas.canvas_height - y - 1].a = color.a;
		}
		else if (Ui_Tools.vertical_symetry && Ui_Tools.horizontal_symetry)
		{
			this.temp_layer[Ui_Canvas.canvas_width - x - 1][y].r = color.r;
			this.temp_layer[Ui_Canvas.canvas_width - x - 1][y].g = color.g;
			this.temp_layer[Ui_Canvas.canvas_width - x - 1][y].b = color.b;
			this.temp_layer[Ui_Canvas.canvas_width - x - 1][y].a = color.a;

			this.temp_layer[x][Ui_Canvas.canvas_height - y - 1].r = color.r;
			this.temp_layer[x][Ui_Canvas.canvas_height - y - 1].g = color.g;
			this.temp_layer[x][Ui_Canvas.canvas_height - y - 1].b = color.b;
			this.temp_layer[x][Ui_Canvas.canvas_height - y - 1].a = color.a;
			
			this.temp_layer[Ui_Canvas.canvas_width - x - 1][Ui_Canvas.canvas_height - y - 1].r = color.r;
			this.temp_layer[Ui_Canvas.canvas_width - x - 1][Ui_Canvas.canvas_height - y - 1].g = color.g;
			this.temp_layer[Ui_Canvas.canvas_width - x - 1][Ui_Canvas.canvas_height - y - 1].b = color.b;
			this.temp_layer[Ui_Canvas.canvas_width - x - 1][Ui_Canvas.canvas_height - y - 1].a = color.a;
		}
	},

	add_pixel_to_canvas: function(x, y, color)
	{
		x *= Ui_Project_View.zoom_value;
		y *= Ui_Project_View.zoom_value;

		if (Ui_Canvas.gap_left > 0)
			x -= Ui_Canvas.gap_left;
		if (Ui_Canvas.gap_top > 0)
			y -= Ui_Canvas.gap_top;

		for (var a = 0; a < Ui_Project_View.zoom_value; ++a)
		{
			for (var b = 0; b < Ui_Project_View.zoom_value; ++b)
			{
				var i = ((x + a) + ((y + b) * Ui_Canvas.canvas_current_width)) * 4;
				this.main_data.data[i] = color.r;
				this.main_data.data[i + 1] = color.g;
				this.main_data.data[i + 2] = color.b;
				this.main_data.data[i + 3] = color.a;

				if (Ui_Tools.vertical_symetry && !Ui_Tools.horizontal_symetry)
				{
					i = ((Ui_Canvas.canvas_current_width - x - a) + ((y + b) * Ui_Canvas.canvas_current_width)) * 4;
					this.main_data.data[i] = color.r;
					this.main_data.data[i + 1] = color.g;
					this.main_data.data[i + 2] = color.b;
					this.main_data.data[i + 3] = color.a;
				}
				else if (!Ui_Tools.vertical_symetry && Ui_Tools.horizontal_symetry)
				{
					i = ((x + a) + ((Ui_Canvas.canvas_current_height - y - b) * Ui_Canvas.canvas_current_width)) * 4;
					this.main_data.data[i] = color.r;
					this.main_data.data[i + 1] = color.g;
					this.main_data.data[i + 2] = color.b;
					this.main_data.data[i + 3] = color.a;
				}
				else if (Ui_Tools.vertical_symetry && Ui_Tools.horizontal_symetry)
				{
					i = ((Ui_Canvas.canvas_current_width - x - a) + ((y + b) * Ui_Canvas.canvas_current_width)) * 4;
					this.main_data.data[i] = color.r;
					this.main_data.data[i + 1] = color.g;
					this.main_data.data[i + 2] = color.b;
					this.main_data.data[i + 3] = color.a;

					i = ((x + a) + ((Ui_Canvas.canvas_current_height - y - b) * Ui_Canvas.canvas_current_width)) * 4;
					this.main_data.data[i] = color.r;
					this.main_data.data[i + 1] = color.g;
					this.main_data.data[i + 2] = color.b;
					this.main_data.data[i + 3] = color.a;
					
					i = ((Ui_Canvas.canvas_current_width - x - a) + ((Ui_Canvas.canvas_current_height - y + b) * Ui_Canvas.canvas_current_width)) * 4;
					this.main_data.data[i] = color.r;
					this.main_data.data[i + 1] = color.g;
					this.main_data.data[i + 2] = color.b;
					this.main_data.data[i + 3] = color.a;
				}
			}
		}
	},

	render_pixel_to_canvas: function(x, y, color)
	{
		x *= Ui_Project_View.zoom_value;
		y *= Ui_Project_View.zoom_value;

		if (Ui_Canvas.gap_left > 0)
			x -= Ui_Canvas.gap_left;
		if (Ui_Canvas.gap_top > 0)
			y -= Ui_Canvas.gap_top;

		for (var a = 0; a < Ui_Project_View.zoom_value; ++a)
		{
			for (var b = 0; b < Ui_Project_View.zoom_value; ++b)
			{
				var i = ((x + a) + ((y + b) * Ui_Canvas.canvas_current_width)) * 4;
				this.main_data.data[i] = color.r;
				this.main_data.data[i + 1] = color.g;
				this.main_data.data[i + 2] = color.b;
				this.main_data.data[i + 3] = color.a;

				if (Ui_Tools.vertical_symetry && !Ui_Tools.horizontal_symetry)
				{
					i = ((Ui_Canvas.canvas_current_width - x - a) + ((y + b) * Ui_Canvas.canvas_current_width)) * 4;
					this.main_data.data[i] = color.r;
					this.main_data.data[i + 1] = color.g;
					this.main_data.data[i + 2] = color.b;
					this.main_data.data[i + 3] = color.a;
				}
				else if (!Ui_Tools.vertical_symetry && Ui_Tools.horizontal_symetry)
				{
					i = ((x + a) + ((Ui_Canvas.canvas_current_height - y - b) * Ui_Canvas.canvas_current_width)) * 4;
					this.main_data.data[i] = color.r;
					this.main_data.data[i + 1] = color.g;
					this.main_data.data[i + 2] = color.b;
					this.main_data.data[i + 3] = color.a;
				}
				else if (Ui_Tools.vertical_symetry && Ui_Tools.horizontal_symetry)
				{
					i = ((Ui_Canvas.canvas_current_width - x - a) + ((y + b) * Ui_Canvas.canvas_current_width)) * 4;
					this.main_data.data[i] = color.r;
					this.main_data.data[i + 1] = color.g;
					this.main_data.data[i + 2] = color.b;
					this.main_data.data[i + 3] = color.a;

					i = ((x + a) + ((Ui_Canvas.canvas_current_height - y - b) * Ui_Canvas.canvas_current_width)) * 4;
					this.main_data.data[i] = color.r;
					this.main_data.data[i + 1] = color.g;
					this.main_data.data[i + 2] = color.b;
					this.main_data.data[i + 3] = color.a;
					
					i = ((Ui_Canvas.canvas_current_width - x - a) + ((Ui_Canvas.canvas_current_height - y + b) * Ui_Canvas.canvas_current_width)) * 4;
					this.main_data.data[i] = color.r;
					this.main_data.data[i + 1] = color.g;
					this.main_data.data[i + 2] = color.b;
					this.main_data.data[i + 3] = color.a;
				}
			}
		}
		this.main_ctx.putImageData(this.main_data, 0, 0);
	},

	add_layer_to_canvas: function()
	{
		this.clear_canvas();
		for (var x = 0; x < this.layer.length; ++x)
		{
			for (var y = 0; y < this.layer[x].length; ++y)
			{
				if (this.temp_layer[x][y].a > 0) // Si quelque chose est dessinne dans le temp_layer on l'affiche dans le canvas
					this.add_pixel_to_canvas(x, y, this.temp_layer[x][y]);
				else // Sinon on prend celui du layer
					this.add_pixel_to_canvas(x, y, this.layer[x][y]);
			}
		}
		this.main_ctx.putImageData(this.main_data, 0, 0);
	},

	render_canvas: function()
	{
		this.main_ctx.putImageData(this.main_data, 0, 0);
	},

	clear_canvas: function()
	{
		this.main_ctx.clearRect(0, 0, Ui_Canvas.canvas_current_width, Ui_Canvas.canvas_current_height);
		this.main_data = this.main_ctx.getImageData(0, 0, Ui_Canvas.canvas_current_width, Ui_Canvas.canvas_current_height);
	},

	clear_temp_layer: function()
	{
		for (var x = 0; x < this.temp_layer.length; ++x)
			for (var y = 0; y < this.temp_layer[x].length; ++y)
				this.temp_layer[x][y] = {r: 0, g: 0, b: 0, a: 0};
	},

	// Copie le temp_layer dans le layer
	copy_temp_layer: function()
	{
		for (var x = 0; x < this.layer.length; ++x)
			for (var y = 0; y < this.layer[x].length; ++y)
				if (this.temp_layer[x][y].a > 0)
					this.layer[x][y] = this.temp_layer[x][y];
	},

	handle_events: function()
	{
		this.main_canvas.addEventListener('mousemove', this.event_mousemove);
		this.main_canvas.addEventListener('mousedown', this.event_mousedown);
		this.main_canvas.addEventListener('mouseup', this.event_mouseup);
		this.main_canvas.addEventListener('mouseout', this.event_mouseout);
	},

	event_mousemove: function(e)
	{
		var cursor_x = Math.floor((e.clientX + Ui_Canvas.gap_left - 256) / Ui_Project_View.zoom_value);
		var cursor_y = Math.floor((e.clientY + Ui_Canvas.gap_top) / Ui_Project_View.zoom_value);

		Ui_Project_View.update_x(cursor_x);
		Ui_Project_View.update_y(cursor_y);

		if (this.left_click)
			Canvas.layer_action(cursor_x, cursor_y, 1);
		else if (this.right_click)
			Canvas.layer_action(cursor_x, cursor_y, 2);
	},

	event_mousedown: function(e)
	{
		var cursor_x = Math.floor((e.clientX + Ui_Canvas.gap_left - 256) / Ui_Project_View.zoom_value);
		var cursor_y = Math.floor((e.clientY + Ui_Canvas.gap_top) / Ui_Project_View.zoom_value);

		if (e.which == 1) // 1 = gauche
		{
			Canvas.layer_action(cursor_x, cursor_y, 1);
			this.left_click = true;
		}
		else if (e.which == 3) // 3 = droit
		{
			Canvas.layer_action(cursor_x, cursor_y, 2);
			this.right_click = true;
		}
	},

	event_mouseup: function(e)
	{
		if (e.which == 1)
			this.left_click = false;
		else if (e.which == 3)
			this.right_click = false;
		Tools.stop_shape(); // On dit a Tools qu'on arrete la forme en cours
	},

	event_mouseout: function(e)
	{
		this.left_click = false;
		this.right_click = false;
		Tools.stop_shape(); // On dit a Tools qu'on arrete la forme en cours
	},

	layer_action: function(x, y, click)
	{
		var primary_color;
		var secondary_color;

		if (click == 1)
		{
			primary_color = {r: Ui_Palette.selected_colors_rgb[0], g: Ui_Palette.selected_colors_rgb[1], b: Ui_Palette.selected_colors_rgb[2], a: 255};
			secondary_color = {r: Ui_Palette.selected_colors_rgb[3], g: Ui_Palette.selected_colors_rgb[4], b: Ui_Palette.selected_colors_rgb[5], a: 255};
		}
		else if (click == 2)
		{
			primary_color = {r: Ui_Palette.selected_colors_rgb[3], g: Ui_Palette.selected_colors_rgb[4], b: Ui_Palette.selected_colors_rgb[5], a: 255};
			secondary_color = {r: Ui_Palette.selected_colors_rgb[0], g: Ui_Palette.selected_colors_rgb[1], b: Ui_Palette.selected_colors_rgb[2], a: 255};
		}

		if (Ui_Tools.active_tool == "pen")
		{
			Tools.pen(x, y, primary_color);
		}
		else if (Ui_Tools.active_tool == "pipette")
		{
			Tools.pipette(x, y);
		}
		else if (Ui_Tools.active_tool == "eraser")
		{
			Tools.eraser(x, y);
		}
		else if (Ui_Tools.active_tool == "bucket")
		{
			var target_color = {r: Canvas.layer[x][y].r, g: Canvas.layer[x][y].g, b: Canvas.layer[x][y].b, a: Canvas.layer[x][y].a}; // Couleur cible
			Tools.bucket(x, y, target_color, primary_color);
			Canvas.render_canvas();
		}
		else if (Ui_Tools.active_tool == "swaper")
		{
			var target_color = {r: Canvas.layer[x][y].r, g: Canvas.layer[x][y].g, b: Canvas.layer[x][y].b, a: Canvas.layer[x][y].a};
			Tools.swaper(x, y, target_color, primary_color);
		}
		else if (Ui_Tools.active_tool == "lighten")
		{
			Tools.lighten(x, y);
		}
		else if (Ui_Tools.active_tool == "darken")
		{
			Tools.darken(x, y);
		}
		else if (Ui_Tools.active_tool == "stroke")
		{
			Tools.stroke(x, y, primary_color);
		}
		else if (Ui_Tools.active_tool == "square")
		{
			Tools.square(x, y, primary_color, secondary_color);
		}
		else if (Ui_Tools.active_tool == "circle")
		{
			Tools.circle(x, y, primary_color, secondary_color);
		}
	}
}
