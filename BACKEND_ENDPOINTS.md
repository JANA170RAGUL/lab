# AICTE IDEA Lab Portal - Backend API Endpoints

This document specifies the RESTful API endpoints required for the portal. All endpoints (except Auth) require a valid JWT token in the `Authorization` header.

## 🔐 Authentication
| Method | Endpoint | Description | Role |
| :--- | :--- | :--- | :--- |
| POST | `/api/auth/login` | Authenticate user & return JWT | Public |
| GET | `/api/auth/me` | Get current user profile | Any |
| POST | `/api/auth/logout` | Invalidate session | Any |

## 📅 Events
| Method | Endpoint | Description | Role |
| :--- | :--- | :--- | :--- |
| GET | `/api/events` | List all events (with filters) | Any |
| POST | `/api/events` | Create a new event | Admin |
| GET | `/api/events/:id` | Get specific event details | Any |
| PUT | `/api/events/:id` | Update event details | Admin |
| DELETE | `/api/events/:id` | Soft delete event | Admin |

## 👥 Registrations
| Method | Endpoint | Description | Role |
| :--- | :--- | :--- | :--- |
| GET | `/api/registrations` | List registrations (Admin view) | Admin |
| POST | `/api/registrations` | Student register for event | Student |
| PATCH | `/api/registrations/:id` | Approve/Reject registration | Admin |
| GET | `/api/registrations/my` | Get student's own registrations | Student |

## ⏱ Attendance
| Method | Endpoint | Description | Role |
| :--- | :--- | :--- | :--- |
| POST | `/api/attendance/mark` | Mark attendance via QR/Code | Student |
| GET | `/api/attendance/event/:id` | Get attendance list for an event | Admin |
| GET | `/api/attendance/stat` | Get today's attendance summary | Admin |

## 💬 Feedback
| Method | Endpoint | Description | Role |
| :--- | :--- | :--- | :--- |
| POST | `/api/feedback` | Submit event feedback | Student |
| GET | `/api/feedback/event/:id` | Get all feedback for an event | Admin |

## 📜 Certificates
| Method | Endpoint | Description | Role |
| :--- | :--- | :--- | :--- |
| GET | `/api/certificates` | List issued certificates | Student/Admin |
| POST | `/api/certificates/issue` | Bulk issue certificates for an event | Admin |
| GET | `/api/certificates/download/:id` | Generate & download PDF | Student |

## 📂 Evidence & Outcomes
| Method | Endpoint | Description | Role |
| :--- | :--- | :--- | :--- |
| POST | `/api/evidence/upload` | Upload photos/docs for audit | Admin |
| GET | `/api/evidence/:eventId` | View evidence for an event | Admin/Reviewer |
| POST | `/api/outcomes` | Log awards/patents/startups | Admin |

## 📊 Analytics & Reviewer
| Method | Endpoint | Description | Role |
| :--- | :--- | :--- | :--- |
| GET | `/api/analytics/dashboard` | Main KPI data for Admin | Admin |
| GET | `/api/reviewer/snapshot` | Full system audit data | Reviewer/Admin |

---

## 🛠 Standard Response Format
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```
