const router = require("express").Router();
const OrderController = require("../controllers/OrderController");
const { authentication, authAdmin, authCustomer } = require("../middlewares/auth");


router.use(authentication)
router.post("/", authCustomer, OrderController.add);
router.get("/customers", authCustomer, OrderController.fetchAllForCustomer); // di controller ada where UserId = +req.logginUser.id
router.get("/admin", authAdmin, OrderController.fetchAllForAdmin); // tambahan router
router.get("/:id", authAdmin, OrderController.getDetailOrderById);
router.put("/:id", authAdmin, OrderController.updateOrderById);
router.delete("/:id", authAdmin, OrderController.delete);

module.exports = router;
