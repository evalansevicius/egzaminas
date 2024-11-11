import mongoose from 'mongoose';

const ShippingAddressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  zip: { type: String, required: true },
  country: { type: String, required: true },
});

export default ShippingAddressSchema;
