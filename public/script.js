const tmdbKey = '214f874c63d1538a4bcf0a75a6336aae';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');

const getGenres = async () => {
  const genreRequestEndpoint = '/genre/movie/list';
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      const genres = jsonResponse.genres;
      console.log(genres);
      return genres;
    } else {
      throw new Error('Failed to fetch genres!');
    }
  } catch (e) {
    console.log('Failed to fetch genre: ' + e.message);
  }
};

const getMovies = async () => {
  const selectedGenre = getSelectedGenre();
  if (!selectedGenre) {
    console.log('No genre selected.');
    return;
  }

  // Generate a random page number between 1 and a maximum page number
  const maxPage = 10;
  const randomPage = Math.floor(Math.random() * maxPage) + 1;

  const discoveredMovieEndpoint = '/discover/movie';
  const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}&page=${randomPage}`;

  const urlToFetch = `${tmdbBaseUrl}${discoveredMovieEndpoint}${requestParams}`;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      const movies = jsonResponse.results;
      return movies;
    } else {
      throw new Error('Failed to fetch movie list!');
    }
  } catch (e) {
    console.log('Failed to fetch movie list: ' + e.message);
  }
};

const getMovieInfo = async (movie) => {
  const movieId = movie.id;
  const movieEndPoint = `/movie/${movieId}`;
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${movieEndPoint}${requestParams}`;

  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const movieInfo = await response.json();
      console.log('movie info: ' + movieInfo);
      return movieInfo;
    } else {
      throw new Error('Failed to fetch movie list!');
    }
  } catch (e) {
    console.log('Failed to fetch movie list: ' + e.message);
  }
};
let movies;
// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async () => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  }
  movies = await getMovies();
  const randomMovie = getRandomMovie(movies);
  const info = await getMovieInfo(randomMovie);
  displayMovie(info);
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;

// Initialize the liked and disliked movie arrays
let likedMovies = JSON.parse(localStorage.getItem('likedMovies')) || [];
let dislikedMovies = JSON.parse(localStorage.getItem('dislikedMovies')) || [];

// Function to add a movie to the liked movies list
const likeMovie = () => {
  const currentMovie = getRandomMovie(movies);
  likedMovies.push(currentMovie);
  localStorage.setItem('likedMovies', JSON.stringify(likedMovies));
  displayLikedMovies();
  clearCurrentMovie();
  showRandomMovie();
};

// Function to add a movie to the disliked movies list
const dislikeMovie = () => {
  const currentMovie = getRandomMovie(movies);
  dislikedMovies.push(currentMovie);
  localStorage.setItem('dislikedMovies', JSON.stringify(dislikedMovies));
  displayDislikedMovies();
  clearCurrentMovie();
  showRandomMovie();
};

// Display liked movies in the 'likedMoviesContainer'
const displayLikedMovies = () => {
  const likedMoviesContainer = document.getElementById('likedMoviesContainer');
  likedMoviesContainer.innerHTML = ''; // Clear previous content

  likedMovies.forEach((movie) => {
    const movieElement = document.createElement('div');
    movieElement.textContent = movie.title;
    likedMoviesContainer.appendChild(movieElement);
  });
};

// Display disliked movies in the 'dislikedMoviesContainer'
const displayDislikedMovies = () => {
  const dislikedMoviesContainer = document.getElementById('dislikedMoviesContainer');
  dislikedMoviesContainer.innerHTML = ''; // Clear previous content

  dislikedMovies.forEach((movie) => {
    const movieElement = document.createElement('div');
    movieElement.textContent = movie.title;
    dislikedMoviesContainer.appendChild(movieElement);
  });
};

// Call these functions to populate the containers
