// console.log('savan ');
class object {
  constructor(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
  }
}
document.querySelector("#updateBtn").style.display = "none"

// add event listener on Add-book butyon
let form = document.getElementById('submitForm')

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", submitBtn);
function submitBtn(e) {
  `use strict`;
  e.preventDefault();
  let nameValue = document.getElementById("bookName").value;
  let authorValue = document.getElementById("auther").value;
  let typeValue = document.getElementById("type").value;
  let storage = localStorage.getItem("Book");
  let notesObj = storage == null ? [] : JSON.parse(storage);

  let book = new object(nameValue, authorValue, typeValue);

  if (display.validation(book)) {
    notesObj.push(book);
    localStorage.setItem("Book", JSON.stringify(notesObj));
    display.add();
    form.reset();
    display.showError("Successfull!!", "Your book is Successfully added.", "success");

  } else {
    // display.showError("please!!", "first fill the details in form.", "danger");
  }
}

class Display {
  add() {

    `use strict`
    let storage = localStorage.getItem("Book");
    let notesObj = storage == null ? [] : JSON.parse(storage);

    let tableBody = document.getElementById("tableBody");
    let mainClass = document.getElementById("mainClass");
    const pagination = document.getElementById("pagination");
    let perPageItem = document.getElementById("perPageItem");

    let perPageItemValue = perPageItem.options[perPageItem.selectedIndex].text;

    let itemsPerPage = parseInt(perPageItemValue);
    let currentPage = 1;

    perPageItem.addEventListener("change", () => {

      let perPageItemValue1 = perPageItem.options[perPageItem.selectedIndex].text;
      itemsPerPage = parseInt(perPageItemValue1);

      renderTable();
      renderPagination();
    })


    const renderTable = (filteredData = notesObj) => {
      let html = "";
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const pageData = filteredData.slice(startIndex, endIndex);

      pageData.forEach(function (element, index) {
        html += `<div>
                  <tr class = "items2">
                    <td class = "hihi">${index + 1 + startIndex}</td>
                    <td class = "hihi">${element.name}</td>
                    <td class = "hihi">${element.author}</td>
                    <td class = "hihi">${element.type}</td>
                    <td><button class="btn btn-danger" id="${index + startIndex}" onclick="deleteBook(this.id);">Delete</button><button class=" ms-2 mt-md-0 mt-1 btn btn-warning" id="${index + startIndex}" onclick="updateBook(this.id);">Edit</button></td>
                  </tr>
               </div>`;
      });
      let note = document.getElementById("note");
      if (notesObj.length == 0) {
        note.innerHTML = `<h5 style="color : red" >Please Add a book!!</h5>`;
        mainClass.classList.add("d-none");

      } else {
        mainClass.classList.remove("d-none");
        note.innerHTML = ``;
        tableBody.innerHTML = html;
      }

    };

    const renderPagination = (filteredData = notesObj) => {
      pagination.innerHTML = "";
      const pageCount = Math.ceil(filteredData.length / itemsPerPage);

      let previousDisabled = "";
      if (notesObj.length == 0) {
        previousDisabled = "d-none";
      }
      else if (currentPage === 1) {
        previousDisabled = "disabled";
      }
      pagination.innerHTML += `
      <li class="page-item ${previousDisabled}"><a class="page-link" href="#" id="previous">Previous</a></li>`;

      for (let i = 1; i <= pageCount; i++) {
        pagination.innerHTML += `  
            <li class="page-item"><a class="page-link paginationBtn" data-page="${i}" href="#">${i}</a></li>`;
      }

      let nextDisabled = "";
      if (currentPage === pageCount) {
        nextDisabled = "disabled";
      }
      else if (notesObj.length == 0) {
        // previousDisabled = "d-none";
        nextDisabled = "d-none";
      }
      pagination.innerHTML += `
      <li class="page-item ${nextDisabled}"><a class="page-link" href="#" id="next">Next</a></li>`;
    };

    const handlePaginationClick = (event) => {
      event.preventDefault();
      const clickedBtn = event.target;
      if (clickedBtn.matches(".paginationBtn")) {
        currentPage = parseInt(clickedBtn.getAttribute("data-page"));
        renderTable();
        renderPagination();

      } else if (clickedBtn.matches("#previous")) {
        currentPage--;
        renderTable();
        renderPagination();
      } else if (clickedBtn.matches("#next")) {
        currentPage++;
        renderTable();
        renderPagination();
      }
    };

    const searchInput = document.getElementById("sTxt");
    searchInput.addEventListener("input", () => {
      let searchValue = searchInput.value;
      let filteredData = notesObj.filter(function (book) {
        return (
          book.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          book.author.toLowerCase().includes(searchValue.toLowerCase()) ||
          book.type.toLowerCase().includes(searchValue.toLowerCase())
        );
      });
      currentPage = 1;
      renderTable(filteredData);
      renderPagination(filteredData);
    });
    pagination.addEventListener("click", handlePaginationClick);

    renderTable();
    renderPagination();


  }

  validation(book) {
    if (book.name.length < 2){
      alert("Please enter more than 2 character in book name")
      return false;
    }
    else if( book.author.length < 2 ){
      alert("Please enter more than 2 character in Autor name");
      return false;
      
      
    }
    
    else if(book.type == ""){
      alert("Please select a book type")
      return false;

    }
     else {
      return true;
    }
  }

  showError(type, message, className) {
    let msg = document.getElementById("msg");
    msg.innerHTML = `<div class="alert alert-${className} alert-dismissible fade show" role="alert">
                            <strong>${type}</strong> ${message}
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>`;

    setTimeout(function () {
      msg.innerHTML = "";
    }, 2500);
  }
}

// create delete function
function deleteBook(index) {
  let storage = localStorage.getItem("Book");
  let notesObj = storage == null ? [] : JSON.parse(storage);
  notesObj.splice(index, 1);
  localStorage.setItem("Book", JSON.stringify(notesObj));
  // location.reload();
  display.add();
}

function updateBook(index) {
  let storage = localStorage.getItem("Book");
  let notesObj = storage == null ? [] : JSON.parse(storage);

  document.querySelector("#updateBtn").style.display = "block"
  document.querySelector("#addBtn").style.display = "none"

  document.getElementById("bookName").value = notesObj[index].name;
  document.getElementById("auther").value = notesObj[index].author;
  let type = document.getElementById("type");
  //Set selected
  setSelectedValue(type, notesObj[index].type);

  function setSelectedValue(selectObj, valueToSet) {
    for (var i = 0; i < selectObj.options.length; i++) {
      if (selectObj.options[i].text == valueToSet) {
        selectObj.options[i].selected = true;
        return;
      }
    }
  }

  document.querySelector("#updateBtn").onclick = function (e) {
    e.preventDefault();

    notesObj[index].name = document.getElementById("bookName").value;
    notesObj[index].author = document.getElementById("auther").value;
    let type = document.getElementById("type");
    notesObj[index].type = type.options[type.selectedIndex].value;
    let book = new object(notesObj[index].name, notesObj[index].author, notesObj[index].type);
    if (display.validation(book)) {
      localStorage.setItem("Book", JSON.stringify(notesObj));
      display.add();
      form.reset();
      display.showError("Updated!!", "Your book is Successfully updated.", "success");

    } else {
      display.showError("please!!", "first fill the details in form.", "danger");
    }

    document.querySelector("#updateBtn").style.display = "none"
    document.querySelector("#addBtn").style.display = "block"
  }

}
// call display
let display = new Display();
display.add();

