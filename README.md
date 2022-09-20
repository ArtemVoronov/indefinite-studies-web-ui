# How to build and run
1. Create appropriate `.env` file at the root of project. There are two examples for different deployment cases:

 - for docker-compose [.env.dev.dockercompose](https://github.com/ArtemVoronov/indefinite-studies-web-ui/blob/main/.env.dev.dockercompose)
 - for k8s [.env.dev.kube](https://github.com/ArtemVoronov/indefinite-studies-web-ui/blob/main/.env.dev.kube)

2. Then build and run via docker-compose or docker + k8s
 - `docker-compose build && docker-compose up` + `docker-compose up` at [configuration-service ](https://github.com/ArtemVoronov/indefinite-studies-configuration-service)
 - `docker build -t indefinite-studies-web-ui:x.yz .` + k8s configs at [configuration-service ](https://github.com/ArtemVoronov/indefinite-studies-configuration-service)