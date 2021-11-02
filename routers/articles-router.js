const articlesRouter = require("express").Router();
const { getArticle, patchArticle } = require("../controllers/articles-controller");

articlesRouter.get("/:article_id", getArticle);
articlesRouter.patch("/:article_id", patchArticle)

module.exports = articlesRouter;