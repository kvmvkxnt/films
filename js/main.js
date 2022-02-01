const list = document.querySelector('ul');
const elAddForm = document.querySelector('#film_add_form');
const elSearchForm = document.querySelector('#films_search');
const elFilmTemplate = document.querySelector('.films-item-template').content;
let optionsValues = [];

elAddForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    addNewFilm(films);
    renderSelect(films);
    searchFilms();
});

elSearchForm.addEventListener('change', function(evt) {
    evt.preventDefault();
    searchFilms();
})

const searchFilms = () => {
    const searchGenre = document.querySelector('.search__genre').value;
    const allFilms = document.querySelectorAll('.films__item');

    allFilms.forEach((elem) => {
        const elemGenres = elem.querySelector('.genres__list').textContent.split(', ');
        if (elemGenres.includes(searchGenre)) {
            elem.style.display = 'flex';
        } else if (searchGenre == 'All') {
            elem.style.display = 'flex';
        } else {
            elem.style.display = 'none';
        }
    });
}

const getGenres = db => {
    db.forEach((elem) => {
        let noGenres = elem.genres.filter(genre => !optionsValues.includes(genre));
        noGenres.forEach((genre) => optionsValues.push(genre));
    });
}

const renderSelect = () => {
    getGenres(films);
    optionsValues.forEach((genre) => {
        const newOpt = document.createElement('option');
        newOpt.value = genre;
        newOpt.textContent = genre;
        const select = document.querySelector('.search__genre');
        select.appendChild(newOpt);
    })
}

const addNewFilm = db => {
    const titleValue = document.querySelector('.form__title').value.trim();
    const imgValue = document.querySelector('.form__img').value.trim();
    const overviewValue = document.querySelector('.form__overview').value.trim();
    const dateValue = document.querySelector('.form__date').value;
    const genresValue = document.querySelector('.form__genres').value.trim();

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

        const film = document.querySelector('.films__item');
        film.parentElement.insertBefore(createFilm(db[0]), film);
    }
}

const createGenresArr = string => string.split(', ');
const calcMs = date => new Date(String(date)).getTime();
const calcDate = ms => {
    const day = String(new Date(ms).getDate()).padStart(2, 0);
    const month = String(new Date(ms).getMonth() + 1).padStart(2, 0);
    const year = String(new Date(ms).getFullYear());
    const release = [day, month, year].join('.');

    return release;
};

const createFilm = film => {
    const itemTemplate = elFilmTemplate.cloneNode(true);
    const itemTitle = itemTemplate.querySelector('.films__title');
    const itemPoster = itemTemplate.querySelector('.films__img');
    const itemOverview = itemTemplate.querySelector('.films__overview');
    const itemDate = itemTemplate.querySelector('.films__date');
    const itemGenres = itemTemplate.querySelector('.genres__list');

    itemTitle.textContent = film.title;
    itemPoster.src = film.poster;
    itemOverview.textContent = film.overview;
    itemDate.textContent = calcDate(film.release_date);
    itemGenres.textContent = film.genres.join(', ');

    return itemTemplate;
}

const renderList = db => {
    db.forEach((item) => {
        list.appendChild(createFilm(item));
    });

    renderSelect(db);
}

renderList(films);