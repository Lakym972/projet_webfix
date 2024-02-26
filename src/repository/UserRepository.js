import con from "../../app/database_sql.js"

export default class UserRepository {

    async getUserByUsername(username) {
        return await con.promise().query('SELECT * FROM `users` WHERE ?', { username }).then((result) => {
             return (result[0].length > 0 ? result[0][0] : null);
         });
    }

    async enableA2FByUsername(username) {    
        return await con.promise().query("UPDATE `users` SET ? WHERE ?",  [{a2f:true}, {username}]);
    }

    async addUser(user) {
        return await con.promise().query("INSERT INTO `users` SET ?", user);
    }
}