//prettier-ignore
const keyNames = [
  "S1-", "T-", "K-", "P-", "W-", "H-",
  "R-", "A-", "O-", "*1", "-E", "-U",
  "-F", "-R", "-P", "-B", "-L", "-G",
  "-T", "-S", "-D", "-Z", "#1",
  "S2-", "*2", "*3", "*4", "#2", "#3",
  "#4", "#5", "#6", "#7", "#8", "#9",
  "#A", "#B", "#C", "X1", "X2", "X3",
  "X4", "X5", "X6", "X7", "X8", "X9",
  "X10", "X11", "X12", "X13", "X14", "X15",
  "X16", "X17", "X18", "X19", "X20", "X21",
  "X22", "X23", "X24", "X25", "X26"
];

const stenoMap = [
  ["S-", "S-"],
  ["S1-", "S-"],
  ["T-", "T-"],
  ["K-", "K-"],
  ["P-", "P-"],
  ["W-", "W-"],
  ["H-", "H-"],
  ["R-", "R-"],
  ["A-", "A"],
  ["O-", "O"],
  ["*1", "*"],
  ["-E", "E"],
  ["-U", "U"],
  ["-F", "-F"],
  ["-R", "-R"],
  ["-P", "-P"],
  ["-B", "-B"],
  ["-L", "-L"],
  ["-G", "-G"],
  ["-T", "-T"],
  ["-S", "-S"],
  ["-D", "-D"],
  ["-Z", "-Z"],
  ["#1", "#"],
  ["*2", "*"],
  ["*3", "*"],
  ["*4", "*"],
  ["S2-", "S-"],
  ["#2", "#"],
  ["#", "#"],
  ["*", "*"],
];

const stenoOrder = [
  "#",
  "S-",
  "T-",
  "K-",
  "P-",
  "W-",
  "H-",
  "R-",
  "A",
  "O",
  "*",
  "E",
  "U",
  "-F",
  "-R",
  "-P",
  "-B",
  "-L",
  "-G",
  "-T",
  "-S",
  "-D",
  "-Z",
];

const numberKeys = ["O", "S-", "T-", "P-", "H-", "A", "-F", "-P", "-L", "-T"];

function pressedKeysToStenoStroke(pressedKeys) {
  let pressed;
  //map keys
  pressed = pressedKeys.map((key) => {
    for (let [original, replacement] of stenoMap) {
      if (key === original) return replacement;
    }
    return null;
  });

  //steno order
  pressed = pressed.sort(
    (a, b) => stenoOrder.indexOf(a) - stenoOrder.indexOf(b)
  );

  //numbers
  if (pressed.includes("#")) {
    let number_pressed = false;
    pressed = pressed.map((key) => {
      if (numberKeys.includes(key)) {
        number_pressed = true;
        return numberKeys.indexOf(key);
      } else {
        return key;
      }
    });
    if (number_pressed) pressed.splice(pressed.indexOf("#"), 1);
  }

  let output_text = [...new Set(pressed)].join("");

  // dash handling
  const vowels_exist = /A|O|E|U/.test(output_text);
  if (vowels_exist) {
    output_text = output_text.replace(/-/g, "");
  } else {
    output_text = output_text.replace("--", "double_dash");
    output_text = output_text.replace(/(?<=.)-/g, "");
    output_text = output_text.replace("double_dash", "-");
  }

  return output_text;
}
