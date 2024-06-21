document.addEventListener('DOMContentLoaded', function() {
    var header = document.querySelector('header');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
            header.style.padding = '10px 10px';
        } else {
            header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
            header.style.padding = '20px 10px';
        }
    });

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
                anchors: [
                    'intro', 'activation-text', 'activation-text1', 'activation-text2', 
                    'activation-text3', 'activation-text4', 'activation-text5', 'activation-text6', 
                    'activation-text7', 'activation-text8', 'activation-text9', 'activation-text10', 
                    'letter', 'blank'
                ],
                afterLoad: function(origin, destination, direction) {
                    var footer = document.querySelector('footer');
                    if (destination.isLast) {
                        footer.style.display = 'block';
                    } else {
                        footer.style.display = 'none';
                    }

                    // Add active class to current section
                    destination.item.classList.add('active');

                    // Update navigation active link
                    var navLinks = document.querySelectorAll('#navigation ul li a');
                    navLinks.forEach(function(link) {
                        link.classList.remove('active');
                    });

                    var activeLink;
                    if (destination.anchor.startsWith('activation-text')) {
                        activeLink = document.querySelector('#navigation ul li a[href="#activation-text"]');
                    } else {
                        activeLink = document.querySelector('#navigation ul li a[href="#' + destination.anchor + '"]');
                    }

                    if (activeLink) {
                        activeLink.classList.add('active');
                    }
                }
            });
        } else {
            alert('잘못된 전화번호입니다. 다시 시도해주세요.');
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
