
let string = ['javascript', 'python', 'css', 'angular', 'reactjs', 'html', 'java'];
let r = Math.floor(Math.random() * string.length)
let ranString = string[r];
let a = ranString.split('');
let n = a.length;
// console.log(ranString);


for (let i = n - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
}
let final = a.join('');
// console.log(final);

let image = document.getElementById('image');
let title2 = document.getElementById('title2')
let inputTxt = document.getElementById('inputTxt')



let pBtn = document.getElementById('pBtn');
pBtn.addEventListener('click', playNow);

function playNow() {
    image.style.display = "none";
    title2.style.display = "block";

    inputTxt.classList.remove('d-none');
    inputTxt.classList.add('d-block');

    pBtn.innerHTML = 'Submit';
    pBtn.classList.add('btn-sm');
    title2.innerHTML += ` <b>${final}</b>`;
    pBtn.addEventListener('click',playAgain )
}
//    addEventListener('click', playAgain);


function playAgain() {

    if (inputTxt.value === ranString) {
        title2.innerHTML = `You guess right one..👍`
        inputTxt.classList.remove('d-block');
        inputTxt.classList.add('d-none');
        pBtn.innerHTML = 'Play again';
        pBtn.addEventListener('click',playDubara)
    }
    else{
        title2.innerHTML = `Please!! guess correct word : <b>${final}</b>`
        
    }
}

function playDubara(){
    location.reload();
    playNow();
}


