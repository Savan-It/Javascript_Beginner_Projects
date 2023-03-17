function object(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

// storage = localStorage.setItem('book', object);

let addBtn = document.getElementById('submitForm')
addBtn.addEventListener('submit', submitBtn)

function submitBtn(e) {
    e.preventDefault();
    // console.log('hiii submited');

    let name = document.getElementById('bookName').value;
    let author = document.getElementById('auther').value;
    let type;
    let business = document.getElementById('business');
    let comedy = document.getElementById('comedy');
    let lifestyle = document.getElementById('lifestyle');

    if (business.selected) {
        type = business.value;
    }

    else if (comedy.selected) {
        type = comedy.value;
    }

    else if (lifestyle.selected) {
        type = lifestyle.value;
    }
    else {
        type = "";
    }
    let book = new object(name, author, type);
    console.log(book);

    let display = new Display();
    if (display.validation(book)) {

        display.add(book);
        display.clear();
        display.show('Successfull!!', 'Your book is Successfully added.')

    }
    else {
        display.show('please!!', 'first fill the details in form.')

    }

}
function Display() {

}
Display.prototype.add = function (book) {
    let tableBody = document.getElementById('tableBody');
    let tostring = `<tr>
                        <td>${book.name}</td>
                        <td>${book.author}</td>
                        <td>${book.type}</td>
                    </tr>`;
    tableBody.innerHTML += tostring;
}


Display.prototype.clear = function () {
    let addBtn = document.getElementById('submitForm');
    addBtn.reset();
}

Display.prototype.validation = function (book) {
    if (book.name.length < 2 || book.author.length < 2) {
        return false;
    }
    else {
        return true;
    }
}


Display.prototype.show = function (type, message) {
    let msg = document.getElementById('msg');
    msg.innerHTML = `<div class="alert alert-warning alert-dismissible fade show" role="alert">
                        <strong>${type}</strong> ${message}
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>`;

    setTimeout(function () {
        msg.innerHTML = '';
    }, 2500);

}