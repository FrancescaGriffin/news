const { fetchArticle, updateArticle, fetchArticles, fetchCommentsForArticle } = require("../models/articles-model");

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
    const { sort_by, order, topic, author } = req.query
    fetchArticles(sort_by, order, topic, author).then((articles)=>{
        res.status(200).send({ articles })
    })
    .catch(next)
};

exports.getCommentsForArticle = (req, res, next) => {
    const { article_id } = req.params
    console.log(article_id)
    fetchCommentsForArticle(article_id).then((comments)=> {
        res.status(200).send({comments})
    })
    .catch((err)=> console.log(err))
}