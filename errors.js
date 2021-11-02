exports.handlePSQLErrors = (err, req, res, next) => {
    if (err.code === '22P02') {
        res.status(400).send({ msg: 'Invalid Input!'})
    } else {
        next(err)
    }
};


exports.handle500Errors = (err, req, res, next) => {
    res.status(500).send({ msg: 'Internal Server Error :( Sorry!'})
}