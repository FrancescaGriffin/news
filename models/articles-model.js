const db = require("../db/connection");
const articlesRouter = require("../routers/articles-router");

exports.fetchArticle = (article_id)=>{
    return db.query(`SELECT articles.*, COUNT(comment_id) AS comment_count 
    FROM articles JOIN comments ON comments.article_id = articles.article_id 
    WHERE articles.article_id = $1 
    GROUP BY articles.article_id;`, [article_id])
    .then (({rows})=>{
        console.log(rows)
   return rows[0]
});
}
