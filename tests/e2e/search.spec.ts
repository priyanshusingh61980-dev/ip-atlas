import { expect, test } from "@playwright/test";

test("submits a query and renders the streaming → success result", async ({ page }) => {
  await page.goto("/search");

  await expect(page.getByRole("heading", { level: 1 })).toContainText("Ask any question");

  const input = page.getByPlaceholder(/AI training data and fair use/i);
  await input.fill("AI training data and fair use");

  await page.getByRole("button", { name: /^Search$/ }).click();

  // Final precedents + timeline + citations sections render.
  await expect(page.getByRole("heading", { name: /^Precedents$/i })).toBeVisible({
    timeout: 10000,
  });
  await expect(page.getByRole("heading", { name: /^Timeline$/i })).toBeVisible();
  await expect(page.getByRole("heading", { name: /^Citations$/i })).toBeVisible();

  // URL syncs the query.
  await expect(page).toHaveURL(/\/search\?q=/);
});

test("hydrates from URL params and renders results", async ({ page }) => {
  await page.goto("/search?q=fair+use&j=US,EU");
  await expect(page.getByRole("heading", { name: /^Precedents$/i })).toBeVisible({
    timeout: 10000,
  });
});
