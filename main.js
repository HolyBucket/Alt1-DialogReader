let statusBox = document.getElementById("status");
let lastDialog = "";
const scanIntervalMs = 800;

// Wait until Alt1 loads and a1lib becomes available
a1lib.on("loaded", () => {
    statusBox.textContent = "Alt1 API loaded – scanning...";
    startScanning();
});

// Fallback for when Alt1 isn't available (browser)
if (!window.alt1) {
    statusBox.textContent = "Alt1 ikke fundet – kør dette i Alt1.";
}

function speak(text) {
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 1.1;
    speechSynthesis.speak(u);
}

function startScanning() {
    setInterval(() => {
        if (!window.alt1 || !alt1.permissionPixel) {
            statusBox.textContent = "Mangler tilladelse: view screen";
            return;
        }

        if (!alt1.rsActive) {
            statusBox.textContent = "RuneScape ikke aktivt...";
            return;
        }

        try {
            // Try capture the bottom dialog area
            let img = alt1.captureArea(80, 650, 1000, 250);
            let ocr = a1lib.readText(img).text.trim();

            if (ocr && ocr !== lastDialog) {
                lastDialog = ocr;
                speak(ocr);
                statusBox.textContent = "Dialog: " + ocr;
            }
        } catch (e) {
            statusBox.textContent = "Fejl: " + e;
            console.error(e);
        }
    }, scanIntervalMs);
}
