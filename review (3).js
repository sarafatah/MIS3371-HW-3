/* 
 Name: Sara Fatah
 File: review.js
 Date Created: 06/18/25
 Date Updated: 06/20/25
 Purpose: Redisplay/validate data from a form
*/

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registrationForm");
    const reviewBtn = document.getElementById("reviewButton");
    const modal = document.getElementById("reviewModal");
    const reviewContent = document.getElementById("reviewContent");

    function getValue(id) {
        return document.getElementById(id)?.value || "";
    }

    function getCheckedValues(name) {
        return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map(cb => cb.value).join(", ");
    }

    function getSelectedRadio(name) {
        const selected = document.querySelector(`input[name="${name}"]:checked`);
        return selected ? selected.value : "Not selected";
    }

    reviewBtn.addEventListener("click", function () {
        let uid = getValue("uid");
        uid = uid.toLowerCase();
        document.getElementById("uid").value = uid;
        let password = getValue("pword");
        let confirmPassword = getValue("pword2");
        let userId = getValue("uid");

        if (password !== confirmPassword) {
            alert("❌ Passwords do not match.");
            return;
        }

        if (password.toLowerCase().includes(userId.toLowerCase())) {
            alert("❌ Password cannot contain the User ID.");
            return;
        }

          const fname = getValue("fname").toLowerCase();
          const lname = getValue("lname").toLowerCase();
          
          if (password.toLowerCase().includes(fname) || password.toLowerCase().includes(lname)) {
              alert("❌ Password cannot contain your first or last name.");
              return;
     }

        const dobInput = getValue("dob");
        const dob = new Date(dobInput);
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
            <strong>First, MI, Last Name:</strong> ${getValue("fname")} ${getValue("mname")} ${getValue("lname")}<br>
            <strong>Date of Birth:</strong> ${dobInput}<br>
            <strong>Email:</strong> ${getValue("email")}<br>
            <strong>Phone Number:</strong> ${phone}<br><br>
        
            <strong>Address:</strong><br>
            ${getValue("address1")}${getValue("address2") ? ", " + getValue("address2") : ""}<br>
            ${getValue("city")}, ${getValue("state")} ${zip}<br><br>
        
            <strong>Health History:</strong><br>
            ${["chickenpox", "measles", "covid", "smallpox", "tetanus"].map(id => 
                document.getElementById(id).checked ? `${id.charAt(0).toUpperCase() + id.slice(1)}: Y` : `${id.charAt(0).toUpperCase() + id.slice(1)}: N`
            ).join("<br>")}<br><br>
        
            <strong>Vaccinated?:</strong> ${getSelectedRadio("vaccinated")}<br>
            <strong>Insurance?:</strong> ${getSelectedRadio("insurance")}<br>
            <strong>Health Rating:</strong> ${getValue("range")}<br><br>

            <strong>Desired Salary:</strong> ${new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0
            }).format(getValue("salary"))}<br>
            
            <strong>Home Budget Range:</strong> 
            ${new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0
            }).format(getValue("minPrice"))} – 
            ${new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                maximumFractionDigits: 0
            }).format(getValue("maxPrice"))}<br><br>
        
            <strong>Described Symptoms:</strong><br>${getValue("notes") || "(None)"}<br><br>
        
            <strong>User ID:</strong> ${userId}<br>
            <strong>Password:</strong> ******** (hidden for security)
        `;


        reviewContent.innerHTML = content;
        modal.style.display = "block";
    });

      function updateSalaryLabel(value) {
         const formatted = new Intl.NumberFormat('en-US', {
             style: 'currency',
             currency: 'USD',
             maximumFractionDigits: 0
         }).format(value);
         document.getElementById("salaryLabel").textContent = formatted;
     }

const salarySlider = document.getElementById("salary");
if (salarySlider) {
    salarySlider.addEventListener("input", () => updateSalaryLabel(salarySlider.value));
}

 function formatCurrency(value) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    }).format(value);
}

  const minPriceSlider = document.getElementById("minPrice");
  const maxPriceSlider = document.getElementById("maxPrice");
  
  if (minPriceSlider && maxPriceSlider) {
      minPriceSlider.addEventListener("input", () => {
          document.getElementById("minPriceLabel").textContent = formatCurrency(minPriceSlider.value);
      });
  
      maxPriceSlider.addEventListener("input", () => {
          document.getElementById("maxPriceLabel").textContent = formatCurrency(maxPriceSlider.value);
      });
  }


    window.confirmSubmit = function () {
        modal.style.display = "none";
        document.getElementById("reviewButton").disabled = true;
        form.submit();
    };
});
