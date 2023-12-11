import con from "../../app/database_sql.js"

export default class UserRepository {

    async getUserByUsername(username) {
        return await con.promise().query('SELECT * FROM `users` WHERE ?', { username }).then((result) => {
             return (result[0].length > 0 ? result[0][0] : null);
         });
     }
}