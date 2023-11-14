function fetchBestMovies(){
    const apiUrl = 'http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=8'
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {displayBestMovie(data.results)
        display7BestMovies(data.results)})
        .catch(error => console.error('Erreur', error))

}

function displayBestMovie(movies){
    const sortedMovies = movies.sort((a, b) => parseFloat(b.imdb_score) - parseFloat(a.imdb_score));
    const bestMovie = sortedMovies[0];
    document.getElementById('title_best_movie').textContent = bestMovie.title;
    document.getElementById('img_best_movie').src = bestMovie.image_url
    document.getElementById('summary_best_movie').textContent = 'Résumé du film :';

}



function display7BestMovies(movies) {
    const sortedMovies = movies.sort((a, b) => parseFloat(b.imdb_score) - parseFloat(a.imdb_score));
    const best7Movies = sortedMovies.slice(0, 7);

    const carousselContainer = document.getElementById('caroussel_container_best_7_movies');

    for (let i = 0; i < best7Movies.length; i++) {
        const movie = best7Movies[i];

        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-item');

        const titleElement = document.createElement('h2');
        titleElement.textContent = movie.title;

        const imageElement = document.createElement('img');
        imageElement.src = movie.image_url;
        imageElement.alt = movie.title;


        movieContainer.appendChild(titleElement);
        movieContainer.appendChild(imageElement);

        carousselContainer.appendChild(movieContainer);
    }
}
 
fetchBestMovies();

function fetchActionMovies(){
    const url = "http://localhost:8000/api/v1/titles/?&imdb_score=&imdb_score_min=&imdb_score_max=&genre=action&genre_contains=&sort_by=-imdb_score&page_size=8"
    fetch(url)
        .then(response => response.json())
        .then(data => display7BestActionMovies(data.results))
        .catch(error => console.error('Erreur', error))

}

function display7BestActionMovies(movies){
    const sortedMovies = movies.sort((a, b) => parseFloat(b.imdb_score) - parseFloat(a.imdb_score));
    const best7Movies = sortedMovies.slice(0, 7);

    const carousselContainer = document.getElementById('caroussel_container_action_movies');

    for (let i = 0; i < best7Movies.length; i++) {
        const movie = best7Movies[i];

        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-item');

        const titleElement = document.createElement('h2');
        titleElement.textContent = movie.title;

        const imageElement = document.createElement('img');
        imageElement.src = movie.image_url;
        imageElement.alt = movie.title;


        movieContainer.appendChild(titleElement);
        movieContainer.appendChild(imageElement);

        carousselContainer.appendChild(movieContainer);
    }

}
fetchActionMovies();

function fetchRomanceMovie(){
    const url = "http://localhost:8000/api/v1/titles/?&imdb_score=&imdb_score_min=&imdb_score_max=&genre=romance&genre_contains=&sort_by=-imdb_score&page_size=8"
    fetch(url)
        .then(response => response.json())
        .then(data => display7BestRomanceMovies(data.results))
        .catch(error => console.error('Erreur', error))
}
function display7BestRomanceMovies(movies){
    const sortedMovies = movies.sort((a, b) => parseFloat(b.imdb_score) - parseFloat(a.imdb_score));
    const best7Movies = sortedMovies.slice(0, 7);

    const carousselContainer = document.getElementById('caroussel_container_romance_movies');

    for (let i = 0; i < best7Movies.length; i++) {
        const movie = best7Movies[i];

        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-item');

        const titleElement = document.createElement('h2');
        titleElement.textContent = movie.title;

        const imageElement = document.createElement('img');
        imageElement.src = movie.image_url;
        imageElement.alt = movie.title;


        movieContainer.appendChild(titleElement);
        movieContainer.appendChild(imageElement);

        carousselContainer.appendChild(movieContainer);
    }

}

fetchRomanceMovie();

function fetchHistoryMovie(){
    const url = "http://localhost:8000/api/v1/titles/?&imdb_score=&imdb_score_min=&imdb_score_max=&genre=history&genre_contains=&sort_by=-imdb_score&page_size=8"
    fetch(url)
        .then(response => response.json())
        .then(data => display7BestHistoryMovies(data.results))
        .catch(error => console.error('Erreur', error))
}

function display7BestHistoryMovies(movies){

    const sortedMovies = movies.sort((a, b) => parseFloat(b.imdb_score) - parseFloat(a.imdb_score));
    const best7Movies = sortedMovies.slice(0, 7);

    const carousselContainer = document.getElementById('caroussel_container_history_movies');

    for (let i = 0; i < best7Movies.length; i++) {
        const movie = best7Movies[i];

        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-item');

        const titleElement = document.createElement('h2');
        titleElement.textContent = movie.title;

        const imageElement = document.createElement('img');
        imageElement.src = movie.image_url;
        imageElement.alt = movie.title;


        movieContainer.appendChild(titleElement);
        movieContainer.appendChild(imageElement);

        carousselContainer.appendChild(movieContainer);
    }

}
fetchHistoryMovie()