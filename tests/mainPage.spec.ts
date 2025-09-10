import { test, expect, Page, Locator } from '@playwright/test';
//Интерфейс для типизации элементов в списке, что бы при добавлении новых элементов следовать структуре const elemtnts
//text? - опциональное значение
interface Elements {
  locator: (page: Page) => Locator;
  name: string;
  text?: string;
  attribute?: {
    type: string;
    value: string;
  };
}

const elements: Elements[] = [
  {
    locator: (page: Page): Locator =>
      page.getByRole('link', { name: 'Playwright logo Playwright' }),
    name: 'Playwright logo link',
    text: 'Playwright',
    attribute: {
      type: 'href',
      value: '/',
    },
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'Docs' }),
    name: 'Docs link',
    text: 'Docs ',
    attribute: {
      type: 'href',
      value: '/docs/intro',
    },
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'API' }),
    name: 'API link',
    text: 'API',
    attribute: {
      type: 'href',
      value: '/docs/api/class-playwright',
    },
  },
  {
    locator: (page: Page): Locator => page.getByRole('button', { name: 'Node.js' }),
    name: 'Node.js button',
    text: 'Node.js',
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'Agents' }),
    name: 'Agents link',
    text: 'Agents',
    attribute: {
      type: 'href',
      value: '/agents',
    },
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'Community' }),
    name: 'Community link',
    text: 'Community',
    attribute: {
      type: 'href',
      value: '/community/welcome',
    },
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'GitHub repository' }),
    name: 'GitHub repository',
    attribute: {
      type: 'href',
      value: 'https://github.com/microsoft/playwright',
    },
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'Discord server' }),
    name: 'Discord link',
    attribute: {
      type: 'href',
      value: 'https://aka.ms/playwright/discord',
    },
  },
  {
    locator: (page: Page): Locator =>
      page.getByRole('button', { name: 'Switch between dark and light' }),
    name: 'Switch between button',
  },
  {
    locator: (page: Page): Locator => page.getByRole('button', { name: 'Search (Ctrl+K)' }),
    name: 'Search input',
  },
  {
    locator: (page: Page): Locator =>
      page.getByRole('heading', { name: 'Playwright enables reliable' }),
    name: 'Title Playwright ',
    text: 'Playwright enables reliable end-to-end testing for modern web apps.',
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'Get started' }),
    name: 'Get started button ',
    text: 'Get started',
    attribute: {
      type: 'href',
      value: '/docs/intro',
    },
  },
];

test.describe('Тесты главной страницы', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.dev/');
  });
  test('Проверка отображения элементов навигации - хедер', async ({ page }) => {
    elements.forEach(({ locator, name }) => {
      test.step(`Проверка отображения элемента ${name}`, async () => {
        await expect.soft(locator(page)).toBeVisible();
      });
    });
  });

  test('Проверка названия элементов навигации - хедер', async ({ page }) => {
    elements.forEach(({ locator, name, text }) => {
      //делаем с if так как отображается ошибка "Argument of type 'string | undefined' is not assignable to parameter of type 'string | RegExp | readonly (string | RegExp)[]'"/
      ///если просто использовать ......toContainText(text);
      if (text) {
        test.step(`Название элемента ${name}`, async () => {
          await expect(locator(page)).toContainText(text);
        });
      }
    });
  });

  test('Проверка атрибута href  элементов навигации - хедер', async ({ page }) => {
    elements.forEach(({ locator, name, attribute }) => {
      if (attribute) {
        test.step(`Провера атрибута href для элмента ${name}`, async () => {
          await expect(locator(page)).toHaveAttribute(attribute.type, attribute.value);
        });
      }
    });
  });

  test('Проверка переключания лайт мода (темная и светлая тема + серая - можно разбить на два отдельных теста) - хедер', async ({
    page,
  }) => {
    await page.getByLabel('Switch between dark and light').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await page.getByLabel('Switch between dark and light').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
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
