function onChangeItemComplete(index){
    const id = "completeForm"+index
    const todoItem = document.getElementById(id)
    todoItem.submit()
}

function onChangeToggleAll(){
    const toggleAll = document.getElementById("toggleAllForm")
    toggleAll.submit()
}

function onChangeItemName(index){
    document.getElementById("nameLabel" + index).style.display="none"
    document.getElementById("nameForm" + index).style.display="inline-block"
}

function addKey(name, index){
    if(window.event.key === 'Escape' || window.event.code === "Escape" || window.event.keyCode === 27){
        document.getElementById("nameLabel" + index).style.display="inline-block"
        document.getElementById("nameInput" + index).value=name
        document.getElementById("nameForm" + index).style.display="none"
    }
}