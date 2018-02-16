let config = {
  rngSeed: 1000,
  starCount: 5000,
  spiralArms: 3,
  spiralCurve: 0.3,
  coreDensity: 1.3,
  armSpread: 0.9,
  armPull: 3.75,
  spaceColor: "#000000"
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
//
//   starTypesWeights: {
//     ease: easeOutCubic,
//     min: {
//       blue: 100,
//       blueWhite: 200,
//       white: 1000,
//       yellowWhite: 500,
//       yellow: 1000,
//       lightOrange: 2000,
//       orangeRed: 2000,
//       red: 3
//     },
//     max: {
//       blue: 500,
//       blueWhite: 3000,
//       white: 2000,
//       yellowWhite: 120,
//       yellow: 10,
//       lightOrange: 10,
//       orangeRed: 10,
//       red: 2
//     }
//   },
//   starSizeWeights: {
//     ease: linear,
//     min: {
//       hypergiant: 10,
//       supergiant: 5,
//       giant: 10,
//       standard: 100,
//       dwarf: 10
//     },
//     max: {
//       hypergiant: 10,
//       supergiant: 20,
//       giant: 5,
//       standard: 50,
//       dwarf: 100
//     }
//   }
// };
