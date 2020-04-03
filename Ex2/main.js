function add_book() {
    let table_body = document.getElementById('main_table_body');
    let newRow = table_body.insertRow();
    newRow.classList.add("editable")

    let author_th = newRow.insertCell(0);
    let input_author = document.createElement("input")
    input_author.type = "text";
    author_th.appendChild(input_author);
    let text_author = document.createElement("a")
    author_th.appendChild(text_author);

    let title_th = newRow.insertCell(1);
    let input_title = document.createElement("input")
    input_title.type = "text";
    title_th.appendChild(input_title);
    let text_title = document.createElement("a")
    title_th.appendChild(text_title);

    let buttons_th = newRow.insertCell(2);

    let button_save = document.createElement("button")
    button_save.type = "button"
    button_save.innerHTML = "Save"
    button_save.classList.add("btn-save");
    button_save.setAttribute('onclick', 'save_function(this)');
    buttons_th.appendChild(button_save);

    let button_edit = document.createElement("button")
    button_edit.type = "button"
    button_edit.innerHTML = "Edit"
    button_edit.classList.add("btn-edit");
    button_edit.setAttribute('onclick', 'edit_function(this)');
    buttons_th.appendChild(button_edit);

    let button_remove = document.createElement("button")
    button_remove.type = "button"
    button_remove.innerHTML = "Remove"
    button_remove.classList.add("btn-remove");
    button_remove.setAttribute('onclick', 'remove_function(this)');
    buttons_th.appendChild(button_remove);
}

function save_function(object) {
    let row = object.parentNode.parentElement;
    row.classList.remove("editable");

    let elements = row.children;

    let title_th = elements.item(0);
    let title_input = title_th.getElementsByTagName("input").item(0);
    let title_text = title_th.getElementsByTagName("a").item(0);
    title_text.innerHTML = title_input.value;

    let author_th = elements.item(1);
    let author_input = author_th.getElementsByTagName("input").item(0);
    let author_text = author_th.getElementsByTagName("a").item(0);
    author_text.innerHTML = author_input.value;
}

function edit_function(object) {
    let row = object.parentNode.parentElement;
    row.classList.add("editable");
}

function remove_function(object) {
    let row = object.parentNode.parentElement;
    let rowIndex = row.rowIndex;
    document.getElementById("main_table").deleteRow(rowIndex);
}