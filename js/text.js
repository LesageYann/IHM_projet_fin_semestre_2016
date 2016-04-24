/*
 * gestion de l'éditeur de texte pur
 * pris en charge par : Yann
 */
var text ={
    id:'text',
    sections:[],
    activeSection:null,
    color:[
        "#F0F0F0",
        "#F01000",
        "#F04000",
        "#B05000",
        "#405000",
        "#005000"
    ]
};

/*ensemble de fichier fake
 * 
 */
text.files={
    ihm:[{
        comprehension:5,
        text:"IHM  dernier cours"
    },{
        comprehension:5,
        text:["Déficiences physiques",
            "Vue et ouïe qui baissent",
            "Baisse de la coordination œil/main",
            "Arthrite et tremblements qui baissent la dextérité"
        ]
    },{
        comprehension:5,
        text:["Déficiences psychiques",
            "Confusions",
            "Perte de mémoire",
            "Diminution dans la confiance de prise de décision",
            "Ne distinguent pas ce qui est pertinent et ce qui ne l’est pas"
        ]
    },{
        comprehension:5,
        text:["Conséquences",
            "Anxiété, frustration",
            "Peur de paraître stupide",
            "Peur de l’échec",
            "Peur de casser",
            "Redoute les changements"
        ]
    },{
        comprehension:5,
        text:[
            "Problèmes",
            "Difficulté pour apprendre",
            "Manque d’intérêt"
        ]
    },{
        comprehension:5,
        text:[""]
    }
    ]  
};

/*
 * retourne le html du composant sous la forme de string
 * utiliser une requete ajax pour charger un fichier
 * ou tapez directement le html ici
 * On peut utilisez les promises js si vous préférez
 */
text.getHTML=function(){
    return "<div><div id=\"text_comp\"></div><div id=\"text_content\" contenteditable></div></div>";
};

/*
 * function fake
 * devrait se connecter au serveur pour récupérer le fichier
 * 
 */
text.getFile=function(name){
    return text.files[name];
};

text.load=function (name){
    text.sections=[];
    text.comp.innerHTML="";
    text.content.innerHTML="";
    var sections=text.getFile(name);
    console.log("sections",sections)
    for(var i=0;i<sections.length;i++){
        text.addSection(sections[i]);
    }
    text.activeSection="";
};

/*
 * un section est un titre si il ne comporte qu'une ligne
 */
text.addSection=function(section,afterThis){
    if(!section){
        section={
            comprehension:0,
            text:["."]
        };
    }
    text.sections.push(section);
    var string;
    var newSection=document.createElement("div");
    if(section.text[0].length==1){
        string="<h2>"+section.text+"</h2>";
    }else{
        string="<h3>"+section.text[0]+"</h3>";
        for(var i=1;i<section.text.length;i++){
            string+="<p>"+section.text[i]+"</p>";
        }
    }
    newSection.sectionInfo=section;
    newSection.innerHTML=string;
    newSection.colorNode=document.createElement("div");
    newSection.colorNode.style.background=text.color[section.comprehension];
    if(afterThis){
        text.content.insertBefore(newSection, afterThis.nextSibling);
        text.comp.insertBefore(newSection.colorNode, afterThis.colorNode.nextSibling);
    }else{
        text.content.appendChild(newSection);
        text.comp.appendChild(newSection.colorNode);
    }
    text.focusOnSec(newSection);
    return newSection;
};

text.correctElem=function(section){
    
};

text.setActiveSection=function(section){
    console.log("setActiveSection",section);
    if(text.activeSection){
      text.activeSection.style.border="";
      text.activeSection.removeChild(text.decorateChild);
    }
    text.activeSection=section;
    text.activeSection.style.border="2px solid black";
    text.activeSection.insertBefore(text.decorateChild,text.activeSection.children[0]);
    text.activeSection.focus();
};

text.handleClick=function(event){
    console.log("setActiveSection",event);
    if(event.target==text.content){
        text.addSection();
        event.target=event.target.children[0];
    }else if(event.target.tagName=='DIV'){
        text.setActiveSection(event.target);
        event.target=event.target.children[event.target.children-2];
    }else{
        text.setActiveSection(event.target.parentElement);
    }
    console.log("focus on",event.target);
    event.target.focus();
};

