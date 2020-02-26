var app = new Vue({
    el: '#app',
    data: {
        books:[],     //ARRAY TO ADD THE FILTERED BOOKS
        search: "",   // SEARCH BAR WITH EMPTY STRING
        es: "",
        en:""
    },
    methods: {


        getData(){     //getData () es una función para recuperar datos de la API proporcionada, asignarle una marca de tiempo y también asignar los datos recuperados al almacenamiento local. Una vez que ambos están completos, se llama a la función Mostrar libros.
            
            var data;

            fetch("https://api.myjson.com/bins/1h3vb3", {

                method: "GET",

            }).then(function (response) {
                if (response.ok) {
                    return response.json();
                }
                throw new Error(response.statusText);
            }).then(function (json) {
                data = json;

                app.books = data.books;

                // localStorage.setItem("booksData", JSON.stringify(app.books));

                // localStorage.setItem("bookTitleData", JSON.stringify(app.bookTitles));

                // dataAge = Date.now(); 

                // localStorage.setItem("Timestamp", dataAge);

            }).catch(function (error) {
                console.log("Request failed: " + error.message);
            });
        },
    },
    created() {     //Este bloque de código verificará si hay datos en el almacenamiento local de menos de 1,5 minutos de antigüedad. Si es así, esos datos se utilizarán para la función displayBooks. De lo contrario, se utilizará una nueva búsqueda / visualización.


        var TimestampNow = Date.now();

        if (localStorage.getItem("booksData") && TimestampNow - localStorage.getItem("Timestamp") < 90000) {
            this.books = JSON.parse(localStorage.getItem("booksData"));
        } else {
            this.getData();
        }
    },
    computed: { //Esta es nuestra funcionalidad de búsqueda. El sitio web solo muestra libros filtrados, y cuando el cuadro de búsqueda está vacío, hay cero resultados filtrados, por lo que vemos todo. Cada vez que se escribe un carácter en el cuadro, lo compara con el título y la descripción de todos los elementos en la API y muestra solo resultados coincidentes.

        filteredBooks: function() {
            return this.books.filter((book) => {

                return book.titulo.toUpperCase().match(this.search.toUpperCase()) || book.descripcion.toUpperCase().match(this.search.toUpperCase())
            })
        }
    },
    components: {
        "backbutton": {
            template: '<button class="cardButton" data-fancybox="gallery">See more</button>'
        }
    }
});


//TOP BUTTON
var btn = $('#button');

$(window).scroll(function() {
  if ($(window).scrollTop() > 300) {
    btn.addClass('show');
  } else {
    btn.removeClass('show');
  }
});

btn.on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({scrollTop:0}, '300');
});

