import { json } from "express";
import fetch from "node-fetch";

const urlSearchMovie = `https://api.themoviedb.org/3/search/movie?query=termi&include_adult=false&language=fr-FR`;
const urlSearchActors = `https://api.themoviedb.org/3/search/person?api_key=35ed3803df26e766a4d34d30679d2820&query=1&include_adult=false&language=fr-FR`;
const basicPoster = `https://image.tmdb.org/t/p/w500/`

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
    .then(json => console.log(json))
    .catch(err => console.error('error:' + err));