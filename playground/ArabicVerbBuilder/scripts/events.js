//build button click: 
$("#buildbutton").on("click", buildButton);

//update forms functions:
function updateIsKastraVisibility(){

    var form = $("#form").val();
    var mood = $("#mood").val();

    if (form == "1" && mood == "past"){
        console.log("here");
        $("#isKasradiv").slideDown();
    }
    else {
        $("#isKasradiv").slideUp();
    }
}
function updateNounOptionsVisibility(){
    var mood = $("#mood").val();

    console.log("update: " + mood);

    if (mood == "agent-active" ||
        mood == "agent-passive" ||
        mood == "infinitive")
    {
        $("#fornouns").slideDown();
    }
    else{
        $("#fornouns").slideUp();
    }
}

//updating events change: 
$("#form").on("change", updateIsKastraVisibility);
$("#mood").on("change", updateIsKastraVisibility);
$("#mood").on("change", updateNounOptionsVisibility);
