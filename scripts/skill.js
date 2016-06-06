var skill_precision = document.getElementById("skill_precision");

function display_skill(skill)
{
	if (skill == "html5")
		skill_precision.innerHTML = "Connaissances bonnes. J'ai de bonnes pratiques en HTML5, et de bonnes connaissances en SEO."
	else if (skill == "css3")
		skill_precision.innerHTML = "Connaissances bonnes. Sélecteurs, pseudo-sélecteurs, sélecteurs avances, animations, media queries..."
	else if (skill == "javascript")
		skill_precision.innerHTML = "Connaissances bonnes. Le Javascript est tout simplement le langage que je préfere !"
	else if (skill == "angular")
		skill_precision.innerHTML = "Connaissances moyennes d'AngularJS. J'ai decouvert ce framework il y a quelques mois. C'est aujourd'hui mon framework MVC préféré."
	else if (skill == "nodejs")
		skill_precision.innerHTML = "Connaissances moyennes. NodeJS est pour moi une redécouverte du développement Back End !"
	else if (skill == "mongodb")
		skill_precision.innerHTML = "Connaissances moyennes. Pour moi, MongoDB est dans une majorité des cas la base de donnée la plus appropriee pour NodeJS."
	else if (skill == "php")
		skill_precision.innerHTML = "Connaissances moyennes. J'ai appris le PHP, mais ce n'est pas mon langage préféré..."
	else if (skill == "photoshop")
		skill_precision.innerHTML = "Connaissances appliquées au web design."
	else if (skill == "cordova")
		skill_precision.innerHTML = "Connaissances moyennes. Competances egales avec phonegap et ionic."
	else if (skill == "jquery")
		skill_precision.innerHTML = "Connaissances moyennes. Un plus pour le javascript."
	else if (skill == "sql")
		skill_precision.innerHTML = "Connaissances moyennes. Complement BDD interessant avec PHP."
	else if (skill == "C")
		skill_precision.innerHTML = "Connaissances de base. En cours d'apprentissage."
}

function hide_skill()
{
	skill_precision.innerHTML = "Survolez mes competances pour plus d'informations";
}
