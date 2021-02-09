import { ReducerComposer } from '../../utilities/redux';

export const moviesReducer = new ReducerComposer({
  movies: null,
})
  .add("SET_MOVIES", (state, movies) => {
    return {
      ...state,
      movies: movies,
    };
  })
  .generateReducer()