import mongoose from "mongoose";
import CatchAsyncError from "../middleware/CatchAsyncError.js";
import orderModel from "../model/orderModel.js";
import errorHandler from "../utils/errorHandler.js";


const createOrder = CatchAsyncError(async (req, res, next) => {

    let {
        billingInfo,
        orderItems,
        priceInfo,
        paymentInfo,
        productInfo,
        orderStatus,
        userInfo
    } = req.body;


    const order = await orderModel.create(orderDetail);


    if (!order) {
        return next(new errorHandler("Can't Create Order", 404));
    }


    res.status(200).json({
        message: "Order Created Successfully",
        paymentMethod: paymentInfo.paymentMethod,
        id: order._id
    });

});

const updateOrder = CatchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const { orderStatus } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new errorHandler("Please enter vaild order id", 404));
    }

    const order = await orderModel.findById(id);

    if (order.orderInfo.orderStatus == "Delivered") {
        res.status(202).json({
            message: "Prpduct Is Already Delivered",
        });
        return
    }

    const result = await orderModel.findByIdAndUpdate(id, {
        "orderInfo.orderStatus": orderStatus,
    });

    if (!result) {
        return next(new errorHandler("Order not find with this ID", 404));
    }

    res.status(200).json({
        message: "Order Upadted Successfully",
    });
});

const getOrder = CatchAsyncError(async (req, res, next) => {

    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new errorHandler("Please enter vaild order id", 404));
    }
    const order = await orderModel.findById(id);

    if (req.user.role != "admin") {
        if (req.user._id.toString() != order.userInfo.userId.toString()) {
            return next(new errorHandler("Please Login With Same ID", 404));
        }
    }



    if (!order) {
        return next(new errorHandler("Order not find with this ID", 404));
    }

    res.status(200).json(order);
});

const getAllOrder = CatchAsyncError(async (req, res, next) => {
    const userId = req.user._id;

    const orders = await orderModel.find({ "userInfo.userId": userId });

    res.status(200).json({
        orders,
    });
});

const getAdminAllOrder = CatchAsyncError(async (req, res, next) => {
    const orders = await orderModel.find();

    res.status(200).json({
        orders,
    });
});

const deleteOrder = CatchAsyncError(async (req, res, next) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new errorHandler("Please enter vaild order id", 404));
    }

    const del = await orderModel.findByIdAndDelete(id);
    if (!del) {
        return next(new errorHandler("Can't order product", 404));
    }

    res.status(200).json({
        message: "Product Order Successfully",
    });
});

const isOrderAvailable = CatchAsyncError(async (req, res, next) => {
    const _id = req.params.id

    const result = await orderModel.findById(_id)

    if (!result) {
        res.status(404).json({
            isOrderAvailable: false
        })
        return
    }
    res.status(200).json({
        isOrderAvailable: true
    })
})

export { isOrderAvailable, createOrder, updateOrder, getOrder, getAllOrder, getAdminAllOrder, deleteOrder };
