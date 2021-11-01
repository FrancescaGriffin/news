const db = require("../connection")
const format = require('pg-format')

const seed = (data) => {
  const { articleData, commentData, topicData, userData } = data;
  
  return db.query(`DROP TABLE IF EXISTS comments`)
  .then(() => {
    return db.query(`DROP TABLE IF EXISTS articles`)
  })
  .then(()=> {
    return db.query(`DROP TABLE IF EXISTS topics;`)
  })
  .then(()=>{
    return db.query(`DROP TABLE IF EXISTS users;`)
  })
  .then(()=> {
    return db.query(`CREATE TABLE topics (
      slug VARCHAR(150) PRIMARY KEY,
      description VARCHAR(300) NOT NULL
      );`)
  })
  .then(()=>{
    return db.query(`CREATE TABLE users (
      username VARCHAR(200) PRIMARY KEY,
      name VARCHAR(200) NOT NULL,
      avatar_url VARCHAR(500) NOT NULL
    );`)
  })
  .then(()=>{
    return db.query(`CREATE TABLE articles (
    article_id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    topic VARCHAR(150) NOT NULL REFERENCES topics(slug),
    author VARCHAR(200) NOT NULL REFERENCES users(username),
    body TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    votes INT DEFAULT 0
  );`)
  })
  .then(()=>{
    return db.query(`CREATE TABLE comments (
      comment_id SERIAL PRIMARY KEY,
      author VARCHAR(200) NOT NULL REFERENCES users(username),
      article_id INT NOT NULL REFERENCES articles(article_id),
      votes INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      body TEXT NOT NULL
    );`)
  })
  .then(()=>{
    const insertStr = format(`
    INSERT INTO topics (slug, description) 
    VALUES 
    %L
    RETURNING *;`,
    topicData.map((topic) => [
      topic.slug,
      topic.description
    ])
    );
    return db.query(insertStr);
})
.then(()=>{
  const insertStr = format(`
  INSERT INTO users (username, name, avatar_url)
  VALUES 
  %L
  RETURNING *;`,
  userData.map((user) => [
    user.username,
    user.name,
    user.avatar_url
  ])
  );
  return db.query(insertStr);
})
.then(()=> {
  const insertStr = format(`
  INSERT INTO articles (title, topic, author, body, created_at, votes) 
  VALUES 
  %L 
  RETURNING *;`, 
  articleData.map((article) => [
  article.title,
  article.topic,
  article.author,
  article.body,
  article.created_at,
  article.votes
  ])
  );
  return db.query(insertStr)
})
.then(()=>{
  const insertStr = format(`
  INSERT INTO comments (author, article_id, votes, created_at, body) 
  VALUES
  %L
  RETURNING *`,
  commentData.map((comment)=>[
    comment.author,
    comment.article_id,
    comment.votes,
    comment.created_at,
    comment.body
  ])
  );
  return db.query(insertStr)
})
};

module.exports = seed;
