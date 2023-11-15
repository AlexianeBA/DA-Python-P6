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

function fetchBestMoviesOfCategories(genre, containerId){
    const url = `http://localhost:8000/api/v1/titles/?&imdb_score=&imdb_score_min=&imdb_score_max=&genre=${genre}&genre_contains=&sort_by=-imdb_score&page_size=8`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayBestMoviesOfCategories(data.results, containerId))
        .catch(error => console.error('Erreur', error))
}

function displayBestMoviesOfCategories(movies, containerId){
    const sortedMovies = movies.sort((a,b) => parseFloat(b.imdb_score)- parseFloat(a.imdb_score));
    const best7Movies = sortedMovies.slice(0,7);

    const carousselContainer = document.getElementById(containerId);

    for (let i=0; i < best7Movies.length; i++){
        const movie = best7Movies[i];

        const movieContainer = document.createElement('div');
        movieContainer.classList.add("movie-item");

        const titleMovie = document.createElement('h2');
        titleMovie.textContent = movie.title;

        const imgMovie = document.createElement('img');
        imgMovie.src = movie.image_url;
        imgMovie.alt = movie.title;

        imgMovie.addEventListener('click', () => {
            openModal(movie.title, movie.image_url)
        })

        movieContainer.appendChild(titleMovie);
        movieContainer.appendChild(imgMovie);
        carousselContainer.appendChild(movieContainer);

    }
}   

fetchBestMoviesOfCategories('action', 'caroussel_container_action_movies');
fetchBestMoviesOfCategories('romance', 'caroussel_container_romance_movies');
fetchBestMoviesOfCategories('history', 'caroussel_container_history_movies');

function openModal(title, image_url){
    const modal = document.createElement('div');
    modal.classList.add('modal');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const modalTitle = document.createElement('h2');
    modalTitle.textContent = title;
    
    const modalImg = document.createElement('img');
    modalImg.src = image_url;
    modalImg.alt = title;

    modalContent.appendChild(modalTitle);
    modalContent.appendChild(modalImg);

    modal.appendChild(modalContent);

    document.body.appendChild(modal);

    modal.addEventListener('click', () => {
        modal.remove();
    });
}