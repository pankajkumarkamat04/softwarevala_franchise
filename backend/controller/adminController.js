import CatchAsyncError from "../middleware/CatchAsyncError.js"
import orderModel from "../model/orderModel.js"
import userModel from "../model/userModel.js"

const dashboardData = CatchAsyncError(async (req, res, nex) => {

    const pendingOrders = await orderModel.find({ orderStatus: "Pending" })
    const totalOrders = await orderModel.find()
    const totalUsers = await userModel.find({ role: "user" })
    const totalResellers = await userModel.find({ role: "reseller" })
    const totalFranchises = await userModel.find({ role: "franchise" })


    res.status(200).json({
        pendingOrders: pendingOrders.length,
        totalOrders: totalOrders.length,
        totalUsers: totalUsers.length,
        totalResellers: totalResellers.length,
        totalFranchises: totalFranchises.length
    })

})

export { dashboardData }