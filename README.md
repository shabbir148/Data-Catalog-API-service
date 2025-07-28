# Data-Catalog-API-service


## 🔧 Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB Atlas** account (or local MongoDB instance)
- **Docker** (optional, for containerized deployment)

## 🚀 Installation

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/shabbir148/Data-Catalog-API-service
   cd data-catalog-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the project**
   ```bash
   npm run build
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

### Using Docker

1. **Build and run with Docker**
   ```bash
   # Build the image
   docker build -t data-catalog-api .
   
   # Run the container
   docker run -d --name data-catalog-api -p 3000:3000 --env-file .env data-catalog-api
   ```

2. **Or use Docker Compose**
   ```bash
   docker-compose up -d
   ```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority
```

### MongoDB Atlas Setup

1. Create a MongoDB Atlas account at [https://mongodb.com/atlas](https://mongodb.com/atlas)
2. Create a new cluster
3. Add your IP address to the network access list
4. Create a database user with read/write permissions
5. Get your connection string and add it to the `.env` file

## 🎯 Usage

### Starting the Server

```bash
# Development mode
npm run dev

# Production mode
npm run build
npm start
```

The server will start on `http://localhost:3000`

### Health Check

```bash
curl http://localhost:3000/health
```

Expected response:
```json
{
  "status": "OK",
  "timestamp": "2024-01-20T10:30:00.000Z"
}
```

## 📖 API Documentation

Base URL: `http://localhost:3000/api`

### Events API

#### Create Event
```bash
POST /api/events
Content-Type: application/json

{
  "name": "Product Clicked",
  "type": "track",
  "description": "User clicked on the product summary"
}
```

**Valid event types**: `track`, `identify`, `alias`, `screen`, `page`

#### Get All Events
```bash
GET /api/events
```

#### Get Event by ID
```bash
GET /api/events/{id}
```

#### Update Event
```bash
PUT /api/events/{id}
Content-Type: application/json

{
  "name": "Product Viewed",
  "type": "track",
  "description": "Updated description"
}
```

#### Delete Event
```bash
DELETE /api/events/{id}
```

### Properties API

#### Create Property
```bash
POST /api/properties
Content-Type: application/json

{
  "name": "price",
  "type": "number",
  "description": "Product price in USD"
}
```

**Valid property types**: `string`, `number`, `boolean`

#### Get All Properties
```bash
GET /api/properties
```

#### Get Property by ID
```bash
GET /api/properties/{id}
```

#### Update Property
```bash
PUT /api/properties/{id}
```

#### Delete Property
```bash
DELETE /api/properties/{id}
```

### Tracking Plans API

#### Create Tracking Plan
```bash
POST /api/tracking-plans
Content-Type: application/json

{
  "name": "Purchase Flow",
  "description": "Events related to the purchase funnel",
  "events": [
    {
      "name": "Product Viewed",
      "description": "User viewed a product detail page",
      "properties": [
        {
          "name": "product_id",
          "type": "string",
          "required": true,
          "description": "Unique identifier for the product"
        },
        {
          "name": "price",
          "type": "number",
          "required": true,
          "description": "Product price"
        }
      ],
      "additionalProperties": true
    }
  ]
}
```

#### Get All Tracking Plans
```bash
GET /api/tracking-plans
```

#### Get Tracking Plan by ID
```bash
GET /api/tracking-plans/{id}
```

#### Update Tracking Plan
```bash
PUT /api/tracking-plans/{id}
```

#### Delete Tracking Plan
```bash
DELETE /api/tracking-plans/{id}
```

### Error Responses

The API returns consistent error responses:

```json
{
  "error": "Error message describing what went wrong"
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `204` - No Content (for successful deletions)
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `409` - Conflict (duplicate entities)
- `500` - Internal Server Error

## 🐳 Docker Deployment

### Quick Start with Docker

1. **Pull from Docker Hub**
   ```bash
   docker pull shabbir148/data-catalog-api:latest
   ```

2. **Run the container**
   ```bash
   docker run -d \
     --name data-catalog-api \
     -p 3000:3000 \
     -e MONGODB_URI="your-connection-string" \
     shabbir148/data-catalog-api:latest
   ```

### Docker Compose

Create a `docker-compose.yml` file:

```yaml
version: '3.8'

services:
  data-catalog-api:
    image: shabbir148/data-catalog-api:latest
    ports:
      - "3000:3000"
    environment:
      - PORT=3000
      - MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
      - NODE_ENV=production
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "node"]
      interval: 30s
      timeout: 10s
      retries: 3
```

Run with:
```bash
docker-compose up -d
```

### Building from Source

```bash
# Build the Docker image
docker build -t data-catalog-api:latest .

# Run locally
docker run -d --name data-catalog-api -p 3000:3000 --env-file .env data-catalog-api:latest
```

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```


### Example Test Workflow

1. **Create an Event**
   ```bash
   curl -X POST http://localhost:3000/api/events \
     -H "Content-Type: application/json" \
     -d '{"name": "Test Event", "type": "track", "description": "Test description"}'
   ```

