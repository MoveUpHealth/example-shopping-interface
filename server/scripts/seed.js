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
            "thumbnailPath": "thumb_purse.jpg"
        },
        {
            "product_id": "002",
            "name": "Yellow Chair",
            "description": "Add this fun and vibrant chair to any living room or seating area to add a magnificent pop of color.",
            "price": "129.99",
            "reviews": 12,
            "imagePath": "chair.jpg",
            "thumbnailPath": "thumb_chair.jpg"
        },
        {
            "product_id": "003",
            "name": "Earbuds",
            "description": "Enjoy your favorite beats in high-fidelity without being tied down by wires.",
            "price": "99.99",
            "reviews": 10,
            "imagePath": "earbuds.jpg",
            "thumbnailPath": "thumb_earbuds.jpg"
        },
        {
            "product_id": "004",
            "name": "Blue Plates",
            "description": "Add a touch of elegance to your tableware with these vibrant plates.",
            "price": "79.99",
            "reviews": 2,
            "imagePath": "plates.jpg",
            "thumbnailPath": "thumb_plates.jpg"
        },
        {
            "product_id": "005",
            "name": "Sunglasses",
            "description": "Take your look to the next level with these stylish sunglasses.",
            "price": "49.99",
            "reviews": 3,
            "imagePath": "sunglasses.jpg",
            "thumbnailPath": "thumb_sunglasses.jpg"
        },
        {
            "product_id": "006",
            "name": "Tablet",
            "description": "This tablet combines the power of a desktop computer with the portability of a phone; now you really can have the best of both worlds!",
            "price": "259.99",
            "reviews": 7,
            "imagePath": "tablet.jpg",
            "thumbnailPath": "thumb_tablet.jpg"
        },
        {
            "product_id": "007",
            "name": "Grey Purse",
            "description": "The color may be neutral, but the statement is anything but. This purse is a must have!",
            "price": "159.99",
            "reviews": 3,
            "imagePath": "greypurse.jpg",
            "thumbnailPath": "thumb_greypurse.jpg"
        },
        {
            "product_id": "008",
            "name": "White Pot",
            "description": "Add a touch of sophistication to any room with this modern pot.",
            "price": "59.99",
            "reviews": 4,
            "imagePath": "pot.jpg",
            "thumbnailPath": "thumb_pot.jpg"
        },

    ]
},
{
    "model": "User",
    "documents": [
        {
            "firstname": "Anthony",
            "lastname": "Smith",
            "email": "asmith@email.com",
            "username": "asmith",
            "password":"$2b$10$xEEf1f6vwnbZUZ6F5J0oQuyXxYEnfFfj1oIsBscOhmmuZM879.WUe"
            },            
            {
            "firstname": "Alice",
            "lastname": "Smith",
            "email": "alice@email.com",
            "username": "alice",
            "password":"$2b$10$63hPRn3rg0CqfnuWcsQUn.PkvsZd2touC/Z3ln5x/E9PEtjkqBB5m"
            },            
            {
            "firstname": "Carla",
            "lastname": "Brown",
            "email": "cbrown@email.com",
            "username": "cbrown",
            "password":"$2b$10$xEEf1f6vwnbZUZ6F5J0oQuyXxYEnfFfj1oIsBscOhmmuZM879.WUe"
            }
    ]
}]
