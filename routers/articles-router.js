const articlesRouter = require("express").Router();
const { getArticle, patchArticle, getArticles, getCommentsForArticle, postAComment } = require("../controllers/articles-controller");


articlesRouter
.route("/:article_id/comments")
.get(getCommentsForArticle)
.post(postAComment)
// .all(handleMethodErrors)

articlesRouter
.route("/:article_id")
.get(getArticle)
.patch(patchArticle)
// .all(handleMethodErrors)

articlesRouter
.route("/")
.get(getArticles)
// .all(handleMethodErrors)


module.exports = articlesRouter;


