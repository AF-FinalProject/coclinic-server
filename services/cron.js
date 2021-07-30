const cron = require('node-cron');
const { Op } = require('sequelize');
const { Live_Tracking } = require('../models');
const moment = require('moment')

// Running task every 4 hours
cron.schedule('* */4 * * *', async function(){
  try {
    const liveTrackings = await Live_Tracking.destroy({where: {createdAt: {
      [Op.lte]: moment().subtract(10,'days').toDate()
    } }})
    console.log("Live trackings (>10days): ", liveTrackings, " records deleted");
  } catch (error) {
    console.log(error);
  }
})

module.exports = cron;