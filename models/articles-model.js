const db = require("../db/connection");
const { topicData, articleData } = require("../db/data/test-data");

exports.fetchArticle = (article_id)=>{
    return db.query(`SELECT articles.*, COUNT(comment_id) ::INT AS comment_count 
    FROM articles LEFT OUTER JOIN comments ON comments.article_id = articles.article_id 
    WHERE articles.article_id = $1 
    GROUP BY articles.article_id;`, [article_id])
    .then (({rows})=>{
        if(rows.length === 0) {
            return Promise.reject({ status: 404, msg: 'No article found!'})
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
        return Promise.reject({ status: 404, msg: 'No article found!'})
    }
       return rows[0]
   });
};

exports.fetchArticles = async (sort_by = "created_at", order = "desc", topic, author) => {
    
    if(!['article_id', 'title', 'topic', 'author', 'created_at', 'votes', 'comment_count'].includes(sort_by)) {
        return Promise.reject({ status: 400, msg: "Invalid sort_by query!"})
    };

    if(!['asc', 'desc'].includes(order)) {
        return Promise.reject({ status: 400, msg: "Invalid order query!"})
    };

    let queryStr = `SELECT 
    articles.article_id, 
    articles.title, 
    articles.topic, 
    articles.author, 
    articles.created_at, 
    articles.votes, 
    COUNT(comment_id) ::INT AS comment_count 
    FROM articles LEFT OUTER JOIN comments ON comments.article_id = articles.article_id`;
    
    const queryArray = [];

    if(topic) {
    const slug = await db.query(`SELECT slug FROM topics;`)
    const topicsArray = slug.rows.map(topic => topic.slug)
    if (!topicsArray.includes(topic)) {
    return Promise.reject({ status: 400, msg: "Invalid query!"})
    } 
    queryArray.push(topic)
        queryStr += ` WHERE topic = $1`;
    }
    // .then(({rows})=>{
    //     const topicsArray = []
    //     rows.forEach((topic) => {
    //         topicsArray.push(topic.slug)
    //     })
    //     if (!topicsArray.includes(topic)) {
    //     return Promise.reject({ status: 400, msg: "Invalid query!"})
    //     } 
    //     queryArray.push(topic)
    //     queryStr += ` WHERE topic = $1`;
    // })} 
    
    if(author) {
    const username = await db.query(`SELECT username FROM users;`)
    const authorsArray = username.rows.map(author => author.username)
    if (!authorsArray.includes(author)) {
    return Promise.reject({ status: 400, msg: "Invalid query!"})
    } 
    queryStr += queryArray.length ? ` AND` : ` WHERE`
    queryArray.push(author)
    queryStr += ` articles.author = $${queryArray.length}`
    }

    queryStr += 
    ` GROUP BY articles.article_id 
    ORDER BY articles.${sort_by} ${order};`;

    return db.query(queryStr, queryArray)
    
    .then(({rows})=>{
        if (rows.length === 0) {
            return Promise.reject({ status: 404, msg: "No articles found!"})
        }
        return rows
    });
};  

exports.fetchCommentsForArticle = (article_id) => {
    return db.query(`SELECT * FROM comments WHERE article_id = $1`, [article_id])
    .then(({rows})=>{
        console.log(rows)
        return rows
    })
}

