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
    return "<div id=\"schema_flex\"><canvas id=\"schema_canvas\"></canvas><div id=\"schema_tools\"></div></div>";
};

schema.mouseDown=function(event){
    console.log("mouseDown",event);
    schema.ctx.beginPath();
    schema.ctx.moveTo(event.layerX, event.layerY);
};

schema.mouseMove=function(event){
    if(event.buttons==1){
        schema.ctx.lineTo(event.layerX, event.layerY);
    }
};

schema.mouseUp=function(event){
    console.log("mouseUp",event);
    schema.ctx.fill();
};

schema.afterInject=function(){
    console.log("schema after inject");
    schema.canvas=document.getElementById("schema_canvas");
    console.log("offset",schema.canvas.offsetWidth,schema.canvas.offsetHeight);
    
    schema.canvas.onmousedown= schema.mouseDown;
    schema.canvas.onmousemove= schema.mouseMove;
    schema.canvas.onmouseup= schema.mouseUp;
};

init.inject(schema);
