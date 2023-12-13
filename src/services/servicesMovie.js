import { json } from "express";
import fetch from "node-fetch";



export function getMovie(req, res) {

    let search = "";

    if(search != "") {
        search = req.query.search;
       
    const urlSearchMovie = `https://api.themoviedb.org/3/search/movie?query=termi&include_adult=false&language=fr-FR&page=1`;

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNWVkMzgwM2RmMjZlNzY2YTRkMzRkMzA2NzlkMjgyMCIsInN1YiI6IjY1NzZlNmVjOTQ1MWU3MGZlYjAxYzIzOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kZDtQJRyw_JEHQEfGhZRPZJ4rzoDyAWkCtUKdZPyaMQ'
        }
    };

    fetch(urlSearchMovie, options)
    .then(res => res.json())
    .then(json => json.results.map(movie => {return {title: movie.title, poster_path: movie.poster_path, release_date: movie.release_date, vote_average: movie.vote_average}}))
    .then((movies) => {
        res.render('admin', {title : movies.title})
    })
    .catch(err => console.error('error:' + err));
    }
    
    
}