import CatchAsyncError from "../middleware/CatchAsyncError.js"
import contactFormModel from "../model/contactFormModel.js"
import productModel from "../model/productModel.js"
import errorHandler from "../utils/errorHandler.js"




const createContact = CatchAsyncError(async (req, res, next) => {

    const result = await contactFormModel.create(req.body)

    if (!result) {
        new errorHandler(message, 500)
    }

    res.status(200).json({
        message: "Form Sumbited Successfull"
    })

})

const getAllContactForm = CatchAsyncError(async (req, res, next) => {

    const result = await contactFormModel.find()

    if (!result) {
        new errorHandler(message, 500)
    }

    res.status(200).json({
        result
    })

})


export { createContact, getAllContactForm }