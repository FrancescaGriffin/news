const { fetchOverview } = require("../models/overview-models")
 
exports.getOverview = (req, res, next)=>{
    console.log("inside controller")
    fetchOverview().then(()=>{
        res.status().send()
    })
};