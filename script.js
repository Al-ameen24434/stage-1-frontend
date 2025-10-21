// Update current time in milliseconds
function updateTime() {
  const timeElement = document.getElementById("currentTime");
  if (timeElement) {
    timeElement.textContent = Date.now();
  }
}

// Update time immediately
updateTime();

// Update time every second
setInterval(updateTime, 1000);
// Update current time on profile card
function updateTime() {
  const timeElement = document.getElementById("current-time");
  if (timeElement) {
    const now = new Date();
    const formattedTime = now.toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    timeElement.textContent = formattedTime;
    timeElement.setAttribute("datetime", now.toISOString());
  }
}

// Initialize time update
if (document.getElementById("current-time")) {
  updateTime();
  setInterval(updateTime, 1000);
}

// Form validation
const contactForm = document.getElementById("contact-form");

if (contactForm) {
  const nameInput = document.getElementById("contact-name");
  const emailInput = document.getElementById("contact-email");
  const subjectInput = document.getElementById("contact-subject");
  const messageInput = document.getElementById("contact-message");

  const nameError = document.getElementById("error-name");
  const emailError = document.getElementById("error-email");
  const subjectError = document.getElementById("error-subject");
  const messageError = document.getElementById("error-message");
  const successMessage = document.getElementById("success-message");

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Validation functions
  function validateName() {
    const value = nameInput.value.trim();
    if (!value) {
      showError(nameInput, nameError, "Name is required");
      return false;
    }
    if (value.length > 100) {
      showError(nameInput, nameError, "Name must be less than 100 characters");
      return false;
    }
    clearError(nameInput, nameError);
    return true;
  }

  function validateEmail() {
    const value = emailInput.value.trim();
    if (!value) {
      showError(emailInput, emailError, "Email is required");
      return false;
    }
    if (!emailRegex.test(value)) {
      showError(
        emailInput,
        emailError,
        "Please enter a valid email address (e.g., name@example.com)"
      );
      return false;
    }
    if (value.length > 255) {
      showError(
        emailInput,
        emailError,
        "Email must be less than 255 characters"
      );
      return false;
    }
    clearError(emailInput, emailError);
    return true;
  }

  function validateSubject() {
    const value = subjectInput.value.trim();
    if (!value) {
      showError(subjectInput, subjectError, "Subject is required");
      return false;
    }
    if (value.length > 200) {
      showError(
        subjectInput,
        subjectError,
        "Subject must be less than 200 characters"
      );
      return false;
    }
    clearError(subjectInput, subjectError);
    return true;
  }

  function validateMessage() {
    const value = messageInput.value.trim();
    if (!value) {
      showError(messageInput, messageError, "Message is required");
      return false;
    }
    if (value.length < 10) {
      showError(
        messageInput,
        messageError,
        "Message must be at least 10 characters"
      );
      return false;
    }
    if (value.length > 1000) {
      showError(
        messageInput,
        messageError,
        "Message must be less than 1000 characters"
      );
      return false;
    }
    clearError(messageInput, messageError);
    return true;
  }

  function showError(input, errorElement, message) {
    input.classList.add("error");
    input.setAttribute("aria-invalid", "true");
    errorElement.textContent = message;
    errorElement.classList.add("visible");
  }

  function clearError(input, errorElement) {
    input.classList.remove("error");
    input.setAttribute("aria-invalid", "false");
    errorElement.textContent = "";
    errorElement.classList.remove("visible");
  }

  // Add real-time validation
  nameInput.addEventListener("blur", validateName);
  emailInput.addEventListener("blur", validateEmail);
  subjectInput.addEventListener("blur", validateSubject);
  messageInput.addEventListener("blur", validateMessage);

  // Clear errors on input
  nameInput.addEventListener("input", () => {
    if (nameInput.classList.contains("error")) {
      validateName();
    }
  });

  emailInput.addEventListener("input", () => {
    if (emailInput.classList.contains("error")) {
      validateEmail();
    }
  });

  subjectInput.addEventListener("input", () => {
    if (subjectInput.classList.contains("error")) {
      validateSubject();
    }
  });

  messageInput.addEventListener("input", () => {
    if (messageInput.classList.contains("error")) {
      validateMessage();
    }
  });

  // Form submission
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Hide previous success message
    successMessage.classList.remove("visible");

    // Validate all fields
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isSubjectValid = validateSubject();
    const isMessageValid = validateMessage();

    // If all valid, show success message
    if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
      // In a real application, you would send the data to a server here
      // For this demo, we just show a success message

      successMessage.textContent =
        "Thank you for your message! We'll get back to you soon.";
      successMessage.classList.add("visible");

      // Reset form
      contactForm.reset();

      // Clear all error states
      clearError(nameInput, nameError);
      clearError(emailInput, emailError);
      clearError(subjectInput, subjectError);
      clearError(messageInput, messageError);

      // Scroll to success message
      successMessage.scrollIntoView({ behavior: "smooth", block: "nearest" });

      // Focus on first input for accessibility
      setTimeout(() => {
        nameInput.focus();
      }, 100);
    } else {
      // Focus on first invalid field
      if (!isNameValid) {
        nameInput.focus();
      } else if (!isEmailValid) {
        emailInput.focus();
      } else if (!isSubjectValid) {
        subjectInput.focus();
      } else if (!isMessageValid) {
        messageInput.focus();
      }
    }
  });
}

// Keyboard navigation improvements
document.addEventListener("DOMContentLoaded", function () {
  // Add keyboard navigation for social links
  const socialLinks = document.querySelectorAll(".social-link");
  socialLinks.forEach((link) => {
    link.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        link.click();
      }
    });
  });
});
