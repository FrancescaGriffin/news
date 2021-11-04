const { fetchComment } = require("../models/comments-model")


exports.getComment = (req, res, next) => {
    const { comment_id } = req.params
    fetchComment(comment_id).then(()=>{
        res.status(204).send()
    })
}