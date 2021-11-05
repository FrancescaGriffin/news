const { fetchOverview } = require("../models/overview-models")
 
exports.getOverview = (req, res, next)=>{
    fetchOverview().then((overview)=>{
        res.status(200).send({overview})
    })
    .catch(next)
};