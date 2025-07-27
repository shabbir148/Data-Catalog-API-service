

## 🚀 Quick Start

### Prerequisites
- Docker installed on your system
- Docker Hub account (optional, for sharing images)

### Pull and Run from Docker Hub

```bash
# Pull the latest image
docker pull shabbir148/data-catalog-api:latest

# Run the container
docker run -d \
  --name data-catalog-api \
  -p 3000:3000 \
  -e PORT=3000 \
  -e MONGODB_URI="mongodb+srv://shabbirsidhpurwala7000:1234Sha@cluster0.z65usxy.mongodb.net/myDatabase?retryWrites=true&w=majority" \
  -e NODE_ENV=production \
  shabbir148/data-catalog-api:latest
```

### Using Docker Compose (Recommended)

1. Create a `docker-compose.yml` file:

```yaml
version: '3.8'

services:
  data-catalog-api:
    image: shabbir148/data-catalog-api:latest
    container_name: data-catalog-api
    ports:
      - "3000:3000"
    environment:
      - PORT=3000
      - MONGODB_URI=mongodb+srv://shabbirsidhpurwala7000:1234Sha@cluster0.z65usxy.mongodb.net/myDatabase?retryWrites=true&w=majority
      - NODE_ENV=production
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "node", "-e", "require('http').get('http://localhost:3000/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

2. Run with Docker Compose:

```bash
docker-compose up -d
```

3. Check status:

```bash
# View running services
docker-compose ps

# View logs
docker-compose logs -f data-catalog-api

# Stop services
docker-compose down
```

## 🏗️ Building from Source

### 1. Clone the Repository

```bash
git clone https://github.com/shabbir148/Data-Catalog-API-service
cd data-catalog-api
```

### 2. Build the Docker Image

```bash
# Build the image
docker build -t data-catalog-api:latest .

# Or build with your Docker Hub username
docker build -t shabbir148/data-catalog-api:latest .
```

### 3. Run Locally

```bash
# Create .env file with your configuration
cat > .env << EOF
PORT=3000
MONGODB_URI=mongodb+srv://shabbirsidhpurwala7000:1234Sha@cluster0.z65usxy.mongodb.net/myDatabase?retryWrites=true&w=majority
NODE_ENV=production
EOF

# Run the container
docker run -d \
  --name data-catalog-api \
  -p 3000:3000 \
  --env-file .env \
  data-catalog-api:latest
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Server port | `3000` | No |
| `MONGODB_URI` | MongoDB connection string | - | Yes |
| `NODE_ENV` | Environment mode | `development` | No |

### MongoDB Atlas Configuration

The application is pre-configured to work with MongoDB Atlas. The connection string includes:

- **Host**: `cluster0.z65usxy.mongodb.net`
- **Database**: `myDatabase`
- **Options**: `retryWrites=true&w=majority`

For security reasons, consider using environment variables or Docker secrets for production deployments.

## 📡 API Endpoints

Once the container is running, the API will be available at `http://localhost:3000`

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

### Events API
```bash
# Create an event
curl -X POST http://localhost:3000/api/events \
  -H "Content-Type: application/json" \
  -d '{
    "name": "User Login",
    "type": "track",
    "description": "User successfully logged in"
  }'

# Get all events
curl http://localhost:3000/api/events

# Get specific event
curl http://localhost:3000/api/events/{event-id}

# Update event
curl -X PUT http://localhost:3000/api/events/{event-id} \
  -H "Content-Type: application/json" \
  -d '{
    "name": "User Login Updated",
    "type": "track",
    "description": "Updated description"
  }'

# Delete event
curl -X DELETE http://localhost:3000/api/events/{event-id}
```

**Valid Event Types**: `track`, `identify`, `alias`, `screen`, `page`

### Properties API
```bash
# Create a property
curl -X POST http://localhost:3000/api/properties \
  -H "Content-Type: application/json" \
  -d '{
    "name": "user_id",
    "type": "string",
    "description": "Unique identifier for the user"
  }'

# Get all properties
curl http://localhost:3000/api/properties

# Get specific property
curl http://localhost:3000/api/properties/{property-id}

# Update property
curl -X PUT http://localhost:3000/api/properties/{property-id} \
  -H "Content-Type: application/json" \
  -d '{
    "name": "user_id",
    "type": "string",
    "description": "Updated description"
  }'

# Delete property
curl -X DELETE http://localhost:3000/api/properties/{property-id}
```

**Valid Property Types**: `string`, `number`, `boolean`

