const numberOneInput = document.getElementById("numberOne");
const numberTwoInput = document.getElementById("numberTwo");
const addValuesButton = document.getElementById("addValues");
const resultDiv = document.getElementById("result");

alertService.hideErrors();


addValuesButton.addEventListener("click", () => {
  hideErrors();
  const inputs = [numberOneInput.value, numberTwoInput.value];
  const parsedInputs = parseInputs(...inputs);
  if (inputsAreValid(...parsedInputs)) {
    const [numA, numB] = parsedInputs;
    resultDiv.innerText = numA + numB;
  } else {
    resultDiv.innerText = "";
    handleAdditionError(inputs, parsedInputs);
  }
});
