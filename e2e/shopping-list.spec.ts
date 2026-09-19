import {
  expect,
  test,
  type Page,
} from "@playwright/test";

async function addItem(
  page: Page,
  name: string,
  category = "Potraviny"
) {
  await page
    .getByRole("textbox", {
      name: /název položky/i,
    })
    .fill(name);

  await page
    .getByRole("combobox", {
      name: /kategorie položky/i,
    })
    .selectOption(category);

  await page
    .getByRole("button", {
      name: /přidat/i,
    })
    .click();
}

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("zobrazí prázdný nákupní seznam", async ({ page }) => {
  await expect(
    page.getByRole("heading", {
      name: /nákupní seznam/i,
    })
  ).toBeVisible();

  await expect(
    page.getByText(/seznam je zatím prázdný/i)
  ).toBeVisible();

  await expect(page.locator("footer")).toContainText("0");
});

test("přidá novou položku", async ({ page }) => {
  await addItem(page, "Mléko");

  const item = page.getByRole("listitem").filter({
    hasText: "Mléko",
  });

  await expect(item).toContainText("Potraviny");
  await expect(page.locator("footer")).toContainText("1");
});

test("nepřidá prázdnou položku", async ({ page }) => {
  await addItem(page, "   ");

  await expect(
    page.getByRole("listitem")
  ).toHaveCount(0);

  await expect(
    page.getByText(/seznam je zatím prázdný/i)
  ).toBeVisible();
});

test("uloží položku do vybrané kategorie", async ({ page }) => {
  await addItem(page, "Šampon", "Drogerie");

  const item = page.getByRole("listitem").filter({
    hasText: "Šampon",
  });

  await expect(item).toContainText("Drogerie");
});

test("označí položku jako koupenou", async ({ page }) => {
  await addItem(page, "Chléb");

  const item = page.getByRole("listitem").filter({
    hasText: "Chléb",
  });

  const checkbox = page.getByRole("checkbox", {
    name: /chléb/i,
  });

  await checkbox.check();

  await expect(checkbox).toBeChecked();
  await expect(item).toHaveClass(/purchased/);
});

test("smaže položku a aktualizuje počet", async ({ page }) => {
  await addItem(page, "Mléko");

  await page
    .getByRole("button", {
      name: /smazat položku mléko/i,
    })
    .click();

  await expect(
    page.getByText("Mléko")
  ).toHaveCount(0);

  await expect(
    page.getByText(/seznam je zatím prázdný/i)
  ).toBeVisible();

  await expect(page.locator("footer")).toContainText("0");
});