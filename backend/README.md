# sattu dev

# NeedMeet Backend



This is the backend service for the NeedMeet application. It is built using Node.js, Express, and MongoDB. This service handles user and provider authentication, user management, and other related backend functionalities.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the backend d
irectory with the following environment variables:

```
JWT_SECRET=your_jwt_secret
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=development
PORT=5000
```

3. Start the server:

```bash
npm start
```

## Environment Variables

- `JWT_SECRET`: Secret key used for signing JWT tokens.
- `MONGODB_URI`: MongoDB connection string.
- `NODE_ENV`: Set to `production` or `development`.
- `PORT`: Port number the server listens on.

## API Routes - Authentication (`/api/auth`)

### POST `/signup`

Register a new user or provider.

**Request Body:**

```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "role": "user" | "provider",
  "services": ["string"],          // optional, for providers and users
  "location": "string",            // optional
  "phone": "string",               // optional
  "priceRange": "₹min-₹max/hour", // optional, for providers
  "experience": "string",          // optional, for providers (e.g., "1-3 years")
  "address": "string"              // optional, for providers
}
```

**Response:**

- `201 Created` with user or provider object (password excluded).
- Sets a JWT token in an httpOnly cookie.

### POST `/login`

Login a user or provider.

**Request Body:**

```json
{
  "email": "string",
  "password": "string"
}
```

**Response:**

- `200 OK` with user or provider object (password excluded).
- Sets a JWT token in an httpOnly cookie.

### POST `/logout`

Logout the current user by clearing the authentication cookie.

**Response:**

- `200 OK` with message confirming logout.

### GET `/all/users`

Get a list of all registered users (excluding passwords).

**Response:**

- `200 OK` with array of user objects.

### GET `/all/provider`

Get a list of all registered providers (excluding passwords).

**Response:**

- `200 OK` with array of provider objects.

### GET `/me`

Get the currently authenticated user's details.

**Headers:**

- Requires a valid JWT token in the `token` cookie.

**Response:**

- `200 OK` with user or provider object (password excluded).
- `401 Unauthorized` if no or invalid token.
- `404 Not Found` if user not found.

## Middleware

- `auth`: Middleware to protect routes by verifying JWT token.
- `asyncHandler`: Middleware to handle async errors.

## Models

- `User`: User model schema.
- `Provider`: Provider model schema.

## Notes

- Passwords are hashed using bcrypt before storage.
- JWT tokens are stored in httpOnly cookies for security.
- The backend expects requests to be made to `/api/auth` for these routes.

## API Routes - Bookings (`/api/bookings`)

### POST `/`

Create a new booking.

**Request Body:**

```json
{
  "userId": "string",
  "providerId": "string",
  "serviceType": "string",
  "date": "ISO8601 date string",
  "location": "string (optional)",
  "shareLocation": "boolean (optional)"
}
```

**Response:**

- `201 Created` with booking object.
- Validates user and provider IDs, booking date not in the past.
- Requires authentication.

### GET `/user/:userId`

Get bookings for a specific user with pagination.

**Query Parameters:**

- `page`: Page number (default 1)
- `limit`: Number of items per page (default 10)

**Response:**

- `200 OK` with bookings array, total count, current page, and total pages.
- Requires authentication.

### GET `/provider/:providerId`

Get bookings for a specific provider with pagination.

**Query Parameters:**

- `page`: Page number (default 1)
- `limit`: Number of items per page (default 10)

**Response:**

- `200 OK` with bookings array, total count, current page, and total pages.
- Requires authentication.

### PATCH `/booking/status/:id`

Update booking status (e.g., "Pending", "Confirmed", "Completed", "Cancelled").

**Request Body:**

```json
{
  "status": "string"
}
```

**Response:**

- `200 OK` with updated booking object.
- Validates status and booking ID.
- Authorization required: user or provider owner.
- Requires authentication.

### DELETE `/booking/delete/:id`

Delete (cancel) a booking.

**Response:**

- `200 OK` with confirmation message and deleted booking.
- Authorization required: user or provider owner.
- Requires authentication.

### POST `/ratings`

Submit or update a rating for a provider.

**Request Body:**

```json
{
  "providerId": "string",
  "userId": "string",
  "rating": "number (1-5)"
}
```

**Response:**

- `200 OK` with message, updated average rating, and total reviews.
- Validates rating range and existence of provider.
- Requires authentication.

### GET `/`

Get all bookings with optional status filter and pagination.

**Query Parameters:**

- `status`: Filter by booking status (optional)
- `page`: Page number (default 1)
- `limit`: Number of items per page (default 10)

**Response:**

- `200 OK` with bookings array, total count, current page, and total pages.
- Requires authentication.

### GET `/booking/:id`

Get a single booking by ID.

**Response:**

- `200 OK` with booking object.
- Validates booking ID.
- Requires authentication.

