import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(() => {
  cleanup();
  localStorage.clear();
});
it("uloží přidanou položku do localStorage", async () => {
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

  const savedItems =
    localStorage.getItem("shoppingItems");

  expect(savedItems).not.toBeNull();

  const parsedItems = JSON.parse(
    savedItems ?? "[]"
  );

  expect(parsedItems).toEqual([
    expect.objectContaining({
      name: "Mléko",
      category: "Potraviny",
      bought: false,
    }),
  ]);
});