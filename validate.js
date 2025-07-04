/*
 Name: Sara Fatah
 Date Created: 06/18/25
 Date Updated: 07/03/25
 Purpose: Validate form fields, display review modal, and handle form submission
*/


    window.confirmSubmit = function () {
        modal.style.display = "none";
        document.getElementById("reviewButton").disabled = true;
        form.submit();
    };
});
