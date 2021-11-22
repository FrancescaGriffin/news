const express = require('express');
const app = express();
const apiRouter = require("./routers/api-router")
const cors = require('cors');
const { handlePSQLErrors, handle500Errors, handleCustomErrors, handleMethodErrors} = require("./errors")

app.use(cors());

app.use(express.json());

app.use("/api", apiRouter)


app.all("/*", (req, res) => {
    res.status(404).send({msg: "Path not found!"})
});

app.use(handleCustomErrors)
app.use(handlePSQLErrors)
app.use(handle500Errors)


module.exports = app
