/*
Name: Sara Fatah
Date created: 06/10/2025
Date last edited: 06/20/2025
Version: 2.0
Description: Homework 3 JS 
*/

//dynamic date js code
const d = new Date();
let text = d.toLocaleDateString();
document.getElementById("today").innerHTML = text; 

//name slider js code
let slider = document.getElementById("range");
let output = document.getElementById("range-slider");
output.innerHTML = slider.value;

slider.oninput = function () {
    output.innerHTML = this.value;
};

document.addEventListener("DOMContentLoaded", () => {
    const dobInput = document.getElementById("dob");
    const today = new Date();
    const max = today.toISOString().split("T")[0];
    const min = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate()).toISOString().split("T")[0];

    dobInput.setAttribute("min", min);
    dobInput.setAttribute("max", max);
});
