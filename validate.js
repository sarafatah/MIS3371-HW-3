/*
 Name: Sara Fatah
 Date Created: 06/18/25
 Date Updated: 07/03/25
 Purpose: Validate form fields, display review modal, and handle form submission
*/

document.addEventListener("DOMContentLoaded", () => {
  // --- Helper Functions ---
  const getValue = (id) => document.getElementById(id)?.value.trim() || "";
  const getCheckedValues = (name) =>
    Array.from(document.querySelectorAll(`input[name="${name}"]:checked`))
      .map(cb => cb.value).join(", ");
  const getSelectedRadio = (name) => {
    const selected = document.querySelector(`input[name="${name}"]:checked`);
    return selected ? selected.value : "Not selected";
  };
  const formatCurrency = (value) => new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(value);

  const form = document.getElementById("registrationForm");
  const reviewBtn = document.getElementById("reviewButton");
  const modal = document.getElementById("reviewModal");
  const reviewContent = document.getElementById("reviewContent");
  const submitBtn = document.getElementById("submitBtn");
  const validateBtn = document.getElementById("validateBtn");
if (validateBtn) {
  validateBtn.addEventListener("click", () => {
    if (isFormValid()) {
      alert("All fields are valid!");
      if (submitBtn) {
        submitBtn.style.display = "inline-block";  // Show Submit button
        submitBtn.disabled = false;
      }
    } else {
      alert("Please fix errors in the form before submitting.");
      if (submitBtn) {
        submitBtn.style.display = "none";  // Hide Submit button
        submitBtn.disabled = true;
      }
    }
  });
}



  // --- SSN Auto-formatting and Masking ---
ssnInput.addEventListener("input", () => {
  let digits = ssnInput.value.replace(/\D/g, "").slice(0, 9); // keep only digits
  let formatted = "";

  if (digits.length > 0) {
    formatted += digits.slice(0, 3);
  }
  if (digits.length >= 4) {
    formatted += "-" + digits.slice(3, 5);
  }
  if (digits.length >= 6) {
    formatted += "-" + digits.slice(5, 9);
  }

  ssnInput.value = formatted;
  originalSSN = formatted;

  const validPattern = /^\d{3}-\d{2}-\d{4}$/;
  if (formatted.length === 11 && !validPattern.test(formatted)) {
    ssnError.textContent = "Invalid SSN format. Use XXX-XX-XXXX.";
  } else {
    ssnError.textContent = "";
  }
});

    ssnInput.addEventListener("blur", () => {
      if (originalSSN.length === 11) {
        ssnInput.value = "•••-••-" + originalSSN.slice(-4);
      }
    });

    ssnInput.addEventListener("focus", () => {
      if (originalSSN.length === 11) {
        ssnInput.value = originalSSN;
      }
    });
  }

  // --- Validation Functions ---
  function validateFirstName() {
    const input = document.getElementById("firstname");
    const error = document.getElementById("firstnameError");
    const val = input.value;
    const pattern = /^[a-zA-Z'-]+$/;

    if (val === "") {
      error.textContent = "First name is required.";
      return false;
    } else if (!pattern.test(val)) {
      error.textContent = "Only letters, apostrophes and dashes allowed!";
      input.value = val.replace(/[^a-zA-Z'-]/g, '');
      return false;
    }
    error.textContent = "";
    return true;
  }

  function validateMidInitial() {
    const input = document.getElementById("midinitial");
    const error = document.getElementById("midinitialError");
    const val = input.value;
    const pattern = /^[a-zA-Z]?$/;

    if (!pattern.test(val)) {
      error.textContent = "Only one letter is allowed.";
      input.value = val.replace(/[^a-zA-Z]/g, '').slice(0,1);
      return false;
    }
    error.textContent = "";
    return true;
  }

  function validateLastName() {
    const input = document.getElementById("lastname");
    const error = document.getElementById("lastnameError");
    const val = input.value;
    const pattern = /^[a-zA-Z'-2-5]*$/;

    if (val === "") {
      error.textContent = "Last name is required.";
      return false;
    } else if (!pattern.test(val)) {
      error.textContent = "Only letters, apostrophes, dashes, and numbers 2-5 are allowed.";
      input.value = val.replace(/[^a-zA-Z'-2-5]/g, '');
      return false;
    }
    error.textContent = "";
    return true;
  }

  function validateEmail() {
    const input = document.getElementById("email");
    const error = document.getElementById("emailError");
    const val = input.value.toLowerCase();
    input.value = val;
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (val === "") {
      error.textContent = "Email is required.";
      return false;
    } else if (!pattern.test(val)) {
      error.textContent = "Invalid email format.";
      return false;
    }
    error.textContent = "";
    return true;
  }

  function validateDOB() {
    const input = document.getElementById("dob");
    const error = document.getElementById("dobError");
    const val = input.value;
    if (val === "") {
      error.textContent = "Date of Birth is required.";
      return false;
    }
    const dob = new Date(val);
    const today = new Date();
    const minDate = new Date();
    minDate.setFullYear(today.getFullYear() - 120);

    if (dob > today) {
      error.textContent = "Birthdate cannot be in the future.";
      return false;
    }
    if (dob < minDate) {
      error.textContent = "Birthdate cannot be more than 120 years ago.";
      return false;
    }
    error.textContent = "";
    return true;
  }

  function validateSSN() {
    const input = document.getElementById("ssn");
    const error = document.getElementById("ssnError");
    const val = input.value;
    const pattern = /^\d{3}-\d{2}-\d{4}$/;

    if (!pattern.test(val)) {
      error.textContent = "Invalid SSN format. Use XXX-XX-XXXX.";
      return false;
    }
    error.textContent = "";
    return true;
  }

  function validateZip() {
    const input = document.getElementById("zip");
    const error = document.getElementById("zipError");
    const val = input.value;
    const pattern = /^\d{5}(-\d{4})?$/;

    if (val === "") {
      error.textContent = "ZIP code is required.";
      return false;
    } else if (!pattern.test(val)) {
      error.textContent = "ZIP code must be 5 digits or ZIP+4 format (12345 or 12345-6789).";
      return false;
    }
    error.textContent = "";
    return true;
  }

  function validateUserID() {
    const input = document.getElementById("userid");
    const error = document.getElementById("useridError");
    const val = input.value;

    if (/^\d/.test(val)) {
      error.textContent = "User ID cannot start with a number.";
      return false;
    }
    if (val.length < 5) {
      error.textContent = "User ID must be at least 5 characters long.";
      return false;
    }
    error.textContent = "";
    return true;
  }

  function validatePassword() {
    const input = document.getElementById("password");
    const userId = document.getElementById("userid").value.toLowerCase();
    const error = document.getElementById("passwordError");
    const val = input.value;

    if (val.length < 8 || val.length > 30) {
      error.textContent = "Password must be between 8 and 30 characters long.";
      return false;
    }
    if (!/[A-Z]/.test(val)) {
      error.textContent = "Password must contain at least one uppercase letter.";
      return false;
    }
    if (!/[a-z]/.test(val)) {
      error.textContent = "Password must contain at least one lowercase letter.";
      return false;
    }
    if (!/[0-9]/.test(val)) {
      error.textContent = "Password must contain at least one number.";
      return false;
    }
    if (!/[!@#%^&*()\-_+=\/><.,~]/.test(val)) {
      error.textContent = "Password must contain at least one special character.";
      return false;
    }
    if (/['"]/.test(val)) {
      error.textContent = "Password cannot contain quotes.";
      return false;
    }
    if (userId && val.toLowerCase().includes(userId)) {
      error.textContent = "Password cannot contain your User ID.";
      return false;
    }
    error.textContent = "";
    return true;
  }

  function validateConfirmPassword() {
    const pwd = document.getElementById("password").value;
    const confirmPwd = document.getElementById("confirmpassword").value;
    const error = document.getElementById("confirmpasswordError");

    if (pwd !== confirmPwd) {
      error.textContent = "Passwords do not match.";
      return false;
    }
    error.textContent = "";
    return true;
  }

  function validateAddress() {
    const address1 = document.getElementById("address1").value.trim();
    const address2 = document.getElementById("address2").value.trim();
    const error1 = document.getElementById("errorAddress1");
    const error2 = document.getElementById("errorAddress2");
    let isValid = true;

    if (address1.length < 2 || address1.length > 30) {
      error1.textContent = "Address Line 1 must be between 2 and 30 characters.";
      isValid = false;
    } else {
      error1.textContent = "";
    }

    if (address2.length > 0 && (address2.length < 2 || address2.length > 30)) {
      error2.textContent = "Address Line 2 must be between 2 and 30 characters if entered.";
      isValid = false;
    } else {
      error2.textContent = "";
    }

    return isValid;
  }

  // --- Slider Labels ---
  function setupSliderLabel(sliderId, labelId) {
    const slider = document.getElementById(sliderId);
    const label = document.getElementById(labelId);
    if (slider && label) {
      label.textContent = formatCurrency(slider.value);
      slider.addEventListener("input", () => {
        label.textContent = formatCurrency(slider.value);
      });
    }
  }

  setupSliderLabel("salary", "salaryLabel");
  setupSliderLabel("minPrice", "minPriceLabel");
  setupSliderLabel("maxPrice", "maxPriceLabel");

  // --- Form-wide validation ---
  function isFormValid() {
    return validateFirstName() &&
           validateMidInitial() &&
           validateLastName() &&
           validateEmail() &&
           validateDOB() &&
           validateSSN() &&
           validateZip() &&
           validateUserID() &&
           validatePassword() &&
           validateConfirmPassword() &&
           validateAddress();
  }

  // --- Event listeners for inputs ---
  [
    ["firstname", validateFirstName],
    ["midinitial", validateMidInitial],
    ["lastname", validateLastName],
    ["email", validateEmail],
    ["dob", validateDOB],
    ["ssn", validateSSN],
    ["zip", validateZip],
    ["userid", validateUserID],
    ["password", () => { validatePassword(); validateConfirmPassword(); }],
    ["confirmpassword", validateConfirmPassword],
    ["address1", validateAddress],
    ["address2", validateAddress]
  ].forEach(([id, fn]) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("input", fn);
  });

  // --- Submit Button Enable/Disable ---
  if (submitBtn) {
    submitBtn.disabled = true;
  } else {
    // Create submit button if not present
    const newSubmitBtn = document.createElement("input");
    newSubmitBtn.type = "submit";
    newSubmitBtn.id = "submitBtn";
    newSubmitBtn.value = "Submit";
    newSubmitBtn.disabled = true;
    form.appendChild(newSubmitBtn);
  }

  function toggleSubmitButton() {
    const submit = document.getElementById("submitBtn");
    if (!submit) return;
    submit.disabled = !isFormValid();
  }

  // Listen to inputs and toggle submit button
  form.querySelectorAll("input, select").forEach(input => {
    input.addEventListener("input", toggleSubmitButton);
  });

  // --- Review Button Handler ---
  if (reviewBtn && modal && reviewContent) {
    reviewBtn.addEventListener("click", () => {
      if (!isFormValid()) {
        alert("Please fix all errors before reviewing.");
        return;
      }

      const uid = getValue("userid").toLowerCase();
      const password = getValue("password").toLowerCase();
      const fname = getValue("firstname").toLowerCase();
      const lname = getValue("lastname").toLowerCase();

      if (password.includes(uid)) {
        alert("Password cannot contain the User ID.");
        return;
      }
      if (password.includes(fname) || password.includes(lname)) {
        alert("Password cannot contain your first or last name.");
        return;
      }

      // Prepare review content
      let zipRaw = getValue("zip");
      zipRaw = zipRaw.includes("-") ? zipRaw.split("-")[0] : zipRaw;

      const healthHistory = ["chickenpox", "measles", "covid", "smallpox", "tetanus"]
        .map(id => {
          const checked = document.getElementById(id)?.checked;
          return `${id.charAt(0).toUpperCase() + id.slice(1)}: ${checked ? "Y" : "N"}`;
        }).join("<br>");

      reviewContent.innerHTML = `
        <h3>Please Review Your Information</h3>
        <strong>Name:</strong> ${getValue("firstname")} ${getValue("midinitial")} ${getValue("lastname")}<br>
        <strong>Date of Birth:</strong> ${getValue("dob") || "Not provided"}<br>
        <strong>Email:</strong> ${getValue("email")}<br>
        <strong>Phone Number:</strong> ${getValue("phone")}<br><br>

        <strong>Address:</strong><br>
        ${getValue("address1")}${getValue("address2") ? ", " + getValue("address2") : ""}<br>
        ${getValue("city")}, ${getValue("state")} ${zipRaw}<br><br>

        <strong>Health History:</strong><br>
        ${healthHistory}<br><br>

        <strong>Vaccinated?:</strong> ${getSelectedRadio("vaccinated")}<br>
        <strong>Insurance?:</strong> ${getSelectedRadio("insurance")}<br>
        <strong>Health Rating:</strong> ${getValue("range")}<br><br>

        <strong>Desired Salary:</strong> ${formatCurrency(getValue("salary"))}<br>
        <strong>Home Budget:</strong> ${formatCurrency(getValue("minPrice"))} - ${formatCurrency(getValue("maxPrice"))}<br><br>

        <strong>User ID:</strong> ${uid}<br>
        <strong>Password:</strong> (hidden)<br>
      `;

      modal.style.display = "block";
    });
  }

  // --- Modal Close Handler ---
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  // --- Form Submit Handler ---
  if (form) {
    form.addEventListener("submit", (e) => {
      if (!isFormValid()) {
        e.preventDefault();
        alert("Please fix all errors before submitting.");
      }
    });
  }

  // Initialize submit button state
  toggleSubmitButton();
});
