document.addEventListener('DOMContentLoaded', function() {
    var header = document.querySelector('header');
    var footer = document.querySelector('footer');

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
    var headerText = document.getElementById('header-text');
    var introSection = document.getElementById('intro-section');
    var introContent = document.getElementById('intro-content');
    var animatedMessage = document.getElementById('animated-message');
    var animatedText = document.getElementById('animated-text');

    // Define the phone number to content mapping
    var phoneContentMap = {
        '1234567890': '홍길동',
        '0987654321': '김철수',
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

    // Function to animate text
    function animateText(text) {
        let index = 0;
        animatedText.innerHTML = "";
        animatedMessage.style.display = "block";

        function type() {
            if (index < text.length) {
                animatedText.innerHTML += text.charAt(index);
                index++;
                setTimeout(type, 50); // Adjust typing speed here
            }
        }

        type();
    }

    // Check phone number and enable scrolling if correct
    submitPhone.onclick = function() {
        var phoneNumber = phoneInput.value;
        var userName = phoneContentMap[phoneNumber];
        if (userName) {
            isAuthenticated = true;
            passwordModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Enable scrolling

            // Set the content of the blank section based on the phone number
            document.getElementById('blank-content').textContent = phoneContentMap[phoneNumber];

            // Display personalized message in header
            headerText.textContent = userName + '님, 1학년 1학기 이수를 축하드립니다!';

            // Disable "Get Started" button and change text
            getStartedButton.disabled = true;
            getStartedButton.textContent = 'Scroll Down';

            // Change intro section content
            introContent.style.display = 'none';
            animateText("스크롤을 내려주세요!");

            new fullpage('#fullpage', {
                autoScrolling: true,
                scrollHorizontally: true,
                anchors: [
                    'intro', 'blank1', 'activation-text', 'activation-text1', 'activation-text2', 
                    'activation-text3', 'activation-text4', 'activation-text5', 'activation-text6', 
                    'activation-text7', 'activation-text8', 'activation-text9', 'activation-text10', 
                    'letter', 'blank'
                ],
                afterLoad: function(origin, destination, direction) {
                    if (destination.isLast) {
                        footer.classList.add('visible');
                    } else {
                        footer.classList.remove('visible');
                    }

                    // Add active class to current section
                    destination.item.classList.add('active');

                    // Update navigation active link
                    var navLinks = document.querySelectorAll('#navigation ul li a');
                    navLinks.forEach(function(link) {
                        link.classList.remove('active');
                    });

                    var activeLink;
                    if (destination.anchor.startsWith('blank1')) {
                        activeLink = document.querySelector('#navigation ul li a[href="#intro"]');           
                } else if (destination.anchor.startsWith('activation-text')) {
                        activeLink = document.querySelector('#navigation ul li a[href="#activation-text"]');
                    } else {
                        activeLink = document.querySelector('#navigation ul li a[href="#' + destination.anchor + '"]');
                    }

                    if (activeLink) {
                        activeLink.classList.add('active');
                    }

                    // Add animation class to intro section text
                    if (destination.anchor === 'intro') {
                        header.classList.remove('hidden'); // 인트로 섹션에서는 헤더 보이기
                    } else {
                        header.classList.add('hidden'); // 다른 섹션에서는 헤더 숨기기
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
