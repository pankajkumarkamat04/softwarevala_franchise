import mongoose from "mongoose";
import settingModel from "../model/settingModel.js"

const seederData = [
    {
        name: "siteTitle",
        value: "Software Vala"
    },
    {
        name: "siteURL",
        value: "https://new.softwarevala.in/"
    },
    {
        name: "siteDescription",
        value: "Software Vala"
    },
    {
        name: "sitePhoneNo",
        value: "+91 83488 38383"
    },
    {
        name: "siteMail",
        value: "hellosoftwarevala@gmail.com"
    },
    {
        name: "siteAddress",
        value: "Rajasthan"
    },
    {
        name: "siteOfficeTime",
        value: "10AM - 7PM(IST)"
    },
    {
        name: "siteAbout",
        value: "About Us"
    },
    {
        name: "mailHost",
        value: "/"
    },
    {
        name: "mailPort",
        value: "/"
    },
    {
        name: "mailUsername",
        value: "/"
    },
    {
        name: "mailPassword",
        value: "/"
    },


]




const DBConnect = () => {
    let DBURL = 'mongodb+srv://pankajkee2024:Bdt9MPvV9uJbGX16@cluster0.1kbkf.mongodb.net/'


    mongoose.connect(DBURL).then(() => {
    }).catch((error) => {
        console.log(error);
    })
}

DBConnect();

seederData.map(async (data) => {
    const res = await settingModel.create(data)
    console.log(res);

})

