var app = new Vue({
    el: '#app',
    data: {
        books:[],
        search: "",
        es: "",
        en:""
    },
    methods: {


        getData(){
            
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

                localStorage.setItem("booksData", JSON.stringify(app.books));

                localStorage.setItem("bookTitleData", JSON.stringify(app.bookTitles));

                dataAge = Date.now();

                localStorage.setItem("Timestamp", dataAge);

            }).catch(function (error) {
                console.log("Request failed: " + error.message);
            });
        },
    },
    created() {


        var TimestampNow = Date.now();

        if (localStorage.getItem("booksData") && TimestampNow - localStorage.getItem("Timestamp") < 600000) {
            this.books = JSON.parse(localStorage.getItem("booksData"));
        } else {
            this.getData();
        }
    },
    computed: {

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
