const { fetchUsers } = require("../models/users-model")

exports.getUsers = (req, res, next) => {
    console.log("Inside controllers")
    fetchUsers().then(()=>{

    })
    .catch(next)
}