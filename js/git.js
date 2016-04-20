/*
 * gestion du systeme de versionnig git
 * pris en charge par : Aristide et Rémy
 */
var text ={
    id:'git'
};

/*
 * retourne le html du composant sous la forme de string
 * utiliser une requete ajax pour charger un fichier
 * ou tapez directement le html ici
 * On peut utilisez les promises js si vous préférez
 */
text.getHTML=function(){
    var string = "<button id=\"init\"> Git init </button><br />";
    string += "<button id=\"commit\"> Commit </button><br />";
    string += "<button id=\"share\"> Share </button><br />";
    string += "<button id=\"droits\"> Gérer les droits </button><br />";
    return string;
};

init.inject(text);
