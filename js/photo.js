var photo ={
    id:'photo',
    sections:[],
    activeSection:null,
    color:[
        "#000"
    ]
};

photo.files={
    Error:[{
        cam:"Aucune caméra détectée"
    }]
};


photo.getHTML=function(){
    return "<div><div id=\"photo_comp\"></div><div id=\"photo_content\">Aucune caméra détectée</div></div>";
};

photo.afterInject=function(){
    photo.comp=document.getElementById("photo_comp");
    photo.content=document.getElementById("photo_content");
    //photo.load("Error");
    //init.show('');
    photo.content.addEventListener('click',photo.handleClick);
}
init.inject(photo);
