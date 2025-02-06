import axios from "axios"
import CatchAsyncError from "../middleware/CatchAsyncError.js"
import paypal from "@paypal/checkout-server-sdk"



const paypalController = CatchAsyncError(async () => {
    const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
                currency_code: 'USD',
                value: priceInfo.price
            },
            description: "test"
        }]
    });

    const client = createPayPalClient(); // Initialize PayPal client

    const order1 = await client.execute(request);


    const approvalLink = order1.result.links.find(link => link.rel === 'approve').href;

    console.log(approvalLink);

})

export { paypalController }