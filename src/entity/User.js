export default class User {

    id;
    username;
    password;
    firstname;
    lastname;
    a2f;

    getId() {
        return this.id;
    }

    getUsername() {
        return this.username;
    }

    setUsername(username) {
        this.username = username;
        return this;
    }

    getPassword() {
        return this.password;
    }

    setPassword(password) {
        this.password = password;
        return this;
    }

    getFirstname() {
        return this.firstname;
    }

    setFirstname(firstname) {
        this.firstname = firstname;
        return this;
    }

    getLastname() {
        return this.lastname;
    }

    setLastname(lastname) {
        this.lastname = lastname;
        return this;
    }

    getA2f() {
        return this.a2f;
    }

    setA2f(a2f) {
        this.a2f = a2f;
        return this;
    }
}