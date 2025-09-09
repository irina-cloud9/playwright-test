import { test, expect } from '@playwright/test';

test.describe('Продвинутые CSS-селекторы', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/locator_css');
  });

  test('Комбинированные условия поиска', async ({ page }) => {
    // 1. Найти карточку товара, которая:
    //    - Имеет класс featured
    //    - Содержит текст "Смартфон"
    //    - Цена меньше 50 000 ₽
    const featuredSmartphone = page.locator(
      '.product-card.featured:has-text("Смартфон") .price-value',
    );
    await expect(featuredSmartphone).toHaveText('49 999');

    // 2. Найти кнопку в форме, которая:
    //    - Является прямой дочерней элементом формы
    //    - Имеет класс btn и submit-btn
    //    - Не disabled
    //:not(.disabled) - ищет элементы без класса "disabled"
    //можно и так page.locator('#registration-form button.btn.submit-btn[type="submit"]')
    //<button type="submit" class="btn submit-btn">Зарегистрироваться</button>
    // const submitButton = page.locator('#registration-form button.btn.submit-btn:not(.[disabled])'); //Правильно использовать :not([disabled]) для проверки отсутствия атрибута/
    const submitButton = page.locator('#registration-form button.btn.submit-btn');
    await expect(submitButton).not.toHaveAttribute('disabled');
    await expect(submitButton).toBeEnabled(); //Элемент включен/
  });
});

test.describe('Динамический контент с условиями', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/locator_css');
  });

  test('Фильтрация динамических элементов', async ({ page }) => {
    // 1. Дождаться появления динамической кнопки, которая:
    //    - Имеет класс disabled
    //    - Содержит текст "Недоступно"
    //    - Не имеет атрибута type="submit"
    const dynamicButton = page.locator('#dynamic-content button.btn.disabled:text("Недоступно")');
    await expect(dynamicButton).not.toHaveAttribute('type', 'submit');
    await expect(dynamicButton).toBeVisible({ timeout: 9000 });

    // 2. Найти динамический товар, который:
    //    - Цена меньше 10 000 ₽
    //    - Не является рекомендуемым (featured)
    const cheapProduct = page.locator('#dynamic-content .product-card:not(.featured)'); // Локатор УЖЕ исключает товары с классом featured
    await expect(cheapProduct).toBeVisible();

    // Проверяем цену
    const priceElement = cheapProduct.locator('.price-value'); //Находим элемент с ценой внутри карточки товара/
    const priceText = await priceElement.textContent(); //Получаем текстовое содержимое элемента цены. Извлекаем текст из элемента/ Возвращает строку: "9 999"/
    const priceNumber = parseInt(priceText.replace(/\s/g, ''), 10); //replace(/\s/g, '') - удаляет все пробелы из строки ("9 999" → "9999").
    // parseInt(..., 10) - преобразует строку в целое число (десятичная система). Результат: число 9999/
    // await expect(cheapProduct).toHaveText('9 999');
    expect(priceNumber).toBeLessThan(10000); //Проверяем что цена меньше 10000/
  });

  test('Комбинации с :has и :not - ВТОРУЮ ЧАСТЬ НЕ РЕШИЛА!!!', async ({ page }) => {
    //:has() - Выбирает элементы, которые содержат определенные потомки.
    //div:has(p) - Выбрать все div, которые содержат параграф;
    //form:has(button[disabled]) - Выбрать форму, содержащую disabled кнопку ;
    //.product-card:has(.price-value:lt(1000)) - Выбрать карточку, содержащую элемент с ценой меньше 1000

    //:not() -Исключает элементы, соответствующие селектору.
    //button:not([disabled]) или button:not(.disabled) - Все кнопки кроме disabled
    //div:not(.container) - Все div кроме тех, что имеют класс container
    //.product-card:not(.featured) - Карточки товаров без класса featured

    // 1. Найти все карточки, которые:
    //    - Не имеют статуса sold-out
    //    - Содержат кнопку с текстом "В корзину"
    const availableProducts = page.locator(
      '.product-card:not(.sold-out):has(button:text("В корзину"))',
    );
    await expect(availableProducts).toHaveCount(2);

    // 2. Найти ячейки таблицы, которые:
    //    - В строках с активными пользователями
    //    - Не являются ячейками с email
    const activeUserCells = page.locator('tr.active td');
    const filteredCells = activeUserCells.filter({ hasNotText: 'Email' });
    await expect(activeUserCells).toHaveCount(3); // ID, Имя, Статус
  });
});
