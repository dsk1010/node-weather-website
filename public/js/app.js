console.log('Client Side Javascript');

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data);
    });
});

let weatherForm = document.querySelector('form');
let search = document.querySelector('input');
let messageOne = document.querySelector('#message-1');
let messageTwo = document.querySelector('#message-2');


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('Testing');

    let location = search.value;
    
    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';
    // http://localhost:3000/weather?address=

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error;
            // console.log(data.error);
        } else {
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;

            // console.log(data.location);
            // console.log(data.forecast);
        }
        });
    });
});
