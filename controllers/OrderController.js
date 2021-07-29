const { Order, Live_Tracking, Location_Log } = require("../models");

class OrderController {
	static async add(req, res, next) {
		try {
			const { date_swab } = req.body;
			const status_payment = false;
			const status_swab = "menunggu";
			const type_swab = "PCR"
			const newOrder = {
				UserId: req.logginUser.id,
				status_payment,
				status_swab,
				type_swab,
				date_swab
			}
			console.log(newOrder, 'newOrder')
			await Order.create(newOrder)


			res.status(201).json({ success: true, message: "Successfully placed order" })
		} catch (err) {
			next(err)
		}
	}

	static async fetchAllForCustomer(req, res, next) {
		try {
			const orders = await Order.findAll({ where: { UserId: req.logginUser.id }, include: [Live_Tracking, Location_Log] })
			res.status(200).json({ success: true, data: { orders } })
		} catch (error) {
			next(error)
		}
	}
	static async fetchAllForAdmin(req, res, next) {
		try {
			const orders = await Order.findAll({ include: [Live_Tracking, Location_Log] })
			res.status(200).json({ success: true, data: { orders } })
		} catch (error) {
			next(error)
		}
	}
	static async getDetailOrderById(req, res, next) {
		try {
			const { id } = req.params
			const order = await Order.findByPk(id, { include: [Live_Tracking] })
			res.status(200).json({ success: true, data: { order } })
		} catch (error) {
			next(error)
		}
	}
	static async updateOrderById(req, res, next) {
		try {
			const { id } = req.params
			const { status_payment, status_swab, type_swab, date_swab } = req.body
			const order = await Order.findByPk(id)

			if (order.status_swab === "menunggu" && status_swab === "positif") {
				Live_Tracking.create({ latitude: 0, longitude: 0, OrderId: order.id })
			}

			order.status_payment = status_payment;
			order.status_swab = status_swab;
			order.type_swab = type_swab;
			order.date_swab = date_swab;
			order.save()
			res.status(200).json({ success: true, message: "Successfully updated order" })
		} catch (error) {
			next(error)
		}

	}
	static async delete(req, res, next) {
		try {
			const { id } = req.params
			const order = await Order.findByPk(id)
			await order.destroy()
			res.status(200).json({ success: true, message: "Successfully deleted order" })
		} catch (error) {
			next(error)
		}
	}
}

module.exports = OrderController;
