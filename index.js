function fetchBestMovies() {
  const apiUrl =
    "http://localhost:8000/api/v1/titles/?sort_by=-imdb_score&page_size=8";
  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      displayBestMovie(data.results);
      display7BestMovies(data.results);
    })
    .catch((error) =>
      console.error("Erreur récupération meilleur film", error)
    );
}

function displayBestMovie(movies) {
  const sortedMovies = movies.sort(
    (a, b) => parseFloat(b.imdb_score) - parseFloat(a.imdb_score)
  );
  const bestMovie = sortedMovies[0];

  const imgBestMovie = document.createElement("img");
  imgBestMovie.src = bestMovie.image_url;
  imgBestMovie.alt = bestMovie.title;
  const imgMovieDiv = document.getElementById("img_movie");
  imgMovieDiv.appendChild(imgBestMovie);
  document.getElementById("title_best_movie").textContent = bestMovie.title;

  fetchMovieDetails(bestMovie.id)
    .then((movieDetails) => {
      document.getElementById(
        "summary_best_movie"
      ).textContent = `Résumé du film: ${movieDetails.description}`;
    })
    .catch((error) => {
      console.error("Erreur résumé", error);
    });
  const detailsMovie = document.getElementById("detail-movie");
  detailsMovie.addEventListener("click", () => {
    openModal(
      bestMovie.title,
      bestMovie.image_url,
      bestMovie.genres,
      bestMovie.year,
      bestMovie.rated,
      bestMovie.imdb_score,
      bestMovie.directors,
      bestMovie.actors,
      bestMovie.duration,
      bestMovie.countries,
      bestMovie.budget,
      bestMovie.description,
      bestMovie.id
    );
  });
}

function display7BestMovies(movies) {
  const sortedMovies = movies.sort(
    (a, b) => parseFloat(b.imdb_score) - parseFloat(a.imdb_score)
  );
  const best7Movies = sortedMovies.slice(0, 7);

  const carousselContainer = document.getElementById(
    "caroussel_container_best_7_movies"
  );

  for (let i = 0; i < best7Movies.length; i++) {
    const movie = best7Movies[i];

    const movieContainer = document.createElement("div");
    movieContainer.classList.add("movie-item");
    const detailsMovie = document.createElement("button");
    detailsMovie.textContent = "Détails";
    detailsMovie.style.cursor = "pointer";
    detailsMovie.classList.add("movie-details");

    const imageElement = document.createElement("img");
    imageElement.src = movie.image_url;
    imageElement.alt = movie.title;

    detailsMovie.addEventListener("click", () => {
      openModal(
        movie.title,
        movie.image_url,
        movie.genres,
        movie.year,
        movie.rated,
        movie.imdb_score,
        movie.directors,
        movie.actors,
        movie.duration,
        movie.countries,
        movie.budget,
        movie.description,
        movie.id
      );
      fetchMovieDetails(movie.id);
    });

    movieContainer.appendChild(imageElement);
    movieContainer.appendChild(detailsMovie);
    carousselContainer.appendChild(movieContainer);
  }
}

function fetchBestMoviesOfCategories(genre, containerId) {
  const url = `http://localhost:8000/api/v1/titles/?&imdb_score=&imdb_score_min=&imdb_score_max=&genre=${genre}&genre_contains=&sort_by=-imdb_score&page_size=8`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => displayBestMoviesOfCategories(data.results, containerId))
    .catch((error) => console.error("Erreur", error));
}

