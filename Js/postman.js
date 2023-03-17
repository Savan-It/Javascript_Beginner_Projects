let parameterBox = document.getElementById('Parameter1');
parameterBox.style.display = "none";
let url  = document.getElementById('iUrl')




// add event listener on radio botton (Json and parameters)
let rJson = document.getElementById('rJson');
let cParameter = document.getElementById('cParameter');
let enterRequestBox = document.getElementById('enterRequestBox');

rJson.addEventListener('click', () => {
    parameterBox.style.display = "none";
    enterRequestBox.style.display = "block";
})
cParameter.addEventListener('click', () => {
    enterRequestBox.style.display = "none";
    parameterBox.style.display = "block";

})


// adding parameters
let index = 0;
let addBtn = document.getElementById('addBtn');;
addBtn.addEventListener('click', () => {
    let extraParameters = document.getElementById('extraParameter');
    str = `<div class="mb-3 row">
            <label for="staticEmail" class="col-sm-3 col-form-label">Parameters ${index + 2}</label>
            <div class="col-sm-4">
                <input type="url" class="form-control" id="parameterKey${index + 2}"
                    placeholder="Enter parameter ${index + 2} key">
            </div>
            <div class="col-sm-4">
                <input type="url" class="form-control" id="parameterValue${index + 2}"
                    placeholder="Enter parameter ${index + 2} value">
            </div>
            <div class="col">
                <button class="btn btn-primary deleteParam">-</button>
            </div>
        </div>`;
        extraParameters.innerHTML += str;
        index++;
        
        let deleteParam = document.getElementsByClassName('deleteParam');
        
        for(item of deleteParam){
            item.addEventListener('click',(e)=>{
                let text ='click ok if you delete the parameter';
                if(confirm(text)==true){
                    e.target.parentElement.parentElement.remove();
                }
            })
        }
})

let sbtBtn = document.getElementById('sbtBtn');
sbtBtn.addEventListener('click',()=>{
    // document.getElementById('response').placeholder='please wait.. Fetching Response.'
    document.getElementById('code').innerHTML='please wait.. Fetching Response.'
    let url = document.getElementById('url').value;
    let  requestType = document.querySelector("input[name = 'Request']:checked").value;
    let  contentType = document.querySelector("input[name = 'Content']:checked").value;
    
   
    if (contentType == 'Costom Parameters') {
        data = {};
        for (let i = 0; i < index + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                // console.log(key);
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value; 
            }
        }
        data = JSON.stringify(data);
    }
    else {
        data = document.getElementById('enterRequestJson').value;
    }

    // console.log('url is  :',url);
    // console.log('rtype is : ',requestType);
    // console.log('Ctype is : ',contentType);
    // console.log('data is  :',data);

    if (requestType=='GET'){
        fetch(url, {
            method: 'GET',   
        })
        .then(response=> response.text())
        .then((text) =>{
            // document.getElementById('response').value = text;
            document.getElementById('code').innerHTML = text;
            Prism.highlightAll();
        });
    }

    else{
        fetch(url, {
            method: 'POST', 
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
              }  
        })
        .then(response=> response.text())
        .then((text) =>{
            // document.getElementById('response').value = text;
            document.getElementById('code').innerHTML = text;
            Prism.highlightAll();
        });
    }
})

// console.log(10**4);