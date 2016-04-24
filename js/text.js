/*
 * gestion de l'éditeur de texte pur
 * pris en charge par : Yann
 */
var text ={
    id:'text'
};

/*
 * retourne le html du composant sous la forme de string
 * utiliser une requete ajax pour charger un fichier
 * ou tapez directement le html ici
 * On peut utilisez les promises js si vous préférez
 */
text.getHTML=function(){
    var intInd="";
    for(i=1;i<1000;i++){
        intInd+=i+"<br />";  
    }
    return "<div>"+intInd+"</div><div id=\"text_content\"></div>";
};

init.inject(text);