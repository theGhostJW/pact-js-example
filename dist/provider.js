"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const joi_1 = __importDefault(require("joi"));
const express_1 = __importDefault(require("express"));
const actions_1 = require("./actions");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
const movies = (0, actions_1.getMovies)();
exports.app.get('/movies', (req, res) => {
    res.send(movies);
});
exports.app.get('/movie/:id', (req, res) => {
    const movie = (0, actions_1.getMovieById)(req.params.id);
    if (!movie) {
        res.status(404).send('Movie not found');
    }
    else {
        res.send(movie);
    }
});
exports.app.post('/movies', (req, res) => {
    const schema = joi_1.default.object().keys({
        name: joi_1.default.string().required(),
        year: joi_1.default.number().integer().min(1900).max(2022).required(),
    });
    //TODO fix later 
    // const result = Joi.validate(req.body, schema);
    const movie = {
        id: movies[movies.length - 1].id + 1,
        name: req.body.name,
        year: req.body.year,
    };
    // if (result.error) res.status(404).send(result.error.details[0]);
    if ((0, actions_1.getMovieByName)(req.body.name)) {
        res.send(`Movie ${req.body.name} already exists`);
    }
    else {
        movies.push(movie);
        res.send(movie);
    }
});
exports.app.delete('/movie/:id', (req, res) => {
    const movie = (0, actions_1.getMovieById)(req.params.id);
    if (!movie) {
        res.status(404).send(`Movie ${req.params.id} not found`);
    }
    else {
        const index = movies.indexOf(movie);
        movies.splice(index, 1);
        res.send(`Movie ${req.params.id} has been deleted`);
    }
});
//# sourceMappingURL=provider.js.map