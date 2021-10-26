//  Author: Jessica Tax;
//  Date: August 30, 2021

//  Description: Defines the User model

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { 
        type: String,
        unique: true,
        required: [true, 'email is required'],
        match: [/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/, 'Please enter a valid email'],
    },
    username: { 
        type: String,
        unique: true,
        required: [true, 'username is required'],
		minLength: 5,
		maxLength: 35,
	},
	firstname: {
		type: String,
		required: [true, 'firstname field is required'],
		minLength: 2,
		maxLength: 40
	},
	lastname: {
		type: String,
		required: [true, 'lastname field is required'],
		minLength: 2,
		maxLength: 40,
	},
	address: {
		properties: {
			company: {
				type: String,
				maxLength: 100,
			},
			street_address: {
				type: String,
				minLength: 5,
				maxLength: 150,
			},
			apt_number: {
				type: String
			},
			city: {
				type: String,
				maxLength: 50,
			},
			state: {
				type: String,
			}
		}
	},
	phone: {
		type: String,
		match: [/^\d{3}-\d{3}-\d{4}$/, 'Please enter a valid phone number'],
	},
    password: {
        type: String,
        required: [true, 'password field is required'],
    },
    createdDate: {
        type: Date,
        default: Date.now,
    },
    review_ids: {
        type: [Number],
    }
});

module.exports = mongoose.model( "User", userSchema );