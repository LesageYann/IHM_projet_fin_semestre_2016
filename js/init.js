/* 
 * fichier qui se déclenche au onload.
 * s'occupe des injections de html dans la page
 */
var init={module:{}};

init.inject=function (module){
    init.module[module.id]=module;
    init.module[module.id].elem=document.getElementById(module.id);
    init.module[module.id].elem.innerHTML=module.getHTML();
    if(module.afterInject){
        console.log("afterinject");
        module.afterInject();
    }
};

init.show=function(name){
    for(var i in init.moduleElem){
        init.module[i].elem.style.display='none';
    }
    init.module[name].elem.style.display='block';
    init.actif=init.module[name];
};

document.getElementById("text_button").addEventListener('click',function(){
    init.show('text');
});
document.getElementById("schema_button").addEventListener('click',function(){
    init.show('schema');
});
document.getElementById("photo_button").addEventListener('click',function(){
    init.show('photo');
});

document.body.addEventListener('keydown',function(event){
    init.actif.onKeyDown(event);
});