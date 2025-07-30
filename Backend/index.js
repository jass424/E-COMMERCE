const port = 5000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();


app.use(express.json());
app.use(cors());
app.use("/images", express.static("upload/images"));

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error:", err));

const Admin = mongoose.model("Admin", new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}));

app.post("/admin/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
    const token = jwt.sign({ adminId: admin._id }, process.env.JWT_SECRET || "admin_secret_key", { expiresIn: "1d" });
    res.json({ success: true, token, email: admin.email });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
});

const Tax = mongoose.model("Tax", new mongoose.Schema({
  name: String,
  type: { type: String, enum: ["percentage", "fixed"], default: "percentage" },
  percentage: Number,
  value: Number,
}));

app.post("/taxes", async (req, res) => {
  const { name, type, percentage, value } = req.body;
  try {
    let taxData = { name, type };
    if (type === "percentage") {
      taxData.percentage = percentage;
      taxData.value = undefined;
    } else {
      taxData.value = value;
      taxData.percentage = undefined;
    }
    let tax = await Tax.findOne({ name });
    if (tax) Object.assign(tax, taxData);
    else tax = new Tax(taxData);
    await tax.save();
    res.json({ success: true, tax });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get("/taxes", async (req, res) => {
  try {
    const taxes = await Tax.find();
    res.json({ success: true, taxes });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.put("/taxes/:id", async (req, res) => {
  try {
    const { name, type, value } = req.body;
    const updateData = { name, type };
    if (type === "percentage") {
      updateData.percentage = value;
      updateData.value = undefined;
    } else {
      updateData.value = value;
      updateData.percentage = undefined;
    }
    const tax = await Tax.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!tax) return res.status(404).json({ success: false, message: "Tax not found" });
    res.json({ success: true, tax });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.delete("/taxes/:id", async (req, res) => {
  try {
    await Tax.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

const User = mongoose.model("User", new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  plain_password: String,
}));

const Product = mongoose.model("Product", new mongoose.Schema({
  id: Number,
  name: String,
  image: String,
  category: String,
  new_price: Number,
  old_price: Number,
  discount: { type: Number, default: 5 },
  date: { type: Date, default: Date.now },
  available: { type: Boolean, default: true },
}));





const Order = mongoose.model("Order", new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  address: String,
  city: String,
  state: String,
  country: String,
  pinCode: String,
  shippingMethod: String,
  paymentMethod: String,
  products: [
    { title: String, price: Number, image: String, quantity: Number, total: Number }
  ],
  subtotal: Number,
  shipping: Number,
  discount: Number,
  totalAmount: Number,
  orderDate: Date,
  shippingDate: Date,
}));

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`),
});
const upload = multer({ storage });

app.post("/upload", upload.single("product"), (req, res) => {
  if (!req.file) return res.status(400).json({ success: false, message: "No file uploaded" });
  res.json({ success: true, image: { url: `http://localhost:${port}/images/${req.file.filename}` } });
});

// ✅ Modified to default discount if missing
app.post("/addproduct", async (req, res) => {
  try {
    const productData = {
      ...req.body,
      discount: req.body.discount ?? 5,
    };
    const product = new Product(productData);
    await product.save();
    res.json({ success: true, product });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to add product" });
  }
});

// Modified to always send discount
// Catch-all root route to confirm server is running

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find(
      req.query.category ? { category: req.query.category } : {}
    ).sort({ date: -1 });

    const withDiscount = products.map((product) => ({
      ...product._doc,
      discount: product.discount ?? 5,
    }));

    res.json({ success: true, products: withDiscount });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch products" });
  }
});

app.delete("/deleteproduct/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

app.put("/updateproduct/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        old_price: req.body.old_price,
        new_price: req.body.new_price,
        discount: req.body.discount,
        available: req.body.available,
        date: req.body.date,
      },
      { new: true }
    );
    res.json({ success: true, product: updated });
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ success: false });
  }
});

app.post("/placeorder", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

app.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ orderDate: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

app.get("/orders/:email", async (req, res) => {
  try {
    const orders = await Order.find({ email: req.params.email }).sort({ orderDate: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (await User.findOne({ email })) return res.status(400).json({ success: false });
    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashed, plain_password: password });
    await user.save();
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || "default_secret", { expiresIn: "1h" });
    res.json({ success: true, token });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user || !(await bcrypt.compare(req.body.password, user.password))) return res.status(401).json({ success: false });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || "default_secret", { expiresIn: "1h" });
    res.json({ success: true, token });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find({}, { name: 1, email: 1, plain_password: 1 });
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false });
  }
});

app.get("/", (req, res) => res.send("✅ Express Backend is Running"));

app.listen(port, () => console.log(`🚀 Server running at http://localhost:${port}`));
