document.getElementById("submitBtn").addEventListener("click", async () => {
    const input = document.getElementById("urlInput");
    const url = input.value.trim();

    if (!url) return;

    const res = await fetch("https://ad9bd71f-8b18-4464-9406-b156f227af96-00-23tp6jt52nota.sisko.replit.dev/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url })
    });

    const data = await res.json();

    if (data.shortUrl) {
        showPopup(url, data.shortUrl);
        input.value = "";
    }
});