let config = {
  spaceColor: "#000000",
  rngSeed: 1000
};

function updateInputs() {
  Object.keys(config).forEach(key => {
    document.getElementById(key).value = config[key];
  });
}

function render() {
  console.log("render");
}

function subscribeToInputChanges() {
  Array.from(document.getElementsByTagName("input")).forEach(element => {
    element.addEventListener("change", ev => {
      config[ev.target.id] = ev.target.value;
      render();
    });
  });
}

updateInputs();
subscribeToInputChanges();