### Tracking Plans API
```bash
# Create a tracking plan
curl -X POST http://localhost:3000/api/tracking-plans \
  -H "Content-Type: application/json" \
  -d '{
    "name": "User Journey",
    "description": "Track user authentication flow",
    "events": [
      {
        "name": "Login Attempt",
        "description": "User attempted to log in",
        "properties": [
          {
            "name": "email",
            "type": "string",
            "required": true,
            "description": "User email address"
          },
          {
            "name": "timestamp",
            "type": "number",
            "required": false,
            "description": "Login attempt timestamp"
          }
        ],
        "additionalProperties": false
      }
    ]
  }'

# Get all tracking plans
curl http://localhost:3000/api/tracking-plans

# Get specific tracking plan
curl http://localhost:3000/api/tracking-plans/{plan-id}

# Update tracking plan
curl -X PUT http://localhost:3000/api/tracking-plans/{plan-id} \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated User Journey",
    "description": "Updated tracking plan description",
    "events": [...]
  }'

# Delete tracking plan
curl -X DELETE http://localhost:3000/api/tracking-plans/{plan-id}
```

### Error Responses

The API returns consistent error responses:

```json
{
  "error": "Error message describing what went wrong"
}
```

**HTTP Status Codes**:
- `200` - Success
- `201` - Created
- `204` - No Content (successful deletion)
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `409` - Conflict (duplicate entities)
- `500` - Internal Server Error

## 🐳 Docker Commands Reference

### Container Management
```bash
# View running containers
docker ps

# View all containers (including stopped)
docker ps -a

# Stop the container
docker stop data-catalog-api

# Start the container
docker start data-catalog-api

# Restart the container
docker restart data-catalog-api

# Remove the container
docker rm data-catalog-api

# Force remove running container
docker rm -f data-catalog-api
```

### Logs and Monitoring
```bash
# View container logs
docker logs data-catalog-api

# Follow logs in real-time
docker logs -f data-catalog-api

# View last 100 lines of logs
docker logs --tail 100 data-catalog-api

# View container resource usage
docker stats data-catalog-api

# Check container health
docker inspect data-catalog-api --format='{{.State.Health.Status}}'
```

### Image Management
```bash
# List images
docker images

# Pull latest image
docker pull shabbir148/data-catalog-api:latest

# Remove image
docker rmi shabbir148/data-catalog-api:latest

# Remove unused images
docker image prune -a
```

## 🔍 Troubleshooting

### Common Issues

#### Container Won't Start
```bash
# Check container logs
docker logs data-catalog-api

# Run in interactive mode
docker run -it --rm shabbir148/data-catalog-api:latest
```

#### Port Already in Use
```bash
# Use a different port
docker run -d --name data-catalog-api -p 3001:3000 shabbir148/data-catalog-api:latest
```

#### MongoDB Connection Issues
- Verify the MongoDB URI is correct
- Check if MongoDB Atlas allows connections from your IP (0.0.0.0/0)
- Ensure database user has proper permissions

#### Health Check Failures
```bash
# Test health endpoint manually
curl http://localhost:3000/health

# Check container health status
docker inspect data-catalog-api --format='{{.State.Health}}'
```

### Cleanup Commands
```bash
# Remove stopped containers
docker container prune

# Remove unused images
docker image prune -a

# Complete cleanup (removes everything unused)
docker system prune -a --volumes
```

## 🚀 Deployment Tips

### For Production
```bash
# Run with resource limits
docker run -d \
  --name data-catalog-api \
  -p 3000:3000 \
  --memory="512m" \
  --cpus="1.0" \
  --restart=unless-stopped \
  --env-file .env \
  shabbir148/data-catalog-api:latest
```

### For Development
```bash
# Run with volume mounting for logs
docker run -d \
  --name data-catalog-api-dev \
  -p 3000:3000 \
  -v $(pwd)/logs:/app/logs \
  --env-file .env.dev \
  shabbir148/data-catalog-api:latest
```

## 📊 Performance Monitoring

```bash
# Monitor resource usage
docker stats data-catalog-api

# Check disk usage
docker system df

# View detailed container information
docker inspect data-catalog-api
```

## 🆘 Support

If you encounter issues:

1. Check the container logs: `docker logs data-catalog-api`
2. Verify environment variables are set correctly
3. Test the health endpoint: `curl http://localhost:3000/health`
4. Check MongoDB Atlas connectivity
5. Review the troubleshooting section above

## 📝 Notes

- The application uses MongoDB Atlas cloud database
- Health checks are configured to ensure container reliability
- The image is optimized for production use with non-root user execution
- All API endpoints support standard HTTP methods (GET, POST, PUT, DELETE)

---

**Docker Hub Repository**: [shabbir148/data-catalog-api](https://hub.docker.com/r/shabbir148/data-catalog-api)