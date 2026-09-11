package com.sypnofy.signup.repository;

import com.sypnofy.signup.entity.Invoice;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
}