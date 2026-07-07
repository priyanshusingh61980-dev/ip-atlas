import { expect, test } from "@playwright/test";

test("landing page renders headline, search, CTAs, and footer", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Global Legal Intelligence");
  await expect(
    page.getByRole("search", { name: /Global legal intelligence search/i }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: /^Search$/ })).toBeVisible();
  await expect(page.getByRole("button", { name: /Explore AI Research/i })).toBeVisible();
  await expect(page.getByRole("button", { name: /Launch Workspace/i })).toBeVisible();
  await expect(page.getByText(/Not legal advice/i).first()).toBeVisible();
});

test("section teasers headline is reachable by scroll", async ({ page }) => {
  await page.goto("/");
  const h2 = page.getByRole("heading", { level: 2, name: /Ten surfaces/i });
  await h2.scrollIntoViewIfNeeded();
  await expect(h2).toBeVisible();
});
