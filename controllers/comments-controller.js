const { fetchComment } = require("../models/comments-model")


exports.getComment = (req, res, next) => {
    console.log(req.params)
    fetchComment().then(()=>{
        res.status(204).send()
    })
}