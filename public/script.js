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
  const discoveredMovieEndpoint = '/discover/movie';
  console.log(selectedGenre);
  const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`;
  const urlToFetch = `${tmdbBaseUrl}${discoveredMovieEndpoint}${requestParams}`;
  console.log(urlToFetch);
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      console.log(jsonResponse);
    } else {
      throw new Error('Failed to fetch movie list!');
    }
  } catch (e) {
    console.log('Failed to fetch movie list: ' + e.message);
  }
};

getMovies();

const getMovieInfo = () => {};

// Gets a list of movies and ultimately displays the info of a random movie from the list
const showRandomMovie = () => {
  const movieInfo = document.getElementById('movieInfo');
  if (movieInfo.childNodes.length > 0) {
    clearCurrentMovie();
  }
};

getGenres().then(populateGenreDropdown);
playBtn.onclick = showRandomMovie;
