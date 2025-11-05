# Fido Pet Care Backend Development TODO List

## HOW I am developing this backend?
I am watching the Rocketseat classes and applying the concepts in my project.
At first I am applying the concepts using the User Register method, when I finish the all class I will move to the others methods, such as Pet Sitter Register, Pet Register, Booking a service and so on.

## WHERE I HAVE STOPPED?

- I have finished with "Caso de use e design pattern", now I need to start with tests.

- I need to study What is Service.
_______________________________________________________________

- [ x] I have applied one of the rules in SOLID principles, which it is the Dependency Inversion. I have done this in case of I need to work with a different repository or Data Base instead of prisma I can easily do it by instantiating a new repository in my use-case. 06/11/25

- [ x] I have separated the requests into a controller. Now I need to do the HASH of the password.


## Initial Setup Phase

### Environment Configuration
- [ x] Setup environment configuration: Create .env file and configure environment variables
- [ ] Install and configure dotenv for environment management

### Code Quality Tools
- [ x] Install ESLint and necessary plugins for TypeScript
- [x ] Configure ESLint rules and create .eslintrc configuration file
- [x] Set up import aliases in tsconfig.json and configure path mapping

### Docker & Database Setup
- [x ] Create Dockerfile and docker-compose.yml for PostgreSQL setup
- [ x] Configure PostgreSQL environment variables and connection settings

### Prisma ORM Setup
- [ x] Install and initialize Prisma with PostgreSQL
- [ x] Design and create Prisma schema for User and Auth entities
- [ x] Design and create Prisma schema for Pet and PetSitter entities
- [x ] Design and create Prisma schema for Booking and Payment entities
- [ x] Set up Prisma Client and create initial migration
- [ ] Design and create Prisma schema for Review and Chat entities
- [ x] Create relationship between tables


### Basic App Structure
- [ x] Create basic Express/Fastify app structure with route organization

## Next Phases (To be detailed as we progress)

### Authentication System
- [ ] JWT implementation
- [ ] Google Sign-in integration
- [ ] User authentication routes

### User Management System
- [ x] User CRUD operations
- [ ] Role management
- [ ] Profile management

### Pet Management System
- [ ] Pet profile CRUD
- [ ] Photo upload system
- [ ] Pet information management

### Pet Sitter Management
- [ ] Sitter profile management
- [ ] Availability system
- [ ] Service offering management

### Booking System
- [ ] Booking creation and management
- [ ] Status handling
- [ ] Scheduling system

### Payment System
- [ ] PayPal integration
- [ ] Payment processing
- [ ] Payout system

### Review & Rating System
- [ ] Review CRUD operations
- [ ] Rating calculation
- [ ] Review moderation

### Chat System
- [ ] Real-time messaging
- [ ] Chat history
- [ ] Message notifications

### Search & Filter System
- [ ] Advanced search implementation
- [ ] Filter optimization
- [ ] Location-based search

### Notification System
- [ ] Push notification setup
- [ ] Notification management
- [ ] Device registration

### Admin Dashboard
- [ ] Analytics implementation
- [ ] User management
- [ ] System monitoring

### Testing & Documentation
- [ ] Unit testing setup
- [ ] Integration testing
- [ ] API documentation with Swagger

## Notes
- Mark tasks as completed using [x] instead of [ ]
- Add new tasks as needed
- Update task status regularly
- Add specific details to tasks when starting them

## Resources
- Node.js Documentation: https://nodejs.org/docs
- TypeScript Documentation: https://www.typescriptlang.org/docs
- Prisma Documentation: https://www.prisma.io/docs
- Docker Documentation: https://docs.docker.com
- PostgreSQL Documentation: https://www.postgresql.org/docs/
