let userName = document.getElementById('uName')
let number = document.getElementById('number')
let email = document.getElementById('email')
let zip = document.getElementById('zip')

userName.classList.remove('is-invalid');
userName.classList.remove('is-valid');
number.classList.remove('is-invalid');
number.classList.remove('is-valid');
email.classList.remove('is-invalid');
email.classList.remove('is-valid');
zip.classList.remove('is-invalid');
zip.classList.remove('is-valid');

let validName = false;
let validEmail = false;
let validZip = false;
let validNumber = false;


userName.addEventListener('blur', () => {
    let RE = /^[a-zA-Z$?@?#?]([a-zA-Z0-9$?@?#?]){1,14}$/
    let str = userName.value;
    if (RE.test(str)) {
        // console.log('success');
        userName.classList.remove('is-invalid');
        userName.classList.add('is-valid');
        validName = true;

    }
    else {
        // console.log('please try ');
        userName.classList.add('is-invalid');
        validName = false;


    }
})


number.addEventListener('blur', () => {
    let RE = /^[1-9]([0-9]){9}$/;
    let str = number.value;
    if (RE.test(str)) {
        // console.log('success');
        number.classList.add('is-valid');
        number.classList.remove('is-invalid');
        validNumber = true;

    }
    else {
        // console.log('please try ');
        number.classList.add('is-invalid')
        number.classList.remove('is-valid');
        validNumber = false;


    }
})


email.addEventListener('blur', () => {
    let RE = /^([a-zA-z0-9_\-\.]+)@([a-zA-z_\-\.]+)\.([a-zA-z]){2,5}$/
    let str = email.value;
    if (RE.test(str)) {
        // console.log('success');
        email.classList.add('is-valid');
        email.classList.remove('is-invalid');
        validEmail = true;

    }
    else {
        // console.log('please try ');
        email.classList.add('is-invalid')
        email.classList.remove('is-valid');
        validEmail = false;


    }
})


zip.addEventListener('blur', () => {
    let RE = /^[1-9]{6}$/
    let str = zip.value;
    if (RE.test(str)) {
        // console.log('success');
        zip.classList.add('is-valid');
        zip.classList.remove('is-invalid');
        validZip = true;
    }
    else {
        // console.log('please try ');
        zip.classList.add('is-invalid')
        zip.classList.remove('is-valid');
        validZip = false;

    }
})


let form = document.getElementById('form')

let submit = document.getElementById('submit');
submit.addEventListener('click', (e) => {
    // console.log('savan');
    e.preventDefault();

    if (validEmail && validName && validNumber && validZip) {
        // console.log('yehehhe!!1....');
        let hih = document.getElementById('hih')
        hih.innerHTML = `<div class="alert alert-success alert-dismissible fade show my-3" role="alert">
        <strong>success!</strong> Your form hase been successfuly submited.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;
    //   userName.value = '';
        setTimeout(() => {
            hih.innerHTML = '';
        }, 2500);
        clear();
        }
    else {
        // console.log('oooohhhhhhh..!!!');
        let hih = document.getElementById('hih')
        hih.innerHTML = `<div class="alert alert-danger alert-dismissible fade show my-3" role="alert">
        <strong> Error!</strong> Your form hase been not submited, fill the correct value.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>`;
    //   userName.value = '';

    setTimeout(() => {
        hih.innerHTML = '';
    }, 2500);
    }
    function clear() {
        
        form.reset();
    }
    // let value = document.getElementById('select');
    // var getvalue = value.options[value.selectedIndex].value;
    // alert(getvalue);

    let sName = userName.value;
    let sNumber = number.value;
    let sEmail = email.value;
    let sZip = zip.value;
    // console.log(sName);
    // console.log(sNumber);
    // console.log(sEmail);
    // console.log(sZip);

    const details ={
    'Name' :userName.value,
    'Number' : number.value,
    'Email' : email.value,
    'Zip' : zip.value,
    }

    console.log(details);
    localStorage.getItem('Contact detail')
    localStorage.setItem('Contact detail', JSON.stringify(details))

})




