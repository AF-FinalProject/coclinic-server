const { Order, User, Location_Log } = require('../models')

class LocationLogController {
  static async fetchAllByOrderId(req, res, next) {
		try {
			const location_logs = await Location_Log.findAll({
				where: { OrderId: req.params.id },
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
				order: [['createdAt', 'DESC']],
			})
			res.status(200).json({ success: true, data: { location_logs } })
		} catch (error) {
      	/* istanbul ignore next */
			next(error)
		}
	}

}

module.exports = LocationLogController