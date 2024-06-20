document.addEventListener('DOMContentLoaded', function() {
    var isAuthenticated = false;
    var passwordModal = document.getElementById('password-modal');
    var closeModal = document.getElementsByClassName('close')[0];
    var submitPhone = document.getElementById('submit-phone');
    var phoneInput = document.getElementById('phone-input');
    var getStartedButton = document.getElementById('get-started');

    // Define the phone number to content mapping
    var phoneContentMap = {
        '1234567890': 'Content for phone number 1234567890',
        '0987654321': 'Content for phone number 0987654321',
        // Add more phone numbers and their corresponding content here
    };

    // Show modal when "Get Started" button is clicked
    getStartedButton.addEventListener('click', function() {
        passwordModal.style.display = 'block';
    });

    // Close modal on clicking close button
    closeModal.onclick = function() {
        passwordModal.style.display = 'none';
        phoneInput.value = ''; // Clear phone input
    };

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == passwordModal) {
            passwordModal.style.display = 'none';
            phoneInput.value = ''; // Clear phone input
        }
    };

    // Check phone number and enable scrolling if correct
    submitPhone.onclick = function() {
        var phoneNumber = phoneInput.value;
        if (phoneContentMap[phoneNumber]) {
            isAuthenticated = true;
            passwordModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Enable scrolling

            // Set the content of the blank section based on the phone number
            document.getElementById('blank-content').textContent = phoneContentMap[phoneNumber];

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
            alert('Incorrect phone number. Please try again.');
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
