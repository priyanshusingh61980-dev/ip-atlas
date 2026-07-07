import { expect, test } from "@playwright/test";

test("switches between map topics and reflects in the URL", async ({ page }) => {
  await page.goto("/maps");

  await expect(page.getByRole("heading", { level: 1 })).toContainText("Cinematic atlases");

  // Default tab is selected.
  const copyrightTab = page.getByRole("tab", { name: /Copyright regimes/i });
  await expect(copyrightTab).toHaveAttribute("aria-selected", "true");

  // Switch to AI regulation.
  const aiTab = page.getByRole("tab", { name: /AI regulation/i });
  await aiTab.click();
  await expect(aiTab).toHaveAttribute("aria-selected", "true");
  await expect(copyrightTab).toHaveAttribute("aria-selected", "false");
  await expect(page).toHaveURL(/topic=ai-regulation/);

  // Sidebar updates to the new topic's narrative.
  const panel = page.getByRole("tabpanel");
  await expect(panel).toContainText(/EU AI Act/i);

  // Switch to litigation hotspots.
  await page.getByRole("tab", { name: /AI litigation hotspots/i }).click();
  await expect(page).toHaveURL(/topic=ai-disputes/);
  await expect(panel).toContainText(/Andersen v\. Stability AI/i);
});

test("hydrates from a topic URL param", async ({ page }) => {
  await page.goto("/maps?topic=trademark");
  await expect(page.getByRole("tab", { name: /Trademark systems/i })).toHaveAttribute(
    "aria-selected",
    "true",
  );
  await expect(page.getByRole("tabpanel")).toContainText(/EUTM/i);
});
