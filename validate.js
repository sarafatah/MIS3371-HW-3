*advanced editing for first name*/
document.addEventListener("DOMContentLoaded", function () {
  
   let firstnameInput = document.getElementById("firstname");
   let errorMessage = document.getElementById("errorFirstname");




   if (!firstnameInput || !errorMessage) {
       console.error("Error: firstname or errorFirstname not found in the document.");
       return; // Stop the script if elements are missing
   }


   firstnameInput.addEventListener("input", function () {
       let validPattern = /^[a-zA-Z'-]+$/; // Only letters, apostrophes, and dashes allowed


       console.log("User typed:", firstnameInput.value); // Debugging


       // If input contains invalid characters
       if (firstnameInput.value !== "" && !validPattern.test(firstnameInput.value)) {
           errorMessage.textContent = "Only letters, apostrophes, and dashes are allowed!";
           errorMessage.style.display = "block"; // Show error message


           // Remove invalid characters
           firstnameInput.value = firstnameInput.value.replace(/[^a-zA-Z'-]/g, '');
           console.log("Corrected input:", firstnameInput.value); // Debugging
       } else {
           errorMessage.textContent = ""; // Clear error message if valid
           errorMessage.style.display = "none"; // Hide error message
       }
   });
});
/* middle inital advanced editing*/
document.addEventListener("DOMContentLoaded", function () {
   let midInitialInput = document.getElementById("midinitial");
   let errorMessage = document.getElementById("midinitial-error");


   midInitialInput.addEventListener("input", function () {
       let inputValue = midInitialInput.value;
       let validPattern = /^[a-zA-Z]?$/; // Allows one letter or an empty field


       if (!validPattern.test(inputValue)) {
           errorMessage.textContent = "Only one letter is allowed. No numbers or special characters.";
           midInitialInput.value = inputValue.replace(/[^a-zA-Z]/g, '').slice(0, 1);
       } else {
           errorMessage.textContent = ""; // Clear error if input is valid
       }
   });
});
/*last name advanced editing*/
document.addEventListener("DOMContentLoaded", function () {
   let lastNameInput = document.getElementById("lastname");
   let errorMessage = document.getElementById("errorLastname");


   lastNameInput.addEventListener("input", function () {
       let inputValue = lastNameInput.value;
       let validPattern = /^[a-zA-Z'-]*[2-5]?[a-zA-Z'-]*$/; // Allows letters, apostrophes, dashes, and optional 2-5


       if (!validPattern.test(inputValue)) {
           errorMessage.textContent = "Only letters, apostrophes, dashes, and numbers 2-5 are allowed.";
           lastNameInput.value = inputValue.replace(/[^a-zA-Z'-2-5]/g, ''); // Remove invalid characters
       } else {
           errorMessage.textContent = ""; // Clear error if input is valid
       }
   });
});
// Email validation
document.getElementById("email").addEventListener("input", function () {
   let email = this.value.toLowerCase();
   let errorMessage = document.getElementById("emailError");
   let validPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   if (!validPattern.test(email)) {
       errorMessage.textContent = "Enter a valid email format (name@domain.tld)";
   } else {
       errorMessage.textContent = "";
   }
});
function validateAllFields() {
   let errors = 0;


   if (document.getElementById("errorFirstname").textContent !== "") errors++;
   if (document.getElementById("midinitial-error").textContent !== "") errors++;
   if (document.getElementById("errorLastname").textContent !== "") errors++;
   if (document.getElementById("errorDob").textContent !== "") errors++;
   if (document.getElementById("errorSsn").textContent !== "") errors++;
   if (document.getElementById("errorUserid").textContent !== "") errors++;
   if (document.getElementById("errorPassword").textContent !== "") errors++;
   if (document.getElementById("errorConfirmPassword").textContent !== "") errors++;
   if (document.getElementById("emailError") && document.getElementById("emailError").textContent !== "") errors++;


   // Check required fields are not blank
   const requiredFields = ["firstname", "lastname", "dob", "ssn", "address1", "city", "state", "zip", "email", "userid", "password", "confirmPassword"];
   requiredFields.forEach(id => {
       if (!document.getElementById(id).value.trim()) errors++;
   });


   if (errors === 0) {
       document.getElementById("submitBtn").style.display = "inline";
       alert("All fields validated successfully. You can now submit.");
   } else {
       document.getElementById("submitBtn").style.display = "none";
       alert("Please correct the errors before submitting.");
   }
}


/* DOB advanced editing*/
document.addEventListener("DOMContentLoaded", function () {
   let dobInput = document.getElementById("dob");
   let errorMessage = document.getElementById("errorDob");


   function validateDOB() {
       let inputDate = new Date(dobInput.value); // Convert input to Date format
       let today = new Date(); // Get today's date
       let minDate = new Date();
       minDate.setFullYear(today.getFullYear() - 120); // Set minimum date (120 years ago)


       if (dobInput.value === "") {
           errorMessage.textContent = ""; // Allow empty input
           return;
       }


       if (inputDate > today) {
           errorMessage.textContent = "Birthdate cannot be in the future.";
           dobInput.value = ""; // Clear invalid input
       } else if (inputDate < minDate) {
           errorMessage.textContent = "Birthdate cannot be more than 120 years ago.";
           dobInput.value = ""; // Clear invalid input
       } else {
           errorMessage.textContent = ""; // Clear error if valid
       }
   }


   // Validate on input change
   dobInput.addEventListener("change", validateDOB);
});


// SSN
document.addEventListener("DOMContentLoaded", function () {
   let ssnInput = document.getElementById("ssn");
   let errorMessage = document.getElementById("errorSsn");
   let originalSSN = ""; // Stores the full SSN


   ssnInput.addEventListener("input", function () {
       let inputValue = ssnInput.value;


       // Remove non-numeric characters except dashes
       inputValue = inputValue.replace(/[^0-9-]/g, '');


       // Auto-format: Insert dashes at correct positions
       if (inputValue.length > 3 && inputValue.charAt(3) !== '-') {
           inputValue = inputValue.slice(0, 3) + '-' + inputValue.slice(3);
       }
       if (inputValue.length > 6 && inputValue.charAt(6) !== '-') {
           inputValue = inputValue.slice(0, 6) + '-' + inputValue.slice(6);
       }


       // Ensure max length of 11 characters (XXX-XX-XXXX)
       inputValue = inputValue.slice(0, 11);
       ssnInput.value = inputValue;


       originalSSN = inputValue;


       // Validate format
       let validPattern = /^\d{3}-\d{2}-\d{4}$/; // Ensures correct format
       if (!validPattern.test(inputValue) && inputValue.length === 11) {
           errorMessage.textContent = "Invalid SSN format. Use XXX-XX-XXXX.";
       } else {
           errorMessage.textContent = ""; // Clear error if valid
       }
   });


   // Hide SSN after typing (on blur)
   ssnInput.addEventListener("blur", function () {
       if (originalSSN.length === 11) { // If full SSN exists
           ssnInput.value = "•••-••-" + originalSSN.slice(-4); // Show only last 4 digits
       }
   });


   // Restore full SSN when clicked (on focus)
   ssnInput.addEventListener("focus", function () {
       if (originalSSN.length === 11) { // If full SSN exists
           ssnInput.value = originalSSN; // Restore full SSN for editing
       }
   });
});
/* States drop down*/
document.addEventListener("DOMContentLoaded", function () {
   let stateSelect = document.getElementById("state");
   let errorMessage = document.getElementById("errorState");


   // Directly store the states as an array inside the JavaScript file
   let states = [
       { "code": "AL", "name": "Alabama" },
       { "code": "AK", "name": "Alaska" },
       { "code": "AZ", "name": "Arizona" },
       { "code": "AR", "name": "Arkansas" },
       { "code": "CA", "name": "California" },
       { "code": "CO", "name": "Colorado" },
       { "code": "CT", "name": "Connecticut" },
       { "code": "DE", "name": "Delaware" },
       { "code": "FL", "name": "Florida" },
       { "code": "GA", "name": "Georgia" },
       { "code": "HI", "name": "Hawaii" },
       { "code": "ID", "name": "Idaho" },
       { "code": "IL", "name": "Illinois" },
       { "code": "IN", "name": "Indiana" },
       { "code": "IA", "name": "Iowa" },
       { "code": "KS", "name": "Kansas" },
       { "code": "KY", "name": "Kentucky" },
       { "code": "LA", "name": "Louisiana" },
       { "code": "ME", "name": "Maine" },
       { "code": "MD", "name": "Maryland" },
       { "code": "MA", "name": "Massachusetts" },
       { "code": "MI", "name": "Michigan" },
       { "code": "MN", "name": "Minnesota" },
       { "code": "MS", "name": "Mississippi" },
       { "code": "MO", "name": "Missouri" },
       { "code": "MT", "name": "Montana" },
       { "code": "NE", "name": "Nebraska" },
       { "code": "NV", "name": "Nevada" },
       { "code": "NH", "name": "New Hampshire" },
       { "code": "NJ", "name": "New Jersey" },
       { "code": "NM", "name": "New Mexico" },
       { "code": "NY", "name": "New York" },
       { "code": "NC", "name": "North Carolina" },
       { "code": "ND", "name": "North Dakota" },
       { "code": "OH", "name": "Ohio" },
       { "code": "OK", "name": "Oklahoma" },
       { "code": "OR", "name": "Oregon" },
       { "code": "PA", "name": "Pennsylvania" },
       { "code": "RI", "name": "Rhode Island" },
       { "code": "SC", "name": "South Carolina" },
       { "code": "SD", "name": "South Dakota" },
       { "code": "TN", "name": "Tennessee" },
       { "code": "TX", "name": "Texas" },
       { "code": "UT", "name": "Utah" },
       { "code": "VT", "name": "Vermont" },
       { "code": "VA", "name": "Virginia" },
       { "code": "WA", "name": "Washington" },
       { "code": "WV", "name": "West Virginia" },
       { "code": "WI", "name": "Wisconsin" },
       { "code": "WY", "name": "Wyoming" },
       { "code": "DC", "name": "District of Columbia" },
       { "code": "PR", "name": "Puerto Rico" }
   ];


   // Populate the dropdown list
   states.forEach(state => {
       let option = document.createElement("option");
       option.value = state.code; // Store only the 2-letter state code
       option.textContent = state.name;
       stateSelect.appendChild(option);
   });


   // Validation: Ensure a state is selected
   stateSelect.addEventListener("change", function () {
       if (stateSelect.value === "") {
           errorMessage.textContent = "Please select a valid state.";
       } else {
           errorMessage.textContent = "";
       }
   });
});
// zip code
document.addEventListener("DOMContentLoaded", function () {
   let zipInput = document.getElementById("zip");
   let errorMessage = document.getElementById("errorZip");


   zipInput.addEventListener("input", function () {
       let inputValue = zipInput.value;


       // Remove non-numeric characters except a single dash (-)
       inputValue = inputValue.replace(/[^0-9-]/g, '');


       // Ensure only one dash, and it must be after the first 5 digits
       if (inputValue.includes('-')) {
           inputValue = inputValue.replace(/-/g, ''); // Remove all dashes
           if (inputValue.length > 5) {
               inputValue = inputValue.slice(0, 5) + '-' + inputValue.slice(5);
           }
       }


       // Truncate input to 10 characters max (ZIP+4 format)
       inputValue = inputValue.slice(0, 10);


       // Set formatted value back to the input field
       zipInput.value = inputValue;


       // Validate ZIP format: 5-digit or ZIP+4 (5-4 format)
       let validPattern = /^\d{5}(-\d{0,4})?$/;
       if (!validPattern.test(inputValue)) {
           errorMessage.textContent = "ZIP code must be 5 digits or in ZIP+4 format (12345 or 12345-6789).";
       } else {
           errorMessage.textContent = ""; // Clear error if valid
       }
   });
});
document.addEventListener("DOMContentLoaded", function () {
   let userIdInput = document.getElementById("userid");
   let errorMessage = document.getElementById("errorUserid");


   userIdInput.addEventListener("input", function () {
       let inputValue = userIdInput.value;


       // Remove invalid characters (only letters, numbers, underscores, dashes)
       inputValue = inputValue.replace(/[^a-zA-Z0-9_-]/g, '');


       // Ensure first character is NOT a number
       if (/^\d/.test(inputValue)) {
           errorMessage.textContent = "User ID cannot start with a number.";
           inputValue = inputValue.replace(/^\d/, '');
       } else {
           errorMessage.textContent = "";
       }


       // Ensure no spaces
       inputValue = inputValue.replace(/\s/g, '');


       // Limit length to 30 characters
       inputValue = inputValue.slice(0, 30);


       // Update the input field
       userIdInput.value = inputValue;
   });


   // Convert to lowercase on form submission
   document.getElementById("userInfo").addEventListener("submit", function (event) {
       userIdInput.value = userIdInput.value.toLowerCase();


       // Final validation before submitting
       if (userIdInput.value.length < 5) {
           errorMessage.textContent = "User ID must be at least 5 characters long.";
           event.preventDefault(); // Prevent form submission
       }
   });
});
document.addEventListener("DOMContentLoaded", function () {
   let passwordInput = document.getElementById("password");
   let confirmPasswordInput = document.getElementById("confirmPassword");
   let userIdInput = document.getElementById("userid");
   let errorPassword = document.getElementById("errorPassword");
   let errorConfirmPassword = document.getElementById("errorConfirmPassword");


   function validatePassword() {
       let password = passwordInput.value;
       let userId = userIdInput.value.toLowerCase(); // Ensure case-insensitive check
       let errorMessage = "";


       // Check password length
       if (password.length < 8 || password.length > 30) {
           errorMessage = "Password must be between 8 and 30 characters long.";
       }


       // Check for required character types
       if (!/[A-Z]/.test(password)) {
           errorMessage = "Password must contain at least one uppercase letter.";
       }
       if (!/[a-z]/.test(password)) {
           errorMessage = "Password must contain at least one lowercase letter.";
       }
       if (!/[0-9]/.test(password)) {
           errorMessage = "Password must contain at least one number.";
       }
       if (!/[!@#%^&*()\-_+=\/><.,~]/.test(password)) {
           errorMessage = "Password must contain at least one special character.";
       }
       if (/['"]/.test(password)) {
           errorMessage = "Password cannot contain quotes.";
       }


       // Ensure password is not the same as user ID or contains part of it
       if (userId && password.toLowerCase().includes(userId)) {
           errorMessage = "Password cannot contain or be the same as your User ID.";
       }


       // Display error message if invalid
       errorPassword.textContent = errorMessage;
       return errorMessage === ""; // Return true if valid
   }


   function validateConfirmPassword() {
       let password = passwordInput.value;
       let confirmPassword = confirmPasswordInput.value;


       if (confirmPassword !== password) {
           errorConfirmPassword.textContent = "Passwords do not match.";
           return false;
       } else {
           errorConfirmPassword.textContent = "";
           return true;
       }
   }


   // Validate password on input
   passwordInput.addEventListener("input", validatePassword);
   confirmPasswordInput.addEventListener("input", validateConfirmPassword);


   // Prevent form submission if password is invalid
   document.getElementById("userInfo").addEventListener("submit", function (event) {
       if (!validatePassword() || !validateConfirmPassword()) {
           event.preventDefault(); // Prevent form submission
           alert("Please correct the password errors before submitting.");
       }
   });
});


// POP UP MODAL
document.addEventListener("DOMContentLoaded", function () {
   let form = document.getElementById("userInfo");
   let modal = document.getElementById("confirmationModal");
   let modalContent = document.getElementById("modalContent");
   let closeModal = document.getElementById("closeModal");


   form.addEventListener("submit", function (event) {
       event.preventDefault(); // Stop page refresh


       // Debugging: Ensure JavaScript is running
       console.log("Submit button clicked! Preventing default submission.");


       // Get values from form fields
       let firstName = document.getElementById("firstname").value;
       let middleInitial = document.getElementById("midinitial").value || "N/A";
       let lastName = document.getElementById("lastname").value;
       let dob = document.getElementById("dob").value;
       let ssn = document.getElementById("ssn").value.replace(/\d(?=\d{4})/g, "*"); // Hide all but last 4 digits
       let phone = document.getElementById("phone").value;
       let address = document.getElementById("address1").value + ", " +
                     document.getElementById("city").value + ", " +
                     document.getElementById("state").value + " " +
                     document.getElementById("zip").value;


       let userId = document.getElementById("userid").value;
       let password = document.getElementById("password").value.replace(/./g, "*"); // Hide password


       // Populate modal content
       modalContent.innerHTML = `
           <h2>Confirmation Details</h2>
           <p><strong>First Name:</strong> ${firstName}</p>
           <p><strong>Middle Initial:</strong> ${middleInitial}</p>
           <p><strong>Last Name:</strong> ${lastName}</p>
           <p><strong>Date of Birth:</strong> ${dob}</p>
           <p><strong>SSN:</strong> <span id="ssnDisplay">${ssn}</span>
               <button onclick="toggleVisibility('ssnDisplay', '${document.getElementById("ssn").value}')">Show</button>
           </p>
           <p><strong>Phone Number:</strong> ${phone}</p>
           <p><strong>Address:</strong> ${address}</p>
           <p><strong>User ID:</strong> ${userId}</p>
           <p><strong>Password:</strong> <span id="passwordDisplay">${password}</span>
               <button onclick="toggleVisibility('passwordDisplay', '${document.getElementById("password").value}')">Show</button>
           </p>
           <button onclick="submitFinalForm()">Confirm & Submit</button>
       `;


       // Ensure modal is triggered
       console.log("Displaying modal...");
       modal.style.display = "block";
   });


   // Close modal when clicking "Close" button
   closeModal.addEventListener("click", function () {
       console.log("Closing modal...");
       modal.style.display = "none";
   });


   // Function to toggle hidden values
   window.toggleVisibility = function (elementId, originalValue) {
       let element = document.getElementById(elementId);
       element.textContent = element.textContent.includes("*") ? originalValue : originalValue.replace(/./g, "*");
   };


   window.submitFinalForm = function () {
       console.log("Form confirmed, redirecting to thank you page...");
       modal.style.display = "none";
      window.location.href = "thankyouHW3.html";
   };
});
// double checking validation forms
document.addEventListener("DOMContentLoaded", function () {
   document.getElementById("validateBtn").addEventListener("click", function () {
       let errors = 0;




       // Gather error IDs
       const errorIds = [
           "errorFirstname", "midinitial-error", "errorLastname",
           "errorDob", "errorSsn", "errorUserid",
           "errorPassword", "errorConfirmPassword", "errorZip", "errorState", "emailError"
       ];


       // Count existing error messages
       errorIds.forEach(id => {
           let el = document.getElementById(id);
           if (el && el.textContent.trim() !== "") errors++;
       });


       // Check required fields are not blank
       const requiredFields = [
           "firstname", "lastname", "dob", "ssn", "address1",
           "city", "state", "zip", "email", "userid", "password", "confirmPassword"
       ];


       requiredFields.forEach(id => {
           let el = document.getElementById(id);
           if (el && el.value.trim() === "") errors++;
       });


       // Show/hide submit button
       if (errors === 0) {
           document.getElementById("submitBtn").style.display = "inline";
           alert("All fields are valid. You can now submit.");
       } else {
           document.getElementById("submitBtn").style.display = "none";
           alert("Please fix all errors before submitting.");
       }
   });
});
