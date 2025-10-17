

// Update current time in milliseconds
function updateTime() {
  const timeElement = document.getElementById('currentTime');
  if (timeElement) {
    timeElement.textContent = Date.now();
  }
}

// Update time immediately
updateTime();

// Update time every second
setInterval(updateTime, 1000);
