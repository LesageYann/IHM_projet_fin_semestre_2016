var cam ={
    id:'cam',
    sections:[],
    activeSection:null,
    color:[
        "#000"
    ]
};

cam.files={
    Error:[{
        cam:"Aucune caméra détectée"
    }]
};


cam.getHTML=function(){
    return "<div><div id=\"photo_comp\"></div><div id=\"photo_content\"></div></div>";
};

cam.afterInject=function(){
    cam.comp=document.getElementById("cam_comp");
    cam.content=document.getElementById("cam_content");
    cam.load("Error");
    init.show('cam');
    cam.content.addEventListener('click',cam.handleClick);
}
init.inject(cam);
