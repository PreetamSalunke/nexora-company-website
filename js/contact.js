
/* ==================================
   CONTACT FORM VALIDATION
================================== */

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Get input elements
    const nameInput = document.getElementById("fullName");
    const emailInput = document.getElementById("email");
    const subjectInput = document.getElementById("subject");
    const messageInput = document.getElementById("message");
    const formStatus = document.getElementById("formStatus");

    let isValid = true;

    // Reset previous errors
    const fields = [
      { input: nameInput, errorId: "nameError" },
      { input: emailInput, errorId: "emailError" },
      { input: subjectInput, errorId: "subjectError" },
      { input: messageInput, errorId: "messageError" }
    ];

    fields.forEach(function (field) {
      field.input.classList.remove("invalid");
      field.input.removeAttribute("aria-invalid");
      document.getElementById(field.errorId).textContent = "";
    });

    formStatus.textContent = "";
    formStatus.className = "form-status";

    // Helper function
    function showError(input, errorId, message) {
      input.classList.add("invalid");
      input.setAttribute("aria-invalid", "true");
      document.getElementById(errorId).textContent = message;
      isValid = false;
    }

    // Validate name
    if (nameInput.value.trim().length < 2) {
      showError(
        nameInput,
        "nameError",
        "Please enter a valid name (at least 2 characters)."
      );
    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailInput.value.trim())) {
      showError(
        emailInput,
        "emailError",
        "Please enter a valid email address."
      );
    }

    // Validate subject
    if (subjectInput.value.trim().length < 3) {
      showError(
        subjectInput,
        "subjectError",
        "Subject must contain at least 3 characters."
      );
    }

    // Validate message
    if (messageInput.value.trim().length < 10) {
      showError(
        messageInput,
        "messageError",
        "Message must contain at least 10 characters."
      );
    }

    // Show result
    if (isValid) {
      formStatus.textContent =
        "Form validated successfully! This is a demo; your message has not been sent.";

      formStatus.classList.add("success");

      contactForm.reset();
    } else {
      formStatus.textContent =
        "Please correct the highlighted fields.";

      formStatus.classList.add("error");

      const firstInvalid = contactForm.querySelector(".invalid");

      if (firstInvalid) {
        firstInvalid.focus();
      }
    }
  });
}
