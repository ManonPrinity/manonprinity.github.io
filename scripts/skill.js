var skill_precision = document.getElementById("skill_precision");

function display_skill(skill)
{
    let v;
    switch (skill) {
        case "html5":
            v = "Connaissances bonnes. J'ai de bonnes pratiques en HTML5, et de bonnes connaissances en SEO.";
            break;
        case "css3":
            v = "Connaissances bonnes. Sélecteurs, pseudos-sélecteurs, sélecteurs avancés, animations, media queries...";
            break;
        case "javascript":
            v = "Connaissances bonnes. Le Javascript est tout simplement le langage que je préfère !";
            break;
        case "angular":
            v = "Connaissances moyennes d'AngularJS. J'ai découvert ce framework il y a quelques mois. C'est aujourd'hui mon framework MVC préféré.";
            break;
        case "nodejs":
            v = "Connaissances moyennes. NodeJS est pour moi une redécouverte du développement Back End !";
            break;
        case "mongodb":
            v = "Connaissances moyennes. Pour moi, MongoDB est dans une majorité des cas la base de données la plus appropriée pour NodeJS.";
            break;
        case "php":
            v = "Connaissances moyennes. J'ai appris le PHP, mais ce n'est pas mon langage préféré...";
            break;
        case "photoshop":
            v = "Connaissances appliquées au web design.";
            break;
        case "cordova":
            v = "Connaissances moyennes. Compétences égales avec Phonegap et Ionic.";
            break;
        case "jquery":
            v = "Connaissances moyennes. Un plus pour le javascript.";
            break;
        case "sql":
            v = "Connaissances moyennes. Complément BDD intéressant avec PHP.";
            break;
        case "C":
            v = "Connaissances de base. En cours d'apprentissage.";
            break;
        default:
            v = "Survolez mes compétences pour plus d'informations";
    }
    skill_precision.innerHTML = v;
}
