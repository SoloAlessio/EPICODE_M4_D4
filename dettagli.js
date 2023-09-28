const params = new URLSearchParams(location.search);
const id = params.get('id');
const title = document.querySelector('#title');
const price = document.querySelector('#price');

const img = document.querySelector('.prova');
let body

function load() {
    fetch("https://striveschool-api.herokuapp.com/books/" + id)
      .then(response => response.json())
      .then(data => {
        body = data
        img.src = body.img
        title.innerHTML = body.title
        price.innerHTML = `$  ${body.price.toFixed(2)}`
      })
  }


  load()