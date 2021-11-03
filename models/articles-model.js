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
};

exports.updateArticle = (inc_votes, article_id) => {
    if (!inc_votes) {
        return Promise.reject({ status: 400, msg: 'Invalid Input!'})
    }
    return db.query(`UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;`, [inc_votes, article_id])
   .then(({rows})=>{
    if(rows.length === 0) {
        return Promise.reject({ status: 404, msg: 'No articles found!'})
    }
       return rows[0]
   });
};
