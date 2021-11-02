const {fetchArticles} = require("../models/articles-model");

exports.getArticles = (req, res, next) => {
    
    fetchArticles().then(()=>{

    })
}