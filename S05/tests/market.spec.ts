import { expect, test, type Page } from '@playwright/test';
import { createRequire } from 'node:module';

const axePath = createRequire(import.meta.url).resolve('axe-core/axe.min.js');
const heading = (page: Page) => page.getByRole('heading', { name: 'Каталог товаров' });
const cart = (page: Page) => page.getByRole('button', { name: /^Корзина/ });
const headphones = (page: Page) => page.getByRole('article', { name: 'Беспроводные наушники' });

test('initial skeletons give way to the product grid', async ({ page }) => {
  await page.clock.install();
  await page.goto('/');
  await expect(heading(page)).toBeVisible();
  await expect(page.getByRole('region', { name: 'Товары' })).toHaveAttribute('aria-busy', 'true');
  await expect(headphones(page)).toHaveCount(0);
  await page.clock.runFor(1_000);
  await expect(headphones(page)).toBeVisible();
  await expect(page.getByRole('region', { name: 'Товары' })).toHaveAttribute('aria-busy', 'false');
});

test('search and category work together and reset restores results', async ({ page }) => {
  await page.goto('/');
  await expect(headphones(page)).toBeVisible();

  const search = page.getByRole('searchbox', { name: 'Поиск' });
  await search.fill('  НАУШНИКИ ');
  await expect(page.getByRole('article')).toHaveCount(1);

  await page.getByLabel('Категория').selectOption('home');
  await expect(page.getByRole('heading', { name: 'Ничего не найдено' })).toBeVisible();

  await page.getByRole('button', { name: 'Сбросить фильтры' }).click();
  await expect(search).toBeFocused();
  await expect(search).toHaveValue('');
  await expect(headphones(page)).toBeVisible();
  await expect(page.getByRole('article')).toHaveCount(8);
});

test('adding a product shows loading then adds it exactly once', async ({ page }) => {
  await page.goto('/');
  const add = headphones(page).getByRole('button', { name: 'В корзину' });
  await expect(add).toBeVisible();
  await page.clock.install();
  await add.focus();
  await add.press('Enter');

  const loading = headphones(page).getByRole('button', { name: 'Добавляем…' });
  await expect(loading).toHaveAttribute('aria-busy', 'true');
  await expect(loading).toBeDisabled();
  await expect(loading).toBeFocused();
  await loading.press('Enter');
  await expect(cart(page)).toHaveAccessibleName('Корзина, 0');
  await page.clock.runFor(1_000);

  await expect(cart(page)).toHaveAccessibleName('Корзина, 1');
  await cart(page).click();
  await expect(page.getByRole('region', { name: 'Содержимое корзины' })).toContainText('Беспроводные наушники');
  await expect(add).toBeEnabled();
  await page.getByRole('link', { name: 'UI-кит' }).click();
  await page.getByRole('link', { name: 'Каталог', exact: true }).click();
  await expect(cart(page)).toHaveAccessibleName('Корзина, 1');
});

test('shows the system theme on first visit and remembers an explicit choice', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/');
  const theme = page.getByLabel('Тема');
  await expect(theme).toHaveValue('dark');
  await theme.selectOption('sage');
  await page.reload();
  await expect(theme).toHaveValue('sage');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'sage');
});

test('catalog and UI kit support keyboard navigation and expose no axe violations', async ({ page }) => {
  await page.goto('/');
  await expect(headphones(page)).toBeVisible();
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'К содержимому' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page.locator('main')).toBeFocused();

  for (const theme of ['light', 'dark', 'sage']) {
    await page.getByLabel('Тема').selectOption(theme);
    await page.addScriptTag({ path: axePath });
    const violations = await page.evaluate(async () => (await window.axe.run()).violations);
    expect(violations.map(({ id, nodes }) => ({ id, targets: nodes.map((node) => node.target) }))).toEqual([]);
  }

  await page.getByRole('link', { name: 'UI-кит' }).click();
  await expect(page.getByRole('table', { name: 'Варианты и размеры кнопок' }).getByRole('button')).toHaveCount(12);
  const leakedProps = await page.getByRole('button').evaluateAll((buttons) =>
    buttons.flatMap((button) => button.getAttributeNames().filter((name) =>
      ['variant', 'size', '$variant', '$size', 'loading'].includes(name),
    )),
  );
  expect(leakedProps).toEqual([]);
  const kitViolations = await page.evaluate(async () => (await window.axe.run()).violations);
  expect(kitViolations.map((violation) => violation.id)).toEqual([]);
});

test('product grid lays out one to four columns without horizontal overflow', async ({ page }) => {
  await page.goto('/');
  await expect(headphones(page)).toBeVisible();
  const cards = page.getByRole('article');

  for (const [width, columns] of [[375, 1], [640, 2], [900, 3], [1280, 4]]) {
    await page.setViewportSize({ width, height: 900 });
    const result = await cards.evaluateAll((items) => {
      const firstRow = items[0].getBoundingClientRect().top;
      return {
        columns: items.filter((item) => item.getBoundingClientRect().top === firstRow).length,
        overflow: document.documentElement.scrollWidth > innerWidth,
      };
    });
    expect(result).toEqual({ columns, overflow: false });
  }
});
