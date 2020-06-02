import {
  GET_MOVIES_PENDING,
  GET_MOVIES_SUCCESS,
  GET_MOVIES_FAILED,
  FAVORITE,
  LOGIN,
  REDUCE,
  MODAL,
} from './types.js';

export const fetchMovies = () => (dispatch) => {
  dispatch({type: GET_MOVIES_PENDING});
  fetch(
    'https://api.themoviedb.org/3/movie/popular?api_key=604a425463571198b71d514a4613a989',
  )
    .then((response) => response.json())
    .then((data) => {
      dispatch({type: GET_MOVIES_SUCCESS, payload: data});
      return data;
    })
    .catch((err) => dispatch({type: GET_MOVIES_FAILED, payload: err}));
};

export const setFavorite = (movie) => ({
  type: FAVORITE,
  payload: movie,
});

export const removeFavorite = (movie) => ({
  type: REDUCE,
  payload: movie,
});

export const loginCredentials = (credentials) => ({
  type: LOGIN,
  payload: credentials,
});

export const setModal = (boolean) => ({
  type: MODAL,
  payload: boolean,
});
