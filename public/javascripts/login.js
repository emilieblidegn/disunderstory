document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const emailField = document.getElementById('email');
    const passwordField = document.getElementById('password');

    const loginData = {
        email: emailField.value,
        password: passwordField.value
    };

    try {
        const response = await fetch('/users/login', {   // KORREKT ROUTE
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(loginData)
        });

        if (response.ok) {
            window.location.href = "/dashboard";
        } else {
            document.getElementById("error").innerText = await response.text();
        }
    } catch (err) {
        document.getElementById("error").innerText = "Netværksfejl";
    }
});

