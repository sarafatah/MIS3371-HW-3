/*
 Name: Sara Fatah
 Date Created: 06/18/25
 Date Updated: 07/03/25
 Purpose: Validate form fields, display review modal, and handle form submission
*/

document.addEventListener("DOMContentLoaded", function () {
    // Helper functions
    function getValue(id) {
        return document.getElementById(id)?.value || "";
    }

    function getCheckedValues(name) {
        return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`))
            .map(cb => cb.value).join(", ");
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

    // Elements
    const form = document.getElementById("registrationForm");
    const reviewBtn = document.getElementById("reviewButton");
    const modal = document.getElementById("reviewModal");
    const reviewContent = document.getElementById("reviewContent");

    /* ========== Input Validations ========== */

    // First Name
    const firstnameInput = document.getElementById("firstname");
    const firstnameError = document.getElementById("firstnameError");
    if (firstnameInput && firstnameError) {
        firstnameInput.addEventListener("input", function () {
            const validPattern = /^[a-zA-Z'-]+$/;
            if (firstnameInput.value !== "" && !validPattern.test(firstnameInput.value)) {
                firstnameError.textContent = "Only letters, apostrophes, and dashes are allowed!";
                firstnameInput.value = firstnameInput.value.replace(/[^a-zA-Z'-]/g, '');
            } else {
                firstnameError.textContent = "";
            }
        });
    }

    // Middle Initial
    const midInitialInput = document.getElementById("midinitial");
    const midInitialError = document.getElementById("midinitialError");
    if (midInitialInput && midInitialError) {
        midInitialInput.addEventListener("input", function () {
            const validPattern = /^[a-zA-Z]?$/;
            if (!validPattern.test(midInitialInput.value)) {
                midInitialError.textContent = "Only one letter is allowed. No numbers or special characters.";
                midInitialInput.value = midInitialInput.value.replace(/[^a-zA-Z]/g, '').slice(0, 1);
            } else {
                midInitialError.textContent = "";
            }
        });
    }

    // Last Name
    const lastNameInput = document.getElementById("lastname");
    const lastNameError = document.getElementById("lastnameError");
    if (lastNameInput && lastNameError) {
        lastNameInput.addEventListener("input", function () {
            const validPattern = /^[a-zA-Z'-]*[2-5]?[a-zA-Z'-]*$/;
            if (!validPattern.test(lastNameInput.value)) {
                lastNameError.textContent = "Only letters, apostrophes, dashes, and numbers 2-5 are allowed.";
                lastNameInput.value = lastNameInput.value.replace(/[^a-zA-Z'-2-5]/g, '');
            } else {
                lastNameError.textContent = "";
            }
        });
    }

    // Email
    const emailInput = document.getElementById("email");
    const emailError = document.getElementById("emailError");
    if (emailInput && emailError) {
        emailInput.addEventListener("input", function () {
            const email = emailInput.value.toLowerCase();
            const validPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            emailError.textContent = validPattern.test(email) ? "" : "Enter a valid email format (name@domain.tld)";
        });
    }

    // DOB
    const dobInput = document.getElementById("dob");
    const dobError = document.getElementById("dobError");
    if (dobInput && dobError) {
        dobInput.addEventListener("change", function () {
            const inputDate = new Date(dobInput.value);
            const today = new Date();
            const minDate = new Date();
            minDate.setFullYear(today.getFullYear() - 120);

            if (dobInput.value === "") {
                dobError.textContent = "";
                return;
            }

            if (inputDate > today) {
                dobError.textContent = "Birthdate cannot be in the future.";
                dobInput.value = "";
            } else if (inputDate < minDate) {
                dobError.textContent = "Birthdate cannot be more than 120 years ago.";
                dobInput.value = "";
            } else {
                dobError.textContent = "";
            }
        });
    }

    // SSN
    const ssnInput = document.getElementById("ssn");
    const ssnError = document.getElementById("ssnError");
    let originalSSN = "";
    if (ssnInput && ssnError) {
        ssnInput.addEventListener("input", function () {
            let inputValue = ssnInput.value.replace(/[^0-9-]/g, '');
            if (inputValue.length > 3 && inputValue.charAt(3) !== '-') inputValue = inputValue.slice(0, 3) + '-' + inputValue.slice(3);
            if (inputValue.length > 6 && inputValue.charAt(6) !== '-') inputValue = inputValue.slice(0, 6) + '-' + inputValue.slice(6);
            inputValue = inputValue.slice(0, 11);
            ssnInput.value = inputValue;
            originalSSN = inputValue;
            const validPattern = /^\d{3}-\d{2}-\d{4}$/;
            ssnError.textContent = (inputValue.length === 11 && !validPattern.test(inputValue)) ? "Invalid SSN format. Use XXX-XX-XXXX." : "";
        });

        ssnInput.addEventListener("blur", function () {
            if (originalSSN.length === 11) {
                ssnInput.value = "•••-••-" + originalSSN.slice(-4);
            }
        });

        ssnInput.addEventListener("focus", function () {
            if (originalSSN.length === 11) {
                ssnInput.value = originalSSN;
            }
        });
          document.getElementById('ssn').addEventListener('input', function(e) {
         let val = e.target.value.replace(/\D/g, '');
         if (val.length > 3) val = val.slice(0,3) + '-' + val.slice(3);
         if (val.length > 6) val = val.slice(0,6) + '-' + val.slice(6);
         e.target.value = val.slice(0,11);
});
    }

    // ZIP Code
    const zipInput = document.getElementById("zip");
    const zipError = document.getElementById("zipError");
    if (zipInput && zipError) {
        zipInput.addEventListener("input", function () {
            let inputValue = zipInput.value.replace(/[^0-9-]/g, '');
            if (inputValue.includes('-')) {
                inputValue = inputValue.replace(/-/g, '');
                if (inputValue.length > 5) inputValue = inputValue.slice(0, 5) + '-' + inputValue.slice(5);
            }
            inputValue = inputValue.slice(0, 10);
            zipInput.value = inputValue;
            const validPattern = /^\d{5}(-\d{0,4})?$/;
            zipError.textContent = validPattern.test(inputValue) ? "" : "ZIP code must be 5 digits or in ZIP+4 format (12345 or 12345-6789).";
        });
    }

    // User ID
    const userIdInput = document.getElementById("userid");
    const userIdError = document.getElementById("useridError");
    if (userIdInput && userIdError) {
        userIdInput.addEventListener("input", function () {
            let inputValue = userIdInput.value.replace(/[^a-zA-Z0-9_-]/g, '');
            if (/^\d/.test(inputValue)) {
                userIdError.textContent = "User ID cannot start with a number.";
                inputValue = inputValue.replace(/^\d/, '');
            } else {
                userIdError.textContent = "";
            }
            inputValue = inputValue.replace(/\s/g, '').slice(0, 30);
            userIdInput.value = inputValue;
        });

        form.addEventListener("submit", function (event) {
            userIdInput.value = userIdInput.value.toLowerCase();
            if (userIdInput.value.length < 5) {
                userIdError.textContent = "User ID must be at least 5 characters long.";
                event.preventDefault();
            }
        });
    }

    // Password & Confirm Password
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmpassword");
    const passwordError = document.getElementById("passwordError");
    const confirmPasswordError = document.getElementById("confirmpasswordError");

    function validatePassword() {
        const password = passwordInput.value;
        const userId = userIdInput.value.toLowerCase();
        let errorMessage = "";

        if (password.length < 8 || password.length > 30) {
            errorMessage = "Password must be between 8 and 30 characters long.";
        } else if (!/[A-Z]/.test(password)) {
            errorMessage = "Password must contain at least one uppercase letter.";
        } else if (!/[a-z]/.test(password)) {
            errorMessage = "Password must contain at least one lowercase letter.";
        } else if (!/[0-9]/.test(password)) {
            errorMessage = "Password must contain at least one number.";
        } else if (!/[!@#%^&*()\-_+=\/><.,~]/.test(password)) {
            errorMessage = "Password must contain at least one special character.";
        } else if (/['"]/.test(password)) {
            errorMessage = "Password cannot contain quotes.";
        } else if (userId && password.toLowerCase().includes(userId)) {
            errorMessage = "Password cannot contain your User ID.";
        }

        passwordError.textContent = errorMessage;
        return errorMessage === "";
    }

    function validateConfirmPassword() {
        if (!passwordInput.value || !confirmPasswordInput.value) {
            confirmPasswordError.textContent = "";
            return true;
        }

        const valid = confirmPasswordInput.value === passwordInput.value;
        confirmPasswordError.textContent = valid ? "" : "Passwords do not match.";
        return valid;
    }

    if (passwordInput && confirmPasswordInput && passwordError && confirmPasswordError) {
        passwordInput.addEventListener("input", function() {
            validatePassword();
            validateConfirmPassword(); // Also check match when password changes
        });

        confirmPasswordInput.addEventListener("input", validateConfirmPassword);

        form.addEventListener("submit", function (event) {
            if (!validatePassword() || !validateConfirmPassword()) {
                event.preventDefault();
            }
        });
    }


 // Password Validation
function validatePassword() {
    const password = document.getElementById('password').value;
    const username = document.getElementById('userid').value.toLowerCase();
    const errorElement = document.getElementById('passwordError');

    let errors = [];
    if (password.length < 8) errors.push("Minimum 8 characters");
    if (!/[A-Z]/.test(password)) errors.push("1 uppercase letter");
    if (!/[a-z]/.test(password)) errors.push("1 lowercase letter");
    if (!/[0-9]/.test(password)) errors.push("1 number");
    if (password.includes(username)) errors.push("Cannot contain username");

    errorElement.textContent = errors.join(", ");
    return errors.length === 0;
}

// Password Match Validation
function validatePasswordMatch() {
    const password = document.getElementById('password').value;
    const confirm = document.getElementById('confirmpassword').value;
    const errorElement = document.getElementById('confirmpasswordError');

    if (!password || !confirm) {
        errorElement.textContent = "";
        return true;
    }

    if (password !== confirm) {
        errorElement.textContent = "Passwords do not match";
        return false;
    }

    errorElement.textContent = "";
    return true;
}

// Event Listeners
document.getElementById('password').addEventListener('input', function() {
    validatePassword();
    validatePasswordMatch();
});
document.getElementById('confirmpassword').addEventListener('input', validatePasswordMatch);

    // Salary Slider and Label
    const salarySlider = document.getElementById("salary");
    const salaryLabel = document.getElementById("salaryLabel");
    if (salarySlider && salaryLabel) {
        salarySlider.addEventListener("input", () => {
            salaryLabel.textContent = formatCurrency(salarySlider.value);
        });
    }
// Email Validation
document.getElementById('email').addEventListener('input', function() {
    const email = this.value.toLowerCase();
    const errorElement = document.getElementById('emailError');
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    errorElement.textContent = pattern.test(email) ? "" : "Invalid email format";
});

// SSN Auto-Formatting
document.getElementById('ssn').addEventListener('input', function(e) {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 3) val = val.slice(0,3) + '-' + val.slice(3);
    if (val.length > 6) val = val.slice(0,6) + '-' + val.slice(6);
    e.target.value = val.slice(0,11);
});

// Date of Birth Validation
document.getElementById('dob').addEventListener('change', function() {
    const dob = new Date(this.value);
    const today = new Date();
    const minDate = new Date();
    minDate.setFullYear(today.getFullYear() - 120);
    const errorElement = document.getElementById('dobError');

    if (dob > today) {
        errorElement.textContent = "Cannot be future date";
        this.value = "";
    } else if (dob < minDate) {
        errorElement.textContent = "Cannot be older than 120 years";
        this.value = "";
    } else {
        errorElement.textContent = "";
    }
});

    // Home Budget Sliders and Labels
    const minPriceSlider = document.getElementById("minPrice");
    const maxPriceSlider = document.getElementById("maxPrice");
    const minPriceLabel = document.getElementById("minPriceLabel");
    const maxPriceLabel = document.getElementById("maxPriceLabel");

    if (minPriceSlider && maxPriceSlider && minPriceLabel && maxPriceLabel) {
        minPriceSlider.addEventListener("input", () => {
            minPriceLabel.textContent = formatCurrency(minPriceSlider.value);
        });

        maxPriceSlider.addEventListener("input", () => {
            maxPriceLabel.textContent = formatCurrency(maxPriceSlider.value);
        });
    }

    /* Review Button Click (Show Modal with Summary) */
    if (reviewBtn && modal && reviewContent) {
        reviewBtn.addEventListener("click", function () {
            // Validate passwords first
            const password = getValue("password");
            const confirmPassword = getValue("confirmpassword");

            if (password !== confirmPassword) {
                alert("Passwords do not match.");
                return;
            }

            const uid = getValue("userid").toLowerCase();
            if (password.toLowerCase().includes(uid)) {
                alert("Password cannot contain the User ID.");
                return;
            }

            const fname = getValue("firstname").toLowerCase();
            const lname = getValue("lastname").toLowerCase();
            if (password.toLowerCase().includes(fname) || password.toLowerCase().includes(lname)) {
                alert("Password cannot contain your first or last name.");
                return;
            }

            // Validate DOB
            const dobInputVal = getValue("dob");
            if (dobInputVal) {
                const dob = new Date(dobInputVal);
                const today = new Date();
                const maxDOB = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate());
                if (dob > today || dob < maxDOB) {
                    alert("Date of Birth must be within the past 120 years.");
                    return;
                }
            }

            // Create review content
            let zip = getValue("zip");
            zip = zip.includes("-") ? zip.split("-")[0] : zip;
            const phone = getValue("phone");

            const content = `
                <strong>First, MI, Last Name:</strong> ${getValue("firstname")} ${getValue("midinitial")} ${getValue("lastname")}<br>
                <strong>Date of Birth:</strong> ${dobInputVal || "Not provided"}<br>
                <strong>Email:</strong> ${getValue("email")}<br>
                <strong>Phone Number:</strong> ${phone}<br><br>

                <strong>Address:</strong><br>
                ${getValue("address1")}${getValue("address2") ? ", " + getValue("address2") : ""}<br>
                ${getValue("city")}, ${getValue("state")} ${zip}<br><br>

                <strong>Health History:</strong><br>
                ${["chickenpox", "measles", "covid", "smallpox", "tetanus"].map(id => 
                    document.getElementById(id)?.checked ? `${id.charAt(0).toUpperCase() + id.slice(1)}: Y` : `${id.charAt(0).toUpperCase() + id.slice(1)}: N`
                ).join("<br>")}<br><br>

                <strong>Vaccinated?:</strong> ${getSelectedRadio("vaccinated")}<br>
                <strong>Insurance?:</strong> ${getSelectedRadio("insurance")}<br>
                <strong>Health Rating:</strong> ${getValue("range")}<br><br>

                <strong>Desired Salary:</strong> ${formatCurrency(getValue("salary"))}<br>
                <strong>Home Budget:</strong> ${formatCurrency(getValue("minPrice"))} - ${formatCurrency(getValue("maxPrice"))}<br><br>

                <strong>User ID:</strong> ${uid}<br>
                <strong>Password:</strong> (hidden)<br>
            `;

            reviewContent.innerHTML = content;
            modal.style.display = "block";
        });
    }

    // Confirm Submit function
    function confirmSubmit() {
        if (form) form.submit();
    }

    // Close modal when clicking outside
    window.addEventListener("click", function(event) {
        if (event.target === modal) {
            modal.style.display = "none";

    document.getElementById('reviewButton').addEventListener('click', function() {
    if (!isFormValid()) {
        alert("Please fix all errors before reviewing");
        return;
    }

    // Generate review content
    const content = `
        <h4>Please Review Your Information</h4>
        <p><strong>Name:</strong> ${document.getElementById('firstname').value} ${document.getElementById('lastname').value}</p>
        <!-- Add all other fields -->
    `;

    document.getElementById('reviewContent').innerHTML = content;
    document.getElementById('reviewModal').style.display = 'block';
});

    // Final Form Validation
function isFormValid() {
    return validatePassword() && 
           validatePasswordMatch() &&
           document.getElementById('firstname').checkValidity() &&
           document.getElementById('lastname').checkValidity() &&
           document.getElementById('email').checkValidity() &&
           document.getElementById('dob').checkValidity();
}

    // Submit Button Control
    const submitBtn = document.createElement('input');
    submitBtn.type = 'submit';
    submitBtn.value = 'Submit';
    submitBtn.id = 'submitBtn';
    submitBtn.disabled = true;
    document.querySelector('form').appendChild(submitBtn);

    // Enable/Disable Submit Button
    function checkForm() {
        document.getElementById('submitBtn').disabled = !isFormValid();
    }

    // Check form on any input change
    document.querySelectorAll('input, select').forEach(el => {
        el.addEventListener('input', checkForm);
});
        }
    });
});
