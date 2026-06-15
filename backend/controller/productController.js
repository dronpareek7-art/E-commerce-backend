import Product from "../model/product.js";

export async function getAllProduct(req, res) {

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10

    const skip = (page - 1) * limit;

    const Products = await Product.find().sort({ _id: -1 }).skip(skip).limit(limit);

    const totalProduct = await Product.countDocuments();

    return res.json({
        currentPage: page,
        totalPages: Math.ceil(totalProduct / limit),
        totalProduct,
        Products
    });
}
export async function addproduct(req, res) {
    try {

        const newproduct = await Product.create({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            slug: req.body.slug,
            discount_price: req.body.discount_price,
            image: req.file ? req.file.filename : "",
        });

        res.status(201).json({
            data: newproduct,
            message: "Product added successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}


export async function updateProduct(req, res) {
    const productId = req.params.id;
    const updatedData = req.body;
    console.log(updatedData);
    const Products = await Product.findById(productId);

    if (!Products) {
        return res.json({
            message: "Product not found",
        });
    }
    Products.title = updatedData.title;
    Products.price = updatedData.price;
    Products.description = updatedData.description;
    Products.discount_price = updatedData.discount_price;
    Products.slug = req.body.slug;
    console.log(Products);
    await Products.save();

    res.json({
        message: "Data are updated",
        data: Products,
    });
}

export async function bulkCreate(req, res) {
    try {

        const productsWithSlug = req.body.map((product) => ({
            ...product,
            slug: product.title
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-|-$/g, ""),
        }));

        const Products = await Product.insertMany(
            productsWithSlug
        );

        res.status(201).json({
            message: "Bulk data added successfully",
            data: Products,
        });

    } catch (err) {
        res.status(400).json({
            message: err.message,
        });
    }
}
export async function deleteProduct(req, res) {
    const deleteProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deleteProduct) {
        return res.status(404).json({
            message: "Product not found",
        });
    }

    res.json({
        message: "Product deleted successfully",
        data: deleteProduct,
    });
}