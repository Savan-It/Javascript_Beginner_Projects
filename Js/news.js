// https://newsapi.org/v2/top-headlines?country=us&apiKey=2bc3a8718bc54dbc851f68e81c2aa963
// country ==> //1.ae 2.ar 3.at 4.au 4.be bg br ca ch cn co cu cz de eg fr gb gr hk hu id ie il in it jp kr lt lv ma mx my ng nl no nz ph pl pt ro rs ru sa se sg si sk th tr tw ua us ve za.
// category ==> //1.business 2.entertainment 3.general 4.health 5.science 6.sports 7.technology.

let country = "in"; 
let apikey = '2bc3a8718bc54dbc851f68e81c2aa963';
let category = "business"; 

let addAccordion = document.getElementById('addAccordion');


let xhr = new XMLHttpRequest();

xhr.open('get', `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${apikey}`, true);

xhr.onload = (function () {
    addAccordion.innerHTML = `<h4>please wait.. Fetching data</h4>`;
    if (xhr.status === 200) {
        let json = JSON.parse(this.responseText);
        let articles = json.articles;
    
        console.log(articles);
        let html = "";
        articles.forEach(function (element) {
            element = ((element.urlToImage == null)||(element.content == null||element.content =="")||(element.title==null||element.title==""))? html :
            html += `<div class=" row-container card mx-2 my-3" style="width: 25rem;">
                            <img src="${element.urlToImage}" class="card-img-top my-3" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">${element.title}</h5>
                                <p class="card-text">${element.content}</p>
                                <a href="${element.url}" class="btn btn-primary" target="_blank" >Read more</a>
                            </div>
                        </div>`;
        });
        addAccordion.innerHTML = html;

    }
    else {
        addAccordion.innerHTML = "some error occured...";
    }
})

xhr.send();

let sBtn = document.getElementById('sTxt');
sBtn.addEventListener('input', f2)

function f2() {
    let inputVal = sBtn.value.toLowerCase();
    let card = document.getElementsByClassName('card');
    Array.from(card).forEach(function (element) {
        let cardTxt1 = element.getElementsByTagName('p')[0].innerText.toLowerCase();
        let cardTxt2 = element.getElementsByTagName('h5')[0].innerText.toLowerCase();
        // cardTxt = cardTxt.toLowerCase();
        if (cardTxt1.includes(inputVal) || cardTxt2.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }

    })

}

