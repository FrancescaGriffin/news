const { fetchAllUsers, fetchUser } = require("../models/users-model")

exports.getAllUsers = (req, res, next) => {
    fetchAllUsers().then((users)=>{
        res.status(200).send({ users })
    })
    .catch(next)
}

exports.getUser = (req, res, next) => {
    console.log("inside controller")
    fetchUser().then((user)=>{
        res.status(200).send({ user })
    })
}