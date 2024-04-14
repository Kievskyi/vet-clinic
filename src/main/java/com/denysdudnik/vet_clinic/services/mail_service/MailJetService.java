package com.denysdudnik.vet_clinic.services.mail_service;

import com.mailjet.client.ClientOptions;
import com.mailjet.client.MailjetClient;
import com.mailjet.client.MailjetRequest;
import com.mailjet.client.MailjetResponse;
import com.mailjet.client.errors.MailjetException;
import com.mailjet.client.errors.MailjetSocketTimeoutException;
import com.mailjet.client.resource.Emailv31;
import lombok.RequiredArgsConstructor;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MailJetService implements MailService {

    public void sendEmail(String email, String firstName, String report) throws MailjetSocketTimeoutException, MailjetException {
        MailjetClient client;
        MailjetRequest request;
        MailjetResponse response;
        client = new MailjetClient("49d811123c4b8d5ccf97c7aea452533e", "50e22d62b19afc7a3890d8ddd5583e83", new ClientOptions("v3.1"));
        request = new MailjetRequest(Emailv31.resource)
                .property(Emailv31.MESSAGES, new JSONArray()
                        .put(new JSONObject()
                                .put(Emailv31.Message.FROM, new JSONObject()
                                        .put("Email", "denisfors@gmail.com")
                                        .put("Name", "VETCLINIC"))
                                .put(Emailv31.Message.TO, new JSONArray()
                                        .put(new JSONObject()
                                                .put("Email", email)
                                                .put("Name", firstName)))
                                .put(Emailv31.Message.SUBJECT, "Dear " + firstName)
                                .put(Emailv31.Message.TEXTPART, "Rate please your appointment:")
                                .put(Emailv31.Message.HTMLPART, "<h3>" + report + "</h3>")
                                .put(Emailv31.Message.CUSTOMID, "AppGettingStartedTest")));
        response = client.post(request);
        System.out.println(response.getStatus());
        System.out.println(response.getData());
    }
}
