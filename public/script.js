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
  const discoveredMovieEndpoint = '/discover/movie';
  console.log(selectedGenre);
  const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`;
  const urlToFetch = `${tmdbBaseUrl}${discoveredMovieEndpoint}${requestParams}`;
  console.log(urlToFetch);
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

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = async () => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  }
  const movies = await getMovies();
  const randomMovie = getRandomMovie(movies);
  const info = await getMovieInfo(randomMovie);
  displayMovie(info);
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;
