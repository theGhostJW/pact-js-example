const movies = require('../data/movies.json');

export const getMovies = () => {
  return movies;
}

export const getMovieById = (id: string) => {
  return movies.find((movie: any) => parseInt(id) === movie.id)
}

export const getMovieByName = (name: string) => {
  return movies.find((movie: any) => movie.name === name)
}