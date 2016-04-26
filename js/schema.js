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
    return "<div id=\"schema_flex\"><canvas id=\"schema_canvas\"></canvas><div id=\"schema_tools\">"
    +"<button id=\"schem_add\"><img src=\"css/add.png\" alt=\"new\" /></button>"
    +"<button id=\"schem_path\"><img src=\"css/path.png\" alt=\"forme filaire\" /></button>"
    +"<button id=\"schem_fill\"><img src=\"css/fill.png\" alt=\"forme remplie\" /></button>"
    +"<button id=\"schem_attach\"><img src=\"css/attach.png\" alt=\"transferer vers Document\" /></button>"
    +"<button id=\"schem_erase\"><img src=\"css/erase.png\" alt=\"effacer\" /></button>"
    +"<input class=\"color\" value=\"66ff00\">"
    +"</div></div>";
};

schema.mouseDown=function(event){
    console.log("mouseDown",event);
    schema.ctx.fillStyle = "#"+document.getElementsByClassName("color")[0].value;
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
    schema.ctx[schema.pathMethod]();
};

schema.afterInject=function(){
    console.log("schema after inject");
    schema.canvas=document.getElementById("schema_canvas");
    console.log("offset",schema.canvas.offsetWidth,schema.canvas.offsetHeight);
    
    schema.canvas.onmousedown= schema.mouseDown;
    schema.canvas.onmousemove= schema.mouseMove;
    schema.canvas.onmouseup= schema.mouseUp;
    schema.pathMethod= "stroke";
    schema.pathElem=document.getElementById("schem_path");
    document.getElementById("schem_add").onclick=function(){
        
    };
    schema.pathElem.onclick=function(){
        schema.pathMethod= "stroke";
//        schema.pathElem.parentNode.insertBefore(schema.strokeSize,schema.pathElem.nextSibling)
    };
    document.getElementById("schem_fill").onclick=function(){
        schema.pathMethod= "fill";
    };
    document.getElementById("schem_attach").onclick=function(){
        text.addImgSection(schema.canvas.toDataURL());
        init.show('text');
        
    };
    document.getElementById("schem_erase").onclick=function(){
    };
};

init.inject(schema);
