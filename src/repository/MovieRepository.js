import con from "../../app/database_sql.js"

export function addMovie (movie) {
    return con.promise().query("INSERT INTO `movies` SET ?", movie)
}

export function movieExist (id_tmdb) {
    return con.promise().query("SELECT * FROM `movies` WHERE ?", {id_tmdb}).then((result) => {
        return (result[0].length > 0 ? result[0][0] : null);
    })
}

export function addMovieGenre(movie_id, genre_id) {    
    return con.promise().query("INSERT INTO `movie_genres` SET ?", {movie_id, genre_id});
}