var Ui_Project_View =
{
	zoom_value: 1,
	grid: false,
	rules: false,
	informations: true,
	informations_position: 0,

	// Informations
	informations_div: document.getElementById("informations_div"),
	informations_div_x: document.getElementById("informations_div_x"),
	informations_div_y: document.getElementById("informations_div_y"),
	informations_div_w: document.getElementById("informations_div_w"),
	informations_div_h: document.getElementById("informations_div_h"),

	init: function()
	{
		// recupere les infos width et height du storage
		this.init_informations_div();

		// initialise les checkboxes
		document.getElementById("grid_checkbox").checked = false;
		document.getElementById("rules_checkbox").checked = false;
		document.getElementById("informations_checkbox").checked = true;
	},

	init_informations_div: function()
	{
		// Modifie le text des informations width et height
			this.informations_div_w.innerHTML = Storage.canvas_width;
			this.informations_div_h.innerHTML = Storage.canvas_height;
	},

	move_informations_div: function()
	{
		// Deplace les informations en haut ou en bas
		if (this.informations_position)
		{
			this.informations_div.style.top = "auto";
			this.informations_div.style.bottom = "0";
			this.informations_position = 0;
		}
		else
		{
			this.informations_div.style.top = "0";
			this.informations_div.style.bottom = "auto";
			this.informations_position = 1;
		}
	},

	update_x: function(x)
	{
		// Modifie la valeur x des informations
		informations_div_x.innerHTML = x;
	},

	update_y: function(y)
	{
		// Modifie la valeur y des informations
		informations_div_y.innerHTML = y;
	},

	// Met a jour la valeur de zoom
	update_zoom_value: function(val)
	{
		if (val == -1 && this.zoom_value > 1)
			document.getElementById("span_zoom_value").innerHTML = --this.zoom_value;
		else if (val == 1 && this.zoom_value < 50)
			document.getElementById("span_zoom_value").innerHTML = ++this.zoom_value;
		Ui_Canvas.update_size();
		Ui_Canvas.update_position();
		Canvas.add_layer_to_canvas();
	},

	update_grid_checkbox: function(check)
	{
		this.grid = check;
	},

	update_rules_checkbox: function(check)
	{
		this.rules = check;
	},

	// Affiche ou cache les informations
	update_informations_checkbox: function(check)
	{
		this.informations = check;
		if (check)
			this.informations_div.style.display = "block";
		else
			this.informations_div.style.display = "none";

	},

	// Modifie la couleur de fond
	update_background_project: function(color)
	{
		document.body.style.background = color;
	},

	update_cursor_info: function(e)
	{
		alert("e");
	}
}
