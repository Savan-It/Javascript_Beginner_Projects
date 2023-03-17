let dragBox = document.getElementsByClassName('dragBox');
let imgBox = document.querySelector('.imgBox');

imgBox.addEventListener('dragstart', (e) => {
    // console.log('start');
    e.target.className += ' hold';
    setTimeout(() => {
        e.target.className = 'hide';
    }, 0);
});


imgBox.addEventListener('dragend', (e) => {
    // console.log('end....');
    e.target.className = 'imgBox';
})


for (whitebox of dragBox) {
    whitebox.addEventListener('dragover', (e) => {
        e.preventDefault();
        // console.log('dragover....');

    })

    whitebox.addEventListener('dragenter', (e) => {
        // console.log('dragenter....');
        // e.target.className += ' dashed' 

    })

    whitebox.addEventListener('dragleave', (e) => {
        // console.log('dragleave....');
        // e.target.className = 'dragBox'

    })

    whitebox.addEventListener('drop', (e) => {
        // console.log('drope....');
        e.target.append(imgBox);

    })
}