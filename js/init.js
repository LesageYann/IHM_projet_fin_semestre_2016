/* 
 * fichier qui se déclenche au onload.
 * s'occupe des injections de html dans la page
 */
var init={};

init.inject=function (module){
    document.getElementById(module.id).innerHTML=module.getHTML();
};


