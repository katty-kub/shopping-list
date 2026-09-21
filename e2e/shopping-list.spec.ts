import { expect, test } from "@playwright/test";

test("zobrazí prázdný nákupní seznam", async ({ page }) => {
  await page.goto("/");

  const heading = page.getByRole("heading", {
    name: /nákupní seznam/i,
  });

  const emptyMessage = page.getByText(
    /seznam je zatím prázdný/i
  );

  await expect(heading).toBeVisible();
  await expect(emptyMessage).toBeVisible();
});

test("provede hlavní nákupní scénář", async ({ page }) => {
  await page.goto("/");

  const input = page.getByRole("textbox", {
    name: /název položky/i,
  });

  const addButton = page.getByRole("button", {
    name: /přidat/i,
  });

  await input.fill("Mléko");
  await addButton.click();

  const item = page.getByRole("listitem").filter({
    hasText: "Mléko",
  });

  await expect(item).toBeVisible();
  await expect(item).toContainText("Potraviny");

  const checkbox = item.getByRole("checkbox");

  await checkbox.check();
  await expect(checkbox).toBeChecked();

  const deleteButton = item.getByRole("button", {
    name: /smazat položku mléko/i,
  });

  await deleteButton.click();

  await expect(item).toHaveCount(0);

  await expect(
    page.getByText(/seznam je zatím prázdný/i)
  ).toBeVisible();

  await expect(
    page.locator("footer")
  ).toContainText("0");
});