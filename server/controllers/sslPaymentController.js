const { ObjectId } = require("mongodb");
const connectDB = require("../db/connect");

const FRONTEND_URL = process.env.FRONTEND_URL;
const SERVER_URL = process.env.SERVER_URL || "http://localhost:5000";

exports.sslPaymentCreate = async (req, res) => {
  const payment = req.body; // Get payment info from client
  // Generate a unique transaction ID for this payment
  const trxid = new ObjectId().toString();
  const db = await connectDB();
  const paymentEntry = {
    ...payment,
    transactionId: trxid,
    status: "pending",
    paid_at: new Date(),
    paymentMethod: [],
  };

  // Prepare data for SSLCommerz payment request
  const initiate = {
    store_id: process.env.SSL_STORE_ID, // your store ID from SSLCommerz
    store_passwd: process.env.SSL_STORE_PASSWORD, // your store password
    total_amount: payment.amount, // payment amount
    currency: "BDT", // currency (BDT for Taka)
    tran_id: payment.appointmentId, // unique transaction ID
    appointmentId: payment.appointmentId,
    // Callback URLs
    success_url: `${SERVER_URL}/sslPayment/successPayment`, // on success
    fail_url: `${SERVER_URL}/sslPayment/paymentFail`, // on fail
    cancel_url: `${SERVER_URL}/sslPayment/paymentCancel`, // on cancel
    ipn_url: `${SERVER_URL}/ipn-success-payment`, // instant payment notification

    // Product info (doctor appointment case)
    product_name: "Doctor Appointment",
    product_category: "Healthcare",
    product_profile: "service",

    // Customer info (dynamic from frontend)
    cus_name: payment.name || "Anonymous",
    cus_email: payment.email,
    cus_add1: payment.address || "Dhaka",
    cus_city: payment.city || "Dhaka",
    cus_postcode: payment.postcode || "1000",
    cus_country: "Bangladesh",
    cus_phone: payment.phone,

    shipping_method: "NO", // no shipping needed for service
  };

  try {
    // Step 1: Send request to SSLCommerz
    const iniResponse = await fetch(
      "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(initiate).toString(),
      }
    );

    // Step 2: Get response (contains payment gateway URL)
    const responseData = await iniResponse.json();
    const gatewayURL = responseData?.GatewayPageURL;

    // Step 3: Save payment entry to database

    const result = await db.collection("payments").insertOne(paymentEntry);
    // Step 4: Send payment URL to client for redirect
    res.send({ gatewayURL });
  } catch (error) {
    console.error("SSL Init Error:", error);
    res.status(500).send({ error: "Payment initialization failed" });
  }
};

exports.sslPaymentSuccess = async (req, res) => {
  // Step 1: Get success data sent from SSLCommerz
  const paymentSuccess = req.body;
  const db = await connectDB();
  try {
    if (!paymentSuccess?.val_id) {
      return res
        .status(400)
        .send({ message: "Invalid request: val_id missing" });
    }

    // Step 2: Validate payment with SSLCommerz
    const validationUrl = `https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php?val_id=${paymentSuccess.val_id}&store_id=${process.env.SSL_STORE_ID}&store_passwd=${process.env.SSL_STORE_PASSWORD}&v=1&format=json`;

    const isValidPayment = await fetch(validationUrl);
    const response = await isValidPayment.json();
    if (response.status !== "VALID") {
      return res.send({ message: "Invalid Payment" });
    }

    // Step 3: Update payment record in DB
    const query = { transactionId: response.tran_id };
    const result = await db.collection("payments").updateOne(query, {
      $set: {
        status: "success",
        paymentMethod: [response.card_type],
        paid_at: new Date(response.tran_date).toISOString(),
      },
    });
    // also update appointment status to 'confirmed'
    const appointmentQuery = { _id: new ObjectId(response.tran_id) };
    const resultData = await db
      .collection("appointments")
      .updateOne(appointmentQuery, {
        $set: { status: "confirmed" },
      });
    res.redirect(`${FRONTEND_URL}/payment-success`);
  } catch (error) {
    console.error("Payment validation error:", error);
    res.status(500).send({
      success: false,
      message: "Payment validation failed",
    });
  }
};

exports.paymentFail = async (req, res) => {
  const db = await connectDB();
  const paymentFail = req.body;
  //delete the apointment if payment fails
  const appointmentQuery = { _id: new ObjectId(paymentFail.tran_id) };
  await db.collection("appointments").deleteOne(appointmentQuery);
  res.redirect(`${FRONTEND_URL}/payment-fail`);
};

exports.paymentCancel = async (req, res) => {
  res.redirect(`${FRONTEND_URL}/payment-cancel`);
};
