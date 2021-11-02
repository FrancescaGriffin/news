const db = require("../db/connection");

exports.fetchArticle = (article_id)=>{
    return db.query(`SELECT articles.*, COALESCE(COUNT(comment_id), 0) AS comment_count 
    FROM articles LEFT OUTER JOIN comments ON comments.article_id = articles.article_id 
    WHERE articles.article_id = $1 
    GROUP BY articles.article_id;`, [article_id])
    .then (({rows})=>{
        if(rows.length === 0) {
            return Promise.reject({ status: 404, msg: 'No articles found!'})
        }
   return rows[0]
});
}
