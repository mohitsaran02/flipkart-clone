import mongoose from 'mongoose';
import sequence from 'mongoose-sequence'; // or 'mongoose-sequence' if you're using CommonJS
const AutoIncrement = sequence(mongoose);

const productSchema = new mongoose.Schema({
    id: String,
    url: String,
    detailUrl: String,
    title: Object,
    price: Object,
    quantity: Number,
    description: String,
    discount: String,
    tagline: String
});

//autoIncrement.initialize(mongoose.connection);

//productSchema.plugin(autoIncrement.plugin, 'product');


productSchema.plugin(AutoIncrement, { inc_field: 'product' });

//const Product = mongoose.model('Product', productSchema);
const products = mongoose.model('product', productSchema);

export default products;

//----------------------------------------------
/*
import autoIncrement from 'mongoose-auto-increment';
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  // auto-incrementing productId used to be handled by mongoose-auto-increment
});

productSchema.plugin(autoIncrement.plugin, {
  model: 'Product',
  field: 'productId',
  startAt: 1,
});

const Product = mongoose.model('Product', productSchema);

//-----------------------------------------


import sequence from 'mongoose-sequence-esm'; // or 'mongoose-sequence' if you're using CommonJS
const AutoIncrement = sequence(mongoose);

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  productId: Number // <== field to auto-increment
});

// Add the plugin
productSchema.plugin(AutoIncrement, { inc_field: 'productId' });

const Product = mongoose.model('Product', productSchema);
export default Product;
*/
