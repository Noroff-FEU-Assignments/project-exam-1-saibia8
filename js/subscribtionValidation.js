const form = document.querySelector("#subscriptionForm");

const personName = document.querySelector("#name");
const personNameError = document.querySelector("#nameError");

const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");


function validateForm(event) {
    
   event.preventDefault();

   if(checkLength(personName.value, 2) === true) {
       personNameError.style.display = "none";
   } else {
       personNameError.style.display = "block";
   }
  
   if(validateEmail(email.value) === true) {
       emailError.style.display = "none";
   } else {
       emailError.style.display = "block";
   }
 
   if ((personName.value) && (email.value)) {
       successfulMessage.innerHTML += `<p>Your message has been sent.</p>`;
       successfulMessage.style.display = "block";
   }
   
   form.reset();
}

form.addEventListener("submit", validateForm);

function checkLength(value, minimumLength) {
   if(value.trim().length > minimumLength) {
      return true;
   } else {
      return false;
   }
}

function validateEmail(email) {
   const regEx = /\S+@\S+\.\S+/;
   const patternMatches = regEx.test(email);
   return patternMatches;
}