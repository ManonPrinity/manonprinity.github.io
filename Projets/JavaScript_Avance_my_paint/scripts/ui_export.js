var Ui_Export =
{
	size_multiplier: 1,

	update_size_multiplier: function(val)
	{
		if (val == -1 && this.size_multiplier > 1)
			document.getElementById("span_size_multiplier").innerHTML = --this.size_multiplier;
		else if (val == 1 && this.size_multiplier < 10)
			document.getElementById("span_size_multiplier").innerHTML = ++this.size_multiplier;
	},

	export_png: function()
	{
		// On cree des tailles (taille du canvas en zoom 1 * le size_multiplier)
		var w = Ui_Canvas.canvas_width * this.size_multiplier;
		var h = Ui_Canvas.canvas_height * this.size_multiplier;

		// On cree un canvas temporaire dans lequel on va dessiner le dessin zome
		var export_canvas = document.createElement("canvas");
		export_canvas.width = w;
		export_canvas.height = h;

		// on cree son ctx et ses data
		var export_ctx = export_canvas.getContext("2d");
		var export_data = export_ctx.getImageData(0, 0, export_canvas.width, export_canvas.height);

		// On rempli les data avec le contenu du Canvas.layer
		for (var x = 0; x < Canvas.layer.length; ++x)
			for (var y = 0; y < Canvas.layer[x].length; ++y)
				this.add_pixel(x, y, export_data, Canvas.layer[x][y]);

		// On pose les data dans le ctx
		export_ctx.putImageData(export_data, 0, 0);

		// On definit la nouvelle methode de dessin ...
		var composite_operation = export_ctx.globalCompositeOperation;
		export_ctx.globalCompositeOperation = "destination-over"; // ... en dessous des pixels deja existants
		export_ctx.fillStyle = "rgba(0, 0, 0, 0)";
		export_ctx.fillRect(0, 0, w, h); // On rempli chaque pixel en noir transparent

		// On exporte le canvas en dataURL png
		var image_data = export_canvas.toDataURL('image/png');

		export_ctx.clearRect(0, 0, w, h); // On rempli a nouveau chaque pixel en noir transparent
		export_ctx.putImageData(export_data, 0, 0); // On repose les data dans le ctx
		export_ctx.globalCompositeOperation = composite_operation; // On redifinit la methode de dessin comme elle etait au debut

		window.open(image_data); // On ouvre l'image data dans une nouvelle fenetre
	},

	add_pixel: function(x, y, data, color)
	{
		x *= this.size_multiplier;
		y *= this.size_multiplier;

		for (var a = 0; a < this.size_multiplier; ++a)
		{
			for (var b = 0; b < this.size_multiplier; ++b)
			{
				var i = ((x + a) + ((y + b) * Ui_Canvas.canvas_width * this.size_multiplier)) * 4;
				data.data[i] = color.r;
				data.data[i + 1] = color.g;
				data.data[i + 2] = color.b;
				data.data[i + 3] = color.a;
			}
		}
	},
}
