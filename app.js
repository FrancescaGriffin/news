const express = require('express');
const app = express();
const apiRouter = require("./routers/api-router")

app.use("/api", apiRouter)


app.all("/*", (req, res) => {
    res.status(404).send({msg: "Path not found!"})
});


module.exports = app
