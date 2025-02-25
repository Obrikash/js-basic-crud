import express from "express"
import mongoose from "mongoose"
import productRoute from "./product.route.js"

const app = express();

app.use(express.json());
app.use("/api/products", productRoute) 



mongoose.connect("mongodb://localhost:27737/products?authSource=admin", {
    user: "mongoadmin",
    pass: "mireatop",
}).then(() => {
    console.log("Connected to database")
    app.listen(3000, () => {
        console.log("Server is running on port 3000")
    });
});