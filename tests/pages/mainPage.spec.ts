import { test, expect, Page, Locator } from '@playwright/test';
import { MainPage } from '../models/MainPage';

let mainPage: MainPage; //Типизировали переменную и она стала являться экземпляром класса MainPage
//Область видимости стала не блочная

test.describe('Тесты главной страницы', () => {
  test.beforeEach(async ({ page }) => {
    //Присвоили переменной mainPage экземпляр класса
    mainPage = new MainPage(page);
    await mainPage.openMainPage();
  });
  test('Проверка отображения элементов навигации - хедер', async ({}) => {
    await mainPage.checkElemtntsVisability();
  });

  test('Проверка названия элементов навигации - хедер', async ({}) => {
    await mainPage.checkElemtntsText();
  });

  test('Проверка атрибута href  элементов навигации - хедер', async ({}) => {
    await mainPage.checkElemtntsHrefAttribute();
  });

  test('Проверка переключания лайт мода (темная и светлая тема + серая - можно разбить на два отдельных теста) - хедер', async ({
    page,
  }) => {
    //можно и без step просто оставить await
    // await mainPage.clickSwitchLightModelIcon();
    // await mainPage.checkDataThemeAttributeValuelight();
    // await mainPage.clickSwitchLightModelIcon();
    // await mainPage.checkDataThemeAttributeValueDark();

    await test.step('Нажать на иконку переключения лайт мода', async () => {
      await mainPage.clickSwitchLightModelIcon();
    });
    await test.step('Проверка смены атрибута - light', async () => {
      await mainPage.checkDataThemeAttributeValuelight();
    });
    await test.step('Нажать на иконку переключения лайт мода', async () => {
      await mainPage.clickSwitchLightModelIcon();
    });
    await test.step('Проверка смены атрибута - dark', async () => {
      await mainPage.checkDataThemeAttributeValueDark();
    });
  });

  //можно улучшийть - без данного блока не проходят два теста по светлой и темной теле (скриншоты!!!!)
  test(`Проверка стилей с system темой`, async ({}) => {
    await mainPage.setsystemMode();
    await mainPage.checkLayautWithsystemMode();
  });

  test(`Проверка стилей со светлой темой`, async ({}) => {
    await test.step('Установка светлой темы', async () => {
      await mainPage.setLightMode();
    });
    await test.step('Скриншотная проверка с активной светлой темой', async () => {
      await mainPage.checkLayautWithLightMode();
    });
  });

  test(`Проверка стилей с темной темой`, async ({}) => {
    await test.step('Установка темной темы', async () => {
      await mainPage.setDarkMode();
    });
    await test.step('Скриншотная проверка с активной темной темой', async () => {
      await mainPage.checkLayautWithDarkMode();
    });
  });
});

//Так было до упрощения кода/
// import { test, expect } from '@playwright/test';

// const elements = [
//   { locator: (page) => page.getByRole('link', { name: 'Docs' }) },
//   { locator: (page) => page.getByRole('link', { name: 'API' }) },
//   { locator: (page) => page.getByRole('button', { name: 'Node.js' }) },
//   { locator: (page) => page.getByRole('link', { name: 'Agents' }) },
//   { locator: (page) => page.getByRole('link', { name: 'Community' }) },
//   { locator: (page) => page.getByRole('link', { name: 'GitHub repository' }) },
//   { locator: (page) => page.getByRole('link', { name: 'Discord server' }) },
// ];

// test.describe('Тесты главной страницы', () => {
//   test.beforeEach(async ({ page }) => {
//     await page.goto('https://playwright.dev/');
//   });
//   test('Проверка отображения элементов навигации - хедер', async ({ page }) => {
//     test.step('Проверка отображения элемента Playwright logo', async () => {
//       await expect
//         .soft(page.getByRole('link', { name: 'Playwright logo Playwright' }))
//         .toBeVisible();
//     });

//     await expect.soft(page.getByRole('link', { name: 'Docs' })).toBeVisible();
//     await expect.soft(page.getByRole('link', { name: 'API' })).toBeVisible();
//     await expect.soft(page.getByRole('button', { name: 'Node.js' })).toBeVisible();
//     await expect.soft(page.getByRole('link', { name: 'Agents' })).toBeVisible();
//     await expect.soft(page.getByRole('link', { name: 'Community' })).toBeVisible();
//     await expect.soft(page.getByRole('link', { name: 'GitHub repository' })).toBeVisible();
//     await expect.soft(page.getByRole('link', { name: 'Discord server' })).toBeVisible();
//     await expect
//       .soft(page.getByRole('button', { name: 'Switch between dark and light' }))
//       .toBeVisible();
//     await expect.soft(page.getByRole('button', { name: 'Search (Ctrl+K)' })).toBeVisible();
//   });

