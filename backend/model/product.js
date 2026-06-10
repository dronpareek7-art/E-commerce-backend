import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        slug: {
            type: String
        },

        description: {
            type: String,
            required: true,
            trim: true,
        },

        price: {
            type: Number,
            required: true,
            min: 0,
        },

        discount_price: {
            type: Number,
            default: 0,
            min: [0, 'Discounted price must be at least 0'],
            max: [300000, 'Discounted price cannot exceed 30000'],
            validate: function (v) { return v <= this.price },
            message: 'Discounted price cannot exceed original price'
        },
    },
    {
        timestamps: true,
    }
);

ProductSchema.pre('save', function () {
    this.slug = this.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
})

const Product = mongoose.model("product", ProductSchema);

export default Product;
