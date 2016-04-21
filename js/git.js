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
    var string = "<input type=\"text\" id=\"git init\" placeholder=\"Nom du repository\">";
    string += "<button id=\"init\"> Git init </button>  <span id=\"error_init\" class=\"error\"></span> <span id=\"right_init\" class=\"right\">  </span>    <br />";
    string += "<input type=\"text\" id=\"git commit\" placeholder=\"Nom du commit\">";
    string += "<button id=\"commit\" disabled=\"disabled\"> Commit </button>    <span id=\"error_commit\" class=\"error\"></span>   <span id=\"right_commit\" class=\"right\"></span>   <br />";
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
var error_init = document.getElementById("error_init");
var error_commit = document.getElementById("error_commit");
var right_init = document.getElementById("right_init");
var right_commit = document.getElementById("right_commit");


commitText.style.visibility = "hidden";

function submitGitInit(){
    var right = document.getElementById("true_init");
    if(initText.value == ""){
        error_init.innerHTML = "Le nom du repository ne peut-être vide";
        return;
    }
    error_init.innerHTML = "";
    right_init.innerHTML = "Le dépôt a bien été créé.";
    initText.style.visibility = "hidden";
    commitText.style.visibility = "visible";
    initButton.disabled = "disabled";
    commitButton.disabled = "";
}

initButton.addEventListener("click", submitGitInit, false);

function submitGitCommit(){
    right_init.innerHTML = "";
    if(commitText.value == ""){
        error_commit.innerHTML = "Le message du commit ne peut-être vide";
        return;
    }
    error_commit.innerHTML = "";
    right_commit.innerHTML = "Le commit a bien été effectué.";
    initText.style.visibility = "hidden";
    commitText.style.visibility = "visible";
    initButton.disabled = "disabled";
    commitButton.disabled = "";
}

commitButton.addEventListener("click", submitGitCommit, false);
