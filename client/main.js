const API_URL = ""; 
//replace with ur api url

document.getElementById("submitBtn").addEventListener("click", async () => {
    const input = document.getElementById("urlInput");
    const url = input.value.trim();

    if (!url) return;

    try {
        const res = await fetch(`${API_URL}/shorten`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ url })
        });

        const data = await res.json();

        if (data.id) {
            // THIS is the key fix: frontend builds final link
            const shortUrl = `${window.location.origin}/${data.id}`;

            showPopup(url, shortUrl);
            input.value = "";
        }
    } catch (err) {
        console.error(err);
        alert("Server not reachable");
    }
});
