
// Your code here
const registerForm = document.getElementById('registerForm');
console.log(registerForm); // Check if the form element is correctly selected

registerForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    console.log("Form submitted"); // Check if form submission is triggered

    const formData = new FormData(registerForm);
    console.log(formData); // Check the formData object to see if it contains the expected data

    const fullName = formData.get('fullName');
    const email = formData.get('email');
    const password = formData.get('password');
    const isAdmin = formData.get('isAdmin');
    console.log(fullName, email, password, isAdmin); // Check the extracted form data

    try {
        const response = await fetch('/registration', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ fullName, email, password, isAdmin })
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message);
        }

        // Registration successful
        alert('Registration successful!');
        // Optionally, redirect to another page or perform any other action

    } catch (error) {
        console.error('Error registering user:', error);
        // Handle error, e.g., display an error message to the user
        alert('Error: ' + error.message);
    }
});



// Main Login 

async function loginUser(event) {
    event.preventDefault();
    var email = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Print username and password to the console
    // console.log("Username: " + email);
    // console.log("Password: " + password);

    try {
        const response = await fetch('/login/success', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password }) // Changed 'email' to 'username'
        });


        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message);
        }

        const userData = await response.json();
        if (userData.user.isAdmin) {
            let user = document.getElementById('usernameLogin');
            localStorage.setItem("data", userData.user.fullName.split(" ")[0]);
            user.innerHTML = userData.user.fullName;

            if (user.innerHTML != '') {
                document.getElementById('addProductNavItem').classList.remove('d-none');
                document.getElementById('addProductNavItem').innerHTML = '<a class="nav-link active" href="/addProducts">Add Product</a>';
            }
        }
        console.log('Login successful :', userData);
        console.log('Login successful :', userData.user._id);

        localStorage.setItem("userIdForUse", userData.user._id);
        // Login successful
        alert('Login successful!');
        // window.location.href = "/";

    } catch (error) {
        console.error('Error during login:', error);
        // Handle error, e.g., display an error message to the user
        alert('Error: ' + error.message);
    }
}

let user = document.getElementById('usernameLogin');

if (localStorage.getItem("data") != null) {
    user.innerHTML = localStorage.getItem("data");
    document.getElementById('addProductNavItem').classList.remove('d-none');
    document.getElementById('addProductNavItem').innerHTML = '<a class="nav-link active" href="/addProducts">Add Product</a>';
}


function logOut(e) {
    e.preventDefault()
    console.log("before Logout ", localStorage.getItem("data"))
    localStorage.removeItem("data");
    localStorage.removeItem("userIdForUse");
    console.log("After Logout ", localStorage.getItem("data"))
    document.getElementById('addProductNavItem').classList.add('d-none');
    window.location.href = "/";
}
