function onChangeItemComplete(id){
    const todoItem = document.getElementById("completeForm"+id)
    todoItem.submit()
}

function onChangeToggleAll(){
    const toggleAll = document.getElementById("toggleAllForm")
    toggleAll.submit()
}

function onChangeItemName(id){
    document.getElementById("nameLabel" + id).style.display="none"
    document.getElementById("nameForm" + id).style.display="inline-block"
}

function addKey(id,name){
    if(window.event.key === 'Escape' || window.event.code === "Escape" || window.event.keyCode === 27){
        document.getElementById("nameLabel" + id).style.display="inline-block"
        document.getElementById("nameInput" + id).value=name
        document.getElementById("nameForm" + id).style.display="none"
    }
}
