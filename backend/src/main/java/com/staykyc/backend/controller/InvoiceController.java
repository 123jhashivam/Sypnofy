package com.staykyc.backend.controller;

import com.staykyc.backend.model.Invoice;
import com.staykyc.backend.repository.InvoiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/invoices")
@RequiredArgsConstructor
public class InvoiceController {

    private final InvoiceRepository invoiceRepository;

    @GetMapping
    public ResponseEntity<List<Invoice>> getAllInvoices() {
        return ResponseEntity.ok(invoiceRepository.findAll());
    }
}