const db = require("../connection")

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
    article_id INT PRIMARY KEY,
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
      comment_id INT PRIMARY KEY,
      author VARCHAR(200) NOT NULL REFERENCES users(username),
      article_id 
    )`)
  })

};

module.exports = seed;


  // 1. create tables
  // 2. insert data