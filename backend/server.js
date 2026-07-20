import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Stripe from "stripe";
import path, { dirname, join } from "path";
import { fileURLToPath } from "url";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import morgan from "morgan";

// Import Mongoose DB connection & models
import "./db.js";
import Donation from "./models/Donation.js";

import paymentRouter from "./routes/payment.js";
import analyticsRouter from "./routes/analytics.js";
import adminRouter from "./routes/admin.js";
import updatesRouter from "./routes/updates.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// 1. Security: Helmet for HTTP headers defense
app.use(
  helmet({
    crossOriginResourcePolicy: false, // Allows loading uploaded assets across domains
  }),
);

// 2. Logging: Morgan request logging middleware
app.use(morgan("dev"));

// 3. Security: Express rate limiters to defend against Brute Force & DDoS
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // Limit each IP to 200 requests per 15 mins
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: "Too many requests from this IP, please try again after 15 minutes.",
  },
});
app.use("/api/", apiLimiter);

// Enable CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

// Serve static uploaded files
app.use("/uploads", express.static(join(__dirname, "uploads")));

// Stripe Webhook Endpoint (requires raw body, must be defined BEFORE express.json())
app.post(
  "/api/payment/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!sig || !webhookSecret) {
      console.error(
        "Webhook verification failed: Missing stripe-signature or webhook secret",
      );
      return res.status(400).send("Webhook Error: Missing signature or secret");
    }

    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err) {
      console.error(`Webhook Error verifying signature: ${err.message}`);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      const donorName =
        session.metadata.donorName ||
        session.customer_details?.name ||
        "Anonymous";
      const donorEmail =
        session.metadata.donorEmail || session.customer_details?.email || "N/A";
      const donorPhone =
        session.metadata.donorPhone || session.customer_details?.phone || "";
      const sevaType = session.metadata.sevaType || "General Seva";
      const amount =
        parseFloat(session.metadata.amount) || session.amount_total / 100;
      const sessionId = session.id;
      const paymentIntentId =
        typeof session.payment_intent === "string"
          ? session.payment_intent
          : session.payment_intent?.id || "";
      const paymentMethod = session.payment_method_types?.[0] || "card";

      console.log(
        `Donation received! Session: ${sessionId}, Name: ${donorName}, Amount: ${amount}`,
      );

      try {
        // Find in MongoDB database and update status to completed
        let donation = await Donation.findOne({ stripe_session_id: sessionId });

        if (donation) {
          donation.donor_name = donorName;
          donation.donor_email = donorEmail;
          donation.donor_phone = donorPhone;
          donation.seva_type = sevaType;
          donation.payment_intent_id = paymentIntentId;
          donation.payment_method = paymentMethod;
          donation.status = "completed";
          await donation.save();
        } else {
          donation = new Donation({
            stripe_session_id: sessionId,
            payment_intent_id: paymentIntentId,
            donor_name: donorName,
            donor_email: donorEmail,
            donor_phone: donorPhone,
            seva_type: sevaType,
            amount: amount,
            currency: "inr",
            payment_method: paymentMethod,
            status: "completed",
          });
          await donation.save();
        }
        console.log("Donation successfully recorded in MongoDB.");
      } catch (dbErr) {
        console.error(
          "Error saving webhook donation to MongoDB:",
          dbErr.message,
        );
      }
    }

    res.json({ received: true });
  },
);

// JSON parsing middleware for other routes
app.use(express.json());

// 4. Security: Prevent MongoDB Operator Injection
app.use(mongoSanitize());

// Routes
app.use("/api/payment", paymentRouter);
app.use("/api/analytics", analyticsRouter);
app.use("/api/admin", adminRouter);
app.use("/api/updates", updatesRouter);

// Health check route
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Krishna Govind Seva Sansthan NGO API is running.",
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(
    `Stripe Secret Key loaded: ${process.env.STRIPE_SECRET_KEY ? "Yes" : "No"}`,
  );
  console.log(
    `Stripe Webhook Secret loaded: ${process.env.STRIPE_WEBHOOK_SECRET ? "Yes" : "No"}`,
  );
});
