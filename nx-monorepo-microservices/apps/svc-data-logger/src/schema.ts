import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const Readings = new Schema({
  time: String,
  value: String,
  uuid: String,
  extra: Schema.Types.Mixed,
});
const ReadingsModel = mongoose.model('Readings', Readings);

export { ReadingsModel };
