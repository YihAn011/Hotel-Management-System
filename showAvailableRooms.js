$(document).ready(function() {
    
    var roomDefaults = {
        1: {
            imageUrl: "https://media.istockphoto.com/id/1390233984/photo/modern-luxury-bedroom.jpg?s=612x612&w=0&k=20&c=po91poqYoQTbHUpO1LD1HcxCFZVpRG-loAMWZT7YRe4=",
            description: "1 adult, no children. Perfect for solo travelers."
        },
        2: {
            imageUrl: "https://static01.nyt.com/images/2019/03/24/travel/24trending-shophotels1/24trending-shophotels1-superJumbo.jpg",
            description: "1 adult, 1 child. Ideal for small families."
        },
        3: {
            imageUrl: "https://www.oppeinhome.com/upload/image/product/thumb/20211009/white-grey-beige-modern-hotel-wood-grain1.jpg",
            description: "2 adults, 1 child. Great for families."
        },
        4: {
            imageUrl: "https://www.italianbark.com/wp-content/uploads/2018/01/hotel-room-design-trends-italianbark-interior-design-blog.jpg",
            description: "2 adults, 2 children. Spacious and comfortable for families."
        },
        5: {
            imageUrl: "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iyix1OYhVxdA/v2/-1x-1.jpg",
            description: "Various capacities. Suitable for different needs."
        }
    };

    
    var storedData = localStorage.getItem('availableRooms');
    if (storedData) {
        var data = JSON.parse(storedData);
        console.log('Stored data:', data);

        if ($('#roomsList').length > 0) {
            $('#roomsList').empty(); 

            if (data.length > 0) {
               
                data.forEach(function(room) {
                    var defaults = roomDefaults[room.type] || {};
                    var imageUrl = defaults.imageUrl || "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iyix1OYhVxdA/v2/-1x-1.jpg";
                    var description = defaults.description || "Error";

                    var roomElement = `
                        <div class="room">
                            <p>Type: ${room.type} - Available Rooms: ${room.availableRoomsCount}</p>
                            <img src="${imageUrl}" alt="Room Image" style="width: 100%; max-width: 300px;">
                            <p>${description}</p>
                            <button class="pay-now-button" onclick="payNow(${room.type})">Pay Now</button>
                        </div>
                    `;

                    $('#roomsList').append(roomElement);
                });
            } else {
                
                [1, 2, 3, 4, 5].forEach(function(type) {
                    var defaults = roomDefaults[type] || {};
                    var imageUrl = defaults.imageUrl || "https://assets.bwbx.io/images/users/iqjWHBFdfxIU/iyix1OYhVxdA/v2/-1x-1.jpg";
                    var description = defaults.description || "Error";

                    var roomElement = `
                        <div class="room">
                            <p>Type: ${type} - Available Rooms: 0</p>
                            <img src="${imageUrl}" alt="Room Image" style="width: 100%; max-width: 300px;">
                            <p>${description}</p>
                        </div>
                    `;

                    $('#roomsList').append(roomElement);
                });
            }
        }
    }
});



function payNow(roomType) {
    var prices = {
        1: 100,
        2: 200,
        3: 300,
        4: 400,
        5: 500
    };

    var price = prices[roomType] || 0; 
    document.getElementById('priceAmount').textContent = price;

    document.getElementById('paymentModal').style.display = 'block';

    document.getElementById('closeModal').onclick = function() {
        document.getElementById('paymentModal').style.display = 'none';
    }

    
    document.getElementById('placeOrderButton').onclick = function() {
        
        var paymentInfo = {
            nameOnCard: document.getElementById('nameOnCard').value,
            cardNumber: document.getElementById('cardNumber').value,
            expirationDate: document.getElementById('expirationDate').value,
            securityCode: document.getElementById('securityCode').value,
            zipCode: document.getElementById('zipCode').value,
            emailAddress: document.getElementById('emailAddress').value,
            amount: document.getElementById('priceAmount').textContent
            
        };

        console.log(paymentInfo); 
        
        
       
        document.getElementById('paymentModal').style.display = 'none';
    }
}