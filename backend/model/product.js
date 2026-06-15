import mongoose from "mongoose";
const generateSlug = (title) => {

    return title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}
const ProductSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },
        slug: {
            type: String,
            unique: true,
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
        image: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true,
    }
);
ProductSchema.pre("save", function (next) {
    if (this.title) {
        this.slug = generateSlug(this.title);
    }
    next();
});

// ProductSchema.pre("insertMany", function (next, docs) {
//     docs.forEach((doc) => {
//         if (doc.title) {
//             doc.slug = generateSlug(doc.title);
//         }
//     });

//     next();
// });
const Product = mongoose.model("product", ProductSchema);

export default Product;
