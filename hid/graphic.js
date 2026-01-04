const key_layout = document.getElementById("key-layout");
let keys;

class Key {
  constructor(config) {
    this.x = config.x;
    this.y = config.y;
    this.key = config.key;
    this.width = 100;
    this.height = 100;
    this.color = "Aliceblue";

    this.keyElement = document.createElement("div");
    this.keyElement.classList.add("key");
    this.keyElement.id = this.key;

    this.keyElement.style.width = `${this.width}px`;
    this.keyElement.style.height = `${this.height}px`;
    this.keyElement.style.left = `${this.x * 100}px`;
    this.keyElement.style.top = `${this.y * 100}px`;
    this.keyElement.style.backgroundColor = this.color;

    this.keyElement.textContent = this.key;
    key_layout.appendChild(this.keyElement);
  }

  setColor(color) {
    this.color = color;
    this.keyElement.style.backgroundColor = color;
  }
}

function showKeys() {
  key_layout.innerHTML = "";
  keys = keymap.map((key) => new Key(key));
}

function updateKeys(pressedKeys) {
  keys.forEach((key, index) => {
    if (pressedKeys.includes(key.key)) {
      key.setColor("lightgreen");
    } else {
      key.setColor("Aliceblue");
    }
  });
}
