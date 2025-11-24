// --- SETTINGS ---
const scanIntervalMs = 800;

// Track last spoken line
let lastDialog = "";

// HTML element for showing status
const statusBox = document.getElementById("status");

// Small helper for speaking text
function speak(text) {
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 1.1;
    speechSynthesis.speak(utter);
}

// Main loop - runs in Alt1 environment
function scanDialog() {
    if (!window.alt1) {
        statusBox.textContent = "Alt1 API ikke fundet...";
        return;
    }

    if (!alt1.rsActive) {
        statusBox.textContent = "RuneScape ikke aktivt...";
        return;
    }

    try {
        // Capture dialog text using Alt1OCR
        const dialog = a1lib.readText(
            alt1.captureArea(
                // DEFAULT DIALOG REGION (works on standard client)
                // X, Y, Width, Height
                80, 700, 1000, 200
            )
        ).text.trim();

        if (dialog.length > 0) {
            statusBox.textContent = "Fundet dialog: " + dialog;

            if (dialog !== lastDialog) {
                lastDialog = dialog;
                speak(dialog);
            }
        } else {
            statusBox.textContent = "Ingen dialog";
        }
    } catch (e) {
        statusBox.textContent = "Fejl: " + e;
        console.error(e);
    }
}

// Update loop
setInterval(scanDialog, scanIntervalMs);

// Confirm JS loaded
console.log("Dialog Reader loaded!");
statusBox.textContent = "Plugin loaded – venter på dialog...";
