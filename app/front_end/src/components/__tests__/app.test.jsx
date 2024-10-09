import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Home from "../../components/Home/Home";
import CattleMovement from "../../components/CattleMovement/CattleMovement";

test("should render home component", () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
  const homeElement = screen.getByTestId("home-1");
  expect(homeElement).toBeInTheDocument();
  expect(homeElement).toHaveTextContent("Service Last Updated");
});
describe("CattleMovement component", () => {
  test("should render cattle movement component", () => {
    render(
      <BrowserRouter>
        <CattleMovement />
      </BrowserRouter>
    );
    const cattlemovementElement = screen.getByTestId("cattlemovement-1");
    expect(cattlemovementElement).toBeInTheDocument();
  });
  test("cattle movemvent component contains json object", () => {
    render(
      <BrowserRouter>
        <CattleMovement />
      </BrowserRouter>
    );
    const cattlemovementElement = screen.getByTestId("cattlemovement-1");
    expect(cattlemovementElement).toBeInTheDocument(
      expect.objectContaining({
        jsonData: expect.anything(),
      })
    );
  });
});
