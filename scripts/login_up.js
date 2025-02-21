document.addEventListener('DOMContentLoaded', function() {
    const signInBtn = document.getElementById('signInBtn');
    const signUpBtn = document.getElementById('signUpBtn');
    const signOutBtn = document.getElementById('signOutBtn');
    const signupPage = document.getElementById('signUpPage');
    const loginPage = document.getElementById('loginPage');
    const userDashboard = document.getElementById('userDashboard');
    const homepage = document.getElementById('homepage');
    const userInfo = document.getElementById('userInfo');
    const wishlistItems = document.getElementById('wishlistItems');
    const wishlistCounter = document.getElementById('wishlistCounter');
    const deleteAccountBtn = document.getElementById('deleteAccountBtn');
    const addItemBtn = document.getElementById('addItemBtn');
    const newWishlistItem = document.getElementById('newWishlistItem');

    // Show homepage if not logged in
    if (localStorage.getItem('isLoggedIn')) {
        showUserDashboard();
    } else {
        showHomepage();
    }

    // Show homepage view
    function showHomepage() {
        homepage.style.display = 'block';
        signupPage.style.display = 'none';
        loginPage.style.display = 'none';
        userDashboard.style.display = 'none';
    }

    // Show sign-in page
    signInBtn.addEventListener('click', function() {
        homepage.style.display = 'none';
        signupPage.style.display = 'none';
        loginPage.style.display = 'block';
        userDashboard.style.display = 'none';
    });

    // Show sign-up page
    signUpBtn.addEventListener('click', function() {
        homepage.style.display = 'none';
        signupPage.style.display = 'block';
        loginPage.style.display = 'none';
        userDashboard.style.display = 'none';
    });

    // Sign up logic
    const signupForm = document.getElementById('signupForm');
    signupForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const address = document.getElementById('address').value;
        const password = document.getElementById('signupPassword').value;

        const userData = {
            firstName,
            lastName,
            email,
            phone,
            address,
            password,
            wishlist: []
        };

        localStorage.setItem(email, JSON.stringify(userData));
        alert('Sign Up Successful! Please log in.');
        showLoginPage();
    });

    // Show login page after sign-up
    function showLoginPage() {
        signupPage.style.display = 'none';
        loginPage.style.display = 'block';
        userDashboard.style.display = 'none';
    }

    // Login logic
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const loginEmail = document.getElementById('loginEmail').value;
        const loginPassword = document.getElementById('loginPassword').value;

        const userData = JSON.parse(localStorage.getItem(loginEmail));

        if (userData && userData.password === loginPassword) {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('loggedInUser', loginEmail);
            alert('Login successful');
            showUserDashboard();
        } else {
            alert('Incorrect email or password');
        }
    });

    // Show user dashboard
    function showUserDashboard() {
        loginPage.style.display = 'none';
        signupPage.style.display = 'none';
        homepage.style.display = 'none';
        userDashboard.style.display = 'block';

        const loggedInUser = localStorage.getItem('loggedInUser');
        const user = JSON.parse(localStorage.getItem(loggedInUser));

        userInfo.innerHTML = `
            <p><strong>Name:</strong> ${user.firstName} ${user.lastName}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Phone:</strong> ${user.phone}</p>
            <p><strong>Address:</strong> ${user.address}</p>
        `;

        // Display wishlist
        updateWishlist(user.wishlist);

        signOutBtn.style.display = 'block';
        signInBtn.style.display = 'none';
        signUpBtn.style.display = 'none';
        deleteAccountBtn.style.display = 'block';
    }

    // Sign out logic
    signOutBtn.addEventListener('click', function() {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('loggedInUser');
        signOutBtn.style.display = 'none';
        signInBtn.style.display = 'block';
        showHomepage();
    });

    // Delete account logic
    deleteAccountBtn.addEventListener('click', function() {
        const loggedInUser = localStorage.getItem('loggedInUser');
        localStorage.removeItem(loggedInUser);
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('loggedInUser');
        alert('Account deleted successfully');
        showHomepage();
    });

    // Add item to wishlist
    addItemBtn.addEventListener('click', function() {
        const item = newWishlistItem.value.trim();
        if (item === "") {
            alert("Please enter an item.");
            return;
        }

        const loggedInUser = localStorage.getItem('loggedInUser');
        const user = JSON.parse(localStorage.getItem(loggedInUser));

        // Check if item already exists in wishlist
        if (user.wishlist.includes(item)) {
            alert("Item already in your wishlist!");
        } else {
            user.wishlist.push(item);
            localStorage.setItem(loggedInUser, JSON.stringify(user));
            newWishlistItem.value = ""; // Clear input field
            updateWishlist(user.wishlist);
        }
    });

    // Update the wishlist on the dashboard
    function updateWishlist(wishlist) {
        wishlistItems.innerHTML = "";
        wishlist.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `${item} <button class="remove-btn">Remove</button>`;
            wishlistItems.appendChild(li);
        });

        // Update wishlist counter
        wishlistCounter.innerHTML = `(${wishlist.length} items)`;

        // Add remove button functionality
        document.querySelectorAll('.remove-btn').forEach((button, index) => {
            button.addEventListener('click', function() {
                const loggedInUser = localStorage.getItem('loggedInUser');
                const user = JSON.parse(localStorage.getItem(loggedInUser));
                user.wishlist.splice(index, 1);
                localStorage.setItem(loggedInUser, JSON.stringify(user));
                updateWishlist(user.wishlist);
            });
        });
    }
});
