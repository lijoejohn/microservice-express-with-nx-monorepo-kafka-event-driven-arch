# microservice-express-with-nx-monorepo-kafka-event-driven-arch

An example of a micro service (expressjs) with a mono repo using nx-dev with kafka event-driven communication

# NxMonorepoMicroservices

This project was generated using [Nx](https://nx.dev).

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="450"></p>

🔎 **Smart, Fast and Extensible Build System**

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc. as well as the devtools to test, and build projects as well.

## Application overview

I have created this application with microservices.

1. svc-data-logger - (express app using mongo DB as source and acting as a kafka producer)
2. svc-data-manager - (express app using postgres ad data source and acting as a kafka consumer)
3. svc-instrument

When we hit the logger service endpoint with a sample data request

curl to http://localhost:3001/api with json body as post data {"time":343543545,"value":454,"extra":"eded"}

This service will send an event to kafka, and since svc-data-manager is a consumer of that topic, it will get the event and do the actions.

To begin using this application in your local

## Prerequisites

Nodejs v16.16.0 +
Yarn globally
docker-compose

Run `yarn global add nx` to install thr nx globally.

Change the password for your PostgreSQL database in the DB names in the following files.

1. docker-compose.yml
2. nx-monorepo-microservices/apps/svc-data-logger/.env
3. nx-monorepo-microservices/apps/svc-data-manager/.env
4. nx-monorepo-microservices/apps/svc-instrument/.env

Run `docker-compose up --force-recreate` This command will install Kafka, MongoDB, Postgres, and Zookeeper (Kafka cluster orchestration).

Run `cd .\nx-monorepo-microservices\`

Run `yarn install`

Run `yarn start`

Now all 3 services will be available at different ports.

1. svc-data-logger - 3001
2. svc-data-manager - 3002
3. svc-instrument - 3002

To create a production-ready artifact, run the following, build file will be inside the dist folder.

Run `yarn build`

If you want to create a new micro service, run the following

Run `nx generate @nrwl/express:application [service-name]`

Please contact lijoejohn@gmail.com or https://www.linkedin.com/in/lijo-e-john-5090a319/ if you have any questions.
