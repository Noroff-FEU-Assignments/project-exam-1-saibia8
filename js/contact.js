const successfulMessage = document.querySelector(".successful-form");
const form = document.querySelector("#contactForm");

const personName = document.querySelector("#name");
const personNameError = document.querySelector("#nameError");

const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");

const subject = document.querySelector("#subject");
const subjectError = document.querySelector("#subjectError");

const message = document.querySelector("#message");
const messageError = document.querySelector("#messageError");


function validateForm(event) {
    
   event.preventDefault();

   if(checkLength(personName.value, 4) === true) {
       personNameError.style.display = "none";
   } else {
       personNameError.style.display = "block";
   }
  
   if(validateEmail(email.value) === true) {
       emailError.style.display = "none";
   } else {
       emailError.style.display = "block";
   }

   if(checkLength(subject.value, 14) === true) {
      subjectError.style.display = "none";
  } else {
      subjectError.style.display = "block";
  }

   if(checkLength(message.value, 24) === true) {
       messageError.style.display = "none";
   } else {
       messageError.style.display = "block";
   }
   
   if ((personName.value) && (subject.value.length > 14) &&(message.value.length > 24) && (email.value)) {
       successfulMessage.innerHTML = `<p class="margin-auto text-center">Your message has been sent.</p>`;
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