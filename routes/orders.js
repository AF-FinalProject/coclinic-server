const router = require("express").Router();
const OrderController = require("../controllers/OrderController");
const { authentication, authAdmin, authCustomer } = require("../middlewares/auth");


router.use(authentication)
router.post("/", authCustomer, OrderController.add);
router.get("/customers", authCustomer, OrderController.fetchAllForCustomer);
router.get("/admin", authAdmin, OrderController.fetchAllForAdmin);
router.get("/admin/:id", authAdmin, OrderController.fetchAllForAdminById);
router.get("/:id", authAdmin, OrderController.getDetailOrderById);
router.put("/:id", authAdmin, OrderController.updateOrderById);
router.delete("/:id", authAdmin, OrderController.delete);

module.exports = router;
