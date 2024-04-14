package com.denysdudnik.vet_clinic.services.payment;

import com.stripe.exception.StripeException;

import java.util.Map;

public interface PaymentService {

    Map<String, String> createCheckoutSession(Integer invoiceId) throws StripeException;

    Map<String, String> returnSessionStatus(String sessionId, Integer invoiceId) throws StripeException;
}
