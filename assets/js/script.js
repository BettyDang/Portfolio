/***     Your global javascript or jquery section here */


$(document).ready(function() {
    
    function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    
    $('#contact-form').submit(function(e) {
        e.preventDefault(); 

        var name = $('input[name="name"]').val().trim();
        var email = $('input[name="email"]').val().trim();
        var subject = $('input[name="subject"]').val().trim();
        var message = $('textarea[name="message"]').val().trim();
        var allValidate = true;

        // Validate name
        if (name === '') {
            $('.nameError').css('display', 'inline');
            alert('Please enter your name');
            return;
        }

        // Validate email
        if (email === '') {
            $('.emailError').css('display', 'inline');
            alert('Please enter your email address');
            return;
        } else if (!validateEmail(email)) {
            $('.emailError').css('display', 'inline');
            alert('Please enter a valid email address');
            return;
        }

        //Validate Subject
        if (subject === '') {
            $('.subjectError').css('display', 'inline');
            alert('Please enter your subject');
            return;
        }

        // Validate message
        if (message === '') {
            $('.messageError').css('display', 'inline');
            alert('Please enter your message');
            return;
        }

        
        if (allValidate) {
           
            cookieBox.classList.add("show");
            buttons.forEach((button) => {
                button.addEventListener("click", () => {
                  cookieBox.classList.remove("show");
            
                  //if button has acceptBtn id
                  if (button.id == "acceptBtn") {
                    if (confirm('Are you sure you want to export this message to a .txt file?\n\nName: ' + name + '\nEmail: ' + email + '\nSubject: ' + subject + '\nMessage: ' + message)) {
                      // Export form data to .txt file
                      exportFormDataToTxt(name, email, subject, message);
                  } else {
                      // Do nothing if user cancels
                      return;
                  }

                    document.cookie = "cookieBy= LaSalle_Coding; max-age=" + 60 * 60 * 24 * 30;
                  }
                  else if (button.id == "declineBtn")
                  {
                    document.cookie = "cookieBy= ; max-age=-1";
                  }
                });
              });

            $('#contact-form')[0].reset();
        } else {
            
            return;
        }
    });
});

function exportFormDataToTxt(name, email, subject, message) {
  // Construct the text content for the .txt file
  const content = `To: Betty Dang\n\nFrom:\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\nMessage: ${message}`;

  // Create a Blob with the content
  const blob = new Blob([content], { type: 'text/plain' });

  // Create a temporary link element
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = 'form_data.txt';

  // Trigger the download
  link.click();

  // Clean up
  window.URL.revokeObjectURL(link.href);
  document.getElementById("exportBtn").removeEventListener("click", exportListener);
}



window.onscroll = function() {
    scrollFunction();
};

function scrollFunction() {
    var scrollToTopBtn = document.getElementById("scrollToTopBtn");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        scrollToTopBtn.style.display = "block";
    } else {
        scrollToTopBtn.style.display = "none";
    }
}


function scrollToTop() {
    document.body.scrollTop = 0; 
    document.documentElement.scrollTop = 0; 
}


let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}


// Get the button element
const colorBtn = document.getElementById('colorBtn');

// Initialize a variable to track the current background color state
let isDark = true;

// Add click event listener to the button
colorBtn.addEventListener('click', () => {

  if (isDark) {
    document.body.style.backgroundImage = 'url(/assets/images/dark-bg.webp)'; 
    document.getElementById('switcher').src = '/assets/images/sun.svg';

  } else {
    document.body.style.backgroundImage = 'url(/assets/images/light-bg.webp)'; 
    document.getElementById('switcher').src = '/assets/images/moon.svg';

  }

  isDark = !isDark;
});

//Consent cookie

const cookieBox = document.querySelector(".wrapper"),
  buttons = document.querySelectorAll(".button");

const executeCodes = () => {
  //if cookie contains coding it will be returned and below of this code will not run
  if (document.cookie.includes("LaSalle_Coding")) return;
  

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      cookieBox.classList.remove("show");

      //if button has acceptBtn id
      if (button.id == "acceptBtn") {
        //set cookies for 1 month. 60 = 1 min, 60 = 1 hours, 24 = 1 day, 30 = 30 days
        document.cookie = "cookieBy= LaSalle_Coding; max-age=" + 60 * 60 * 24 * 30;
      }
    });
  });
};

//executeCodes function will be called on webpage load
window.addEventListener("load", executeCodes);


