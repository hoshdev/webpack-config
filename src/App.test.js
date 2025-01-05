import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the App component", () => {
  render(<App />);
  const linkElement = screen.getByText(/Web pack Config/i);
  expect(linkElement).toBeInTheDocument();
});
