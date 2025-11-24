document.getElementById("readBtn").addEventListener("click", function() {
    if (!Alt1.rsLoaded()) {
        alert("RuneScape 3 er ikke kørende!");
        return;
    }

    // Hent teksten fra dialogboksen
    Alt1.rsGetDialog().then(dialog => {
        if (dialog && dialog.length > 0) {
            console.log("Dialog:", dialog);

            // Brug browserens tekst-til-tale API
            let utterance = new SpeechSynthesisUtterance(dialog);
            speechSynthesis.speak(utterance);
        } else {
            alert("Ingen dialog fundet!");
        }
    });
});
