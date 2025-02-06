import franchiseModel from "../model/franchiseModel.js";
import errorHandler from "../utils/errorHandler.js";
import CatchAsyncError from "./CatchAsyncError.js";


const verifyFranchise = CatchAsyncError(async (req, res, next) => {
    const { key, secret } = req.query
    const franchise = await franchiseModel.findOne({ "API.key": key, "API.secret": secret })

    if (!franchise) {
        return next(new errorHandler("Please Check Your API Key & Secret Key", 401));
    }

    req.franchise = franchise
    next()

})

export default verifyFranchise