import { test, expect } from '@playwright/test';

test.describe('Базовые тесты для getByTestId()', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/locator_getbytestid');
  });

  // Задание 1: Найди заголовок страницы по test-id "page-header"
  // Проверь что он содержит текст "Практика локатора getByTestId()"
  test('Найти заголовок страницы', async ({ page }) => {
    const header = page.getByTestId('page-header');
    await expect(header).toBeVisible();
    await expect(header).toContainText('Практика локатора getByTestId()'); //Элемент содержит текст/
  });

  // Задание 2: Найди все кнопки "В корзину" по test-id "add-to-cart-btn"
  // Проверь что найдено 2 такие кнопки
  test('Найти все кнопки добавления в корзину', async ({ page }) => {
    const addButtons = page.getByTestId('add-to-cart-btn');
    console.log('heee', addButtons);
    await expect(addButtons).toHaveCount(2); //смотрим, что найдено 2-ве кнопки/
    await expect(addButtons.first()).toHaveText('В корзину'); //первая найденная кнопка "В корзину" имеет точный текст "В корзину"/
  });
});

test.describe('Тесты для формы и продуктов', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/locator_getbytestid');
  });

  // Задание 1: Найди карточку продукта по test-id и проверь её содержимое
  test('Проверить карточку продукта', async ({ page }) => {
    const productCard = page.getByTestId('product-card-1');
    await expect(productCard).toBeVisible();

    const productName = productCard.getByTestId('product-name');
    await expect(productName).toHaveText('Ноутбук Pro');

    const productPrice = productCard.getByTestId('product-price');
    await expect(productPrice).toContainText('99 999 ₽');
  });

  // Задание 2: Найди форму заказа и ЗАПОЛНИ её
  test('Заполнить форму заказа', async ({ page }) => {
    const form = page.getByTestId('order-form-section');

    await form.getByTestId('name-input').fill('Иван Иванов');
    await form.getByTestId('email-input').fill('test@example.com');

    const submitButton = form.getByTestId('submit-order-btn');
    await expect(submitButton).toBeEnabled();
  });
});

test.describe('Специальные случаи для getByTestId()', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/locator_getbytestid');
  });

  // Задание 1: Найди СКРЫТЫЙ элемент по test-id и проверь что он не видим
  test('Проверить скрытый элемент', async ({ page }) => {
    const hiddenElement = page.getByTestId('hidden-element');
    await expect(hiddenElement).toBeHidden(); //элемент НЕ виден/
    await expect(hiddenElement).toHaveText('Этот элемент скрыт');
  });

  // Задание 2: Дождись появления динамического элемента и найди его по test-id
  test('Найти динамически добавленный элемент', async ({ page }) => {
    const dynamicElement = page.getByTestId('dynamic-element');
    await expect(dynamicElement).toBeVisible({ timeout: 2000 });
    await expect(dynamicElement).toHaveText('Динамически добавленный элемент');
  });

  // Задание 3: Найди ФУТЕР страницы и проверь текст копирайта
  test('Проверить футер страницы', async ({ page }) => {
    const footer = page.getByTestId('page-footer');
    const copyright = footer.getByTestId('copyright-text');
    await expect(copyright).toContainText('2023');
  });
});
