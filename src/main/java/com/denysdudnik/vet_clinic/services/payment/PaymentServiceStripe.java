package com.denysdudnik.vet_clinic.services.payment;

import com.denysdudnik.vet_clinic.entity.CustomerInvoice;
import com.denysdudnik.vet_clinic.enums.PaymentStatus;
import com.denysdudnik.vet_clinic.services.customer_invoice_service.CustomerInvoiceService;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PaymentServiceStripe implements PaymentService {
    private final CustomerInvoiceService invoiceService;

    @Value("${stripe.api_key}")
    private String apiKey;

    @Value("${domain.front.end}")
    private String frontDomain;

    @Override
    public Map<String, String> createCheckoutSession(Integer invoiceId) throws StripeException, RuntimeException {
        Stripe.apiKey = apiKey;
        CustomerInvoice customerInvoice;

        try {
            customerInvoice = invoiceService.findById(invoiceId);
        } catch (RuntimeException e) {
            throw new RuntimeException(e);
        }

        SessionCreateParams params =
                SessionCreateParams.builder()
                        .setUiMode(SessionCreateParams.UiMode.EMBEDDED)
                        .setMode(SessionCreateParams.Mode.PAYMENT)
                        .setReturnUrl(frontDomain + "/return?session_id={CHECKOUT_SESSION_ID}")
                        .addLineItem(
                                SessionCreateParams.LineItem.builder()
                                        .setPriceData(
                                                SessionCreateParams.LineItem.PriceData.builder()
                                                        .setUnitAmount((long) (customerInvoice.getTotalAmount() * 100))
                                                        .setCurrency("USD")
                                                        .setProductData(SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                .setName("Invoice №" + customerInvoice.getId())
                                                                .build())
                                                        .build())
                                        .setQuantity(1L)
                                        .build())
                        .build();

        Session session = Session.create(params);

        Map<String, String> map = new HashMap<>();
        map.put("clientSecret", session.getRawJsonObject().getAsJsonPrimitive("client_secret").getAsString());

        return map;
    }

    @Override
    public Map<String, String> returnSessionStatus(String sessionId, Integer invoiceId) throws StripeException {
        Session session = Session.retrieve(sessionId);

        Map<String, String> map = new HashMap<>();
        map.put("status", session.getRawJsonObject().getAsJsonPrimitive("status").getAsString());
        map.put("customer_email", session.getRawJsonObject().getAsJsonObject("customer_details").getAsJsonPrimitive("email").getAsString());

        String paymentStatus = map.get("status");

        if (paymentStatus.equals("complete")) {
            CustomerInvoice invoice = invoiceService.findById(invoiceId);
            invoice.setPaymentStatus(PaymentStatus.PAID);
            invoiceService.save(invoice);
        }

        return map;
    }
}