text.createBtn=function(recept,label,value,fct){
    var btn=document.createElement("button");
    btn.innerHTML=label;
    btn.addEventListener('click',fct,false);
    btn.comprehension=value;
    recept.appendChild(btn);
};

text.changeComp=function(event){
    if (event.stopPropagation) {
        event.stopPropagation();
    }
    event.cancelBubble = true;
    console.log("changeComp",event);
    text.activeSection.comprehension=event.target.comprehension;
    text.activeSection.colorNode.style.background=text.color[event.target.comprehension];
};

text.onKeyDown=function(event){
    console.log(event);
    if(event.ctrlKey){
        event.preventDefault();
        //aller a la section du dessussi pa de section
        // retour a la dernière
        if(event.keyCode==38){
            if(text.activeSection &&  text.activeSection.previousSibling){
                text.setActiveSection(text.activeSection.previousSibling);
            }else{
                text.setActiveSection(text.content.lastElementChild);
            }
        //aller a la section du dessous, si pa de section
        // retour a la première
        }else if(event.keyCode==40){
            if(text.activeSection && text.activeSection.nextSibling){
                text.setActiveSection(text.activeSection.nextSibling);
            }else{
                text.setActiveSection(text.content.firstElementChild);
            }
        //creer une section
        }else if(event.keyCode==13){
            text.setActiveSection(
                    text.addSection(null,text.activeSection));
        }else if(event.keyCode>96 && event.keyCode<102){
            console.log("change comprehension ",event.keyCode - 96)
            text.activeSection.comprehension=event.keyCode-96;
            text.activeSection.colorNode.style.background=text.color[event.keyCode-96];
        }
        //mettre une note de comprehension
    }else{
        //document.activeElement
        if(text.activeSection && event.keyCode==38){
            var anchor;
            if (document.selection) {
                
            } else if (window.getSelection) {
                anchor=window.getSelection().anchorNode;
            }
            if(anchor.parentElement.previousSibling!=text.decorateChild){
                text.setActiveSection(anchor.parentElement.parentElement);
            }else if(anchor.parentElement.parentElement.nextSibling){
                text.setActiveSection(anchor.parentElement.parentElement.previousSibling);
            }
            
        }else if(text.activeSection && event.keyCode==40){
            var anchor;
            if (document.selection) {
                
            } else if (window.getSelection) {
                anchor=window.getSelection().anchorNode;
            }
            if(anchor.parentElement.nextSibling){
                text.setActiveSection(anchor.parentElement.parentElement);
            }else if(anchor.parentElement.parentElement.nextSibling){
                text.setActiveSection(anchor.parentElement.parentElement.nextSibling);
            }
            
        }
    }
};

text.focusOnSec=function(section){
    var node = section.children[section.children.length-1].childNodes[0],
        range = null,
        sel = null;

    if(node){
        console.log("node to focus", node);
        node.parentElement.focus();
        if (document.selection) {
            range = document.body.createTextRange();
            range.moveToElementText(node);
            range.select();
        } else if (window.getSelection) {
            range = document.createRange();
            range.selectNode(node);
            sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
        }
    }
};

text.afterInject=function(){
    text.comp=document.getElementById("text_comp");
    text.content=document.getElementById("text_content");
    text.load("ihm");
    init.show('text');
    text.content.addEventListener('click',text.handleClick);
    text.decorateChild=document.createElement("div");
    text.decorateChild.innerHTML="compris : ";
    text.createBtn(text.decorateChild,"pas du tout",1,text.changeComp);
    text.createBtn(text.decorateChild,"pas trop",2,text.changeComp);
    text.createBtn(text.decorateChild,"moyen",3,text.changeComp);
    text.createBtn(text.decorateChild,"plutot oui",4,text.changeComp);
    text.createBtn(text.decorateChild,"totalement",5,text.changeComp);
};


init.inject(text);