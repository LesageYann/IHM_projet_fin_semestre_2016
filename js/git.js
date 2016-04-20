/*
 * gestion du systeme de versionnig git
 * pris en charge par : Aristide et Rémy
 */
var git ={
    id:'git'
};

//var user = {Aristide, Quentin, Rémy, Yann};

/*
 * retourne le html du composant sous la forme de string
 * utiliser une requete ajax pour charger un fichier
 * ou tapez directement le html ici
 * On peut utilisez les promises js si vous préférez
 */
git.getHTML=function(){
    var string = "<input type=\"text\" id=\"git init\" placeholder=\"Nom du repositorie\">";
    string += "<button id=\"init\"> Git init </button><br />";
    string += "<input type=\"text\" id=\"git commit\" placeholder=\"Nom du commit\">";
    string += "<button id=\"commit\" disabled=\"disabled\"> Commit </button><br />";
    string += "<button id=\"share\"> Share </button><br />";
    string += "<button id=\"droits\"> Gérer les droits </button><br />";

    return string;
};

init.inject(git);

var initButton = document.getElementById("init");
var initText = document.getElementById("git init");
var commitButton = document.getElementById("commit");
var commitText = document.getElementById("git commit");
var shareButton = document.getElementById("share");
var droitButton = document.getElementById("droit");

commitText.style.visibility = "hidden";

function hideInitText(){
    if(initText.value == ""){
      alert("/!\ Le nom du repositorie ne peut-être vide");
      return;
    }
    alert("Le dépôt a bien été créé.");
    initText.style.visibility = "hidden";
    commitText.style.visibility = "visible";
    initButton.disabled = "disabled";
    commitButton.disabled = "";
}

initButton.addEventListener("click", hideInitText, false);
