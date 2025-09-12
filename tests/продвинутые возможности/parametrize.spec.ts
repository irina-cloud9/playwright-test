import { test, expect } from '@playwright/test';

// Тесты для формы входа
test.describe('Параметризованные тесты формы входа', () => {
  const loginTestCases = [
    {
      username: 'admin',
      password: 'admin123',
      expected: 'Успешный вход!',
    },
    {
      username: '',
      password: 'anypassword',
      expected: 'Все поля обязательны',
    },
    {
      username: 'testuser',
      password: '123',
      expected: 'Пароль должен быть не менее 6 символов',
    },
  ];

  // Нужно реализовать параметризованный тест на основе массива loginTestCases
  // Шаги теста:
  // 1. Перейти на страницу формы входа
  // 2. Заполнить поле имени пользователя (если не пустое)
  // 3. Заполнить поле пароля
  // 4. Нажать кнопку "Войти"
  // 5. Проверить сообщение системы
  // 6. Проверить класс сообщения (success/error)

  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/parametrize');
  });

  loginTestCases.forEach((testCase) => {
    test(`Заполнение формы: ${testCase.expected}`, async ({ page }) => {
      const { username, password, expected } = testCase;

      // Заполнение формы
      if (username) {
        await page.locator('#username').fill(username);
      }
      await page.locator('#password').fill(password);

      // Нажать кнопку "Войти"
      await page.getByRole('button', { name: 'Войти' }).click();

      //Проверить сообщение системы
      const expectedMessage = page.locator('#message');
      await expect(expectedMessage).toBeVisible();
      await expect(expectedMessage).toHaveText(expected);
      //Проверить класс сообщения (success/error)
      const expectedClass = expected === 'Успешный вход!' ? 'success' : 'error';
    });
  });
});

// Тесты для калькулятора
test.describe('Параметризованные тесты калькулятора', () => {
  const calculatorTestCases = [
    { a: 5, b: 3, operation: 'add', expected: 8 },
    { a: 10, b: 0, operation: 'add', expected: 10 },
    { a: 4, b: 5, operation: 'multiply', expected: 20 },
  ];
  // Нужно реализовать параметризованный тест на основе массива calculatorTestCases
  // Шаги теста:
  // 1. Перейти на страницу калькулятора
  // 2. Ввести первое число
  // 3. Ввести второе число
  // 4. Нажать кнопку операции (сложение/умножение)
  // 5. Проверить результат вычисления
  test.beforeEach(async ({ page }) => {
    await page.goto('https://osstep.github.io/parametrize');
  });
  calculatorTestCases.forEach((testCaseCalcul) => {
    test(`Проверка работы калькулятора: ${testCaseCalcul.operation} и ${testCaseCalcul.expected}`, async ({
      page,
    }) => {
      const { a, b, operation, expected } = testCaseCalcul;

      //ввод первого и второго числа
      await page.fill('#num1', a.toString());
      await page.fill('#num2', b.toString());

      //Нажать кнопку операции (сложение/умножение)
      const buttonOperashion = operation === 'add' ? '#add-btn' : '#multiply-btn';
      await page.click(buttonOperashion);
      // await page.locator(operation).click();

      //Проверить результат вычисления
      const resultExpected = await page.locator('#result').innerText();
      expect(resultExpected).toBe(`Результат: ${expected}`);
    });
  });
});
