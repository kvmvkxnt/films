var list = document.querySelector('ul');
var elForm = document.querySelector('.films__form');

elForm.addEventListener('submit', function(evt) {
    evt.preventDefault();

    addFilm(films);
});

function addFilm(_films) {
    var titleValue = document.querySelector('.form__title').value.trim();
    var imgValue = document.querySelector('.form__img').value.trim();
    var overviewValue = document.querySelector('.form__overview').value.trim();
    var dateValue = document.querySelector('.form__date').value;
    var genresValue = document.querySelector('.form__genres').value.trim();

    if (titleValue.length <= 0 || imgValue.length <= 0 || overviewValue.length <= 0 || dateValue.length <= 0 || genresValue.length <= 0) {
        alert('Not all info is submited');
        null;
    } else {
        films.unshift({
            id: String((Math.random(4)*100000).toFixed(0)),
            title: titleValue,
            poster: imgValue,
            overview: overviewValue,
            release_date: calcMs(dateValue),
            genres: createGenresArr(genresValue),
        });

        createNewFilm(_films);
    }
}

function createNewFilm(_films) {
    var newItem = document.createElement('li');
    var newTitle = document.createElement('h2');
    var newPoster = document.createElement('img');
    var newOverview = document.createElement('p');
    var newDate = document.createElement('time');
    var newGenresList = document.createElement('p');
    var newGenres = _films[0].genres.join(', ');

    newItem.setAttribute('id', _films[0].id);
    newItem.setAttribute('class', 'films__item');
    newPoster.setAttribute('src', _films[0].poster);
    newPoster.setAttribute('width', '350');
    newPoster.setAttribute('height', '450');
    newPoster.setAttribute('class', 'films__img');
    newOverview.setAttribute('class', 'films__overview');
    newTitle.setAttribute('class', 'films__title');
    newDate.setAttribute('class', 'films__date');
    newGenresList.setAttribute('class', 'genres__list');
    newOverview.textContent = _films[0].overview;
    newTitle.textContent = _films[0].title;
    newDate.textContent = calcDate(_films[0].release_date);
    newGenresList.textContent = newGenres;

    newItem.appendChild(newTitle);
    newItem.appendChild(newPoster);
    newItem.appendChild(newOverview);
    newItem.appendChild(newDate);
    newItem.appendChild(newGenresList);
    
    var elemAfter = document.querySelector('.films__item');
    elemAfter.parentElement.insertBefore(newItem, elemAfter);
}

function createGenresArr(string) {
    var array = string.split(', ');
    return array;
}

function calcMs(date) {
    var realDate = new Date(String(date));
    var milliseconds = realDate.getTime();

    return milliseconds;
}

function calcDate(ms) {
    var normalDate = new Date(ms);
    var day = String(normalDate.getDate()).padStart(2, 0);
    var month = String(normalDate.getMonth() + 1).padStart(2, 0);
    var year = String(normalDate.getFullYear());

    var date = [day, month, year].join('.');
    return date;
}

function createList(_films) {
    for (var i = 0; i < _films.length; i++) {
        var newItem = document.createElement('li');
        var newTitle = document.createElement('h2');
        var newPoster = document.createElement('img');
        var newOverview = document.createElement('p');
        var newDate = document.createElement('time');
        var newGenresList = document.createElement('p');
        var newGenres = _films[i].genres.join(', ');

        newItem.setAttribute('id', _films[i].id);
        newItem.setAttribute('class', 'films__item');
        newPoster.setAttribute('src', _films[i].poster);
        newPoster.setAttribute('width', '350');
        newPoster.setAttribute('height', '450');
        newPoster.setAttribute('class', 'films__img');
        newOverview.setAttribute('class', 'films__overview');
        newTitle.setAttribute('class', 'films__title');
        newDate.setAttribute('class', 'films__date');
        newGenresList.setAttribute('class', 'genres__list');
        newOverview.textContent = _films[i].overview;
        newTitle.textContent = _films[i].title;
        newDate.textContent = calcDate(_films[i].release_date);
        newGenresList.textContent = newGenres;

        newItem.appendChild(newTitle);
        newItem.appendChild(newPoster);
        newItem.appendChild(newOverview);
        newItem.appendChild(newDate);
        newItem.appendChild(newGenresList);
        list.appendChild(newItem);
    }
}

createList(films);