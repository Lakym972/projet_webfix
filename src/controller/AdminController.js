import * as Movie from "../repository/MovieRepository.js";
import { detail, search } from "../services/servicesMovies.js";
import * as Genre from "../repository/GenreRepository.js";

class AdminController {
    
    index(req, res) {
        if(req.query.search != "" && req.query.search != undefined) {
            search(req.query.search).then(movies => {
            res.render('admin/index', {search: req.query.search, movies})
            });
        } else {
            res.render('admin/index') 
        }
    }

    description(req, res) {

        if(req.params.id !== undefined && parseInt(req.params.id) > 0) {

            Movie.movieExist(req.params.id).then(existMovie => {

                detail(req.params.id).then(movie => {
                    res.render('admin/movie', {movie, existMovie})
                })  
            })   
        } else {
            res.redirect('/admin/index')
        }
    }

    add(req, res) {
        if(req.params.id !== undefined && parseInt(req.params.id) > 0) {
            detail(req.params.id).then(movie => {
                let saveMovie = {
                    id_tmdb: movie.id, 
                    title: movie.title, 
                    date: movie.date,
                    picture: movie.picture,
                    overview: movie.overview,
                    note: movie.note,
                };
                const idsGenre = [];
                const promises = [];
                movie.genres.forEach(async (genre) => {
                    promises[promises.length] = Genre.getByTmdbId(genre.id).then(async (currentGenre) => {
                        if(currentGenre != false) {
                            idsGenre.push(currentGenre.id);
                        } else {
                            await Genre.addGenre({tmdb_id: genre.id, name: genre.name }).then((result) => {
                                idsGenre.push(result[0].insertId);
                            })
                        }
                    })
                });
                Promise.all(promises).then(() => {
                    Movie.addMovie(saveMovie).then((result) => {
                        idsGenre.forEach(async (genre) => {
                            await Movie.addMovieGenre(result[0].insertId, genre);
                        });
                        req.flash("notify", `Le film a bien été enregistré !`)
                        res.redirect('/admin');
                    })
                })
            });
        } else {
            res.render('admin/movie', {saveMovie})
        }
    }

}

export default new AdminController();