package com.denysdudnik.vet_clinic.controllers.customer;

import com.denysdudnik.vet_clinic.dto.CustomerInvoiceDto;
import com.denysdudnik.vet_clinic.services.customer_invoice_service.CustomerInvoiceService;
import com.denysdudnik.vet_clinic.services.payment.PaymentService;
import com.stripe.exception.StripeException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/account")
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentService paymentService;
    private final CustomerInvoiceService invoiceService;

    @GetMapping("/all-invoices")
    public ResponseEntity<?> allInvoices(@RequestParam Integer userId) {
        List<CustomerInvoiceDto> invoices = invoiceService.findAllByCustomerId(userId);

        return ResponseEntity.ok().body(invoices);
    }

    @PostMapping("create-checkout-session")
    public ResponseEntity<?> createCheckoutSession(@RequestParam Integer invoiceId) {
        try {
            return ResponseEntity.ok().body(paymentService.createCheckoutSession(invoiceId));
        } catch (StripeException | RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("session-status")
    public ResponseEntity<?> sessionStatus(@RequestParam String sessionId,
                                           @RequestParam Integer invoiceId) {
        try {
            return ResponseEntity.ok().body(paymentService.returnSessionStatus(sessionId, invoiceId));
        } catch (StripeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
