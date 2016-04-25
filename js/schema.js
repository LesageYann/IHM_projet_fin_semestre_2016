var schema ={
    id:"schema"
};

/*
 * retourne le html du composant sous la forme de string
 * utiliser une requete ajax pour charger un fichier
 * ou tapez directement le html ici
 * On peut utilisez les promises js si vous préférez
 */
schema.getHTML=function(){
    return "<canvas id=\"schema\"></canvas>";
};


init.inject(schema);
