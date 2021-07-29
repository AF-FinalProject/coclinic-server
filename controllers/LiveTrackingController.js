const { Live_Tracking, Order, User } = require('../models')

class LiveTrackingController {

  static async update(req, res, next) {
    const id = req.params.id
    const { latitude, longitude } = req.body

    try {
      const location = await Live_Tracking.findByPk(id)
      if (location) {
        location.latitude = latitude
        location.longitude = longitude
        await location.save()
        res.status(200).json({ success: true, message: "successfully updated" })
      } else {
        next({ msg: "Location not found" })
      }
    } catch (err) {
      next(err)
    }
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