package com.denysdudnik.vet_clinic.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import org.hibernate.Hibernate;

import java.io.Serial;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CustomerVisitsServiceId implements Serializable {
    @Serial
    private static final long serialVersionUID = -1506074941766059057L;

    @Column(name = "customer_visit_id", nullable = false)
    private Integer customerVisitId;

    @Column(name = "service_id", nullable = false)
    private Integer serviceId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        CustomerVisitsServiceId entity = (CustomerVisitsServiceId) o;
        return Objects.equals(this.customerVisitId, entity.customerVisitId) &&
                Objects.equals(this.serviceId, entity.serviceId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(customerVisitId, serviceId);
    }

}