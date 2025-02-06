import axios from "axios";
import CatchAsyncError from "../middleware/CatchAsyncError.js";
import settingModel from "../model/settingModel.js"

const updateGeneralSetting = CatchAsyncError(async (req, res, next) => {
    const { siteTitle, siteURL, siteDescription, siteMail, sitePhoneNo, siteAbout, siteOfficeTime, siteAddress, } = req.body

    await settingModel.updateOne({ name: "siteTitle" }, { $set: { value: siteTitle } })
    await settingModel.updateOne({ name: "siteDescription" }, { $set: { value: siteDescription } })
    await settingModel.updateOne({ name: "siteMail" }, { $set: { value: siteMail } })
    await settingModel.updateOne({ name: "sitePhoneNo" }, { $set: { value: sitePhoneNo } })
    await settingModel.updateOne({ name: "siteAbout" }, { $set: { value: siteAbout } })
    await settingModel.updateOne({ name: "siteOfficeTime" }, { $set: { value: siteOfficeTime } })
    await settingModel.updateOne({ name: "siteAddress" }, { $set: { value: siteAddress } })
    await settingModel.updateOne({ name: "siteURL" }, { $set: { value: siteURL } })



    res.status(200).json({
        message: "General Setting Updated Successfull"
    })
})

const getGeneralSetting = CatchAsyncError(async (req, res, next) => {

    const siteTitle = await settingModel.findOne({ name: "siteTitle" })
    const siteURL = await settingModel.findOne({ name: "siteURL" })
    const siteDescription = await settingModel.findOne({ name: "siteDescription" })
    const siteMail = await settingModel.findOne({ name: "siteMail" })
    const sitePhoneNo = await settingModel.findOne({ name: "sitePhoneNo" })
    const siteAbout = await settingModel.findOne({ name: "siteAbout" })
    const siteAddress = await settingModel.findOne({ name: "siteAddress" })
    const siteOfficeTime = await settingModel.findOne({ name: "siteOfficeTime" })


    res.status(200).json({
        siteTitle: siteTitle?.value,
        siteDescription: siteDescription?.value,
        siteMail: siteMail?.value,
        sitePhoneNo: sitePhoneNo?.value,
        siteAbout: siteAbout?.value,
        siteOfficeTime: siteOfficeTime?.value,
        siteAddress: siteAddress?.value,
        siteURL: siteURL?.value,
    })

})

const updateMailSetting = CatchAsyncError(async (req, res, next) => {
    const { mailHost, mailPort, mailUsername, mailPassword } = req.body

    await settingModel.updateOne({ name: "mailHost" }, { $set: { value: mailHost } })
    await settingModel.updateOne({ name: "mailPort" }, { $set: { value: mailPort } })
    await settingModel.updateOne({ name: "mailUsername" }, { $set: { value: mailUsername } })
    await settingModel.updateOne({ name: "mailPassword" }, { $set: { value: mailPassword } })


    res.status(200).json({
        message: "Mail Setting Updated Successfull"
    })
})

const getMailSetting = CatchAsyncError(async (req, res, next) => {

    const mailHost = await settingModel.findOne({ name: "mailHost" })
    const mailPort = await settingModel.findOne({ name: "mailPort" })
    const mailUsername = await settingModel.findOne({ name: "mailUsername" })
    const mailPassword = await settingModel.findOne({ name: "mailPassword" })


    res.status(200).json({
        mailHost: mailHost.value,
        mailPort: mailPort.value,
        mailUsername: mailUsername.value,
        mailPassword: mailPassword.value
    })

})

const updatePaymentSetting = CatchAsyncError(async (req, res, next) => {
    const { bankDetail } = req.body
    const { bankTransferActive, bankAccountNo, bankIFSCCode, paymentBankName, bankSwiftCode } = bankDetail

    await settingModel.updateOne({ name: "bankTransferActive" }, { $set: { value: bankTransferActive } })
    await settingModel.updateOne({ name: "bankAccountNo" }, { $set: { value: bankAccountNo } })
    await settingModel.updateOne({ name: "bankIFSCCode" }, { $set: { value: bankIFSCCode } })
    await settingModel.updateOne({ name: "paymentBankName" }, { $set: { value: paymentBankName } })
    await settingModel.updateOne({ name: "bankSwiftCode" }, { $set: { value: bankSwiftCode } })

    res.status(200).json({
        message: "Payment Setting Updated Successfull"
    })
})

const getPaymentSetting = CatchAsyncError(async (req, res, next) => {

    const bankTransferActive = await settingModel.findOne({ name: "bankTransferActive" })
    const bankAccountNo = await settingModel.findOne({ name: "bankAccountNo" })
    const bankIFSCCode = await settingModel.findOne({ name: "bankIFSCCode" })
    const paymentBankName = await settingModel.findOne({ name: "paymentBankName" })
    const bankSwiftCode = await settingModel.findOne({ name: "bankSwiftCode" })


    res.status(200).json({
        bankTransferActive: bankTransferActive.value,
        bankAccountNo: bankAccountNo.value,
        bankIFSCCode: bankIFSCCode.value,
        paymentBankName: paymentBankName.value,
        bankSwiftCode: bankSwiftCode.value
    })
})

const updateAPISetting = CatchAsyncError(async (req, res, next) => {
    const { apiKey, apiSecret } = req.body

    await settingModel.updateOne({ name: "apiKey" }, { $set: { value: apiKey } })
    await settingModel.updateOne({ name: "apiSecret" }, { $set: { value: apiSecret } })

    axios.get(`http://localhost:8001/api/v2/franchise/verify?key=${apiKey}&secret=${apiSecret}`).then(function (response) {
        res.status(response.status).json({
            message: response.data.message
        })
    })
        .catch(function (error) {
            res.status(error.response.status).json({
                message: error.response.data.message
            })
        })

})

const getAPISetting = CatchAsyncError(async (req, res, next) => {

    const apiSecret = await settingModel.findOne({ name: "apiSecret" })
    const apiKey = await settingModel.findOne({ name: "apiKey" })


    res.status(200).json({
        apiKey: apiKey.value,
        apiSecret: apiSecret.value,
    })

})

export { updateGeneralSetting, getGeneralSetting, updateMailSetting, getMailSetting, updatePaymentSetting, getPaymentSetting, getAPISetting, updateAPISetting }