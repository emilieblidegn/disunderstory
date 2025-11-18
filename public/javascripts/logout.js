document.getElementById('logoutBtn').addEventListener('click', async () => {
    const res = await fetch('/users/logout', {
        method: "POST",
        credentials: "include"
    });

    if (res.ok) {
        window.location.href = "/login";
    }
});