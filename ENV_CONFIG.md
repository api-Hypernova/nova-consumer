# Environment Configuration Template

Copy this file to `.env` and update the values as needed.

```env
# Backend API Configuration
API_BASE_URL=http://146.190.53.130:3100
API_BASE_PATH=/api/v1/
API_TIMEOUT=10000

# For local development, use:
# API_BASE_URL=http://localhost:3100
# API_BASE_URL=http://192.168.1.XXX:3100  # Replace with your local IP

# Firebase Configuration (for push notifications)
# FIREBASE_API_KEY=your_firebase_api_key
# FIREBASE_PROJECT_ID=your_firebase_project_id
# FIREBASE_APP_ID=your_firebase_app_id

# Google Maps API Key (for location features)
# GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# Environment
ENVIRONMENT=development
```

## Current Configuration

The API configuration is currently set in `src/api/config.ts`:
- Backend URL: `http://146.190.53.130:3100`
- Base Path: `/api/v1/`

To use a different backend, update the values in `src/api/config.ts`.

