/*
 Name: Sara Fatah
 Date Created: 06/18/25
 Date Updated: 07/03/25
 Purpose: Validate form fields, display review modal, and handle form submission
*/

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registrationForm");
  const validateBtn = document.getElementById("validateBtn");
  const submitBtn = document.getElementById("submitBtn");
  const reviewBtn = document.getElementById("reviewButton");
  const modal = document.getElementById("reviewModal");
  const reviewContent = document.getElementById("reviewContent");

  // Utility Functions
  function getValue(id) {
    return document.getElementById(id)?.value.trim() || "";
  }

  function getSelectedRadio(name) {
    const selected = document.querySelector(`input[name="${name}"]:checked`);
    return selected ? selected.value : "Not selected";
  }

  function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  }

  // ========== Validation Functions ==========
  function validateFirstName() {
    const input = document.getElementById("firstname");
    const error = document.getElementById("firstnameError");
    const pattern = /^[a-zA-Z'-]+$/;
    if (!input.value.match(pattern)) {
      error.textContent = "Only letters, apostrophes, and dashes allowed!";
      return false;
    }
    error.textContent = "";
    return true;
  }

  function validateLastName() {
    const input = document.getElementById("lastname");
    const error = document.getElementById("lastnameError");
    const pattern = /^[a-zA-Z'-]*[2-5]?[a-zA-Z'-]*$/;
    if (!pattern.test(input.value)) {
      error.textContent = "Only letters, apostrophes, dashes, and numbers 2-5 allowed.";
      return false;
    }
    error.textContent = "";
    return true;
  }

  function validateEmail() {
    const input = document.getElementById("email");
    const error = document.getElementById("emailError");
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!pattern.test(input.value.toLowerCase())) {
      error.textContent = "Invalid email format";
      return false;
    }
    error.textContent = "";
    return true;
  }

  function validateDOB() {
    const input = document.getElementById("dob");
    const error = document.getElementById("dobError");
    const dob = new Date(input.value);
    const today = new Date();
    const minDOB = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate());
    if (dob > today || dob < minDOB) {
      error.textContent = "DOB must be within last 120 years and not in future";
      return false;
    }
    error.textContent = "";
    return true;
  }

  function validateSSN() {
    const input = document.getElementById("ssn");
    const error = document.getElementById("ssnError");
    const val = input.value.replace(/\D/g, "");
    if (val.length !== 9) {
      error.textContent = "SSN must be 9 digits";
      return false;
    }
    error.textContent = "";
    return true;
  }

  function validatePassword() {
    const input = document.getElementById("password");
    const error = document.getElementById("passwordError");
    const uid = getValue("userid").toLowerCase();
    const val = input.value;

    let msg = "";
    if (val.length < 8 || val.length > 30) msg = "8–30 characters required.";
    else if (!/[A-Z]/.test(val)) msg = "Must include uppercase.";
    else if (!/[a-z]/.test(val)) msg = "Must include lowercase.";
    else if (!/[0-9]/.test(val)) msg = "Must include number.";
    else if (!/[!@#%^&*()\-_+=\/><.,~]/.test(val)) msg = "Must include special character.";
    else if (val.includes(uid)) msg = "Cannot contain User ID.";

    error.textContent = msg;
    return msg === "";
  }

  function validateConfirmPassword() {
    const pwd = getValue("password");
    const confirm = getValue("confirmpassword");
    const error = document.getElementById("confirmpasswordError");
    if (pwd !== confirm) {
      error.textContent = "Passwords do not match.";
      return false;
    }
    error.textContent = "";
    return true;
  }

  function isFormValid() {
    return (
      validateFirstName() &&
      validateLastName() &&
      validateEmail() &&
      validateDOB() &&
      validateSSN() &&
      validatePassword() &&
      validateConfirmPassword()
    );
  }

  // ========== Validate Button ==========
  if (validateBtn) {
    validateBtn.addEventListener("click", () => {
      if (isFormValid()) {
        alert("All fields are valid!");
        submitBtn.style.display = "inline-block";
        submitBtn.disabled = false;
      } else {
        alert("Please fix errors in the form before submitting.");
        submitBtn.style.display = "none";
        submitBtn.disabled = true;
      }
    });
  }

  // ========== Review Button ==========
  if (reviewBtn) {
    reviewBtn.addEventListener("click", function () {
      if (!isFormValid()) {
        alert("Please fix all errors before reviewing.");
        return;
      }

      const zip = getValue("zip").split("-")[0];
      reviewContent.innerHTML = `
        <strong>Name:</strong> ${getValue("firstname")} ${getValue("lastname")}<br>
        <strong>DOB:</strong> ${getValue("dob")}<br>
        <strong>Email:</strong> ${getValue("email")}<br>
        <strong>Phone:</strong> ${getValue("phone")}<br><br>
        <strong>Address:</strong> ${getValue("address1")}, ${getValue("city")}, ${getValue("state")} ${zip}<br><br>
        <strong>User ID:</strong> ${getValue("userid")}<br>
        <strong>Salary:</strong> ${formatCurrency(getValue("salary"))}<br>
        <strong>Budget:</strong> ${formatCurrency(getValue("minPrice"))} - ${formatCurrency(getValue("maxPrice"))}
      `;
      modal.style.display = "block";
    });
  }

  // ========== Modal Close ==========
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });

  // ========== Real-Time Submit Button Toggle ==========
  document.querySelectorAll("input").forEach((el) => {
    el.addEventListener("input", () => {
      submitBtn.disabled = !isFormValid();
    });
  });

  // ========== Initial Setup ==========
  submitBtn.disabled = true;
  submitBtn.style.display = "none";

  // ========== Auto-format SSN ==========
  document.getElementById("ssn").addEventListener("input", function (e) {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length > 3) val = val.slice(0, 3) + "-" + val.slice(3);
    if (val.length > 6) val = val.slice(0, 6) + "-" + val.slice(6);
    e.target.value = val.slice(0, 11);
  });
});
