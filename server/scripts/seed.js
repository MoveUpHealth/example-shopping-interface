//  Author: Jessica Tax;
//  Date: February 9, 2022

//  Description: Populates the database with initial data

const seeder = require('mongoose-seed')
require('dotenv').config();

const db = process.env.ATLAS_URI

seeder.connect(db, () =>{
    seeder.loadModels(["./models/user", "./models/product"])
    seeder.clearModels(['User', 'Product'], () => {
        seeder.populateModels(data, (err, success) => {
        if (err) {
            return console.log("seed err", err)
        }
        console.log("Database seeded successfully", success)
        seeder.disconnect()
        })
    })
});

const data = [{
    "model": "Product",
    "documents": [
        {
            "product_id": "001",
            "name": "Red Purse",
            "description": "This beautiful red purse is the hottest new trend!",
            "price": "59.99",
            "reviews": 14,
            "imagePath": "purse.jpg",
            "thumbnailPath": "thumbnail_purse.jpg"
        }
    ]
}]