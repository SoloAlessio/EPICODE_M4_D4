let booksData = [] // Array che conterrà i dati dei libri
const Carrello = [] //
let Totale = 0
const modalBody = document.querySelector('.modal-body')
const TotalPrice = document.querySelector("#totale")


function renderBooks(books) {
  const booksContainer = document.querySelector('main .row')
  booksContainer.innerHTML = ''

  books.forEach(book => {
    booksContainer.innerHTML += `
      <div class="col-sm-6 col-md-4 col-lg-2 mb-3 mb-sm-0 book">
        <div class="card mb-2" style='background-image:url(${book.img})'>
          <div class="card-body w-100">
            <div class="d-flex flex-column justify-content-between align-items-center">
              <h6 class="text-white pe-3 title w-100">${book.title}</h6>
              <h6 class="text-white mb-0 price w-100">${book.price}</h6>
            </div>
            <div class="d-flex align-items-center justify-content-left justify-content-md-between mt-3 g-3">
              <a onclick="Aggiunto(this)" class="btn btn-primary me-2 rounded-circle d-flex justify-content-center align-items-center">
                <i class="bi bi-cart"></i>
              </a>
              <a class="btn btn-primary me-2 rounded-circle d-flex justify-content-center align-items-center">
                <i class="bi bi-heart"></i>
              </a>
              <a onclick="RemoveCard(this)" class="btn btn-primary me-2 rounded-circle d-flex justify-content-center align-items-center">
                <i class="bi bi-x-circle"></i>
              </a>
            </div>
          </div>
        </div>
      </div>`
  })
}

function loadBooks() {
  fetch("https://striveschool-api.herokuapp.com/books")
    .then(response => response.json())
    .then(data => {
      booksData = data
      renderBooks(data)
    })
}

document.getElementById('searchInput').addEventListener('input', function() {
  const query = this.value.trim()
  
  if (query.length >= 3) {
    const filteredBooks = filterBooks(query)
    renderBooks(filteredBooks)
  } else {
    renderBooks(booksData)
  }
})

function filterBooks(query) {
    const filteredBooks = booksData.filter(book => {
      const bookTitle = book.title.toLowerCase();
      const queryLetters = query.toLowerCase().split('');
      return queryLetters.every(letter => bookTitle.includes(letter));
    });
  
    return filteredBooks;
  }

function RemoveCard(link) {
    let card = link.closest('.book')
  
    card.style.display = 'none'
}

function Aggiunto(link){
    let card = link.closest('.card')
    let title = card.querySelector('.title').innerHTML
    let price = card.querySelector('.price').innerHTML
/* 
    for (let i = 0; i < booksData.length; i++) {
        const element = booksData[i];
        if(element.title.includes("title")){
            console.log(element.price);
        }
        
    } */

    card.style.border = '2px solid #4BB543'
    Carrello.push(title)
    Totale += parseFloat(price)
    
    modalBody.innerHTML = ""
    TotalPrice.innerHTML = "Totale: "

    for (let i = 0; i < Carrello.length; i++) {
        
        modalBody.innerHTML += `<p>${i+1} - ${Carrello[i]}</p>`
        
    }

    TotalPrice.innerHTML += "€ " + Totale.toFixed(2)
}

loadBooks()
