function fetchBestMovies(){
    const apiUrl = 'http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=8'
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {displayBestMovie(data.results)
        display7BestMovies(data.results)})
        .catch(error => console.error('Erreur récupération meilleur film', error))

}

function displayBestMovie(movies){
    const sortedMovies = movies.sort((a, b) => parseFloat(b.imdb_score) - parseFloat(a.imdb_score));
    const bestMovie = sortedMovies[0];
    document.getElementById('title_best_movie').textContent = bestMovie.title;
    document.getElementById('img_best_movie').src = bestMovie.image_url
    document.getElementById('summary_best_movie').textContent = 'resumé'
    fetchMovieDetails(bestMovie.id)
        .then(bestMovie => {
            document.getElementById('summary_best_movie').textContent = `Résumé du film : ${bestMovie.description}`;
        })
        .catch(error => {
            console.error('Erreur récupération résumé', error);

        });
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

        const genreMovie = document.createElement('p');
        genreMovie.textContent = movie.genres;

        const yearMovie = document.createElement('p');
        yearMovie.textContent = movie.year;

        const ratedMovie = document.createElement('p');
        ratedMovie.textContent = movie.rated;

        const directorsMovie = document.createElement('p');
        directorsMovie.textContent = movie.directors;

        const actorsMovie = document.createElement('p');
        actorsMovie.textContent = movie.actors;

        const durationMovie = document.createElement('p');
        durationMovie.textContent = movie.duration;

        const countriesMovie = document.createElement('p');
        countriesMovie.textContent = movie.countries;

        const BoxOfficeMovie = document.createElement('p');
        BoxOfficeMovie.textContent = movie.budget;

        const resumeMovie = document.createElement('p');
        resumeMovie.textContent = movie.description;

        const scoreImdbMovie = document.createElement('p');
        scoreImdbMovie.textContent = movie.imdb_score;


        imgMovie.addEventListener('click', () => {
            openModal(movie.title, movie.image_url, movie.genres, movie.year, movie.rated, movie.imdb_score, movie.directors, movie.actors, movie.duration, movie.countries, movie.budget, movie.description, movie.id);
            fetchMovieDetails(movie.id)
        })

        movieContainer.appendChild(titleMovie);
        movieContainer.appendChild(imgMovie);
        carousselContainer.appendChild(movieContainer);

    }
}   

fetchBestMoviesOfCategories('drama', 'caroussel_container_drama_movies');
fetchBestMoviesOfCategories('romance', 'caroussel_container_romance_movies');
fetchBestMoviesOfCategories('history', 'caroussel_container_history_movies');

function openModal(title, image_url, genres, year, rated, imdb_score, directors, actors, duration, countries,budget, description, id){
    
    const modal = document.createElement('div');
    modal.classList.add('modal');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const closeBtn = document.createElement('span');
    closeBtn.classList.add('close-btn');
    closeBtn.innerHTML = '&times;';

    const modalTitle = document.createElement('h2');
    modalTitle.textContent = title;
    
    const modalImg = document.createElement('img');
    modalImg.src = image_url;
    modalImg.alt = title;

    const modalGenre = document.createElement('p');
    modalGenre.textContent = genres;

    const modalYear = document.createElement('p');
    modalYear.textContent = year;

    const modalRated = document.createElement('p');
    modalRated.textContent = rated;

    const modalImdbScore = document.createElement('p');
    modalImdbScore.textContent = imdb_score;

    const modalDirectors = document.createElement('p');
    modalDirectors.textContent = directors;

    const modalActors = document.createElement('p');
    modalActors.textContent = actors;

    const modalContrie = document.createElement('p');
    modalContrie.textContent = countries;

    const modalBoxOffice = document.createElement('p');
    modalBoxOffice.textContent = budget;


    const modalResume = document.createElement('p');
    modalResume.textContent = description;


    const modalDurating = document.createElement('p');
    modalDurating.textContent = duration;


   

    modalContent.appendChild(closeBtn);
    modalContent.appendChild(modalTitle);
    modalContent.appendChild(modalImg);
    modalContent.appendChild(modalGenre);
    modalContent.appendChild(modalYear);
    modalContent.appendChild(modalRated);
    modalContent.appendChild(modalImdbScore);
    modalContent.appendChild(modalDirectors);
    modalContent.appendChild(modalActors);
    modalContent.appendChild(modalContrie);
    modalContent.appendChild(modalBoxOffice);
    modalContent.appendChild(modalResume);


    modal.appendChild(modalContent);

    document.body.appendChild(modal);

    modal.classList.add('centered-modal');

    modal.addEventListener('click', () =>{
        modal.remove();
    })

    modalContent.addEventListener('click', (event) => {
        event.stopPropagation();
    });
    closeBtn.addEventListener('click', ()=>{
        modal.remove();
    });
   
    console.log('ouverture', id)

    fetchMovieDetails(id)
        .then(movieDetails => {
            // Charger les détails du film dans la modal
            modalGenre.textContent = movieDetails.genres;
            modalYear.textContent = movieDetails.year;
            modalRated.textContent = movieDetails.rated;
            modalImdbScore.textContent = movieDetails.imdb_score;
            modalDirectors.textContent = movieDetails.directors;
            modalActors.textContent = movieDetails.actors;
            modalContrie.textContent = movieDetails.countries;
            modalBoxOffice.textContent = movieDetails.budget;
            modalResume.textContent = movieDetails.description;
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des détails du film :', error);
            // Gérer l'erreur si nécessaire
        });
}


function fetchMovieDetails(movieId){
    const detailsUrl = `http://localhost:8000/api/v1/titles/${movieId}`;

    return fetch(detailsUrl)
        .then(response => response.json()
        )
}