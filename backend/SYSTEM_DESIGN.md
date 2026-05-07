# Family Safety System — Deterministic Distributed Architecture

## Overview

The Family Safety System is a deterministic distributed security platform designed for synchronized protection monitoring across family devices.

The architecture emphasizes:

- deterministic synchronization
- replay protection
- schema-driven validation
- DTO-driven ingestion
- authenticated APIs
- relational persistence
- adversarial regression testing

---

# Core Architecture

## Components

### Backend
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL

Responsibilities:
- synchronization ingestion
- synchronization retrieval
- deterministic validation
- replay prevention
- persistence
- authenticated API access

---

### Mobile Applications

#### Controller App
Used by parents/controllers.

Responsibilities:
- synchronization monitoring
- device visibility
- threat visibility
- protection dashboards

#### Member App
Used by protected family members.

Responsibilities:
- local protection scanning
- verdict generation
- synchronization transmission

---

### Protection Engine

The protection engine operates independently from backend business logic.

Responsibilities:
- phishing detection
- malicious link detection
- SMS threat detection
- local scan execution
- verdict generation

The backend DOES NOT perform detection logic directly.

Instead, the backend consumes deterministic verdict DTOs.

---

# Deterministic Synchronization

Synchronization payloads include:

- family identifiers
- member identifiers
- device state
- timestamps
- synchronization metadata

All payloads are validated using Zod schemas.

---

# Replay Protection

Replay attacks are mitigated through timestamp ordering validation.

Older synchronization states are rejected automatically.

Replay regression corpuses verify stale synchronization rejection behavior.

---

# Validation Architecture

Validation is contract-driven.

Contracts:
- ThreatVerdict
- LocalScanResult
- FamilySync
- DeviceState

All contracts use deterministic schema validation.

Malformed payload corpuses are tested automatically.

---

# Persistence Layer

Prisma relational models:

- FamilySync
- FamilyMember
- DeviceState
- User
- Alert

Nested synchronization persistence is integration tested.

---

# Security Model

Security protections include:

- JWT authentication
- protected APIs
- rate limiting
- Helmet middleware
- isolated modular routing
- deterministic validation

---

# Testing Infrastructure

The project includes:

- malformed payload corpuses
- replay corpuses
- regression validation tests
- Prisma integration tests
- adversarial payload testing

---

# Design Goals

Primary goals:

- deterministic behavior
- synchronization safety
- replay resistance
- schema enforcement
- modular scalability
- distributed-state consistency
- backend isolation from detection logic

---

# Future Improvements

Potential future improvements:

- compatibility negotiation layer
- shared workspace package
- CI/CD pipelines
- production observability
- hosted PostgreSQL
- distributed tracing
- event-driven synchronization
