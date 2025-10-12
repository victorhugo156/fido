# Generate PRD and API routes
_Exported on 9/17/2025 at 08:06:00 GMT+10 from Cursor (1.5.11)_


# Product Requirements Document (PRD)
## Fido Pet Care - Pet Care Service Platform

### Executive Summary
Fido Pet Care is a mobile application that connects pet owners with trusted local pet care professionals including dog sitters, dog washers, and dog walkers. The platform facilitates booking, payment processing, communication, and review management between pet owners and pet sitters.

### Product Overview

**Target Users:**
- **Pet Owners**: Individuals who need temporary pet care services
- **Pet Sitters**: Professional and passionate pet care providers

**Core Value Proposition:**
- Easy discovery and booking of trusted local pet care professionals
- Secure payment processing through PayPal integration
- Real-time communication between pet owners and sitters
- Review and rating system for quality assurance

### Key Features

#### 1. User Management
- **User Registration & Authentication**
  - Email/password registration
  - Google Sign-In integration
  - Role-based access (Pet Owner, Pet Sitter, or both)
  - OneSignal push notification setup

#### 2. Pet Management
- **Pet Profiles**
  - Pet information (name, age, breed, size, type)
  - Medical history and special needs
  - Photo upload capability

#### 3. Pet Sitter Discovery
- **Search & Filter**
  - Location-based search
  - Service type filtering (Dog Walking, Pet Boarding, Pet Grooming, Pet Training, Home Visit)
  - Price range filtering
  - Availability filtering
  - Experience level filtering

#### 4. Booking System
- **Service Booking**
  - Calendar-based date selection
  - Time slot selection (morning, afternoon, evening)
  - Service specification
  - Pet quantity selection
  - Price calculation
  - Booking status management (Pending, Confirmed, Completed, Cancelled)

#### 5. Payment Processing
- **PayPal Integration**
  - Secure payment processing
  - Order creation and capture
  - Payout to pet sitters
  - Payment status tracking

#### 6. Communication
- **Real-time Chat**
  - In-app messaging between pet owners and sitters
  - Chat history preservation
  - Message timestamps

#### 7. Review & Rating System
- **Feedback Management**
  - 5-star rating system
  - Written reviews
  - Average rating calculation
  - Review editing capability

#### 8. Pet Sitter Registration
- **Professional Profiles**
  - Service offerings and pricing
  - Experience and skills
  - Availability calendar
  - Location and coverage area
  - Profile photos and descriptions

### Technical Architecture

**Frontend:** React Native with Expo
**Backend:** Firebase (currently) + Node.js API (to be implemented)
**Database:** Firestore
**Authentication:** Firebase Auth + Google Sign-In
**Payments:** PayPal SDK
**Notifications:** OneSignal
**Maps:** Google Maps integration

---

# Node.js API Routes Specification

Based on the app functionality, here are the essential API routes you'll need:

## Authentication Routes
```
POST   /api/auth/register          # User registration
POST   /api/auth/login             # User login
POST   /api/auth/google-signin     # Google authentication
POST   /api/auth/logout            # User logout
GET    /api/auth/verify-token      # Token verification
POST   /api/auth/refresh-token     # Refresh JWT token
```

## User Management Routes
```
GET    /api/users/profile          # Get user profile
PUT    /api/users/profile          # Update user profile
DELETE /api/users/profile          # Delete user account
POST   /api/users/update-role      # Add/update user roles (petOwner/petSitter)
GET    /api/users/:userId          # Get specific user details
```

## Pet Management Routes
```
GET    /api/pets                   # Get user's pets
POST   /api/pets                   # Create new pet profile
GET    /api/pets/:petId            # Get specific pet details
PUT    /api/pets/:petId            # Update pet information
DELETE /api/pets/:petId            # Delete pet profile
POST   /api/pets/:petId/photo      # Upload pet photo
```

