# E-commerce Backend

A REST API for an e-commerce platform, built with Node.js, Express and MongoDB. Originally developed as a final project for Coderhouse's Back-End course, later revisited to fix security issues and improve code quality.

## Features

- **Authentication & Authorization** — JWT-based auth with refresh tokens, role-based access control (user/admin), password reset via email, and account blocking.
- **Products** — Full CRUD, wishlist, star ratings with average calculation, and listing with filtering, sorting, field selection and pagination via query params.
- **Cart & Orders** — Per-user cart, coupon codes, order creation and status tracking.
- **Payments** — Stripe integration via Payment Intents.
- **Media** — Image upload with Multer, compression with Sharp, and storage on Cloudinary.
- **Content** — Blog posts with categories, brands, colors, and a customer enquiry form, with email notifications via Nodemailer.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express
- **Database:** MongoDB with Mongoose
- **Auth:** JSON Web Tokens, bcrypt
- **File storage:** Cloudinary, Multer, Sharp
- **Payments:** Stripe
- **Email:** Nodemailer

## Project Structure

```
├── config/          # Database, JWT and Stripe configuration
├── controller/      # Request handlers / business logic
├── middlewares/      # Auth, error handling, file upload
├── models/           # Mongoose schemas
├── routes/           # API route definitions
├── utils/             # Helper functions
└── index.js          # App entry point
```

## Prerequisites

- Node.js (v18 or higher)
- A MongoDB database (a free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster works fine)
- A [Cloudinary](https://cloudinary.com/) account (for image uploads)
- A [Stripe](https://stripe.com/) account (for payments)

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/Gilbertomendozaf/ecommerce-coderhouse-Backend.git
   cd ecommerce-coderhouse-Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy `.env.template` to `.env` and fill in your own values:
   ```
   PORT=8080
   MONGODB_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   MAIL_ID=your_email_address
   MP=your_email_app_password
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```
   `MAIL_ID`, `MP` and `STRIPE_SECRET_KEY` are only required for the password-reset and payment features respectively — the app will run without them.

4. Start the server:
   ```bash
   npm start
   ```
   The API will be available at `http://localhost:8080` (or whatever `PORT` you set).

## Making a User an Admin

There is currently no endpoint to promote a user to admin (this is a known limitation — see below). To create an admin user for testing:

1. Register a normal user through `POST /api/user/register`.
2. In your MongoDB database, find that user's document in the `users` collection and manually change its `role` field from `"user"` to `"admin"`.

## API Overview

All routes are prefixed with `/api`.

| Resource | Base path | Description |
|---|---|---|
| Users & Auth | `/api/user` | Registration, login, profile, cart, orders, wishlist, admin user management |
| Products | `/api/product` | Product CRUD, wishlist, ratings |
| Categories | `/api/category` | Product categories |
| Brands | `/api/brand` | Product brands |
| Colors | `/api/color` | Product colors |
| Coupons | `/api/coupon` | Discount coupons |
| Blog | `/api/blog` | Blog posts |
| Blog Categories | `/api/blogcategory` | Blog post categories |
| Enquiries | `/api/enquiry` | Customer contact form |
| Uploads | `/api/upload` | Image upload and deletion |
| Payments | `/api/payments` | Stripe payment intents |

Most write operations (create/update/delete) require a valid JWT in the `Authorization: Bearer <token>` header, and admin-only routes additionally require the authenticated user to have the `admin` role.

## Known Limitations

This project was built as a learning exercise and has a few limitations worth being aware of:

- No endpoint to promote a user to admin — must be done manually in the database (see above).
- No automated tests.
- No rate limiting on public endpoints (e.g. login, registration).
- Query filtering on `GET /api/product` builds MongoDB queries directly from query parameters, which should be hardened against operator injection before any production use.

## License

ISC