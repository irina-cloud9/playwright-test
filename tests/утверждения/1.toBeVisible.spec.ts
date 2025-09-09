import { TIMEOUT } from 'dns';

const { test, expect } = require('@playwright/test');

test.describe('Тестирование видимости элементов с toBeVisible()', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/assertion_tobevisible');
  });

  test('Базовый тест видимости элемента', async ({ page }) => {
    // Задание 1: Проверка видимости элемента
    // 1. Найти элемент с id "always-visible"
    // 2. Проверить что элемент видим с помощью toBeVisible()
    // 3. Проверить что элемент содержит текст "Всегда видимый элемент"
    const visibleElement = page.locator('#always-visible');
    await expect(visibleElement).toBeVisible();

    await expect(visibleElement).toHaveText(/Всегда видимый элемент/);
  });

  test('Тест элементов с разными типами скрытия', async ({ page }) => {
    // Задание 2: Проверка скрытых элементов
    // 1. Найти три элемента с разными способами скрытия:
    //    - #toggle-display (display: none)
    //    - #toggle-visibility (visibility: hidden)
    //    - #toggle-opacity (opacity: 0)
    // 2. Проверить что #toggle-display и #toggle-visibility не видны с помощью not.toBeVisible()
    // 3. Проверить что #toggle-opacity виден с помощью toBeVisible()

    const toggleDisplay = page.locator('#toggle-display');
    const toggleVisibility = page.locator('#toggle-visibility');
    const toggleOpacity = page.locator('#toggle-opacity');

    await expect(toggleDisplay).not.toBeVisible();
    await expect(toggleVisibility).not.toBeVisible();
    await expect(toggleOpacity).toBeVisible();

    //Дополнительная проверка CSS свойств (хорошая практика!)
    await expect(toggleDisplay).toHaveCSS('display', 'none');
    await expect(toggleVisibility).toHaveCSS('visibility', 'hidden');
    await expect(toggleOpacity).toHaveCSS('opacity', '0');
  });

  test('Тест изменения видимости элементов', async ({ page }) => {
    // Задание 3: Проверка изменения видимости
    // 1. Найти три кнопки для показа элементов:
    //    - #show-display
    //    - #show-visibility
    //    - #show-opacity
    // 2. Кликнуть по каждой кнопке
    // 3. После каждого клика проверить:
    //    - что соответствующий элемент стал видимым (toBeVisible())
    //    - что CSS свойства изменились на:
    //      - display: block
    //      - visibility: visible
    //      - opacity: 1
    //тест 1
    // await page.locator('#show-display').click();
    // await expect(page.locator('#toggle-display')).toBeVisible();
    // await expect(page.locator('#toggle-display')).toHaveCSS('display', 'block');

    // await page.locator('#show-visibility').click();
    // await expect(page.locator('#toggle-visibility')).toBeVisible();
    // await expect(page.locator('#toggle-visibility')).toHaveCSS('visibility', 'visible');

    // await page.locator('#show-opacity').click();
    // await expect(page.locator('#toggle-opacity')).toBeVisible();
    // await expect(page.locator('#toggle-opacity')).toHaveCSS('opacity', '1');

    //тест 2 - второй варинт решения
    const showDisplay = page.locator('#show-display');
    const showVisibility = page.locator('#show-visibility');
    const showOpacity = page.locator('#show-opacity');

    const toggleDisplay = page.locator('#toggle-display');
    const toggleVisibility = page.locator('#toggle-visibility');
    const toggleOpacity = page.locator('#toggle-opacity');

    await showDisplay.click();
    await expect(toggleDisplay).toBeVisible();
    await expect(toggleDisplay).toHaveCSS('display', 'block');

    await showVisibility.click();
    await expect(toggleVisibility).toBeVisible();
    await expect(toggleVisibility).toHaveCSS('visibility', 'visible');

    await showOpacity.click();
    await expect(toggleOpacity).toBeVisible();
    await expect(toggleOpacity).toHaveCSS('opacity', '1');
  });

  test('Тест элемента с задержкой появления', async ({ page }) => {
    // Задание 4: Проверка элемента с задержкой
    // 1. Найти элемент #delayed-element
    // 2. Проверить что он не видим
    // 3. Найти кнопку #show-delayed и кликнуть по ней
    // 4. С таймаутом 3 секунды дождаться появления элемента
    // 5. Проверить что элемент содержит текст "Элемент с задержкой появления"

    const delayedElement = page.locator('#delayed-element');
    await expect(delayedElement).not.toBeVisible();

    const showDelayed = page.locator('#show-delayed');
    await showDelayed.click();
    await expect(delayedElement).toBeVisible({ TIMEOUT: 3000 });
    await expect(delayedElement).toHaveText('Элемент с задержкой появления');
  });
});
