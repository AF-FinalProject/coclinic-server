const { Order, Live_Tracking, Location_Log, User } = require("../models");

class OrderController {
	static async add(req, res, next) {
		try {
			const { date_swab } = req.body;
			const status_payment = "Belum bayar";
			const status_swab = "Menunggu";
			const type_swab = "PCR"
			const newOrder = {
				UserId: req.logginUser.id,
				status_payment,
				status_swab,
				type_swab,
				date_swab
			}
			const order = await Order.create(newOrder)
			res.status(201).json({ success: true, message: "Successfully placed order", order })
		} catch (error) {
			next(error)
		}
	}

	static async fetchAllForCustomer(req, res, next) {
		try {
			const orders = await Order.findAll({
				where: { UserId: +req.logginUser.id },
				order: [['createdAt', 'DESC']],
				include: [
					{ model: Live_Tracking },
					{ model: Location_Log },
					{
						model: User,
						attributes: {
							exclude: ['password']
						}
					}
				]
			})
			res.status(200).json({ success: true, data: { orders } })
		} catch (error) {
			next(error)
		}
	}
	static async fetchAllForAdmin(req, res, next) {
		try {
			const orders = await Order.findAll({
				include: [
					{ model: Live_Tracking },
					{ model: Location_Log },
					{
						model: User,
						attributes: {
							exclude: ['password']
						}
					}
				],
				order: [['createdAt', 'DESC']],
			})
			res.status(200).json({ success: true, data: { orders } })
		} catch (error) {
			next(error)
		}
	}
	static async fetchAllForAdminById(req, res, next) {
		try {
			const orders = await Order.findAll({
				where: { UserId: req.params.id },
				include: [
					{ model: Live_Tracking },
					{ model: Location_Log },
					{
						model: User,
						attributes: {
							exclude: ['password']
						}
					}
				],
				order: [['createdAt', 'DESC']],
			})
			res.status(200).json({ success: true, data: { orders } })
		} catch (error) {
			next(error)
		}
	}
	static async getDetailOrderById(req, res, next) {
		try {
			const { id } = req.params
			const order = await Order.findByPk(id, {
				include: [
					{ model: Live_Tracking },
					{
						model: User,
						attributes: {
							exclude: ['password']
						}
					}
				]
			})
			if (order) {
				res.status(200).json({ success: true, data: { order } })
			} else {
				next({ msg: "Order not found" })
			}
		} catch (error) {
			next(error)
		}
	}
	static async updateOrderById(req, res, next) {
		try {
			const { id } = req.params
			const { status_payment, status_swab } = req.body
			const order = await Order.findByPk(id)
			if (order) {
				if (status_swab === "Positif" && order.status_swab === "Menunggu") {
					Live_Tracking.create({ latitude: 0, longitude: 0, OrderId: order.id })
				}

				order.status_payment = Boolean(status_payment);
				order.status_swab = status_swab;
				order.save()
				res.status(200).json({ success: true, message: "Successfully updated order" })

			} else {
				next({ msg: "Order not found" })
			}
		} catch (error) {
			next(error)
		}

	}
	static async delete(req, res, next) {
		try {
			const { id } = req.params;
			const order = await Order.findByPk(id)
			if (order) {
				await order.destroy()
				res.status(200).json({ success: true, message: "Successfully deleted order" })
			} else {
				next({ msg: "Order not found" })
			}
		} catch (error) {
			next(error)
		}
	}
}

module.exports = OrderController;