2. **Create a Property**
   ```bash
   curl -X POST http://localhost:3000/api/properties \
     -H "Content-Type: application/json" \
     -d '{"name": "test_prop", "type": "string", "description": "Test property"}'
   ```

3. **Create a Tracking Plan**
   ```bash
   curl -X POST http://localhost:3000/api/tracking-plans \
     -H "Content-Type: application/json" \
     -d '{
       "name": "Test Plan",
       "description": "Test tracking plan",
       "events": [{
         "name": "Test Event",
         "description": "Test event description",
         "properties": [{
           "name": "test_prop",
           "type": "string",
           "required": true,
           "description": "Test property"
         }],
         "additionalProperties": false
       }]
     }'
   ```

## 📁 Project Structure

```
data-catalog-api/
├── src/
│   ├── controllers/           # Request handlers
│   │   ├── eventController.ts
│   │   ├── propertyController.ts
│   │   └── trackingPlanController.ts
│   ├── models/               # Mongoose schemas
│   │   ├── Event.ts
│   │   ├── Property.ts
│   │   └── TrackingPlan.ts
│   ├── routes/               # API routes
│   │   ├── events.ts
│   │   ├── properties.ts
│   │   └── trackingPlans.ts
│   ├── middleware/           # Custom middleware
│   │   └── validation.ts
│   ├── config/              # Configuration files
│   │   └── database.ts
│   └── server.ts            # Application entry point
├── dist/                    # Compiled JavaScript (generated)
├── tests/                   # Test files
├── .env.example            # Environment variables template
├── .gitignore              # Git ignore rules
├── .dockerignore           # Docker ignore rules
├── Dockerfile              # Docker configuration
├── docker-compose.yml      # Docker Compose configuration
├── healthcheck.js          # Docker health check script
├── package.json            # NPM configuration
├── tsconfig.json           # TypeScript configuration
└── README.md               # This file
```

## 🎯 Design Decisions

### Database Design

1. **Unique Constraints**: Events and Properties use compound unique indexes on `name + type` to prevent duplicates while allowing reuse across TrackingPlans.

2. **Embedded vs Referenced**: TrackingPlans embed event and property definitions rather than referencing them to maintain the plan's integrity and allow for plan-specific configurations.

3. **Automatic Timestamps**: All entities include `create_time` and `update_time` for audit trails.

### API Design

1. **RESTful Endpoints**: Following REST conventions for predictable API behavior.

2. **Validation Layer**: Using express-validator for comprehensive input validation before processing.

3. **Error Handling**: Consistent error responses with appropriate HTTP status codes.

4. **Automatic Entity Creation**: When creating TrackingPlans, referenced Events and Properties are automatically created if they don't exist, reducing API calls and simplifying client implementation.

### Technology Choices

1. **TypeScript**: Chosen for type safety, better IDE support, and reduced runtime errors.

2. **Express.js**: Lightweight and flexible web framework with extensive middleware ecosystem.

3. **Mongoose**: MongoDB ODM providing schema validation, middleware, and query building.

4. **Docker**: Containerization for consistent deployment across environments.
 multi-tenant architecture

## 🔧 Development

### Adding New Features

1. **Models**: Add new Mongoose schemas in `src/models/`
2. **Controllers**: Implement business logic in `src/controllers/`
3. **Routes**: Define API endpoints in `src/routes/`
4. **Validation**: Add validation rules using express-validator
5. **Tests**: Write tests for new functionality

### Code Style

- Use TypeScript for all new code
- Follow existing naming conventions
- Add JSDoc comments for public methods
- Use async/await for asynchronous operations
- Handle errors appropriately with proper HTTP status codes

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "feat: add new feature"

# Push to origin
git push origin feature/new-feature

# Create pull request
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Contribution Guidelines

- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR
- Use conventional commit messages

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**
   - Check if MongoDB URI is correct
   - Verify network access in MongoDB Atlas
   - Ensure database user has proper permissions

2. **Port Already in Use**
   ```bash
   # Find process using port 3000
   lsof -i :3000
   
   # Kill the process or use different port
   PORT=3001 npm start
   ```

3. **TypeScript Build Errors**
   ```bash
   # Clean and rebuild
   npm run build
   
   # Check for type errors
   npx tsc --noEmit
   ```

4. **Docker Build Issues**
   ```bash
   # Clean Docker cache
   docker system prune -a
   
   # Rebuild without cache
   docker build --no-cache -t data-catalog-api .
   ```

### Getting Help

- Check the [Issues](https://github.com/your-repo/issues) page
- Review API documentation above
- Check Docker logs: `docker logs data-catalog-api`
- Verify environment variables are set correctly



## 🙏 Acknowledgments

- Express.js team for the excellent web framework
- MongoDB team for the robust database solution
- TypeScript team for type-safe JavaScript development
- Docker team for containerization technology

---

**Built with ❤️ using TypeScript, Express.js, and MongoDB**

For questions or support, please open an issue in the repository.