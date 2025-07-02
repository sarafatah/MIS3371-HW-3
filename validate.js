/*
 Name: Sara Fatah
 Date Created: 06/18/25
 Date Updated: 07/01/25
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
    const form = document.getElementById("userInfo") || document.getElementById("registrationForm");
    const reviewBtn = document.getElementById("reviewButton");
    const modal = document.getElementById("reviewModal") || document.getElementById("confirmationModal");
    const reviewContent = document.getElementById("reviewContent") || document.getElementById("modalContent");

    /* ========== Input Validations ========== */

    // First Name
    const firstnameInput = document.getElementById("firstname");
    const firstnameError = document.getElementById("errorFirstname");
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
    const midInitialError = document.getElementById("midinitial-error");
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
    const lastNameError = document.getElementById("errorLastname");
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
    const dobError = document.getElementById("errorDob");
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
    const ssnError = document.getElementById("errorSsn");
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
    }

    // State Dropdown
    const stateSelect = document.getElementById("state");
    const stateError = document.getElementById("errorState");
    if (stateSelect && stateError) {
        // Populate states dropdown once
                      const states = [
                { code: "AL", name: "Alabama" },
                { code: "AK", name: "Alaska" },
                { code: "AZ", name: "Arizona" },
                { code: "AR", name: "Arkansas" },
                { code: "CA", name: "California" },
                { code: "CO", name: "Colorado" },
                { code: "CT", name: "Connecticut" },
                { code: "DE", name: "Delaware" },
                { code: "FL", name: "Florida" },
                { code: "GA", name: "Georgia" },
                { code: "HI", name: "Hawaii" },
                { code: "ID", name: "Idaho" },
                { code: "IL", name: "Illinois" },
                { code: "IN", name: "Indiana" },
                { code: "IA", name: "Iowa" },
                { code: "KS", name: "Kansas" },
                { code: "KY", name: "Kentucky" },
                { code: "LA", name: "Louisiana" },
                { code: "ME", name: "Maine" },
                { code: "MD", name: "Maryland" },
                { code: "MA", name: "Massachusetts" },
                { code: "MI", name: "Michigan" },
                { code: "MN", name: "Minnesota" },
                { code: "MS", name: "Mississippi" },
                { code: "MO", name: "Missouri" },
                { code: "MT", name: "Montana" },
                { code: "NE", name: "Nebraska" },
                { code: "NV", name: "Nevada" },
                { code: "NH", name: "New Hampshire" },
                { code: "NJ", name: "New Jersey" },
                { code: "NM", name: "New Mexico" },
                { code: "NY", name: "New York" },
                { code: "NC", name: "North Carolina" },
                { code: "ND", name: "North Dakota" },
                { code: "OH", name: "Ohio" },
                { code: "OK", name: "Oklahoma" },
                { code: "OR", name: "Oregon" },
                { code: "PA", name: "Pennsylvania" },
                { code: "RI", name: "Rhode Island" },
                { code: "SC", name: "South Carolina" },
                { code: "SD", name: "South Dakota" },
                { code: "TN", name: "Tennessee" },
                { code: "TX", name: "Texas" },
                { code: "UT", name: "Utah" },
                { code: "VT", name: "Vermont" },
                { code: "VA", name: "Virginia" },
                { code: "WA", name: "Washington" },
                { code: "WV", name: "West Virginia" },
                { code: "WI", name: "Wisconsin" },
                { code: "WY", name: "Wyoming" },
                { code: "DC", name: "District of Columbia" },
                { code: "PR", name: "Puerto Rico" }
              ];

        // Populate once
        if (stateSelect.options.length === 0) {
            states.forEach(s => {
                const option = document.createElement("option");
                option.value = s.code;
                option.textContent = s.name;
                stateSelect.appendChild(option);
            });
        }
        stateSelect.addEventListener("change", function () {
            stateError.textContent = stateSelect.value === "" ? "Please select a valid state." : "";
        });
    }

    // ZIP Code
    const zipInput = document.getElementById("zip");
    const zipError = document.getElementById("errorZip");
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
    const userIdError = document.getElementById("errorUserid");
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
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const errorPassword = document.getElementById("errorPassword");
    const errorConfirmPassword = document.getElementById("errorConfirmPassword");

    function validatePassword() {
        const password = passwordInput.value;
        const userId = userIdInput.value.toLowerCase();
        let errorMessage = "";

        if (password.length < 8 || password.length > 30) errorMessage = "Password must be between 8 and 30 characters long.";
        else if (!/[A-Z]/.test(password)) errorMessage = "Password must contain at least one uppercase letter.";
        else if (!/[a-z]/.test(password)) errorMessage = "Password must contain at least one lowercase letter.";
        else if (!/[0-9]/.test(password)) errorMessage = "Password must contain at least one number.";
        else if (!/[!@#%^&*()\-_+=\/><.,~]/.test(password)) errorMessage = "Password must contain at least one special character.";
        else if (/['"]/.test(password)) errorMessage = "Password cannot contain quotes.";
        else if (userId && password.toLowerCase().includes(userId)) errorMessage = "Password cannot contain or be the same as your User ID.";

        errorPassword.textContent = errorMessage;
        return errorMessage === "";
    }

    function validateConfirmPassword() {
        const valid = confirmPasswordInput.value === passwordInput.value;
        errorConfirmPassword.textContent = valid ? "" : "Passwords do not match.";
        return valid;
    }

    if (passwordInput && confirmPasswordInput && errorPassword && errorConfirmPassword) {
        passwordInput.addEventListener("input", validatePassword);
        confirmPasswordInput.addEventListener("input", validateConfirmPassword);
        form.addEventListener("submit", function (event) {
            if (!validatePassword() || !validateConfirmPassword()) {
                alert("Please correct the password errors before submitting.");
                event.preventDefault();
            }
        });
    }

    // Salary Slider and Label
    const salarySlider = document.getElementById("salary");
    if (salarySlider) {
        const salaryLabel = document.getElementById("salaryLabel");
        salarySlider.addEventListener("input", () => {
            if (salaryLabel) salaryLabel.textContent = formatCurrency(salarySlider.value);
        });
    }

    // Home Budget Sliders and Labels
    const minPriceSlider = document.getElementById("minPrice");
    const maxPriceSlider = document.getElementById("maxPrice");
    if (minPriceSlider && maxPriceSlider) {
        const minPriceLabel = document.getElementById("minPriceLabel");
        const maxPriceLabel = document.getElementById("maxPriceLabel");

        minPriceSlider.addEventListener("input", () => {
            if (minPriceLabel) minPriceLabel.textContent = formatCurrency(minPriceSlider.value);
        });
        maxPriceSlider.addEventListener("input", () => {
            if (maxPriceLabel) maxPriceLabel.textContent = formatCurrency(maxPriceSlider.value);
        });
    }

    /* ========== Review Button Click (Show Modal with Summary) ========== */
    if (reviewBtn && modal && reviewContent) {
        reviewBtn.addEventListener("click", function () {
            let uid = getValue("userid").toLowerCase();
            document.getElementById("userid").value = uid;

            let password = getValue("password");
            let confirmPassword = getValue("confirmPassword");

            if (password !== confirmPassword) {
                alert("❌ Passwords do not match.");
                return;
            }
            if (password.toLowerCase().includes(uid)) {
                alert("❌ Password cannot contain the User ID.");
                return;
            }

            const fname = getValue("firstname").toLowerCase();
            const lname = getValue("lastname").toLowerCase();
            if (password.toLowerCase().includes(fname) || password.toLowerCase().includes(lname)) {
                alert("❌ Password cannot contain your first or last name.");
                return;
            }

            const dobInputVal = getValue("dob");
            const dob = new Date(dobInputVal);
            const today = new Date();
            const maxDOB = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate());
            if (dob > today || dob < maxDOB) {
                alert("❌ Date of Birth must be within the past 120 years.");
                return;
            }

            let zip = getValue("zip");
            zip = zip.includes("-") ? zip.split("-")[0] : zip;
            const phone = getValue("phone");

            const content = `
                <strong>First, MI, Last Name:</strong> ${getValue("firstname")} ${getValue("midinitial")} ${getValue("lastname")}<br>
                <strong>Date of Birth:</strong> ${dobInputVal}<br>
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

            // Show modal (assuming a Bootstrap modal or similar)
            if (typeof bootstrap !== "undefined") {
                const bsModal = new bootstrap.Modal(modal);
                bsModal.show();
            } else {
                modal.style.display = "block";
            }
        });
    }
 
    function confirmSubmit() {
    const form = document.getElementById("registrationForm");
    if (form) form.submit();
}

    
    /* Modal Close Handling */
    const modalCloseButtons = modal ? modal.querySelectorAll(".close, .btn-close, .close-modal") : [];
    modalCloseButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            if (typeof bootstrap !== "undefined") {
                const bsModal = bootstrap.Modal.getInstance(modal);
                if (bsModal) bsModal.hide();
            } else {
                modal.style.display = "none";
            }
        });
    });

});
