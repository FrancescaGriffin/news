const db = require("../db/connection");
const endpointsOverview = require('../endpoints.json')

exports.fetchOverview =  async ()=>{
    return endpointsOverview
}

