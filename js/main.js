var list = document.querySelector('ul');
var elAddForm = document.querySelector('#film_add_form');
var elSearchForm = document.querySelector('#films_search');
var elFilmTemplate = document.querySelector('.films-item-template').content;
var optionsValues = [];

elAddForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    addNewFilm(films);
    renderSelect(films);
});

elSearchForm.addEventListener('submit', function(evt) {
    evt.preventDefault();
    searchFilms();
})

var searchFilms = () => {
    var searchGenre = document.querySelector('.search__genre').value;
    var allFilms = document.querySelectorAll('.films__item');

    allFilms.forEach((elem) => {
        var elemGenres = elem.querySelector('.genres__list').textContent.split(', ');
        if (elemGenres.includes(searchGenre)) {
            elem.style.display = 'flex';
        } else if (searchGenre == 'All') {
            elem.style.display = 'flex';
        } else {
            elem.style.display = 'none';
        }
    });
}

var renderSelect = db => {
    db.forEach((elem) => {
        elem.genres.forEach((genre) => {
            if (optionsValues.includes(genre)) {
                null;
            } else {
                var newOpt = document.createElement('option');
                newOpt.value = genre;
                newOpt.textContent = genre;
                var select = document.querySelector('.search__genre');
                select.appendChild(newOpt);
                var allOptions = select.options;
                optionsValues.push(allOptions[allOptions.length-1].value);
            }
        })
    })
}

var addNewFilm = db => {
    var titleValue = document.querySelector('.form__title').value.trim();
    var imgValue = document.querySelector('.form__img').value.trim();
    var overviewValue = document.querySelector('.form__overview').value.trim();
    var dateValue = document.querySelector('.form__date').value;
    var genresValue = document.querySelector('.form__genres').value.trim();

    if (titleValue.length <= 0 || imgValue.length <= 0 || overviewValue.length <= 0 || dateValue.length <= 0 || genresValue.length <= 0) {
        alert('Not all info is submited');
        null;
    } else {
        db.unshift({
            id: String((Math.random(4) * 100000).toFixed(0)),
            title: titleValue,
            poster: imgValue,
            overview: overviewValue,
            release_date: calcMs(dateValue),
            genres: createGenresArr(genresValue),
        });

        var film = document.querySelector('.films__item');
        film.parentElement.insertBefore(createFilm(db[0]), film);
    }
}

var createGenresArr = string => string.split(', ');
var calcMs = date => new Date(String(date)).getTime();
var calcDate = ms => {
    var day = String(new Date(ms).getDate()).padStart(2, 0);
    var month = String(new Date(ms).getMonth() + 1).padStart(2, 0);
    var year = String(new Date(ms).getFullYear());
    var release = [day, month, year].join('.');

    return release;
};

var createFilm = film => {
    var itemTemplate = elFilmTemplate.cloneNode(true);
    var itemTitle = itemTemplate.querySelector('.films__title');
    var itemPoster = itemTemplate.querySelector('.films__img');
    var itemOverview = itemTemplate.querySelector('.films__overview');
    var itemDate = itemTemplate.querySelector('.films__date');
    var itemGenres = itemTemplate.querySelector('.genres__list');

    itemTitle.textContent = film.title;
    itemPoster.src = film.poster;
    itemOverview.textContent = film.overview;
    itemDate.textContent = calcDate(film.release_date);
    itemGenres.textContent = film.genres.join(', ');

    return itemTemplate;
}

var renderList = db => {
    db.forEach((item) => {
        list.appendChild(createFilm(item));
    });

    renderSelect(db);
}

renderList(films);