let status = document.getElementById("status");

function tick() {
  if (!window.alt1 || !window.alt1.overlay) {
    status.innerText = "Waiting for Alt1 overlay permission...";
    return setTimeout(tick, 500);
  }

  status.innerText = "Plugin running – waiting for dialogue...";
  pollDialogue();
}

function pollDialogue() {
  try {
    let capture = a1lib.captureHoldFullRs();
    if (!capture) return setTimeout(pollDialogue, 300);

    let text = capture.readtext({
      colors: [
        a1lib.mixcolor(255,255,255),
        a1lib.mixcolor(220,220,220)
      ],
      small: false,
      backwards: false,
    });

    if (text.text && text.text.trim().length > 4) {
      speak(text.text);
    }
  } catch (e) {
    status.innerText = "Error: " + e.message;
  }

  setTimeout(pollDialogue, 500);
}

function speak(t) {
  let utter = new SpeechSynthesisUtterance(t);
  utter.lang = "en-US";
  speechSynthesis.speak(utter);
}
  
tick();
