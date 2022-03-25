"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMovieByName = exports.getMovieById = exports.getMovies = void 0;
const movies = require('../data/movies.json');
const getMovies = () => {
    return movies;
};
exports.getMovies = getMovies;
const getMovieById = (id) => {
    return movies.find((movie) => parseInt(id) === movie.id);
};
exports.getMovieById = getMovieById;
const getMovieByName = (name) => {
    return movies.find((movie) => movie.name === name);
};
exports.getMovieByName = getMovieByName;
//# sourceMappingURL=actions.js.map