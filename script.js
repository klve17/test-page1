document.addEventListener('DOMContentLoaded', function() {
    var isAuthenticated = false;
    var passwordModal = document.getElementById('password-modal');
    var closeModal = document.getElementsByClassName('close')[0];
    var submitPassword = document.getElementById('submit-password');
    var passwordInput = document.getElementById('password-input');
    var getStartedButton = document.getElementById('get-started');

    // Show modal when "Get Started" button is clicked
    getStartedButton.addEventListener('click', function() {
        passwordModal.style.display = 'block';
    });

    // Close modal on clicking close button
    closeModal.onclick = function() {
        passwordModal.style.display = 'none';
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == passwordModal) {
            passwordModal.style.display = 'none';
        }
    };

    // Check password and enable scrolling if correct
    submitPassword.onclick = function() {
        var password = passwordInput.value;
        if (password === 'yourpassword') { // Change this to your actual password
            isAuthenticated = true;
            passwordModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Enable scrolling

            // Disable "Get Started" button and change text
            getStartedButton.disabled = true;
            getStartedButton.textContent = 'Scroll Down';

            new fullpage('#fullpage', {
                autoScrolling: true,
                scrollHorizontally: true,
                afterLoad: function(origin, destination, direction) {
                    var footer = document.querySelector('footer');
                    if (destination.isLast) {
                        footer.style.display = 'block';
                    } else {
                        footer.style.display = 'none';
                    }
                }
            });
        } else {
            alert('Incorrect password. Please try again.');
        }
    };

    // Prevent scrolling if not authenticated
    window.addEventListener('scroll', function(event) {
        if (!isAuthenticated) {
            event.preventDefault();
            window.scrollTo(0, 0);
        }
    });
});
