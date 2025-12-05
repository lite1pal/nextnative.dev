import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await expect(page).toHaveTitle(/Launch Mobile Apps/);
});

test("from cta to checkout", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page
    .getByRole("button", { name: "Get NextNative now" })
    .first()
    .click();
  await page.getByRole("button", { name: "Get NextNative" }).nth(5).click();
  await expect(page).toHaveURL(
    /https:\/\/test\.checkout\.dodopayments\.com\/buy\/pdt_GRzIIHWavjcnjaCw5Z4Ut/i,
  );
});

test("test for free button", async ({ page }) => {
  await page.goto("http://localhost:3000/");

  await page.getByRole("button", { name: "Try for free" }).first().click();

  await expect(page).toHaveURL("https://nextnative.dev/playground");
});
