import apiClient from "@/lib/api";

export const createPaymentIntent = async ({ amount, currency, payment_method_types }) => {
    return apiClient.post('/payment_intent/createpaymentintent', { 
      amount, 
      currency, 
      payment_method_types 
    });

};

