const siteData = {}

const updateSiteData = ({ generalSettingData, paymentSettingData, apiData }) => {
    siteData.siteTitle = generalSettingData?.siteTitle
    siteData.siteDescription = generalSettingData?.siteDescription
    siteData.siteMail = generalSettingData?.siteMail
    siteData.sitePhoneNo = generalSettingData?.sitePhoneNo
    siteData.siteAddress = generalSettingData?.siteAddress
    siteData.siteOfficeTime = generalSettingData?.siteOfficeTime
    siteData.siteAbout = generalSettingData?.siteAbout
    siteData.siteURL = generalSettingData?.siteURL
    siteData.bankTransferActive = paymentSettingData?.bankTransferActive
    siteData.bankAccountNo = paymentSettingData?.bankAccountNo
    siteData.bankIFSCCode = paymentSettingData?.bankIFSCCode
    siteData.bankSwiftCode = paymentSettingData?.bankSwiftCode
    siteData.paymentBankName = paymentSettingData?.paymentBankName
    siteData.apiSecret = apiData?.apiSecret
    siteData.apiKey = apiData?.apiKey
}

export { updateSiteData }
export default siteData
