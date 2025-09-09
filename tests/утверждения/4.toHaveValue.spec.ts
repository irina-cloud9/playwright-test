import { test, expect } from '@playwright/test';
import { emit } from 'process';

test.beforeEach(async ({ page }) => {
  await page.goto('https://osstep.github.io/assertion_tohavevalue');
});

test('1. Проверка начальных значений полей', async ({ page }) => {
  // Задание: Проверить начальные значения всех полей формы
  // 1. Найти поле "Имя пользователя" по лейблу и проверить значение "Гость"
  // 2. Найти поле "Электронная почта" и проверить что оно пустое
  // 3. Найти поле "Телефон" и проверить значение "+7"
  // 4. Найти поле "Комментарии" и проверить что оно пустое
  // 5. Найти выпадающий список "Страна" и проверить значение "ru"

  const name = page.getByLabel('Имя пользователя:');
  await expect(name).toHaveValue('Гость');

  const email = page.getByLabel('Электронная почта:');
  await expect(email).toHaveValue('');

  const phone = page.getByLabel('Телефон:');
  await expect(phone).toHaveValue('+7');

  const comments = page.getByLabel('Комментарии:');
  await expect(comments).toHaveValue('');

  const country = page.getByLabel('Страна:');
  await expect(country).toHaveValue('ru');
});

test('2. Проверка изменения значений полей', async ({ page }) => {
  // Задание: Проверить обновление значений полей
  // 1. Заполнить поле "Имя пользователя" значением "Алексей"
  // 2. Заполнить поле "Электронная почта" значением "alex@example.com"
  // 3. Заполнить поле "Телефон" значением "+7 (123) 456-78-90"
  // 4. Заполнить поле "Комментарии" значением "Тестовый комментарий"
  // 5. Выбрать в списке "Страна" значение "Казахстан" (kz)
  // 6. Проверить что все поля содержат новые значения

  const nameUser = page.locator('#username');
  await nameUser.fill('Алексей');
  await expect(nameUser).toHaveValue('Алексей');

  const emailUser = page.locator('#email');
  await emailUser.fill('alex@example.com');
  await expect(emailUser).toHaveValue('alex@example.com');

  const phonelUser = page.locator('#phone');
  await phonelUser.fill('+7 (123) 456-78-90');
  await expect(phonelUser).toHaveValue('+7 (123) 456-78-90');

  const commentsUser = page.locator('#comments');
  await commentsUser.fill('Тестовый комментарий');
  await expect(commentsUser).toHaveValue('Тестовый комментарий');

  const countryUser = page.locator('#country');
  await countryUser.click();
  await countryUser.selectOption('kz');
  await expect(countryUser).toHaveValue('kz');
});

test('3. Проверка сброса формы', async ({ page }) => {
  // Задание: Проверить сброс значений формы к начальным
  // 1. Изменить поле "Имя пользователя" на "Петр"
  // 2. Изменить поле "Электронная почта" на "test@test.ru"
  // 3. Выбрать в списке "Страна" значение "Беларусь" (by)
  // 4. Нажать кнопку "Сбросить"
  // 5. Проверить что поле "Имя пользователя" содержит "Гость"
  // 6. Проверить что поле "Электронная почта" пустое
  // 7. Проверить что поле "Телефон" содержит "+7"
  // 8. Проверить что список "Страна" содержит значение "ru"

  const nameUser = page.locator('#username');
  await nameUser.fill('Петр');

  const emailUser = page.locator('#email');
  await emailUser.fill('test@test.ru');

  const countryUser = page.locator('#country');
  await countryUser.click();
  await countryUser.selectOption('by');

  await page.locator('#reset-btn').click();

  await expect(nameUser).toHaveValue('Гость');
  await expect(emailUser).toHaveValue('');
  await expect(page.locator('#phone')).toHaveValue('+7');
  await expect(countryUser).toHaveValue('ru');
});

test('4. Проверка обновления данных', async ({ page }) => {
  // Задание: Проверить отображение введенных данных
  // 1. Заполнить поле "Имя пользователя" значением "Мария"
  // 2. Заполнить поле "Электронная почта" значением "maria@mail.ru"
  // 3. Заполнить поле "Комментарии" значением "Важный комментарий"
  // 4. Нажать кнопку "Обновить данные"
  // 5. Проверить что в блоке вывода содержится текст с введенными данными

  const nameUser = page.locator('#username');
  await nameUser.fill('Мария');

  const emailUser = page.locator('#email');
  await emailUser.fill('maria@mail.ru');

  const commentsUser = page.locator('#comments');
  await commentsUser.fill('Важный комментарий');

  await page.getByRole('button', { name: 'Обновить данные' }).click(); //попробовала локатор по роли, можно было и без него/
  await expect(page.locator('#output')).toContainText('Мария');
  await expect(page.locator('#output')).toContainText('maria@mail.ru');
  await expect(page.locator('#output')).toContainText('Важный комментарий');
});

test('5. Проверка пустых значений', async ({ page }) => {
  // Задание: Проверить обработку пустых значений
  // 1. Очистить поле "Имя пользователя"
  // 2. Очистить поле "Телефон"
  // 3. Выбрать пустое значение в списке "Страна"
  // 4. Проверить что поле "Имя пользователя" пустое
  // 5. Проверить что поле "Телефон" пустое
  // 6. Проверить что список "Страна" содержит пустое значение
  // 7. Проверить что изначально пустое поле "Электронная почта" осталось пустым

  const nameUser = page.locator('#username');
  await nameUser.clear();

  const phonelUser = page.locator('#phone');
  await phonelUser.clear();

  const countryUser = page.locator('#country');
  await countryUser.click();
  await countryUser.selectOption('');

  await expect(nameUser).toHaveValue('');
  await expect(phonelUser).toHaveValue('');
  await expect(countryUser).toHaveValue('');
  await expect(page.locator('#email')).toHaveValue('');
});
