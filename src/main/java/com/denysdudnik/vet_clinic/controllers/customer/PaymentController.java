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
@RequestMapping("/customers")
@RequiredArgsConstructor
public class PaymentController {
    private final PaymentService paymentService;
    private final CustomerInvoiceService invoiceService;

    @GetMapping("/{userId}/invoices")
    public ResponseEntity<?> getAllInvoices(@PathVariable Integer userId) {
        List<CustomerInvoiceDto> invoices = invoiceService.findAllByCustomerId(userId);

        return ResponseEntity.ok().body(invoices);
    }

    @PostMapping("/invoices/{invoiceId}/checkout-session")
    public ResponseEntity<?> createCheckoutSession(@PathVariable Integer invoiceId) {
        try {
            return ResponseEntity.ok().body(paymentService.createCheckoutSession(invoiceId));
        } catch (StripeException | RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/checkout-sessions/{sessionId}/status")
    public ResponseEntity<?> getSessionStatus(@PathVariable String sessionId,
                                              @RequestParam Integer invoiceId) {
        try {
            return ResponseEntity.ok().body(paymentService.returnSessionStatus(sessionId, invoiceId));
        } catch (StripeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}