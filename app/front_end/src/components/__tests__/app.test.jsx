import { render, screen } from "@testing-library/react";
import Home from "../../components/Home/Home";
import { BrowserRouter } from "react-router-dom";

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
