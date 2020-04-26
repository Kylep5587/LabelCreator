const INITIAL_STATE = {
  value: Math.floor(Math.random() * 100000000).toString(),
  format: "CODE128A",
  renderer: "svg",
  width: 1.5,
  height: 20,
  displayValue: true,
  fontOptions: "",
  font: "monospace",
  textAlign: "center",
  textPosition: "bottom",
  textMargin: 2,
  fontSize: 16,
  background: "#ffffff",
  lineColor: "#000000",
  margin: 10,
};

const barcodeToolbarReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default barcodeToolbarReducer;
