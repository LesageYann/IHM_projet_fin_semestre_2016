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
    return "<div><div id=\"text_comp\"></div><div id=\"text_content\"></div></div>";
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
 * 
 */
text.addSection=function(section){
    if(!section){
        section={
            comprehension:0,
            text:[""]
        };
    }
    text.sections.push(section);
    var string;
    text.activeSection=document.createElement("div");
    if(section.text[0].length==1){
        string="<h2>"+section.text+"</h2>";
    }else{
        string="<h3>"+section.text[0]+"</h3>";
        for(var i=1;i<section.text.length;i++){
            string+="<p>"+section.text[i]+"</p>";
        }
    }
    text.activeSection.innerHTML=string;
    text.activeSection.colorNode=document.createElement("div");
    text.activeSection.colorNode.style.background=text.color[section.comprehension];
    text.content.appendChild(text.activeSection);
    text.comp.appendChild(text.activeSection.colorNode);
};

text.setActiveSection=function(section){
    console.log("setActiveSection",section);
    if(text.activeSection){
      text.activeSection.style.border="";
      text.activeSection.removeChild(text.decorateChild);
    }
    text.activeSection=section;
    text.activeSection.style.border="2px solid black";
    text.activeSection.appendChild(text.decorateChild);
};

text.handleClick=function(event){
    console.log("setActiveSection",event);
    if(event.target==text.content){
        text.addSection();
    }else if(event.target.tagName=='DIV'){
        text.setActiveSection(event.target);
    }else{
        text.setActiveSection(event.target.parentElement);
    }
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