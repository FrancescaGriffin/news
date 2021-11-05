const db = require("../db/connection");

exports.fetchAllUsers = () => {
    return db.query(`SELECT username FROM users`).then(({rows})=>{
        return rows
    })
}

exports.fetchUser = () => {
    console.log("inside model")
}