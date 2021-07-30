const { Live_Tracking, Order, User, Location_Log } = require('../models')

function measure(lat1, lon1, lat2, lon2) {  // generally used geo measurement function
  const R = 6378.137; // Radius of earth in KM
  const dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
  const dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
  let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let d = R * c;
  return d * 1000; // meters
}

class LiveTrackingController {

  static async update(req, res, next) {
    const id = req.params.id
    const { latitude, longitude } = req.body

    try {
      const location = await Live_Tracking.findOne({
        where: { id },
        include: [
          {
            model: Order,
            include: [
              {
                model: User,
                attributes: {
                  exclude: ['password']
                }
              }],

          }],
      })

      if (location) {
        let userLat = location.Order.User.latitude
        let userLong = location.Order.User.longitude
        let calculateDiff = measure(userLat, userLong, latitude, longitude)

        if (calculateDiff > 300) Location_Log.create({ latitude, longitude, OrderId: location.OrderId })

        location.latitude = latitude
        location.longitude = longitude
        await location.save()
        res.status(200).json({ success: true, message: "Successfully updated live tracking" })

      } else {
        next({ msg: "Location not found" })
      }
    } catch (err) {
      next(err)
    }
  }

  static async detail(req, res, next) {
    const { id } = req.params

    try {
      const location = await Live_Tracking.findOne({
        where: { id },
        include: [
          {
            model: Order,
            include: [
              {
                model: User,
                attributes: {
                  exclude: ['password']
                }
              }],

          }],
      })
      if (location) {
        res.status(200).json({ success: true, data: { location } })
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