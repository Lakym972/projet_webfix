import fetch from "node-fetch";

export function search(keyword) {
    const urlSearchMovies = `https://api.themoviedb.org/3/search/movie?query=${keyword}&include_adult=false&language=fr-FR&page=1`;
    const basicPoster = `https://image.tmdb.org/t/p/w200`;

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TMDB_TOKEN}`
        }
    };

    return fetch(urlSearchMovies, options, basicPoster)
    .then(res => res.json())
    .then(json => json.results.map(movie => {
        return {id_tmdb : movie.id, title: movie.title, poster_path: basicPoster + movie.poster_path, release_date: movie.release_date, vote_average: movie.vote_average}}))
    .catch(err => console.error('error:' + err));
}

export function detail(id) {
    const urlDetailsMovie = `https://api.themoviedb.org/3/movie/${id}?language=fr-FR`;

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TMDB_TOKEN}`
        }
    };

    return fetch(urlDetailsMovie, options)
        .then(res => res.json())
        .then((json) => {
            return {
                tmdb_id: json.id, 
                vote_average: json.vote_average, 
                release_date: json.release_date,
                title: json.title, 
                poster_path: json.poster_path,
                backdrop_path: json.backdrop_path,
                genres: json.genres,
                overview: json.overview
        }
    })
        .catch(err => console.error('error:' + err));
}