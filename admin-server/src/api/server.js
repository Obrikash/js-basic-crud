import express from "express";
import mongoose from "mongoose";
import productRoute from "./product.route.js";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();

app.use(express.json());
app.use("/api/products", productRoute);

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Product API",
      version: "1.0.0",
      description: "API for managing products",
    },
    servers: [{ url: "http://localhost:3000" }],
  },
  apis: ["./product.route.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

mongoose
  .connect("mongodb://localhost:27737/products?authSource=admin", {
    user: "mongoadmin",
    pass: "mireatop",
  })
  .then(() => {
    console.log("Connected to database");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  });
