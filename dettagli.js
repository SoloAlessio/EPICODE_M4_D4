const params = new URLSearchParams(location.search);
const id = params.get('id');

console.log(id);

  function fetch() {
    fetch("https://striveschool-api.herokuapp.com/books/" + id)
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
  }

  fetch()