document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nameField = document.getElementById('name');
    const emailField = document.getElementById('email');
    const passwordField = document.getElementById('password');

    const data = {
        name: nameField.value,
        email: emailField.value,
        password: passwordField.value
    };

    try {
        const res = await fetch('/users/signup', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (res.ok) {
            window.location.href = "/login";
        } else {
            document.getElementById("error").innerText = await res.text();
        }
    } catch (err) {
        document.getElementById("error").innerText = "Netværksfejl";
    }
});
