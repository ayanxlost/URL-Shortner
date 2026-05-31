document.getElementById("submitBtn").addEventListener("click", async () => {
    const input = document.getElementById("urlInput");
    const url = input.value.trim();

    if (!url) return;

    try {
        const res = await fetch("IP_ADDRESS_HERE/shorten", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ url })
        });

        const data = await res.json();

        if (data.shortUrl) {
            showPopup(url, data.shortUrl);
            input.value = "";
        }
    } catch (err) {
        console.error(err);
        alert("Failed to connect to server.");
    }
});
