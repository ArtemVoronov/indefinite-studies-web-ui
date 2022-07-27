# How to build and run
1. Set environment vars in the config `.env` e.g.:
```
#common settings
APP_PORT=3000
API_URL=http://localhost:3000
```
2. Check `docker-compose.yml` is appropriate to config that you are going to use (e.g.`docker-compose config`)
3. Build images: `docker-compose  build`
4. Run it: `docker-compose up`
5. Stop it: `docker-compose down`

P.S. It uses the services from https://github.com/ArtemVoronov/indefinite-studies-environment