let booksData = []
const Carrello = [] 
const Cover = []
let Totale = 0
const modalBody = document.querySelector('.modal-body')

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
              <h6 class="text-white mb-0 w-100">$ <span class="price">${book.price.toFixed(2)}</span></h6>
            </div>
            <div class="d-flex align-items-center justify-content-left justify-content-md-between mt-3 g-3">
              <a onclick="Aggiunto(this)" class="btn me-2 rounded-circle d-flex justify-content-center align-items-center">
                <i class="bi bi-bag"></i>
              </a>
              <a onclick="RemoveCard(this)" class="btn me-2 rounded-circle d-flex justify-content-center align-items-center">
                <i class="bi bi-x-lg"></i>
              </a>
              <a href="dettagli.html?id=${book.asin}" class="btn me-2 rounded-circle d-flex justify-content-center align-items-center">
                <i class="bi bi-card-list"></i>
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
      const queryLetters = query.toLowerCase();
      return bookTitle.includes(queryLetters);
    });
  
    return filteredBooks;
  }

function RemoveCard(link) {
    let card = link.closest('.book')

    if(card){
      card.style.display = 'none'
    }
}

function Aggiunto(link){
    const card = link.closest('.card')
    let carrello = document.querySelector('#cart')
    let title = card.querySelector('.title').innerHTML
    let price = card.querySelector('.price').innerHTML
    const TotalPrice = document.querySelector("#totale")

    Cover.push(filterBooks(title)[0].img)
    Carrello.push(filterBooks(title)[0].title)

    card.style.border = "4px solid #4BB543"
    Totale += parseFloat(price)
    
    modalBody.innerHTML = ""

    for (let i = 0; i < Carrello.length; i++) {
        
        modalBody.innerHTML += `
            <div class="mb-3 d-flex align-items-center">
                <img src="${Cover[i]}" alt="" width="40" height="60" style="object-fit:cover; object-position:center">
                    <span class="ms-3 fs-6">  ${Carrello[i]}</span>
            </div>
            `
        
    }

    TotalPrice.innerHTML = "$ " + Totale.toFixed(2)
    carrello.innerHTML = '<i class="bi bi-basket me-3"></i>'
    carrello.innerHTML += "$ " + Totale.toFixed(2)
}

loadBooks()
