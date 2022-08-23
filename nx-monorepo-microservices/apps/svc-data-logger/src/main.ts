/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import * as express from 'express';
import * as dotenv from 'dotenv';
import { Kafka } from 'kafkajs';
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import * as bodyParser from 'body-parser';

import { ReadingsModel } from './schema';
mongoose.connect(process.env.MONGODB_HOST);

const app = express();
dotenv.config();
app.use(bodyParser.json());
const kafka = new Kafka({
  clientId: 'data-logger',
  brokers: [process.env.KAFKA_SERVERS],
});

const producer = kafka.producer();
const run = async () => {
  // Producing
  await producer.connect();
};

app.get('/api', async (req, res) => {
  res.send({ message: 'Welcome to svc-data-logger!' });
});

app.post('/api', async (req, res) => {
  const { time, value, ...extra } = req.body;
  const data = new ReadingsModel({
    time,
    value,
    extra,
    uuid: uuidv4(),
  });
  data.save(async (error, result) => {
    if (error) {
      res.send({ ...error });
    } else {
      await producer.send({
        topic: 'data-logger-topic',
        messages: [{ value: JSON.stringify(result) }],
      });
      res.send({ result: result, message: 'Welcome to svc-data-logger!' });
    }
  });
});

run().catch(console.error);
const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
