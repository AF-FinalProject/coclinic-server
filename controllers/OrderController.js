const { User, Order } = require("../models");

class OrderController {
	static add(req, res, next) {
		const { date } = req.body;
		const status_payment = "paid";
		const status_swab = "menunggu";
	}

	static fetchAllForCustomer(req, res, next) {}
	static fetchAllForAdmin(req, res, next) {}
	static getDetailOrderById(req, res, next) {}
	static updateOrderById(req, res, next) {}
	static delete(req, res, next) {}
}

module.exports = OrderController;