## Pet Sitter Routes
```
GET    /api/pet-sitters            # Get all pet sitters (with filters)
GET    /api/pet-sitters/search     # Search pet sitters with filters
GET    /api/pet-sitters/:sitterId  # Get specific pet sitter profile
POST   /api/pet-sitters            # Create pet sitter profile
PUT    /api/pet-sitters/:sitterId  # Update pet sitter profile
DELETE /api/pet-sitters/:sitterId  # Delete pet sitter profile
GET    /api/pet-sitters/:sitterId/availability # Get sitter availability
PUT    /api/pet-sitters/:sitterId/availability # Update availability
```

## Booking Routes
```
GET    /api/bookings               # Get user's bookings (owner/sitter)
POST   /api/bookings               # Create new booking request
GET    /api/bookings/:bookingId    # Get specific booking details
PUT    /api/bookings/:bookingId    # Update booking (accept/decline/modify)
DELETE /api/bookings/:bookingId    # Cancel booking
GET    /api/bookings/:bookingId/status # Get booking status
PUT    /api/bookings/:bookingId/status # Update booking status
```

## Payment Routes
```
POST   /api/payments/create-order  # Create PayPal payment order
POST   /api/payments/capture       # Capture PayPal payment
GET    /api/payments/:paymentId    # Get payment details
POST   /api/payments/payout        # Process payout to pet sitter
GET    /api/payments/history       # Get payment history
POST   /api/payments/refund        # Process refund
```

## Review & Rating Routes
```
GET    /api/reviews/pet-sitter/:sitterId # Get reviews for pet sitter
POST   /api/reviews                     # Create new review
GET    /api/reviews/:reviewId           # Get specific review
PUT    /api/reviews/:reviewId           # Update review
DELETE /api/reviews/:reviewId           # Delete review
GET    /api/reviews/user/:userId        # Get user's reviews
```

## Chat/Messaging Routes
```
GET    /api/chats                  # Get user's chat conversations
POST   /api/chats                  # Create new chat conversation
GET    /api/chats/:chatId          # Get chat messages
POST   /api/chats/:chatId/messages # Send new message
PUT    /api/chats/:chatId/read     # Mark messages as read
DELETE /api/chats/:chatId          # Delete conversation
```

## Search & Filter Routes
```
GET    /api/search/pet-sitters     # Search pet sitters with advanced filters
GET    /api/search/locations       # Get available service locations
GET    /api/search/services        # Get available service types
GET    /api/filters/options        # Get filter options (prices, locations, etc.)
```

## Notification Routes
```
GET    /api/notifications          # Get user notifications
POST   /api/notifications/send     # Send push notification
PUT    /api/notifications/:notificationId/read # Mark notification as read
DELETE /api/notifications/:notificationId # Delete notification
POST   /api/notifications/register-device # Register device for push notifications
```

## Analytics & Admin Routes (Optional)
```
GET    /api/admin/dashboard        # Admin dashboard data
GET    /api/admin/users            # Get all users
GET    /api/admin/bookings         # Get all bookings
GET    /api/admin/payments         # Get payment analytics
POST   /api/admin/suspend-user     # Suspend user account
```

## File Upload Routes
```
POST   /api/upload/profile-photo   # Upload user profile photo
POST   /api/upload/pet-photo       # Upload pet photo
POST   /api/upload/verification    # Upload verification documents
```

## Location Routes
```
GET    /api/locations/nearby       # Get nearby pet sitters
POST   /api/locations/geocode      # Convert address to coordinates
GET    /api/locations/suggestions  # Get location suggestions
```

### Implementation Notes:

1. **Authentication**: Use JWT tokens for API authentication
2. **Database**: Consider migrating from Firestore to a relational database (PostgreSQL/MySQL) for better query performance
3. **File Storage**: Use cloud storage (AWS S3, Google Cloud Storage) for images
4. **Real-time Features**: Implement WebSocket connections for real-time chat
5. **Rate Limiting**: Implement rate limiting to prevent abuse
6. **Validation**: Use middleware for request validation (e.g., Joi, express-validator)
7. **Error Handling**: Implement consistent error handling and logging
8. **Documentation**: Use tools like Swagger for API documentation

This API structure will provide a solid foundation for your Node.js backend while maintaining compatibility with your existing React Native frontend.

```plaintext
POST   /api/auth/register          # User registration
POST   /api/auth/login             # User login
POST   /api/auth/google-signin     # Google authentication
POST   /api/auth/logout            # User logout
GET    /api/auth/verify-token      # Token verification
POST   /api/auth/refresh-token     # Refresh JWT token
```

