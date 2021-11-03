const articles = require("../db/data/test-data/articles");
const { fetchArticle, updateArticle } = require("../models/articles-model");

exports.getArticle = (req, res, next) => {
    const { article_id } = req.params
    fetchArticle(article_id).then((article)=>{
        res.status(200).send({article})
    })
    .catch(next)
};

exports.patchArticle = (req, res, next) => {
    const { inc_votes } = req.body
    const { article_id } = req.params
    updateArticle(inc_votes, article_id).then((article)=>{
        res.status(200).send({article})
    })
};