function displayBestMoviesOfCategories(movies, containerId) {
  const sortedMovies = movies.sort(
    (a, b) => parseFloat(b.imdb_score) - parseFloat(a.imdb_score)
  );
  const best7Movies = sortedMovies.slice(0, 7);

  const carousselContainer = document.getElementById(containerId);

  for (let i = 0; i < best7Movies.length; i++) {
    const movie = best7Movies[i];

    const movieContainer = document.createElement("div");
    movieContainer.classList.add("movie-item");

    const imgMovie = document.createElement("img");
    imgMovie.src = movie.image_url;
    imgMovie.alt = movie.title;
    imgMovie.classList.add("movie-img");

    const detailsMovie = document.createElement("button");
    detailsMovie.textContent = "Détails";
    detailsMovie.classList.add("movie-details");
    detailsMovie.style.cursor = "pointer";

    const genreMovie = document.createElement("p");
    genreMovie.textContent = movie.genres;

    const yearMovie = document.createElement("p");
    yearMovie.textContent = movie.year;

    const ratedMovie = document.createElement("p");
    ratedMovie.textContent = movie.rated;

    const directorsMovie = document.createElement("p");
    directorsMovie.textContent = movie.directors;

    const actorsMovie = document.createElement("p");
    actorsMovie.textContent = movie.actors;

    const durationMovie = document.createElement("p");
    durationMovie.textContent = movie.duration;

    const countriesMovie = document.createElement("p");
    countriesMovie.textContent = movie.countries;

    const BoxOfficeMovie = document.createElement("p");
    BoxOfficeMovie.textContent = movie.budget;

    const resumeMovie = document.createElement("p");
    resumeMovie.textContent = movie.description;

    const scoreImdbMovie = document.createElement("p");
    scoreImdbMovie.textContent = movie.imdb_score;

    detailsMovie.addEventListener("click", () => {
      openModal(
        movie.title,
        movie.image_url,
        movie.genres,
        movie.year,
        movie.rated,
        movie.imdb_score,
        movie.directors,
        movie.actors,
        movie.duration,
        movie.countries,
        movie.budget,
        movie.description,
        movie.id
      );
      fetchMovieDetails(movie.id);
    });

    movieContainer.appendChild(imgMovie);
    movieContainer.appendChild(detailsMovie);
    carousselContainer.appendChild(movieContainer);
  }
}

function openModal(
  title,
  image_url,
  genres,
  year,
  rated,
  imdb_score,
  directors,
  actors,
  duration,
  countries,
  budget,
  description,
  id
) {
  const modal = document.createElement("div");
  modal.classList.add("modal");

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  const closeBtn = document.createElement("span");
  closeBtn.classList.add("close-btn");
  closeBtn.innerHTML = "&times;";
  closeBtn.style.cursor = "pointer";

  const modalTitle = document.createElement("h2");
  modalTitle.textContent = title;
  modalTitle.classList.add("title-movie-modal");

  const modalImg = document.createElement("img");
  modalImg.src = image_url;
  modalImg.alt = title;

  const modalGenre = document.createElement("p");
  modalGenre.classList.add("genres");
  modalGenre.textContent = genres;

  const modalYear = document.createElement("p");
  modalYear.textContent = year;

  const modalRated = document.createElement("p");
  modalRated.textContent = rated;

  const modalImdbScore = document.createElement("p");
  modalImdbScore.textContent = imdb_score;

  const modalDirectors = document.createElement("p");
  modalDirectors.textContent = directors;

  const modalActors = document.createElement("p");
  modalActors.textContent = actors;

  const modalContrie = document.createElement("p");
  modalContrie.textContent = countries;

  const modalBoxOffice = document.createElement("p");
  modalBoxOffice.textContent = budget;

  const modalResume = document.createElement("p");
  modalResume.textContent = description;

  const modalDurating = document.createElement("p");
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
  modalContent.appendChild(modalDurating);
  modal.appendChild(modalContent);
  document.body.appendChild(modal);
  modal.classList.add("centered-modal");

  modal.addEventListener("click", () => {
    modal.remove();
  });

  modalContent.addEventListener("click", (event) => {
    event.stopPropagation();
  });
  closeBtn.addEventListener("click", () => {
    modal.remove();
  });

  console.log("ouverture", id);

  fetchMovieDetails(id)
    .then((movieDetails) => {
      modalGenre.textContent = `Genres du film: ${movieDetails.genres}`;
      modalYear.textContent = `Année de sortie: ${movieDetails.year}`;
      modalRated.textContent = `Limite d'âge: ${movieDetails.rated}`;
      modalImdbScore.textContent = `Note: ${movieDetails.imdb_score}`;
      modalDirectors.textContent = `Producteurs: ${movieDetails.directors}`;
      modalActors.textContent = `Acteurs: ${movieDetails.actors}`;
      modalDurating.textContent = `Durée: ${movieDetails.duration} minutes`;
      modalContrie.textContent = `Pays d'origine: ${movieDetails.countries}`;
      modalBoxOffice.textContent = `Budget: ${movieDetails.budget}`;
      modalResume.textContent = `Résumé: ${movieDetails.description}`;
      modal.style.display = "block";
    })
    .catch((error) => {
      console.error("Erreur détails du film :", error);
    });
}

