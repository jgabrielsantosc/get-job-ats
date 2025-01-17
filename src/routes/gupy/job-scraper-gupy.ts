import { chromium, Page } from 'playwright';

export const scraperJobGupy = async (url: string): Promise<string[]> => {
  const jobUrls: string[] = [];
  let browser;

  try {
    browser = await chromium.launch({ 
      headless: true,
      channel: 'chrome',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const context = await browser.newContext();
    const page = await context.newPage();

    try {
      await page.goto(url, { waitUntil: 'networkidle' });

      while (true) {
        const newUrls = await coletarUrlsDaPagina(page);
        jobUrls.push(...newUrls);

        const botaoProxima = page.locator('[data-testid="pagination-next-button"]');
        const botaoProximaDesabilitado = await botaoProxima.getAttribute('disabled');

        if (botaoProximaDesabilitado === null) {
          await botaoProxima.click();
          await page.waitForLoadState('networkidle');
        } else {
          break;
        }
      }

      return jobUrls;
    } catch (error) {
      console.error('Erro ao navegar pela página:', error);
      throw error;
    }
  } catch (error) {
    console.error('Erro ao inicializar o browser:', error);
    throw error;
  } finally {
    if (browser) {
      await browser.close().catch(console.error);
    }
  }
};

async function coletarUrlsDaPagina(page: Page): Promise<string[]> {
  const baseUrl = new URL(page.url()).origin;
  return page.evaluate((baseUrl) => {
    const links = document.querySelectorAll('[data-testid="job-list__listitem-href"]');
    return Array.from(links).map(link => {
      const href = link.getAttribute('href');
      return href ? new URL(href, baseUrl).href : null;
    }).filter(Boolean) as string[];
  }, baseUrl);
}