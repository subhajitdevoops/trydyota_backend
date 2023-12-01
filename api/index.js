require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const socket = require("socket.io");
const bodyParser = require("body-parser");


const { connectDB } = require("../config/db");
const productRoutes = require("../routes/productRoutes");
const customerRoutes = require("../routes/customerRoutes");
const adminRoutes = require("../routes/adminRoutes");
const orderRoutes = require("../routes/orderRoutes");
const customerOrderRoutes = require("../routes/customerOrderRoutes");
const categoryRoutes = require("../routes/categoryRoutes");
const couponRoutes = require("../routes/couponRoutes");
const attributeRoutes = require("../routes/attributeRoutes");
const settingRoutes = require("../routes/settingRoutes");
const currencyRoutes = require("../routes/currencyRoutes");
const languageRoutes = require("../routes/languageRoutes");
const taxRoutes = require("../routes/taxRoutes");
const homepageRoutes = require("../routes/homepageRoutes");
const shippingRoutes = require("../routes/shippingRoutes");
const brandCatalogRoutes = require("../routes/brandCatalogRoute");
const productRequestRoutes = require("../routes/productRequestRoutes");
const promotionRoutes = require("../routes/promotionRoutes");
const stateRoutes = require("../routes/stateRoute");


const { isAuth, isAdmin } = require("../config/auth");

connectDB();
const app = express();
app.use(cors());
// We are using this for the express-rate-limit middleware
app.set("trust proxy", 1);

app.use(express.json({ limit: "4mb" }));
app.use(helmet());

// Root route
app.get("/", (req, res) => {
  console.log("jjj");
  res.send("App works properly!");
});

// Routes needed for store front and admin dashboard
app.use("/api/products/", productRoutes);
app.use("/api/category/", categoryRoutes);
app.use("/api/coupon/", couponRoutes);
app.use("/api/customer/", customerRoutes);
app.use("/api/order/", isAuth, customerOrderRoutes);
app.use("/api/attributes/", attributeRoutes);
app.use("/api/setting/", settingRoutes);
app.use("/api/currency/", currencyRoutes);
app.use("/api/language/", languageRoutes);
app.use("/api/tax/", taxRoutes);
app.use("/api/homepage/", homepageRoutes);
app.use("/api/shipping/", shippingRoutes);
app.use("/api/brandcatalog/", brandCatalogRoutes);
app.use("/api/productRequest/", productRequestRoutes);
app.use("/api/promotion/", promotionRoutes);
app.use("/api/state/", stateRoutes);



// Routes for admin dashboard
app.use("/api/admin/", adminRoutes);
app.use("/api/orders/", orderRoutes);

// app.get("/", async (req, res, next) => {
//   try {
//     let html = fs.readFileSync(path.resolve(root, "index.html"), "utf-8");

//     // Transform HTML using Vite plugins.
//     html = await viteServer.transformIndexHtml(req.url, html);

//     res.send(html);
//   } catch (e) {
//     return next(e);
//   }
// });

app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  res.status(400).json({ message: err.message });
});

// Serve static files from the "dist" directory
app.use("/static", express.static("public"));

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

// Set up socket
const io = socket(server, {
  cors: {
    origin: "*",
    methods: ["PUT", "GET", "POST", "DELETE", "PATCH", "OPTIONS"],
    credentials: false,
    transports: ["websocket", "polling"],
  },
});

io.on("connection", (socket) => {
   console.log(`Socket ${socket.id} connected!`);

  socket.on("notification", async (data) => {
    // console.log("data", data);

    let updatedData = data;

    if (data?.option === "storeCustomizationSetting") {
      const storeCustomizationSetting = await getStoreCustomizationSetting(data);
      updatedData = {
        ...data,
        storeCustomizationSetting: storeCustomizationSetting,
      };
    }
    if (data?.option === "globalSetting") {
      const globalSetting = await getGlobalSetting(data);
      updatedData = {
        ...data,
        globalSetting: globalSetting,
      };
    }
    io.emit("notification", updatedData);
  });

  socket.on("disconnect", () => {
    console.log(`Socket ${socket.id} disconnected!`);
  });
});
