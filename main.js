let statusBox = document.getElementById("status");
let lastDialog = "";
const scanIntervalMs = 800;

// Tjek om Alt1 API er tilgængelig
if (!window.alt1 || !window.a1lib) {
    statusBox.textContent = "Alt1 API ikke fundet – kør dette i Alt1.";
} else {
    statusBox.textContent = "Alt1 API fundet – starter scanning...";
    startScanning();
}

function speak(text) {
    const u = new SpeechSynthesisUtterance(text);
    u.rate = 1.1;
    speechSynthesis.speak(u);
}

function startScanning() {
    setInterval(() => {
        // Tjek tilladelse
        if (!alt1.permissionPixel) {
            statusBox.textContent = "Mangler tilladelse: view screen";
            return;
        }

        if (!alt1.rsActive) {
            statusBox.textContent = "RuneScape ikke aktivt...";
            return;
        }

        try {
            // Capture området hvor dialogen normalt vises
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
