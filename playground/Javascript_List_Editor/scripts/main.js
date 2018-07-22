
//editing event 
var checklist = document.getElementById("checklist");
var items = checklist.querySelectorAll("li");

for (var i = 0; i < items.length; i++){
    addEventListenerForItem(items[i]);
}
function addEventListenerForItem(item){
    item.addEventListener("click", editItem);
    input = item.querySelector("input");
    input.addEventListener("blur", update);
    input.addEventListener("keypress", itemKeypress);
    item.querySelector(".deleteButton").addEventListener("click", deleteItem);
}
//additem event
document.getElementById("addbutton").addEventListener("click", addItem);


function editItem() {
    this.className = "edit";
    var input = this.querySelector("input");
    input.focus();
    input.setSelectionRange(0, input.value.length);
}
function update(){  
    this.parentNode.className = "";
    this.previousElementSibling.innerHTML = this.value;
}
function itemKeypress(event){
    if (event.which === 13 )
        update.call(this);
}
function addItem(){
    var text = prompt("Enter new item name: ");

    if (text == null || text == ""){
        return;
    }

    var node = document.createElement("LI");                
    node.innerHTML = "<i class=\"fa fa-trash deleteButton\"></i> <span>" + text + "</span> <input value=\"" + text + "\">";
    checklist.appendChild(node);
    addEventListenerForItem(node);

}
function deleteItem(){

    if (confirm("Are you sure you want to delete? "))
    {
        var item = this.parentNode;
        item.parentNode.removeChild(item);  
    }
    else
        return;
    
}