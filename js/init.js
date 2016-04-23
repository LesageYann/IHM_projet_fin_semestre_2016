/* 
 * fichier qui se déclenche au onload.
 * s'occupe des injections de html dans la page
 */
var init={moduleElem:{}};

init.inject=function (module){
    init.moduleElem[module.id]=document.getElementById(module.id);
    init.moduleElem[module.id].innerHTML=module.getHTML();
    if(module.afterInject){
        console.log("afterinject");
        module.afterInject();
    }
};

init.show=function(name){
    for(var i in init.moduleElem){
        init.moduleElem[i].style.display='none';
    }
    init.moduleElem[name].style.display='block';
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

