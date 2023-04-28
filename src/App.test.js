import { render, screen, fireEvent } from "@testing-library/react";
import App, { replaceCamelWithSpaces } from "./App";

var colorOneTested = "MediumVioletRed";
var colorTwoTested = "MidnightBlue";

test("button has correct initial color, and updates when clicked", () => {
  render(<App />);
  //ahora, encuentra el elemento que te interesa (global object screen)

  // encontrar elemento por "role" del boton y el texto `Change to ${colorOneTested}`
  const colorButton = screen.getByRole("button", {
    name: `Change to ${colorTwoTested}`,
  });

  // expect the background color to be `Change to ${colorOneTested}`
  expect(colorButton).toHaveStyle({ backgroundColor: `${colorOneTested}` });

  // click button
  fireEvent.click(colorButton);

  // espero que tenga un backgroundColor azul
  expect(colorButton.textContent).toHaveStyle({ backgroundColor: `${colorTwoTested}` });

  // expect the button text to be `Change to ${colorOneTested}`
  expect(colorButton).toHaveTextContent(`Change to ${colorOneTested}`);
});

test("checks if button and checkbox are enabled and disabled (in that order)", () => {
  render(<App />);
  // revisar que el boton fucione
  const colorButton = screen.getByRole("button", {
    name: `Change to ${colorTwoTested}`,
  });
  expect(colorButton).toBeEnabled();

  //revisar que la checkbox no este checkeada
  const checkBox = screen.getByRole("checkbox");
  expect(checkBox).toBeChecked();
});

test("checks if button is disabled when checkbox in checked and biseversa", () => {
  render(<App />);
  // tener a mano los elementos en el DOM que se revisaran
  const colorButton = screen.getByRole("button", {
    name: `Change to ${colorTwoTested}`,
  });
  const checkBox = screen.getByRole("checkbox", { name: "Disable button" });

  // revisar el estado del boton. Funciona?
  fireEvent.click(colorButton);
  expect(colorButton).toHaveStyle({
    backgroundColor: `Change to ${colorTwoTested}`,
  });
  fireEvent.click(colorButton);

  // cuando la checkbox esta checkeada, el boton deberia estar desabilitado
  fireEvent.click(checkBox);
  expect(colorButton).toBeDisabled();

  // ahora lo mismo que antes pero para habilitar el boton
  fireEvent.click(checkBox);
  expect(colorButton).toBeEnabled();
});

test("checker del cambio de color del boton a gris cuando el boton esta desactivado", () => {
  render(<App />);
  const colorButton = screen.getByRole("button", {
    name: `Change to ${colorTwoTested}`,
  });
  const checkBox = screen.getByRole("checkbox", { name: "Disable button" });

  // que el boton sea gris una vez se presiona la checkbox ->
  fireEvent.click(checkBox);
  expect(colorButton).toHaveStyle({ backgroundColor: "gray" });
  // que el boton sea `${colorOneTested}` una vez se presione la checkbox ->
  fireEvent.click(checkBox);
  expect(colorButton).toHaveStyle({ backgroundColor: `${colorOneTested}` });
  // que se presione el boton y que sea `${colorTwoTested}` ->
  fireEvent.click(colorButton);
  expect(colorButton).toHaveStyle({ backgroundColor: `${colorTwoTested}` });
  // que el boton sea gris una vez se presiona la checkbox ->
  fireEvent.click(checkBox);
  expect(colorButton).toHaveStyle({ backgroundColor: "gray" });
  // que el boton sea `${colorTwoTested}` una vez se presione la checkbox ->
  fireEvent.click(checkBox);
  expect(colorButton).toHaveStyle({ backgroundColor: `${colorTwoTested}` });
  // que el boton sea `${colorOneTested}` una vez se presiona el boton.
  fireEvent.click(colorButton);
  expect(colorButton).toHaveStyle({ backgroundColor: `${colorOneTested}` });
});

describe("spaces before camel-case capital letters", () => {
  test("Works for no inner capital letters", () => {
    expect(replaceCamelWithSpaces("Red")).toBe("Red");
  });
  test("works for one inner capital letter", () => {
    expect(replaceCamelWithSpaces("MidnightBlue")).toBe("Midnight Blue");
  });
  test("works for multiple inner capital letters", () => {
    expect(replaceCamelWithSpaces("MediumVioletRed")).toBe("Medium Violet Red");
  });
});

// test('renders learn react link', () => {
//   render(<App />); // crea un DOM virtual // se accede a la linea anterior con "screen global"
//   const linkElement = screen.getByRole('link', {name: /Learn React/i}); // esto esta dentro de App.js linea 18
//   expect(linkElement).toBeInTheDocument(); // esto hace que el test diga que se tuvo exito o no
// });