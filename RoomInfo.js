require('dotenv').config();
const { MongoClient } = require("mongodb");

const uri = process.env.DB_URI;
const client = new MongoClient(uri);

async function insertRoomInfo() {
    try {
        await client.connect();
        console.log("Connected to database");

        const database = client.db("RoomInfo"); 
        const collection = database.collection("RoomInfo"); 

        const roomTypeInfo = {
            1: { imageUrl: "https://media.istockphoto.com/id/1390233984/photo/modern-luxury-bedroom.jpg?s=612x612&w=0&k=20&c=po91poqYoQTbHUpO1LD1HcxCFZVpRG-loAMWZT7YRe4=", description: "1 adult, no children. Perfect for solo travelers." },
            2: { imageUrl: "https://static01.nyt.com/images/2019/03/24/travel/24trending-shophotels1/24trending-shophotels1-superJumbo.jpg", description: "1 adult, 1 child. Ideal for small families." },
            3: { imageUrl: "https://www.oppeinhome.com/upload/image/product/thumb/20211009/white-grey-beige-modern-hotel-wood-grain1.jpg", description: "2 adults, 1 child. Great for families." },
            4: { imageUrl: "https://www.italianbark.com/wp-content/uploads/2018/01/hotel-room-design-trends-italianbark-interior-design-blog.jpg", description: "2 adults, 2 children. Spacious and comfortable for families." },
            5: { imageUrl: "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iyix1OYhVxdA/v2/-1x-1.jpg", description: "Various capacities. Suitable for different needs." }
        };

        const rooms = [];
        for (let i = 1; i <= 20; i++) {
            const adultsCapacity = Math.floor(Math.random() * 3) + 1; 
            const childrenCapacity = Math.floor(Math.random() * 3); 

            let type;
            if (adultsCapacity === 1 && childrenCapacity === 0) {
                type = 1; 
            } else if (adultsCapacity === 1 && childrenCapacity === 1) {
                type = 2; 
            } else if (adultsCapacity === 2 && childrenCapacity === 1) {
                type = 3; 
            } else if (adultsCapacity === 2 && childrenCapacity === 2) {
                type = 4;
            } else {
                type = 5; 
            }

            rooms.push({
                type: type,
                roomId: i,
                adultsCapacity: adultsCapacity,
                childrenCapacity: childrenCapacity,
                isOccupied: false,
                imageUrl: roomTypeInfo[type].imageUrl,
                description: roomTypeInfo[type].description
            });
        }

        const result = await collection.insertMany(rooms);
        console.log(`${result.insertedCount} rooms were inserted`);
    } catch (err) {
        console.error("An error occurred", err);
    } finally {
        await client.close();
    }
}

insertRoomInfo();
