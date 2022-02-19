//  Author: Jessica Tax;
//  Date: February 8, 2022

//  Description: Defines the Product model

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    product_id: {
		type: Number,
		required: [true, 'product_id field is required'],
		unique: true,
	},
	name: {
		type: String,
		required: [true, 'name field is required'],
	},
	description: {
		type: String,
		required: [true, 'description field is required'],
	},
	price: {
		type: Schema.Types.Decimal128,
		required: [true, 'price field is required'],
	},
	reviews: {
		type: Number,
	},
	imagePath: {
		type: String,
		required: [true, 'image field is required']
	},
	thumbnailPath: {
		type: String,
		required: [true, 'image field is required']
	}
});

module.exports = mongoose.model( "Product", productSchema );