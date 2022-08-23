/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import * as dotenv from 'dotenv';
import { Kafka, EachMessagePayload } from 'kafkajs';
import { Sequelize } from 'sequelize';
import mongoose from 'mongoose';
import * as bodyParser from 'body-parser';

import { ReadingsModel } from './schema';

const app = express();
dotenv.config();
app.use(bodyParser.json());

const sequelize = new Sequelize(process.env.POSTGRES_URL);
mongoose.connect(process.env.MONGODB_HOST);
try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

const kafka = new Kafka({
  clientId: 'data-logger',
  brokers: [process.env.KAFKA_SERVERS],
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'data-logger-group' });
const run = async () => {
  // Producing
  await producer.connect();
  await consumer.connect();
  await consumer.subscribe({ topic: 'data-logger-topic', fromBeginning: true });
  await consumer.run({
    eachMessage: async ({ topic, message }: EachMessagePayload) => {
      if (topic === 'data-logger-topic') {
        const json = JSON.parse(message.value.toString());
        setTimeout(() => {
          //operation..
          console.log(`-#${json._id}`);
        }, 5000);
      }
    },
  });
};

app.get('/api', (req, res) => {
  res.send({ message: 'Welcome to svc-data-manager!' });
});
run().catch(console.error);
const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