```plaintext
GET    /api/users/profile          # Get user profile
PUT    /api/users/profile          # Update user profile
DELETE /api/users/profile          # Delete user account
POST   /api/users/update-role      # Add/update user roles (petOwner/petSitter)
GET    /api/users/:userId          # Get specific user details
```

```plaintext
GET    /api/pets                   # Get user's pets
POST   /api/pets                   # Create new pet profile
GET    /api/pets/:petId            # Get specific pet details
PUT    /api/pets/:petId            # Update pet information
DELETE /api/pets/:petId            # Delete pet profile
POST   /api/pets/:petId/photo      # Upload pet photo
```

```plaintext
GET    /api/pet-sitters            # Get all pet sitters (with filters)
GET    /api/pet-sitters/search     # Search pet sitters with filters
GET    /api/pet-sitters/:sitterId  # Get specific pet sitter profile
POST   /api/pet-sitters            # Create pet sitter profile
PUT    /api/pet-sitters/:sitterId  # Update pet sitter profile
DELETE /api/pet-sitters/:sitterId  # Delete pet sitter profile
GET    /api/pet-sitters/:sitterId/availability # Get sitter availability
PUT    /api/pet-sitters/:sitterId/availability # Update availability
```

```plaintext
GET    /api/bookings               # Get user's bookings (owner/sitter)
POST   /api/bookings               # Create new booking request
GET    /api/bookings/:bookingId    # Get specific booking details
PUT    /api/bookings/:bookingId    # Update booking (accept/decline/modify)
DELETE /api/bookings/:bookingId    # Cancel booking
GET    /api/bookings/:bookingId/status # Get booking status
PUT    /api/bookings/:bookingId/status # Update booking status
```

```plaintext
POST   /api/payments/create-order  # Create PayPal payment order
POST   /api/payments/capture       # Capture PayPal payment
GET    /api/payments/:paymentId    # Get payment details
POST   /api/payments/payout        # Process payout to pet sitter
GET    /api/payments/history       # Get payment history
POST   /api/payments/refund        # Process refund
```

```plaintext
GET    /api/reviews/pet-sitter/:sitterId # Get reviews for pet sitter
POST   /api/reviews                     # Create new review
GET    /api/reviews/:reviewId           # Get specific review
PUT    /api/reviews/:reviewId           # Update review
DELETE /api/reviews/:reviewId           # Delete review
GET    /api/reviews/user/:userId        # Get user's reviews
```

```plaintext
GET    /api/chats                  # Get user's chat conversations
POST   /api/chats                  # Create new chat conversation
GET    /api/chats/:chatId          # Get chat messages
POST   /api/chats/:chatId/messages # Send new message
PUT    /api/chats/:chatId/read     # Mark messages as read
DELETE /api/chats/:chatId          # Delete conversation
```

```plaintext
GET    /api/search/pet-sitters     # Search pet sitters with advanced filters
GET    /api/search/locations       # Get available service locations
GET    /api/search/services        # Get available service types
GET    /api/filters/options        # Get filter options (prices, locations, etc.)
```

```plaintext
GET    /api/notifications          # Get user notifications
POST   /api/notifications/send     # Send push notification
PUT    /api/notifications/:notificationId/read # Mark notification as read
DELETE /api/notifications/:notificationId # Delete notification
POST   /api/notifications/register-device # Register device for push notifications
```

```plaintext
GET    /api/admin/dashboard        # Admin dashboard data
GET    /api/admin/users            # Get all users
GET    /api/admin/bookings         # Get all bookings
GET    /api/admin/payments         # Get payment analytics
POST   /api/admin/suspend-user     # Suspend user account
```

```plaintext
POST   /api/upload/profile-photo   # Upload user profile photo
POST   /api/upload/pet-photo       # Upload pet photo
POST   /api/upload/verification    # Upload verification documents
```

```plaintext
GET    /api/locations/nearby       # Get nearby pet sitters
POST   /api/locations/geocode      # Convert address to coordinates
GET    /api/locations/suggestions  # Get location suggestions
```

