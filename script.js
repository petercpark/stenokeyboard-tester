const jsConfetti = new JSConfetti();

//Gemini keys chart
// prettier-ignore
const STENO_KEY_CHART = ["Fn", "#1", "#2", "#3", "#4", "#5", "#6", //
                         "S1-", "S2-", "T-", "K-", "P-", "W-", "H-", //
                         "R-", "A-", "O-", "STAR1", "STAR2", "res1", "res2", //
                         "pwr", "STAR3", "STAR4", "-E", "-U", "-F", "-R", //
                         "-P", "-B", "-L", "-G", "-T", "-S", "-D", //
                         "#7", "#8", "#9", "#A", "#B", "#C", "-Z"];

export default STENO_KEY_CHART;

// Gemini PR protocol interpreter
function InterpretGemini(packet) {
  console.log(packet);
  //to do: handle broken packets
  if (!(packet[0] & 128)) {
    return;
  }
  let steno_keys = [];
  packet.forEach((byte, i) => {
    for (let j = 1; j < 8; j++) {
      if (byte & (128 >> j)) {
        steno_keys.push(STENO_KEY_CHART[i * 7 + j - 1]);
      }
    }
  });

  //output log
  const output_log = document.querySelector("#output-log > p");
  output_log.innerHTML = steno_keys.join(" ");

  //display keyboard
  unpress();
  steno_keys.forEach((key) => {
    press(key);
  });

  //if all keys pressed then confetti
  if (steno_keys.length == 28) {
    jsConfetti.addConfetti({
      emojis: ["🌈", "⚡️", "💥", "✨", "💫", "💎"],
    });
  }
}

//connect button events
const button = document.querySelector("#connect-button");
button.addEventListener("click", async function () {
  // Prompt user to select any serial port.
  const port = await navigator.serial.requestPort();
  console.log("connected");

  // Wait for the serial port to open.
  await port.open({ baudRate: 9600 });

  //read port
  while (port.readable) {
    const reader = port.readable.getReader();
    try {
      while (true) {
        const { value, done } = await reader.read();
        if (done) {
          // |reader| has been canceled.
          break;
        }
        // Do something with |value|…
        InterpretGemini(value);
      }
    } catch (error) {
      // Handle |error|…
    } finally {
      reader.releaseLock();
    }
  }
});

function press(key) {
  const key_square = document.querySelector("#key-" + key.replace("#", ""));
  key_square.classList.add("pressed");
}

function unpress() {
  const pressed_keys = document.querySelectorAll(".pressed");
  pressed_keys.forEach((key) => {
    key.classList.remove("pressed");
  });
}
