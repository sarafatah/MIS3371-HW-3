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
    const validateBtn = document.getElementById("validateButton");
    const submitBtn = document.getElementById("submitButton");
    const reviewBtn = document.getElementById("reviewButton");
    const modal = document.getElementById("reviewModal");
    const reviewContent = document.getElementById("reviewContent");

    // Initially hide submit button and disable review button
    submitBtn.style.display = "none";
    reviewBtn.disabled = true;

    /* ========== Input Validations ========== */
    
    // Cache all input and error elements
    const firstnameInput = document.getElementById("firstname");
    const firstnameError = document.getElementById("firstnameError");
    const midInitialInput = document.getElementById("midinitial");
    const midInitialError = document.getElementById("midinitialError");
    const lastNameInput = document.getElementById("lastname");
    const lastNameError = document.getElementById("lastnameError");
    const emailInput = document.getElementById("email");
    const emailError = document.getElementById("emailError");
    const dobInput = document.getElementById("dob");
    const dobError = document.getElementById("dobError");
    const ssnInput = document.getElementById("ssn");
    const ssnError = document.getElementById("ssnError");
    const zipInput = document.getElementById("zip");
    const zipError = document.getElementById("zipError");
    const address1Input = document.getElementById("address1");
    const address1Error = document.getElementById("address1Error");
    const cityInput = document.getElementById("city");
    const cityError = document.getElementById("cityError");
    const stateInput = document.getElementById("state");
    const stateError = document.getElementById("stateError");
    const userIdInput = document.getElementById("userid");
    const userIdError = document.getElementById("useridError");
    const passwordInput = document.getElementById("password");
    const passwordError = document.getElementById("passwordError");
    const confirmPasswordInput = document.getElementById("confirmpassword");
    const confirmPasswordError = document.getElementById("confirmpasswordError");
    const salarySlider = document.getElementById("salary");
    const salaryLabel = document.getElementById("salaryLabel");
    const minPriceSlider = document.getElementById("minPrice");
    const minPriceLabel = document.getElementById("minPriceLabel");
    const maxPriceSlider = document.getElementById("maxPrice");
    const maxPriceLabel = document.getElementById("maxPriceLabel");

    /* ========== VALIDATION FUNCTIONS ========== */

    function validateFirstName() {
        const value = firstnameInput.value.trim();
        const pattern = /^[a-zA-Z'-]+$/;
        
        if (!value) {
            firstnameError.textContent = "First name is required";
            return false;
        }
        if (!pattern.test(value)) {
            firstnameError.textContent = "Only letters, apostrophes, and dashes allowed";
            return false;
        }
        firstnameError.textContent = "";
        return true;
    }

    function validateMiddleInitial() {
        const value = midInitialInput.value.trim();
        
        if (value && !/^[a-zA-Z]$/.test(value)) {
            midInitialError.textContent = "Must be a single letter";
            return false;
        }
        midInitialError.textContent = "";
        return true;
    }

    function validateLastName() {
        const value = lastNameInput.value.trim();
        const pattern = /^[a-zA-Z'-]*[2-5]?[a-zA-Z'-]*$/;
        
        if (!value) {
            lastNameError.textContent = "Last name is required";
            return false;
        }
        if (!pattern.test(value)) {
            lastNameError.textContent = "Only letters, apostrophes, dashes, and numbers 2-5 allowed";
            return false;
        }
        lastNameError.textContent = "";
        return true;
    }

    function validateEmail() {
        let value = emailInput.value.trim().toLowerCase();
        emailInput.value = value; // Force lowercase
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!value) {
            emailError.textContent = "Email is required";
            return false;
        }
        if (!pattern.test(value)) {
            emailError.textContent = "Invalid email format";
            return false;
        }
        emailError.textContent = "";
        return true;
    }

    function validateDOB() {
        const value = dobInput.value;
        if (!value) return true; // Optional field
        
        const dob = new Date(value);
        const today = new Date();
        const minDate = new Date();
        minDate.setFullYear(today.getFullYear() - 120);
        
        if (dob > today) {
            dobError.textContent = "Birthdate cannot be in the future";
            return false;
        }
        if (dob < minDate) {
            dobError.textContent = "Birthdate cannot be more than 120 years ago";
            return false;
        }
        dobError.textContent = "";
        return true;
    }

    function validateSSN() {
        const value = ssnInput.value.replace(/-/g, '');
        if (!value) return true; // Optional field
        
        if (value.length !== 9) {
            ssnError.textContent = "SSN must be 9 digits";
            return false;
        }
        ssnError.textContent = "";
        return true;
    }

    function validateZip() {
        const value = zipInput.value.replace(/-/g, '');
        if (!value) return true; // Optional field
        
        if (value.length !== 5 && value.length !== 9) {
            zipError.textContent = "ZIP must be 5 or 9 digits";
            return false;
        }
        zipError.textContent = "";
        return true;
    }

    function validateAddress1() {
        const value = address1Input.value.trim();
        
        if (!value) {
            address1Error.textContent = "Address is required";
            return false;
        }
        address1Error.textContent = "";
        return true;
    }

    function validateCity() {
        const value = cityInput.value.trim();
        const pattern = /^[a-zA-Z\s'-]+$/;
        
        if (!value) {
            cityError.textContent = "City is required";
            return false;
        }
        if (!pattern.test(value)) {
            cityError.textContent = "Only letters, spaces, apostrophes and hyphens allowed";
            return false;
        }
        cityError.textContent = "";
        return true;
    }

    function validateState() {
        const value = stateInput.value;
        
        if (!value) {
            stateError.textContent = "State is required";
            return false;
        }
        stateError.textContent = "";
        return true;
    }

    function validateUserId() {
        const value = userIdInput.value.trim().toLowerCase();
        userIdInput.value = value; // Force lowercase
        const pattern = /^[a-zA-Z][a-zA-Z0-9_-]{4,29}$/;
        
        if (!value) {
            userIdError.textContent = "User ID is required";
            return false;
        }
        if (!pattern.test(value)) {
            userIdError.textContent = "5-30 chars, start with letter, only letters, numbers, _ and -";
            return false;
        }
        userIdError.textContent = "";
        return true;
    }

    function validatePassword() {
        const value = passwordInput.value;
        const userId = userIdInput.value.toLowerCase();
        const fname = firstnameInput.value.toLowerCase();
        const lname = lastNameInput.value.toLowerCase();
        
        if (!value) {
            passwordError.textContent = "Password is required";
            return false;
        }
        if (value.length < 8 || value.length > 30) {
            passwordError.textContent = "Password must be 8-30 characters";
            return false;
        }
        if (!/[A-Z]/.test(value)) {
            passwordError.textContent = "Need at least one uppercase letter";
            return false;
        }
        if (!/[a-z]/.test(value)) {
            passwordError.textContent = "Need at least one lowercase letter";
            return false;
        }
        if (!/[0-9]/.test(value)) {
            passwordError.textContent = "Need at least one number";
            return false;
        }
        if (!/[!@#$%^&*]/.test(value)) {
            passwordError.textContent = "Need at least one special character (!@#$%^&*)";
            return false;
        }
        if (value.toLowerCase().includes(userId)) {
            passwordError.textContent = "Cannot contain your User ID";
            return false;
        }
        if (value.toLowerCase().includes(fname)) {
            passwordError.textContent = "Cannot contain your first name";
            return false;
        }
        if (value.toLowerCase().includes(lname)) {
            passwordError.textContent = "Cannot contain your last name";
            return false;
        }
        passwordError.textContent = "";
        return true;
    }

    function validateConfirmPassword() {
        const value = confirmPasswordInput.value;
        
        if (!value) {
            confirmPasswordError.textContent = "Please confirm your password";
            return false;
        }
        if (value !== passwordInput.value) {
            confirmPasswordError.textContent = "Passwords do not match";
            return false;
        }
        confirmPasswordError.textContent = "";
        return true;
    }

    /* ========== VALIDATE BUTTON FUNCTIONALITY ========== */
    validateBtn.addEventListener("click", function(e) {
        e.preventDefault();
        
        const allValid = validateAllFields();
        submitBtn.style.display = allValid ? "block" : "none";
        reviewBtn.disabled = !allValid;
        
        if (allValid) {
            alert("All fields are valid! You may now submit or review the form.");
        } else {
            alert("Please fix the highlighted errors before proceeding.");
            const firstError = document.querySelector('.error:not(:empty)');
            if (firstError) firstError.scrollIntoView({ behavior: 'smooth' });
        }
    });

    function validateAllFields() {
        let allValid = true;
        
        // Required fields
        if (!validateFirstName()) allValid = false;
        if (!validateLastName()) allValid = false;
        if (!validateEmail()) allValid = false;
        if (!validateAddress1()) allValid = false;
        if (!validateCity()) allValid = false;
        if (!validateState()) allValid = false;
        if (!validateUserId()) allValid = false;
        if (!validatePassword()) allValid = false;
        if (!validateConfirmPassword()) allValid = false;
        
        // Optional fields (only validate if not empty)
        if (midInitialInput.value && !validateMiddleInitial()) allValid = false;
        if (dobInput.value && !validateDOB()) allValid = false;
        if (ssnInput.value && !validateSSN()) allValid = false;
        if (zipInput.value && !validateZip()) allValid = false;
        
        return allValid;
    }

    /* ========== REVIEW MODAL FUNCTIONALITY ========== */
    reviewBtn.addEventListener("click", function () {
        if (!validateAllFields()) {
            alert("Please fix all errors before reviewing");
            return;
        }

        // Create review content
        let zip = getValue("zip");
        zip = zip.includes("-") ? zip.split("-")[0] : zip;
        const phone = getValue("phone");

        const content = `
            <strong>First, MI, Last Name:</strong> ${getValue("firstname")} ${getValue("midinitial")} ${getValue("lastname")}<br>
            <strong>Date of Birth:</strong> ${getValue("dob") || "Not provided"}<br>
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

            <strong>User ID:</strong> ${getValue("userid").toLowerCase()}<br>
            <strong>Password:</strong> (hidden)<br>
        `;

        reviewContent.innerHTML = content;
        modal.style.display = "block";
    });

    /* ========== FORM SUBMISSION ========== */
    form.addEventListener("submit", function(e) {
        if (!validateAllFields()) {
            e.preventDefault();
            alert("Please fix all errors before submitting.");
        }
    });

    // Close modal when clicking outside
    window.addEventListener("click", function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    // Confirm submit function
    window.confirmSubmit = function () {
        if (validateAllFields()) {
            modal.style.display = "none";
            reviewBtn.disabled = true;
            form.submit();
        } else {
            alert("Please fix all errors before submitting.");
        }
    };

    /* ========== INPUT EVENT LISTENERS ========== */
    // First Name
    firstnameInput?.addEventListener("input", validateFirstName);
    
    // Middle Initial
    midInitialInput?.addEventListener("input", validateMiddleInitial);
    
    // Last Name
    lastNameInput?.addEventListener("input", validateLastName);
    
    // Email
    emailInput?.addEventListener("input", validateEmail);
    
    // DOB
    dobInput?.addEventListener("change", validateDOB);
    
    // SSN
    ssnInput?.addEventListener("input", function(e) {
        let val = e.target.value.replace(/\D/g, '');
        if (val.length > 3) val = val.slice(0,3) + '-' + val.slice(3);
        if (val.length > 6) val = val.slice(0,6) + '-' + val.slice(6);
        ssnInput.value = val.slice(0,11);
    });
    
    // ZIP Code
    zipInput?.addEventListener("input", function() {
        let val = zipInput.value.replace(/\D/g, '');
        if (val.length > 5) val = val.slice(0,5) + '-' + val.slice(5);
        zipInput.value = val.slice(0,10);
    });
    
    // Address Line 1
    address1Input?.addEventListener("input", validateAddress1);
    
    // City
    cityInput?.addEventListener("input", validateCity);
    
    // State
    stateInput?.addEventListener("change", validateState);
    
    // User ID
    userIdInput?.addEventListener("input", validateUserId);
    
    // Password
    passwordInput?.addEventListener("input", function() {
        validatePassword();
        validateConfirmPassword();
    });
    
    // Confirm Password
    confirmPasswordInput?.addEventListener("input", validateConfirmPassword);
    
    // Salary Slider
    salarySlider?.addEventListener("input", () => {
        salaryLabel.textContent = formatCurrency(salarySlider.value);
    });
    
    // Home Budget Sliders
    minPriceSlider?.addEventListener("input", () => {
        minPriceLabel.textContent = formatCurrency(minPriceSlider.value);
    });
    
    maxPriceSlider?.addEventListener("input", () => {
        maxPriceLabel.textContent = formatCurrency(maxPriceSlider.value);
    });
});
