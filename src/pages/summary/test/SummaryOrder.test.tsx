import React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import App from "../../../App";
import SummaryForm from "../SummaryOrder";
import userEvent from "@testing-library/user-event";

test("renders learn react link", () => {
  render(<SummaryForm />);
  const checkBoxElement = screen.getByRole("checkbox", {
    name: /terms and conditions/i,
  });

  const buttonElement = screen.getByRole("button", { name: "Confirm order" });
  //checkbox unchecked by default
  expect(checkBoxElement).not.toBeChecked();

  userEvent.click(checkBoxElement);
  expect(buttonElement).toBeEnabled();

  userEvent.click(checkBoxElement);
  expect(buttonElement).toBeDisabled();
});

test("popover responds to hover", async () => {
  render(<SummaryForm />);

  const nullPopover = screen.queryByText(
    /no ice cream will actually be delivered/i
  );
  expect(nullPopover).not.toBeInTheDocument();
  const terms = screen.getByText(/Terms and Conditions/i);
  userEvent.hover(terms);

  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();

  userEvent.unhover(terms);
  await waitForElementToBeRemoved(() =>
    screen.queryByText(/no ice cream will actually be delivered/i)
  );
});
