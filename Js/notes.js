
showNotes();

document.getElementById('updateBtn').style.display = "none"

let btn = document.getElementById('addBtn');
btn.addEventListener('click', f1);
function f1() {
    let txt = document.getElementById('addTxt');
    let title = document.getElementById('title');
    let notes = localStorage.getItem('notes');

    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    let myObj = {
        title: title.value,
        notes: txt.value,
    }
    if (validation(myObj)) {
        notesObj.push(myObj);
        localStorage.setItem('notes', JSON.stringify(notesObj));
        txt.value = "";
        title.value = "";
        showNotes();
    }
    else { }
}

// Function to show the notes in home page from localstorage
function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }


    let html = "";

    notesObj.forEach(function (element, index) {

        html += `
            <div class="card  main my-2 mx-2" style="width: 17rem; background-color:#fff4f4;">
                <div class="card-body">
                    <h5 class="card-title">${element.title}</h5>
                    <style>
                    .topright {
                    position: absolute;
                    top: 8px;
                    right: 16px;
                    }
                    </style> 
                    <p class="card-text">${element.notes}</p>
                    <button class="btn btn-primary my-3" id="${index}" onclick="deletenotes(this.id);">Delete note</button> &nbsp; 
                    <button class="btn btn-warning my-3" id="${index}" onclick="updatenotes(this.id);">Edit</button> &nbsp; 
                </div>
            </div>
            `;
    })
    let mainnotes = document.getElementById('Ynotes');
    if (notesObj.length == 0) {
        mainnotes.innerHTML = `<h5 style="color : red" >Please create a notes!!</h5>`;
    }
    else {
        mainnotes.innerHTML = html;
    }

}

//function to delete perticuler notes

function deletenotes(index) {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    showNotes();
}

// validate all data

function validation(myObj) {
    if (myObj.title == "" || myObj.notes == ""){
        alert("please enter all the details!!")
        return false;
    }
    else{
        return true;
    }
}

//create function for search area

let search = document.getElementById('sTxt');
search.addEventListener('input', f2);

function f2() {
    let inputVal = search.value.toLowerCase();
    let card = document.getElementsByClassName('main');
    // console.log(card);
    Array.from(card).forEach(function (element) {
        let cardTxt1 = element.getElementsByTagName("p")[0].innerText.toLowerCase();
        let cardTxt2 = element.getElementsByTagName("h5")[0].innerText.toLowerCase();
        // cardTxt = cardTxt.toLowerCase();
        if (cardTxt1.includes(inputVal) || cardTxt2.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }

    })

}

function updatenotes(index) {

    document.getElementById('addBtn').style.display = "none"
    document.getElementById('updateBtn').style.display = "block"

    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }


    document.getElementById('addTxt').value = notesObj[index].notes
    document.getElementById('title').value = notesObj[index].title

    document.getElementById('updateBtn').onclick = function () {

        notesObj[index].notes = document.getElementById('addTxt').value;
        notesObj[index].title = document.getElementById('title').value;

        localStorage.setItem('notes', JSON.stringify(notesObj));


        document.getElementById('addTxt').value = "";
        document.getElementById('title').value = "";

        showNotes();

        document.getElementById('addBtn').style.display = "block"
        document.getElementById('updateBtn').style.display = "none"

    }


}
// important notes

// let addStar = document.getElementById('star').innerHTML;
// addStar.addEventListener('click',f4)

// function f4() {
//     console.log("+!!!!");
// }
