import {
  GET_MOVIES_PENDING,
  GET_MOVIES_SUCCESS,
  GET_MOVIES_FAILED,
  FAVORITE,
  LOGIN,
  REDUCE,
  MODAL,
} from '../Actions/types.js';

const INITIAL_STATE = {
  movies: [],
  moviePage: false,
  error: '',
  auth: false,
  loading: false,
  favorite: [],
  modal: false,
  name: 'Welcome Stranger!',
  photo: '',
};

export const showMovies = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case GET_MOVIES_PENDING:
      return {...state, loading: true};
    case GET_MOVIES_SUCCESS:
      return {
        ...state,
        movies: action.payload,
        loading: false,
        moviePage: true,
      };
    case GET_MOVIES_FAILED:
      return {...state, error: action.payload, loading: false};
    default:
      return state;
  }
};

export const userInfo = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        name: `Welcome ${action.payload[0]}!`,
        photo: action.payload[1],
        auth: true,
      };
    }
    default:
      return state;
  }
};

export const setFavorite = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case FAVORITE:
      return {...state, favorite: [...state.favorite, action.payload]};
    case REDUCE:
      const index = state.favorite.findIndex(
        (element) => element === action.payload,
      );
      state.favorite.splice(index, 1);
      return {...state, favorite: [...state.favorite]};
    default:
      return state;
  }
};

export const setModal = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case MODAL:
      return {...state, modal: action.payload};
    default:
      return state;
  }
};