function fetchMovieDetails(movieId) {
  const detailsUrl = `http://localhost:8000/api/v1/titles/${movieId}`;

  return fetch(detailsUrl).then((response) => response.json());
}

function initializeCarousel(carouselId, leftBtnId, rightBtnId, containerId) {
  const itemsPerSlide = 4; // Nombre d'éléments par slide
  const carousel = document.getElementById(carouselId);
  const prevBtn = document.getElementById(leftBtnId);
  const nextBtn = document.getElementById(rightBtnId);
  const carouselContainer = document.getElementById(containerId);
  let slides = carouselContainer.children;
  let currentIndex = 0;
  manageButton();
  nextBtn.addEventListener("click", function () {
    currentIndex = (currentIndex + 1) % slides.length;
    // if (currentIndex == 2) {
    //   currentIndex = 0;
    // }
    updateCarousel();
  });

  prevBtn.addEventListener("click", function () {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel();
  });

  function updateCarousel() {
    console.log(currentIndex);
    // calcul de la valeur de translation pour déplacer le contenu du carousel horizontalement.
    const translateValue = -currentIndex * (100 / itemsPerSlide);
    carouselContainer.style.transform = `translateX(${translateValue}%)`;
    manageButton();
  }

  function duplicateSlides() {
    const originalSlides = Array.from(slides);
    // Vérifie si les éléments du carrousel existent avant de les dupliquer
    if (originalSlides.length > 0) {
      for (let i = 0; i < itemsPerSlide - 1; i++) {
        for (let j = 0; j < originalSlides.length; j++) {
          const clone = originalSlides[j].cloneNode(true);
          carouselContainer.appendChild(clone);
        }
      }
    }
  }
  // activer et desactiver les bouttons par rapport au currentIndex.
  function manageButton() {
    if (currentIndex == 0) {
      prevBtn.style.display = "none";
    } else if (currentIndex == 2) {
      nextBtn.style.display = "none";
    } else {
      prevBtn.style.display = "block";
      nextBtn.style.display = "block";
    }
  }
  // Appel à la fonction duplicateSlides après l'initialisation du carrousel
  duplicateSlides();
}

fetchBestMovies();

fetchBestMoviesOfCategories("drama", "caroussel_container_drama_movies");
fetchBestMoviesOfCategories("romance", "caroussel_container_romance_movies");
fetchBestMoviesOfCategories("history", "caroussel_container_history_movies");

document.addEventListener("DOMContentLoaded", function () {
  initializeCarousel(
    "caroussel1",
    "leftBtn2",
    "rightBtn2",
    "caroussel_container_best_7_movies"
  );
  initializeCarousel(
    "caroussel2",
    "leftBtn1",
    "rightBtn1",
    "caroussel_container_drama_movies"
  );
  initializeCarousel(
    "caroussel3",
    "leftBtn3",
    "rightBtn3",
    "caroussel_container_romance_movies"
  );
  initializeCarousel(
    "caroussel4",
    "leftBtn4",
    "rightBtn4",
    "caroussel_container_history_movies"
  );
});
