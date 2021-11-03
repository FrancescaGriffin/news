const articles = require("../db/data/test-data/articles");
const { fetchArticle, updateArticle, fetchArticles } = require("../models/articles-model");

exports.getArticle = (req, res, next) => {
    const { article_id } = req.params
    fetchArticle(article_id).then((article)=>{
        res.status(200).send({ article })
    })
    .catch(next)
};

exports.patchArticle = (req, res, next) => {
    const { inc_votes } = req.body
    const { article_id } = req.params
    updateArticle(inc_votes, article_id).then((article)=>{
        res.status(200).send({ article })
    })
    .catch(next)
};

exports.getArticles = (req, res, next) => {
    const { sort_by } = req.query
    const { order } = req.query
    const { topic } = req.query
    const { author } = req.query
    fetchArticles(sort_by, order, topic, author).then((articles)=>{
        res.status(200).send({ articles })
    })
    .catch(next)
}