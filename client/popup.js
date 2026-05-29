function showPopup(originalUrl, shortUrl) {

    const overlay = document.createElement("div");
    overlay.className =
        "fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50";

    const box = document.createElement("div");
    box.className =
        "bg-[#000000] p-6 rounded-2xl w-[520px] flex flex-col gap-4 shadow-2xl font-mono";

    const topBar = document.createElement("div");
    topBar.className = "flex items-center justify-between";

    const title = document.createElement("h2");
    title.innerText = "Here is your URL";
    title.className = "text-white text-lg font-bold";

    const closeBtn = document.createElement("button");
    closeBtn.className =
        "hover:scale-90 transition-transform duration-150 active:scale-75";

    closeBtn.innerHTML = `
        <wa-icon name="x" style="color: rgb(255, 255, 255);"></wa-icon>
    `;

    closeBtn.onclick = () => overlay.remove();

    topBar.appendChild(title);
    topBar.appendChild(closeBtn);

    const row = document.createElement("div");
    row.className = "flex items-center gap-4";

    const input = document.createElement("input");
    input.value = shortUrl;
    input.readOnly = true;

    input.className =
        "bg-[#525252] rounded-full shadow-md h-12 w-full px-4 text-white outline-none font-mono";

    const copyBtn = document.createElement("button");

    copyBtn.className =
        "bg-white rounded-full h-12 w-12 flex items-center justify-center shadow-md hover:bg-[#666666] transition-transform duration-150 active:scale-75";

    copyBtn.innerHTML = `
        <wa-icon name="copy" style="color: rgb(0, 0, 0);"></wa-icon>
    `;

    copyBtn.onclick = () => {
        navigator.clipboard.writeText(shortUrl);

        copyBtn.innerHTML = `
            <wa-icon name="copy" style="color: rgb(0, 0, 0);"></wa-icon>
        `;

        setTimeout(() => {
            copyBtn.innerHTML = `
                <wa-icon name="copy" style="color: rgb(0, 0, 0);"></wa-icon>
            `;
        }, 1000);
    };

    row.appendChild(input);
    row.appendChild(copyBtn);

    box.appendChild(topBar);
    box.appendChild(row);

    overlay.appendChild(box);

    document.body.appendChild(overlay);
}