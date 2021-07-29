const { Live_Tracking, Order, User } = require('../models')

class LiveTrackingController {

  static async add (req, res, next) {
  }

  static async detail (req, res, next) {
    const { id } = req.params

    try {
      const location = await Live_Tracking.findOne({
        where: { id },
        include: [{
          model: Order,
          include: [User]
        }]
      })
      if (location) {
        res.status(200).json({ success: true, data: location })
        next()
      } else {
        next({ msg: "Location not found" })
      }
    } catch (err) {
      next(err) 
    }
  }

}

module.exports = LiveTrackingController