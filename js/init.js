/* 
 * fichier qui se déclenche au onload.
 * s'occupe des injections de html dans la page
 */
var init={module:{}};

init.inject=function (module){
    try{
    init.module[module.id]=module;
    init.module[module.id].elem=document.getElementById(module.id);
    init.module[module.id].elem.innerHTML=module.getHTML();
    if(module.afterInject){
        console.log("afterinject");
        module.afterInject();
    }
    }catch(e){
        console.log(e)
    }
};

init.show=function(name){
    try{
    console.log("show",init.module)
    for(var i in init.module){
        console.log(i);
        init.module[i].elem.style.display='none';
        console.log(i,init.module[i].elem.style.display);
    }
    init.module[name].elem.style.display='block';
    init.actif=init.module[name];
    init.module['git'].elem.style.display='block';
    }catch(e){
        console.log(e, i)
    }
};

document.getElementById("text_button").addEventListener('click',function(){
    init.show('text');
});
document.getElementById("schema_button").addEventListener('click',function(){
    init.show('schema');
    schema.canvas.width=schema.canvas.offsetWidth;
    schema.canvas.height=schema.canvas.offsetHeight;
    schema.ctx=schema.canvas.getContext("2d");
    schema.pathMethod= schema.ctx.fill;
    schema.ctx.fillStyle = "red";
    schema.pathMethod= "stroke";
});
document.getElementById("photo_button").addEventListener('click',function(){
    init.show('photo');
});

document.body.addEventListener('keydown',function(event){
    init.actif.onKeyDown(event);
});