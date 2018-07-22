console.log("script loaded");
$("#header").load("/header.html", initHeader);

function initHeader(){
    var $navbar = $("ul.navbar-nav");
    var $items = $navbar.find(".nav-item");
    $.each($items, function(index, value){
        var href = $(value).find("a").get(0).href;
        //if we are on the same page - make this active
        if (href == location)
        {
            $(value).addClass("active");
            console.log("class activated");
        }
            
    });
}
