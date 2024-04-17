ALTER TABLE customer_invoice
    ADD COLUMN payment_status enum ('PAID','UNPAID') null;