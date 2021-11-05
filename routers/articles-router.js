const articlesRouter = require("express").Router();
const { getArticle, patchArticle, getArticles, getCommentsForArticle, postAComment } = require("../controllers/articles-controller");


articlesRouter
.route("/:article_id/comments")
.get(getCommentsForArticle)
.post(postAComment)


articlesRouter
.route("/:article_id")
.get(getArticle)
.patch(patchArticle)


articlesRouter
.route("/")
.get(getArticles)



module.exports = articlesRouter;


