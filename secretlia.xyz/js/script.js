// JavaScript for API call, countdown timer, and date calculation

// Function to fetch the user's city from an API and update the city elements
// Function to update city and country flag in all elements with class 'city'
const updateCityAndFlag = (cityName, countryCode) => {
  // Convert country code to flag emoji
  const flagEmoji = countryCode.toUpperCase().replace(/./g, char => 
    String.fromCodePoint(char.charCodeAt(0) + 127397)
  );

  const cityElements = document.querySelectorAll('.city');
  cityElements.forEach(element => {
    element.textContent = `${cityName} ${flagEmoji}`;
  });
};

// Function to fetch the user's city and country code from an API and update the city elements
const fetchAndUpdateCityAndFlag = () => {
  // Example API call to get the user location
  fetch('https://ipapi.co/json/')
    .then(response => response.json())
    .then(data => {
      updateCityAndFlag(data.city, data.country_code);
    })
    .catch(error => {
      console.error('Error fetching location:', error);
      updateCityAndFlag('your city', 'XX'); // XX as a placeholder for unknown country
    });
};

// Call the function to fetch and update the city and flag
fetchAndUpdateCityAndFlag();


// Countdown timer logic
// Function to start or continue the countdown
const startCountdown = () => {
  let endTime = localStorage.getItem('countdownEndTime');

  if (!endTime) {
    // Set the countdown for 16 minutes and 37 seconds from now
    endTime = new Date(new Date().getTime() + (16 * 60 + 37) * 1000);
    localStorage.setItem('countdownEndTime', endTime);
  } else {
    endTime = new Date(endTime);
  }

  const interval = setInterval(() => {
    const now = new Date().getTime();
    const timeLeft = endTime - now;

    if (timeLeft >= 0) {
      // Calculate minutes and seconds from timeLeft
      let minutes = Math.floor(timeLeft / (1000 * 60));
      let seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      // Prepend '0' if minutes or seconds are less than 10
      minutes = minutes < 10 ? '0' + minutes : minutes;
      seconds = seconds < 10 ? '0' + seconds : seconds;

      // Update the timer display
      document.getElementById('timer').textContent = `0h ${minutes}m ${seconds}s`;
    } else {
      clearInterval(interval);
      document.getElementById('timer').textContent = 'LAST CHANCE EXPIRING NOW';
      localStorage.removeItem('countdownEndTime'); // Clear the stored end time
    }
  }, 1000);
};

startCountdown(); // Start the countdown



// Function to calculate the date 5 days from now
const calculateDatePlusFiveDays = () => {
  const date = new Date();
  date.setDate(date.getDate() + 5);
  return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
};

// Update the date on the webpage
document.getElementById('date-5days').textContent = calculateDatePlusFiveDays();


