import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";

import App from "./App";

test("zobrazí výchozí stav aplikace", () => {
  render(<App />);

  const heading = screen.getByRole("heading", {
    name: /nákupní seznam/i,
  });

  const emptyMessage = screen.getByText(
    /seznam je zatím prázdný/i
  );

  expect(heading).toBeInTheDocument();
  expect(emptyMessage).toBeInTheDocument();
});

test("přidá položku a aktualizuje počet", async () => {
  const user = userEvent.setup();

  render(<App />);

  const input = screen.getByRole("textbox", {
    name: /název položky/i,
  });

  const addButton = screen.getByRole("button", {
    name: /přidat/i,
  });

  await user.type(input, "Mléko");
  await user.click(addButton);

  expect(
    screen.getByText("Mléko")
  ).toBeInTheDocument();

  expect(
    screen.getByText("1")
  ).toBeInTheDocument();
});

test("nepřidá prázdnou položku", async () => {
  const user = userEvent.setup();

  render(<App />);

  const input = screen.getByRole("textbox", {
    name: /název položky/i,
  });

  const addButton = screen.getByRole("button", {
    name: /přidat/i,
  });

  await user.type(input, "   ");
  await user.click(addButton);

  expect(
    screen.queryByRole("listitem")
  ).not.toBeInTheDocument();

  expect(
    screen.getByText(/seznam je zatím prázdný/i)
  ).toBeInTheDocument();
});

test("označí položku jako koupenou", async () => {
  const user = userEvent.setup();

  render(<App />);

  const input = screen.getByRole("textbox", {
    name: /název položky/i,
  });

  const addButton = screen.getByRole("button", {
    name: /přidat/i,
  });

  await user.type(input, "Mléko");
  await user.click(addButton);

  const checkbox = screen.getByRole("checkbox", {
    name: /mléko/i,
  });

  expect(checkbox).not.toBeChecked();

  await user.click(checkbox);

  expect(checkbox).toBeChecked();
});

test("smaže položku a aktualizuje počet", async () => {
  const user = userEvent.setup();

  render(<App />);

  const input = screen.getByRole("textbox", {
    name: /název položky/i,
  });

  const addButton = screen.getByRole("button", {
    name: /přidat/i,
  });

  await user.type(input, "Mléko");
  await user.click(addButton);

  const deleteButton = screen.getByRole("button", {
    name: /smazat položku mléko/i,
  });

  await user.click(deleteButton);

  expect(
    screen.queryByText("Mléko")
  ).not.toBeInTheDocument();

  expect(
    screen.getByText("0")
  ).toBeInTheDocument();

  expect(
    screen.getByText(/seznam je zatím prázdný/i)
  ).toBeInTheDocument();
});