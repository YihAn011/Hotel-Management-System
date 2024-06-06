$(document).ready(function() {


$("#arrivalDate, #departureDate").datepicker({ dateFormat: 'mm-dd-yy' });


$("#signupForm").submit(function(event) {
    event.preventDefault(); 
    var formData = new FormData(this);
    fetch('http://localhost:8080/register', {
        method: 'POST',
        body: formData,
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        
         
         console.log('Response from server:', data);
         if(data.message && data.message.startsWith("Registration successful")) { 
            alert(data.message); 
            handleLoginSuccess(); 
        } else {
            alert(data.message); 
        }
     
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.'); 
    });
});







$("#loginForm").submit(function(event) {
    event.preventDefault(); 

    var email = $("#username").val();
    var password = $("#password").val();

    fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password
        }),
        credentials: 'include'
    })
    
    .then(response => {
        console.log(response);
        return response.json();
    })
    .then(data1 => {
        console.log(data1);
        if(data1.success) {
            alert("Login successful!");
            handleLoginSuccess(); 
            
            
        } else {
            alert("Login failed: " + data1.message);
            
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred during login. Please try again.');
    });
});








function toggleModal(show, selector) {
    const modal = $(selector);
    show ? modal.fadeIn() : modal.fadeOut();
}

$('.book-now-button').on('click', () => toggleModal(true, '#bookingModal'));
$('.close-button, #bookingModal').on('click', (e) => {
    if ($(e.target).is('.close-button') || $(e.target).is('#bookingModal')) {
        toggleModal(false, '#bookingModal');
    }
});
});







function showBookingForm() {
    var bookingForm = document.querySelector('.booking-form-container');
    bookingForm.style.display = 'flex'; 
}

function closeBookingForm() {
    var bookingForm = document.querySelector('.booking-form-container');
    bookingForm.style.display = 'none'; 
}



$(document).ready(function() {
    
    $('.book-now-button').on('click', function() {
        $('#bookingModal').fadeIn();
    });

    
    $('.close-button').on('click', function() {
        $('#bookingModal').fadeOut();
    });


    $(window).on('click', function(event) {
        if ($(event.target).is('#bookingModal')) {
            $('#bookingModal').fadeOut();
        }
    });

   
    $("#arrivalDate").datepicker({ dateFormat: 'mm-dd-yy' });
    $("#departureDate").datepicker({ dateFormat: 'mm-dd-yy' });


   
    $("#bookingForm").submit(function(event) {
        event.preventDefault(); 
        var formData = $(this).serialize(); 
        fetch('http://localhost:8080/check-availability', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: formData,
            credentials: 'include'
        })
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('availableRooms', JSON.stringify(data)); 
            window.location.href = 'showAvailableRooms.html'; 
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
    

    





});




document.addEventListener('DOMContentLoaded', function () {
    var currentIndex = 0;
    var images = document.getElementsByClassName('carousel-image');
    var infos = document.getElementsByClassName('info');

    var showSlide = function(index) {
       
        for (var i = 0; i < images.length; i++) {
            images[i].style.display = 'none';
            infos[i].style.display = 'none';
        }
        
        images[index].style.display = 'block';
        infos[index].style.display = 'block';
    };

    document.getElementById('prev').addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showSlide(currentIndex);
    });

    document.getElementById('next').addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % images.length;
        showSlide(currentIndex);
    });

    
    showSlide(currentIndex);
});


document.addEventListener('DOMContentLoaded', function () {
    var currentIndex = 0;
    var images = document.getElementsByClassName('carousel-image');
    var numImages = images.length;
    var interval;

    
    function showNextImage() {
       
        images[currentIndex].style.display = 'none';

        
        currentIndex = (currentIndex + 1) % numImages;

        
        images[currentIndex].style.display = 'block';
    }

    
    function startAutoPlay() {
        interval = setInterval(showNextImage, 2000);
    }

    
    function stopAutoPlay() {
        clearInterval(interval);
    }

    
    var carouselContainer = document.getElementById('carousel');
    
   
    carouselContainer.addEventListener('mouseenter', stopAutoPlay);
    
    
    carouselContainer.addEventListener('mouseleave', startAutoPlay);

   
    startAutoPlay();
});


document.addEventListener('DOMContentLoaded', function() {
    
    var loginModal = document.getElementById('loginModal');
    var menuLoginButton = document.getElementById('menuLoginButton');
    var topRightLoginButton = document.getElementById('topRightLoginButton');
    var closeButton = document.querySelector('.close-button2');

   
    var showLoginModal = function() {
        loginModal.style.display = 'block';
    };

    
    var closeLoginModal = function() {
        loginModal.style.display = 'none';
    };

  
    menuLoginButton.addEventListener('click', showLoginModal);
    topRightLoginButton.addEventListener('click', showLoginModal);

   
    closeButton.addEventListener('click', closeLoginModal);

   
    window.addEventListener('click', function(event) {
        if (event.target === loginModal) {
            closeLoginModal();
        }
    });
});



document.addEventListener('DOMContentLoaded', function() {
    
    var roomsSelect = document.getElementById('rooms');
    for(var i = 1; i <= 5; i++) {
        var option = document.createElement('option');
        option.value = i;
        option.textContent = i + ' ';
        roomsSelect.appendChild(option);
    }
    
    
    var adultsSelect = document.getElementById('adults');
    for(var i = 1; i <= 5; i++) {
        var option = document.createElement('option');
        option.value = i;
        option.textContent = i + ' ';
        adultsSelect.appendChild(option);
    }
    
   
    var childrenSelect = document.getElementById('children');
    for(var i = 0; i <= 4; i++) {
        var option = document.createElement('option');
        option.value = i;
        option.textContent = i + ' ';
        childrenSelect.appendChild(option);
    }
});




document.getElementById('signupButton').addEventListener('click', function() {
    
    document.querySelector('footer').scrollIntoView({ behavior: 'smooth' });
   
    
    loginModal.style.display = 'none';
});





app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

$('.close, #continueButton').on('click', function() {
    $('#availabilityModal').fadeOut();
});


$(window).on('click', function(event) {
    if ($(event.target).is('#availabilityModal')) {
        $('#availabilityModal').fadeOut();
    }
});

function handleLoginSuccess() {
    console.log('handleLoginSuccess called'); 
   
    document.getElementById('topRightLoginButton').style.display = 'none';
  
    document.getElementById('myOrdersButton').style.display = 'block';
    

    localStorage.setItem('isLoggedIn', 'true');
}
document.addEventListener('DOMContentLoaded', function() {
    var isLoggedIn = localStorage.getItem('isLoggedIn');
    
    if (isLoggedIn) {
       
        document.getElementById('topRightLoginButton').style.display = 'none';
        document.getElementById('myOrdersButton').style.display = 'block';
    } else {
       
        document.getElementById('topRightLoginButton').style.display = 'block';
        document.getElementById('myOrdersButton').style.display = 'none';
    }
});

