import mongoose from "mongoose";
import errorHandler from "../utils/errorHandler.js";
import CatchAsyncError from "../middleware/CatchAsyncError.js";
import postCategoryModel from "../model/postCategoryModel.js";
import postModel from "../model/postModel.js";
import * as fs from "fs";
import { fileURLToPath } from "url";
import path from "path";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createPostCategory = CatchAsyncError(async (req, res, next) => {
    const { name, url, parentCategory, parentCategoryID } = req.body;

    const isUrlExist = await postCategoryModel.find({ url });

    if (isUrlExist.length == 1) {
        return res.status(409).json({
            message: "Url already exists",
        });
    }

    const category = new postCategoryModel({
        name,
        url,
        parentCategory,
        parentCategoryID,
    });

    if (!name) {
        return next(new errorHandler("Category name is requried"));
    }
    if (!url) {
        return next(new errorHandler("Category url is requried"));
    }

    if (!category) {
        return next(new errorHandler(message, 404));
    }

    await category.save();
    res.status(200).json({
        message: "Category created successfully",
    });
});

const getPostCategory = CatchAsyncError(async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new errorHandler("Category enter vaild post id", 404));
    }

    console.log(id);

    const category = await postCategoryModel.findById(id);

    if (!category) {
        return next(new errorHandler("Category not find with this ID", 404));
    }

    res.status(200).json({
        category,
    });
});

const getAllPostCategory = CatchAsyncError(async (req, res, next) => {
    const categories = await postCategoryModel.find();

    res.status(200).json({
        categories,
    });
});

const updatePostCategory = CatchAsyncError(async (req, res, next) => {
    const _id = req.params.id;

    const { name, url, parentCategory, parentCategoryID } = req.body;

    const isUrlExist = await postCategoryModel.find({ url });

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return next(new errorHandler("Please enter vaild post id", 404));
    }

    let category = await postCategoryModel.findOne({ _id });

    if (!category) {
        return next(new errorHandler("Category not found with this id", 404));
    }

    if (url != category.url) {
        if (isUrlExist.length == 1) {
            return res.status(409).json({
                message: "Url already exists",
            });
        }
    }

    category.name = name;
    category.url = url;
    if (parentCategory != undefined) {
        category.parentCategory = parentCategory;
        category.parentCategoryID = parentCategoryID?.toString();
    }

    await postCategoryModel.updateMany(
        { parentCategoryID: category._id },
        { parentCategory: category.name }
    );
    await category.save();

    res.status(200).json({
        message: "Category Updated Successfully",
    });
});

const deletePostCategory = CatchAsyncError(async (req, res, next) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new errorHandler("Please enter vaild category id", 404));
    }

    const category = await postCategoryModel.findByIdAndDelete(id);
    if (!category) {
        return next(new errorHandler("Can't delete category", 404));
    }

    const result = await postCategoryModel.deleteMany({
        parentCategoryID: category._id,
    });

    res.status(200).json({
        message: "Category Delete Successfully",
    });
});

const getPostSubCategories = CatchAsyncError(async (req, res, next) => {
    const id = req.params.id;


    const subCategories = await postCategoryModel.find({ parentCategoryID: id });

    res.status(200).json({
        subCategories,
    });
});

const createPost = CatchAsyncError(async (req, res, next) => {
    let {
        title,
        description,
        categoryName,
        categoryID,
        subCategoryName,
        subCategoryID,
    } = req.body;

    let postImage = req.file;


    if (!title) {
        return next(new errorHandler("Post name is requried"));
    }
    if (!description) {
        return next(new errorHandler("Post description is requried"));
    }

    const post = await postModel.create({
        title,
        description,
        category: {
            name: categoryName,
            id: categoryID,
        },
        subCategory: {
            name: subCategoryName,
            id: subCategoryID,
        },
        image: {
            path: postImage.path,
            filename: postImage.filename,
        },
        user: {
            name: req.user.name,
            id: req.user._id
        }
    });


    if (!post) {
        return next(new errorHandler(message, 404));
    }

    res.status(200).json({
        message: "Post created successfully",
    });
});

const getPost = CatchAsyncError(async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new errorHandler("Please enter vaild post id", 404));
    }
    const post = await postModel.findById(id);

    if (!post) {
        return next(new errorHandler("Post not find with this ID", 404));
    }

    res.status(200).json({
        post,
    });
});

const updatePost = CatchAsyncError(async (req, res, next) => {
    const _id = req.params.id;

    let {
        title,
        description,
        categoryName,
        categoryID,
        subCategoryName,
        subCategoryID,
    } = req.body;
    const postImage = req.file;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return next(new errorHandler("Please enter vaild post id", 404));
    }

    let post = await postModel.findById(_id);

    const updatedPostInfo = {
        title,
        description,
    };

    if (categoryID != undefined) {
        updatedPostInfo.category = {
            name: categoryName,
            id: categoryID,
        };
    }

    if (subCategoryID != undefined) {
        updatedPostInfo.subCategory = {
            name: subCategoryName,
            id: subCategoryID,
        };
    } else {
        if (post.category != categoryID) {
            updatedPostInfo.subCategory = "";
        }
    }

    if (postImage != undefined) {
        fs.unlink(path.join(__dirname, `../assets/postImage/${post?.image?.filename}`), (err) => {
            if (err) {
                console.log(err);
            }
        });
        updatedPostInfo.image = {
            path: postImage.path,
            filename: postImage.filename,
        }
    }


    const result = await postModel.findByIdAndUpdate(_id, updatedPostInfo);
    if (!result) {
        return next(new errorHandler("Post not found with this id", 404));
    }

    res.status(200).json({
        message: "Post Updated Successfully",
    });
});

const deletePost = CatchAsyncError(async (req, res, next) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new errorHandler("Please enter vaild post id", 404));
    }
    const post = await postModel.findByIdAndDelete(id);
    if (!post) {
        return next(new errorHandler("Can't delete post", 404));
    }



    fs.unlink(path.join(__dirname, `../assets/postImage/${post?.image?.filename}`), (err) => {
        if (err) {
            console.log(err);
        }
    });

    res.status(200).json({
        message: "Post Delete Successfully",
    });
});
const getAllPost = CatchAsyncError(async (req, res, next) => {


    const Categories = req.query.Categories
    const subCategories = req.query.subCategories
    let arrayCategories = Categories?.split(",")
    let arraySubCategories = subCategories?.split(",")
    const resPerPage = Number(req.query.resPerPage) || 4
    const page = Number(req.query.page) || 1
    let query = []


    if (Categories) {
        query.push({ "category.id": { $in: arrayCategories } })
    }
    if (arraySubCategories) {
        query.push({ "subCategory.id": { $in: arraySubCategories } })
    }

    let postLength = await postModel.find({
        $or: query
    });


    const totalPages = Math.ceil(postLength.length / resPerPage);


    const post = await postModel.find({
        $or: query
    }).sort({ createdAt: -1 }).limit(resPerPage).skip(resPerPage * (page - 1))


    res.status(200).json({
        post,
        totalPages
    });
});


const getAllPostAdmin = CatchAsyncError(async (req, res, next) => {

    const post = await postModel.find().sort({ createdAt: -1 })

    res.status(200).json({
        post,
    });
});

export {
    createPostCategory,
    getPostCategory,
    getAllPostCategory,
    updatePostCategory,
    deletePostCategory,
    getPostSubCategories,
    createPost,
    updatePost,
    deletePost,
    getPost,
    getAllPost,
    getAllPostAdmin
};
