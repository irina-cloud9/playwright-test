import test, { Page, Locator, expect } from '@playwright/test';

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

export class MainPage {
  static checkElemtntsVisability() {
    //Проверьте доступность элементов управления
    throw new Error('Method not implemented.');
  }
  readonly page: Page;
  readonly elements: Elements[];

  constructor(page: Page) {
    this.page = page;
    this.elements = [
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
  }
  async openMainPage() {
    await this.page.goto('https://playwright.dev/');
  }

  //Проверьте доступность элементов управления
  async checkElemtntsVisability() {
    for (const { locator, name } of this.elements) {
      await test.step(`Проверка отображения элемента ${name}`, async () => {
        await expect.soft(locator(this.page)).toBeVisible();
      });
    }
  }
  //Проверьте текст элементов
  async checkElemtntsText() {
    for (const { locator, name, text } of this.elements) {
      if (text) {
        await test.step(`Название элемента ${name}`, async () => {
          await expect(locator(this.page)).toContainText(text);
        });
      }
    }
  }

  //Проверка /href атрибута
  async checkElemtntsHrefAttribute() {
    for (const { locator, name, attribute } of this.elements) {
      if (attribute) {
        await test.step(`Провера атрибута href для элмента ${name}`, async () => {
          await expect(locator(this.page)).toHaveAttribute(attribute.type, attribute.value);
        });
      }
    }
  }
  //Кликает на лайт мода - light
  async clickSwitchLightModelIcon() {
    await this.page.getByLabel('Switch between dark and light').click();
  }

  //Проверьте значение атрибута темы - светлая
  async checkDataThemeAttributeValuelight() {
    await expect(this.page.locator('html')).toHaveAttribute('data-theme', 'light');
  }
  //Проверьте значение атрибута темы - темная
  async checkDataThemeAttributeValueDark() {
    await expect.soft(this.page.locator('html')).toHaveAttribute('data-theme', 'dark');
  }

  //Установка режима - system
  async setsystemMode() {
    await this.page.evaluate(() => {
      document.querySelector('html')?.setAttribute('data-theme', 'light');
    });
  }

  //Установка режима - светлая
  async setLightMode() {
    await this.page.evaluate(() => {
      document.querySelector('html')?.setAttribute('data-theme', 'light');
    });
  }
  //Установка режима - темная
  async setDarkMode() {
    await this.page.evaluate(() => {
      document.querySelector('html')?.setAttribute('data-theme', 'dark');
    });
  }

  //Получение скриншота - светлая тема
  async checkLayautWithLightMode() {
    await expect(this.page).toHaveScreenshot(`PageWithLightMode.png`);
  }

  //Получение скриншота - темная тема
  async checkLayautWithDarkMode() {
    await expect(this.page).toHaveScreenshot(`PageWithDarkMode.png`);
  }
  //Получение скриншота - темная тема
  async checkLayautWithsystemMode() {
    await expect(this.page).toHaveScreenshot(`PageWithDarkMode.png`);
  }
}
