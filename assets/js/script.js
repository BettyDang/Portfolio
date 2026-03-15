/* ===============================
   CONTACT FORM VALIDATION
=================================*/

$(document).ready(function () {

  const form = $("#contact-form");

  function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  form.submit(function (e) {
    e.preventDefault();

    const name = $('input[name="name"]').val().trim();
    const email = $('input[name="email"]').val().trim();
    const subject = $('input[name="subject"]').val().trim();
    const message = $('textarea[name="message"]').val().trim();

    if (!name) {
      alert("Please enter your name");
      return;
    }

    if (!email || !validateEmail(email)) {
      alert("Please enter a valid email");
      return;
    }

    if (!subject) {
      alert("Please enter a subject");
      return;
    }

    if (!message) {
      alert("Please enter a message");
      return;
    }

    showCookieConsent(name, email, subject, message);

    form[0].reset();
  });

});


/* ===============================
   EXPORT MESSAGE TO TXT
=================================*/

function exportFormDataToTxt(name, email, subject, message) {

  const content = `To: Betty Dang

From:
Name: ${name}
Email: ${email}

Subject: ${subject}

Message:
${message}`;

  const blob = new Blob([content], { type: "text/plain" });

  const link = document.createElement("a");

  link.href = URL.createObjectURL(blob);
  link.download = "contact_message.txt";

  link.click();

  URL.revokeObjectURL(link.href);
}


/* ===============================
   COOKIE CONSENT
=================================*/

const cookieBox = document.querySelector(".wrapper");
const buttons = document.querySelectorAll(".button");

function showCookieConsent(name, email, subject, message) {

  cookieBox.classList.add("show");

  buttons.forEach(button => {

    button.onclick = () => {

      cookieBox.classList.remove("show");

      if (button.id === "acceptBtn") {

        if (confirm(`Export message to .txt file?

Name: ${name}
Email: ${email}
Subject: ${subject}
Message: ${message}`)) {

          exportFormDataToTxt(name, email, subject, message);
        }

        document.cookie = "cookieBy=LaSalle_Coding; max-age=" + 60 * 60 * 24 * 30;
      }

      if (button.id === "declineBtn") {
        document.cookie = "cookieBy=; max-age=-1";
      }

    };

  });

}

function checkCookie() {

  if (!document.cookie.includes("LaSalle_Coding")) {
    cookieBox.classList.add("show");
  }

}

window.addEventListener("load", checkCookie);


/* ===============================
   SCROLL TO TOP BUTTON
=================================*/

const scrollBtn = document.getElementById("scrollToTopBtn");

window.addEventListener("scroll", () => {

  if (document.documentElement.scrollTop > 200) {
    scrollBtn.style.display = "block";
  } else {
    scrollBtn.style.display = "none";
  }

});

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


/* ===============================
   BLOG SLIDER
=================================*/

let slideIndex = 1;

showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {

  const slides = document.getElementsByClassName("mySlides");
  const dots = document.getElementsByClassName("dot");

  if (n > slides.length) slideIndex = 1;
  if (n < 1) slideIndex = slides.length;

  for (let slide of slides) {
    slide.style.display = "none";
  }

  for (let dot of dots) {
    dot.classList.remove("active");
  }

  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].classList.add("active");
}


