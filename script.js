let slideIndex = 0;
showSlides();

function showSlides() {
    let slides = document.getElementsByClassName("slide");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    slides[slideIndex - 1].style.display = "block";  
    setTimeout(showSlides, 3000); // Change image every 3 seconds
}

function changeSlide(n) {
    slideIndex += n;
    if (slideIndex > slides.length) {slideIndex = 1}
    if (slideIndex < 1) {slideIndex = slides.length}
    showSlidesManually();
}

function showSlidesManually() {
    let slides = document.getElementsByClassName("slide");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slides[slideIndex - 1].style.display = "block";  
}
document.getElementById('notification-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;

    // Simulate sending a notification (in a real app, this would involve a backend service)
    alert(`Thank you for subscribing! We will notify you at ${email} when new songs are uploaded.`);
    
    // Reset the form
    e.target.reset();
});
function notifyUpcomingPrograms() {
    const today = new Date();
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentDay = dayNames[today.getDay()];
    const currentHour = today.getHours();
    const currentMinute = today.getMinutes();
    
    const schedule = [
        { day: "Sunday", time: "15:30", activity: "Vocal Training, Music", inCharge: "John Doe" },
        { day: "Tuesday", time: "16:00", activity: "Rehearsing New Songs", inCharge: "Jane Smith" },
        { day: "Thursday", time: "16:00", activity: "Performance for Sabbath", inCharge: "Michael Brown" },
        { day: "Sabbath After Divine", time: "15:00", activity: "Singing based on choice request", inCharge: "Michael Brown" }
    ];

    const upcomingNotifications = schedule.filter(session => session.day === currentDay);

    let message = "";
    upcomingNotifications.forEach(session => {
        const [hour, minute] = session.time.split(":").map(Number);
        if (hour === currentHour && minute === currentMinute) {
            message += `Reminder: ${session.activity} is happening now! (In Charge: ${session.inCharge})\n`;
        } else if (hour === currentHour && minute > currentMinute) {
            message += `Upcoming: ${session.activity} at ${session.time} (In Charge: ${session.inCharge})\n`;
        }
    });

    const notificationArea = document.getElementById("notification-message");
    if (message) {
        notificationArea.innerText = message;
        alert(message); // Show an alert as well
    } else {
        notificationArea.innerText = "No upcoming activities.";
    }
}

// Call the function on page load
window.onload = notifyUpcomingPrograms;
document.querySelectorAll('.download-link').forEach(link => {
    link.addEventListener('click', async function (event) {
        event.preventDefault(); // Prevent direct download

        const songId = this.getAttribute('data-song-id');
        const email = prompt("Enter your email to download:");

        if (email) {
            try {
                const response = await fetch(`http://localhost:3000/download/${songId}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email })
                });

                if (response.ok) {
                    window.location.href = this.href; // Start the download
                } else {
                    const message = await response.text();
                    alert(message); // Inform the user they've already downloaded
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    });
});

// Mobile responsiveness
document.addEventListener("DOMContentLoaded", function() {
    const menuIcon = document.querySelector(".menu-icon");
    const mobileMenu = document.getElementById("mobile-menu");

    // Toggle mobile menu display
    menuIcon.addEventListener("click", () => {
        mobileMenu.style.display = mobileMenu.style.display === "none" || !mobileMenu.style.display ? "block" : "none";
    });
});
function toggleMenu() {
    const menu = document.querySelector('.nav-bar ul');
    menu.classList.toggle('show');
}
function toggleMenu() {
    const menu = document.querySelector('.nav-bar ul');
    menu.classList.toggle('show');
}
// Toggle the menu display on smaller screens
function toggleMenu() {
    const navBar = document.querySelector('.nav-bar ul');
    navBar.classList.toggle('active');
}
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const totalSlides = slides.length;

// Function to move to the next slide
function showNextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlidePosition();
}

// Function to move to the previous slide
function showPrevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlidePosition();
}

// Function to update the slide position
function updateSlidePosition() {
    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${(index - currentSlide) * 100}%)`;
    });
}

// Set up the interval for automatic slideshow
setInterval(showNextSlide, 3000); // Change slide every 3 seconds

// Add event listeners for navigation arrows
document.querySelector('.next').addEventListener('click', showNextSlide);
document.querySelector('.prev').addEventListener('click', showPrevSlide);

// Initialize the slideshow position
updateSlidePosition();
function toggleMenu() {
    const navList = document.getElementById("nav-list");
    navList.classList.toggle("active");
}


