import {
  render,
  screen,
  within,
} from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import {
  describe,
  expect,
  it,
} from "vitest";

import App from "./App";

describe("App", () => {
  it("zobrazí nadpis Nákupní seznam", () => {
    render(<App />);

    const heading = screen.getByRole("heading", {
      name: /nákupní seznam/i,
    });

    expect(heading).toBeInTheDocument();
  });

  it("zobrazí informaci o prázdném seznamu", () => {
    render(<App />);

    expect(
      screen.getByText(/seznam je zatím prázdný/i)
    ).toBeInTheDocument();
  });

  it("přidá novou položku do seznamu", async () => {
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
      screen.queryByText(
        /seznam je zatím prázdný/i
      )
    ).not.toBeInTheDocument();
  });

  it("přidá položku s vybranou kategorií", async () => {
    const user = userEvent.setup();

    render(<App />);

    const input = screen.getByRole("textbox", {
      name: /název položky/i,
    });

    const categorySelect = screen.getByRole(
      "combobox",
      {
        name: /kategorie položky/i,
      }
    );

    const addButton = screen.getByRole("button", {
      name: /přidat/i,
    });

    await user.type(input, "Šampon");

    await user.selectOptions(
      categorySelect,
      "Drogerie"
    );

    await user.click(addButton);

    const itemName = screen.getByText("Šampon");
    const listItem = itemName.closest("li");

    if (!listItem) {
      throw new Error(
        "Položka Šampon nebyla nalezena."
      );
    }

    expect(
      within(listItem).getByText("Drogerie")
    ).toBeInTheDocument();
  });

  it("označí položku jako koupenou", async () => {
    const user = userEvent.setup();

    render(<App />);

    const input = screen.getByRole("textbox", {
      name: /název položky/i,
    });

    const addButton = screen.getByRole("button", {
      name: /přidat/i,
    });

    await user.type(input, "Chléb");
    await user.click(addButton);

    const checkbox = screen.getByRole(
      "checkbox",
      {
        name: /chléb/i,
      }
    );

    await user.click(checkbox);

    expect(checkbox).toBeChecked();

    const listItem =
      screen.getByText("Chléb").closest("li");

    expect(listItem).toHaveClass("purchased");
  });
});

it("odstraní položku ze seznamu", async () => {
  const user = userEvent.setup();

  render(<App />);

  const input = screen.getByRole("textbox", {
    name: /název položky/i,
  });

  const addButton = screen.getByRole("button", {
    name: /přidat/i,
  });

  await user.type(input, "Máslo");
  await user.click(addButton);

  expect(
    screen.getByText("Máslo")
  ).toBeInTheDocument();

  const deleteButton = screen.getByRole("button", {
    name: /smazat položku máslo/i,
  });

  await user.click(deleteButton);

  expect(
    screen.queryByText("Máslo")
  ).not.toBeInTheDocument();

  expect(
    screen.getByText(/seznam je zatím prázdný/i)
  ).toBeInTheDocument();
});
it("přidá položku po stisknutí klávesy Enter", async () => {
  const user = userEvent.setup();

  render(<App />);

  const input = screen.getByRole("textbox", {
    name: /název položky/i,
  });

  await user.type(input, "Rohlíky");
  await user.keyboard("{Enter}");

  expect(
    screen.getByText("Rohlíky")
  ).toBeInTheDocument();

  expect(input).toHaveValue("");
});
it("nepřidá prázdnou položku", async () => {
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
    screen.getByText(/seznam je zatím prázdný/i)
  ).toBeInTheDocument();

  expect(
    screen.queryByRole("listitem")
  ).not.toBeInTheDocument();
});
it("aktualizuje celkový počet položek", async () => {
  const user = userEvent.setup();

  render(<App />);

  const counterText = screen.getByText(
    /celkem položek/i
  );

  const counter = counterText.closest("footer");

  if (!counter) {
    throw new Error(
      "Počítadlo položek nebylo nalezeno."
    );
  }

  expect(
    within(counter).getByText("0")
  ).toBeInTheDocument();

  const input = screen.getByRole("textbox", {
    name: /název položky/i,
  });

  const addButton = screen.getByRole("button", {
    name: /přidat/i,
  });

  await user.type(input, "Jablka");
  await user.click(addButton);

  expect(
    within(counter).getByText("1")
  ).toBeInTheDocument();
});
it("po přidání vrátí kategorii na Potraviny", async () => {
  const user = userEvent.setup();

  render(<App />);

  const input = screen.getByRole("textbox", {
    name: /název položky/i,
  });

  const categorySelect = screen.getByRole(
    "combobox",
    {
      name: /kategorie položky/i,
    }
  );

  const addButton = screen.getByRole("button", {
    name: /přidat/i,
  });

  await user.type(input, "Šampon");

  await user.selectOptions(
    categorySelect,
    "Drogerie"
  );

  expect(categorySelect).toHaveValue("Drogerie");

  await user.click(addButton);

  expect(categorySelect).toHaveValue("Potraviny");
});
it("po odstranění položky aktualizuje počet na nulu", async () => {
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

  const counterText = screen.getByText(
    /celkem položek/i
  );

  const counter = counterText.closest("footer");

  if (!counter) {
    throw new Error(
      "Počítadlo položek nebylo nalezeno."
    );
  }

  expect(
    within(counter).getByText("1")
  ).toBeInTheDocument();

  const deleteButton = screen.getByRole("button", {
    name: /smazat položku mléko/i,
  });

  await user.click(deleteButton);

  expect(
    within(counter).getByText("0")
  ).toBeInTheDocument();

  expect(
    screen.getByText(/seznam je zatím prázdný/i)
  ).toBeInTheDocument();
});
it("vrátí koupenou položku zpět na nekoupenou", async () => {
  const user = userEvent.setup();

  render(<App />);

  const input = screen.getByRole("textbox", {
    name: /název položky/i,
  });

  const addButton = screen.getByRole("button", {
    name: /přidat/i,
  });

  await user.type(input, "Chléb");
  await user.click(addButton);

  const checkbox = screen.getByRole("checkbox", {
    name: /chléb/i,
  });

  const listItem =
    screen.getByText("Chléb").closest("li");

  if (!listItem) {
    throw new Error(
      "Položka Chléb nebyla nalezena."
    );
  }

  await user.click(checkbox);

  expect(checkbox).toBeChecked();
  expect(listItem).toHaveClass("purchased");

  await user.click(checkbox);

  expect(checkbox).not.toBeChecked();
  expect(listItem).not.toHaveClass("purchased");
});
it("smaže pouze vybranou položku", async () => {
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

  await user.type(input, "Chléb");
  await user.click(addButton);

  expect(screen.getByText("Mléko")).toBeInTheDocument();
  expect(screen.getByText("Chléb")).toBeInTheDocument();

  const deleteMilkButton = screen.getByRole("button", {
    name: /smazat položku mléko/i,
  });

  await user.click(deleteMilkButton);

  expect(
    screen.queryByText("Mléko")
  ).not.toBeInTheDocument();

  expect(
    screen.getByText("Chléb")
  ).toBeInTheDocument();
});