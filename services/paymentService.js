const paypal = require("../config/paypalConfig");

const createPayment = (amount, currency) => {
    return new Promise((resolve, reject) => {
        const paymentData = {
            intent: "sale",
            payer: {
                payment_method: "paypal",
            },
            redirect_urls: {
                return_url: "http://192.168.184.1:55886/thanks/thanks",
                cancel_url: "http://192.168.184.1:55886/thanks/thanks",
            },
            transactions: [
                {
                    amount: {
                        currency: currency,
                        total: amount,
                    },
                    description: "Service Payment",
                },
            ],
        };

        paypal.payment.create(paymentData, (error, payment) => {
            if (error) {
                reject(error);
            } else {
                const approvalUrl = payment.links.find((link) => link.rel === "approval_url");
                resolve(approvalUrl ? approvalUrl.href : null);
            }
        });
    });
};

const executePayment = (paymentId, payerId) => {
    return new Promise((resolve, reject) => {
        const execute_payment_json = { payer_id: payerId };

        paypal.payment.execute(paymentId, execute_payment_json, (error, payment) => {
            if (error) {
                reject(error);
            } else {
                resolve(payment);
            }
        });
    });
};

module.exports = { createPayment, executePayment };
