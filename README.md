# How to build and run
1. Create appropriate `.env` file at the root of project, e.g.:
```
#common settings
APP_PORT=3000
NEXT_PUBLIC_API_URL=http://localhost
NEXT_PUBLIC_API_TIMEOUT_IN_MILLIS=30000
```
2. `docker-compose build && docker-compose up`