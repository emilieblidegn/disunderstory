document.querySelectorAll('.buyBtn').forEach(btn => {
    btn.addEventListener('click', async () => {
        const oplevelseId = btn.dataset.id;

        const res = await fetch('/orders', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ oplevelseId })
            
        });
        console.log("Sender order med ID:", oplevelseId);
        if (res.ok) {
            alert("Tak for dit køb!");
            // senere kan du redirecte til en "min ordre" side
        } else {
            alert(await res.text());
        }
    });
});