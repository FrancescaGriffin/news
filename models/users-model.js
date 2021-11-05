const { unsubscribe } = require("../app");
const db = require("../db/connection");

exports.fetchAllUsers = () => {
    return db.query(`SELECT username FROM users`).then(({rows})=>{
        return rows
    })
}

exports.fetchUser = (username) => {

    return db.query(`SELECT username FROM users`).then(({rows})=>{
        usernamesArray = rows.map(users => users.username)
        return usernamesArray
    }).then((usernamesArray)=>{
        if(!usernamesArray.includes(username)) {
            return Promise.reject({ status: 404, msg: 'User Not Found!'})
        }
    return db.query(`SELECT * FROM users WHERE username = $1`, [username])
    .then(({rows})=>{
        return rows[0]
    })
   
    })
}