//   test('Проверка названия элементов навигации - хедер', async ({ page }) => {
//     await expect(page.getByRole('link', { name: 'Playwright logo Playwright' })).toContainText(
//       'Playwright',
//     );
//     await expect(page.getByRole('link', { name: 'Docs' })).toContainText('Docs');
//     await expect(page.getByRole('link', { name: 'API' })).toContainText('API');
//     await expect(page.getByRole('button', { name: 'Node.js' })).toContainText('Node.js');
//     await expect(page.getByRole('link', { name: 'Agents' })).toContainText('Agents');
//     await expect(page.getByRole('link', { name: 'Community' })).toContainText('Community');
//   });

//   test('Проверка атрибута href  элементов навигации - хедер', async ({ page }) => {
//     await expect(page.getByRole('link', { name: 'Playwright logo Playwright' })).toHaveAttribute(
//       'href',
//       '/',
//     );
//     await expect(page.getByRole('link', { name: 'Docs' })).toHaveAttribute('href', '/docs/intro');
//     await expect(page.getByRole('link', { name: 'API' })).toHaveAttribute(
//       'href',
//       '/docs/api/class-playwright',
//     );
//     await expect(page.getByRole('link', { name: 'Agents' })).toHaveAttribute('href', '/agents');
//     await expect(page.getByRole('link', { name: 'Community' })).toHaveAttribute(
//       'href',
//       '/community/welcome',
//     );
//     await expect(page.getByRole('link', { name: 'GitHub repository' })).toHaveAttribute(
//       'href',
//       'https://github.com/microsoft/playwright',
//     );
//     await expect(page.getByRole('link', { name: 'Discord server' })).toHaveAttribute(
//       'href',
//       'https://aka.ms/playwright/discord',
//     );
//   });

//   test('Проверка переключания лайт мода (темная и светлая тема + серая - можно разбить на два отдельных теста) - хедер', async ({
//     page,
//   }) => {
//     await page.getByLabel('Switch between dark and light').click();
//     await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
//     await page.getByLabel('Switch between dark and light').click();
//     await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
//   });

//   test('Проверка текста заголовка', async ({ page }) => {
//     await expect(page.getByRole('heading', { name: 'Playwright enables reliable' })).toBeVisible();
//     await expect(page.getByRole('heading', { name: 'Playwright enables reliable' })).toContainText(
//       'Playwright enables reliable end-to-end testing for modern web apps.',
//     );
//   });

//   test('Проверка кнопки Get started', async ({ page }) => {
//     // await expect(page.getByRole('link', { name: 'Get started' })).toBeVisible();
//     // await expect(page.getByRole('link', { name: 'Get started' })).toContainText('Get started');
//     // await expect(page.getByRole('link', { name: 'Get started' })).toHaveAttribute(
//     //   'href',
//     //   '/docs/intro',
//     // );

//     //проверка с мягкими утверждениями (soft) - все будет проверено, даже если будет ошибка в одной из строк (упадет)
//     await expect.soft(page.getByRole('link', { name: 'Get started' })).toBeVisible();
//     await expect.soft(page.getByRole('link', { name: 'Get started' })).toContainText('Get started');
//     await expect
//       .soft(page.getByRole('link', { name: 'Get started' }))
//       .toHaveAttribute('href', '/docs/intro');
//   });
// });

//это группа тестов, у нас два элемента и по ним мы иттерируемся (value передастся стоько раз, сколько у нас записей в []) - сравниваем скриншоты
//Данный тест нужно запускать два раза, так как при первом запуск ему не счем сравнивать - нет первого скриншота/
//нужно немного передалать!!! Не те скриншоты
//Можно так или через переменную вынесенную отдельно - ['light', 'dark'].forEach()/
// lightMods.forEach((value) => {
//   test(`Проверка стилей активного ${value} мода - скриншотная проверка`, async ({ page }) => {
//     await page.evaluate((value) => {
//       document.querySelector('html')?.setAttribute('data-theme', value);
//     }, value); //сюда передаем value, что бы синтаксис работал корректно/
//     await expect(page).toHaveScreenshot(`PageWith${value}Mode.png`);
//   });
// });
