const express = require("express");
const { sslPaymentCreate, sslPaymentSuccess, paymentFail, paymentCancel } = require("../controllers/sslPaymentController");

const router = express.Router();

router.post("/create-ssl-payment", sslPaymentCreate);
router.post("/successPayment", sslPaymentSuccess);
router.post("/paymentFail", paymentFail);
router.post("/paymentCancel", paymentCancel);

module.exports = router;
