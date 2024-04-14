package com.denysdudnik.vet_clinic.services.mail_service;

import com.mailjet.client.errors.MailjetException;
import com.mailjet.client.errors.MailjetSocketTimeoutException;

public interface MailService {

    void sendEmail(String email, String firstName, String report) throws MailjetSocketTimeoutException, MailjetException;
}
