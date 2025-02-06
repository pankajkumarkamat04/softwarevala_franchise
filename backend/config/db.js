import mongoose from "mongoose";



const DBConnect = () => {
    let DBURL = process.env.DBURL

    mongoose.connect(DBURL).then(() => {
    }).catch((error) => {
        console.log(error);
    })
}

export default DBConnect;