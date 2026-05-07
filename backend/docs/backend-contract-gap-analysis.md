# Backend Contract Gap Analysis

## Current Backend State

The backend currently exposes:
- auth APIs
- family APIs
- payment APIs
- protection APIs

Current protection integration is temporary and does not yet consume protection-engine contracts directly.

---

## Current Integration Style

Current backend protection integration:
- local deterministic keyword matching
- temporary scan service
- API relay architecture

Current implementation exists for integration testing only.

---

## Required Future Protection Contracts

Backend must eventually consume:

- ThreatVerdict
- SanitizedAlert
- ThreatSeverity
- FamilySyncPayload
- LocalScanResult
- DeviceStatePayload

from protection-engine shared contracts.

---

## Current Contract Gaps

### Missing Shared DTO Contracts

Current backend does not yet share:
- common DTO definitions
- common deterministic payload schemas
- shared compatibility validators

---

### Missing Compatibility Layer

Current backend lacks:
- compatibility/
- shared schema adapters
- deterministic replay validation

---

### Missing Schema Validation Coverage

Current validation only partially covers:
- auth payloads
- request validation

Missing:
- sync payload validation
- adversarial payload validation
- malformed payload rejection
- compatibility version validation

---

## Current Synchronization Gaps

Missing:
- deterministic family synchronization
- device state synchronization
- alert replay validation
- sanitized forensic metadata validation

---

## Current Mobile Integration Gaps

Current mobile integration:
- API client integration complete
- protection scan integration complete

Still missing:
- authenticated synchronization
- family state synchronization
- deterministic alert synchronization

---

## Current Database Gaps

Backend currently stores:
- auth data
- family data
- payment data

Missing:
- deterministic alert schemas
- device synchronization schemas
- sanitized verdict metadata schemas

---

## Current Security Gaps

Backend correctly avoids:
- raw microphone ingestion
- screenshot ingestion
- accessibility dump ingestion
- invasive data collection

This aligns with deterministic privacy-safe architecture requirements.

---

## Recommended Next Evolution Path

1. Create shared contracts layer
2. Create deterministic schemas
3. Create compatibility validators
4. Replace temporary scan service
5. Integrate protection-engine DTOs
6. Add deterministic replay tests
7. Add synchronization APIs
