let selectedRow = null

function onFormSubmit() {
    var formData = readFormData();
    if (selectedRow == null)
        insertNewRecord(formData);
    else
        updateRecord(formData);
    resetForm();
}

let recent = document.getElementById("yesRecently") 
function checkValue() { 
    if (recent.checked) {
    recent.value = "Yes"
    } else {
    recent.value = "No"
    }
    return recent.value          
}


function checkedit () {
    recent.addEventListener('click', () => {
        if(recent.checked){
            recent.uncheck
        }
        if (recent.uncheck) {
        recent.checked
        }
    });  
}

function readFormData() {
    var formData = {};
    formData["firstName"] = document.getElementById("firstName").value;
    formData["lastName"] = document.getElementById("lastName").value;
    formData["email"] = document.getElementById("email").value;
    formData["gender"] = getGender();
    formData["recently"] = checkValue();
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = `<div id="name"> ${data.firstName}</div> <div> ${data.lastName} </div>`;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.email;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.gender;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.recently;
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = `<button class="button2" onClick="onEdit(this)">Edit</button>`
    cell6 = newRow.insertCell(5);
    cell6.innerHTML = `<button class="button2" onClick="onDelete(this)">Delete</button>`;
}

function resetForm() {
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("gender").value = "";
    recent.checked = false;
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("submit").value = "Update";
    document.getElementById("firstName").value = selectedRow.cells[0].childNodes[0].innerHTML;
    document.getElementById("lastName").value = selectedRow.cells[0].childNodes[2].innerHTML;
    document.getElementById("email").value = selectedRow.cells[1].innerHTML;
    document.getElementById("gender").value = selectedRow.cells[2].innerHTML;
    document.getElementById("yesRecently").value = selectedRow.cells[3];
}
function updateRecord(formData) {
    document.getElementById("submit").value = "Submit";
    selectedRow.cells[0].innerHTML = `<div id="name"> ${formData.firstName} </div> <div> ${formData.lastName} </div>`;
    selectedRow.cells[1].innerHTML = formData.email;
    selectedRow.cells[2].innerHTML = formData.gender;
    selectedRow.cells[3].innerHTML = formData.recently;

    console.log("hejej", formData)
}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("employeeList").deleteRow(row.rowIndex);
        resetForm();
    }
}

function getGender() {
    let gender = document.getElementById("gender");
    selectedValue=gender.options[gender.selectedIndex].text
    console.log(gender)
    return selectedValue
}


