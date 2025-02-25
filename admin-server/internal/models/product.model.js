import mongoose from "mongoose"

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 0,
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    description: {
        type: String,
        required: false,
    },
    category: {
        type: [String],
        required: true,
    }
}, { timestamps: true }
);

export default mongoose.model("Product", ProductSchema)
