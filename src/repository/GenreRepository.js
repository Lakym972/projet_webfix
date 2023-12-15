import con from '../../app/database_sql.js';


export function addGenre(genre) {    
    return con.promise().query("INSERT INTO `genres` SET ?", genre);
}

export async function getByTmdbId(tmdb_id) {    
    return await con.promise().query("SELECT * FROM `genres` WHERE ?", {tmdb_id}).then((result) => {
        if(result[0].length ==1) {
            return result[0][0];
        }
        return false;
    });
}