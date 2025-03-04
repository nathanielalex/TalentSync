//server.js
import express from 'express';
import dotenv from 'dotenv';
import {connectDB} from './config/db.js';
import cors from "cors";
// import Product from './models/product.model.js';
import authRoutes from "./routes/auth.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// app.use("/api/products", productRoutes);
// console.log(process.env.MONGO_URI)

app.use(express.json());

const corsOption = {
    origin: ["http://localhost:5173"],
    //5173 is where vite runs
};

app.use(cors(corsOption));

app.use('/api/auth', authRoutes);

// app.post("/api/products", async (req, res) => {
//   const product = req.body;

//   if (!product.name || !product.price || !product.image) {
//     return res
//       .status(400)
//       .json({ success: false, message: "Please provide all fields" });
//   }
//   const newProduct = new Product(product);

//   try {
//     await newProduct.save();
//     res.status(201).json({ success: true, data: newProduct });
//   } catch (error) {
//     console.error("Error in creating product: ", error.message);
//     res.status(500).json({ success: false, message: "server error" });
//   }
// });

app.listen(PORT, () => {
  connectDB();
  console.log("server started on port 8080");
});