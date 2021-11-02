const db = require("../db/connection");
const articlesRouter = require("../routers/articles-router");

exports.fetchArticle = (article_id)=>{
    return db.query(`SELECT articles.*, COALESCE(COUNT(comment_id), 0) AS comment_count 
    FROM articles LEFT OUTER JOIN comments ON comments.article_id = articles.article_id 
    WHERE articles.article_id = $1 
    GROUP BY articles.article_id;`, [article_id])
    .then (({rows})=>{
   return rows[0]
});
}
