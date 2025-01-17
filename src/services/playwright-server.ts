import express from 'express';
import { chromium } from 'playwright';

const app = express();
app.use(express.json());

app.post('/scrape', async (req, res) => {
  const { url, selector } = req.body;
  let browser;

  try {
    browser = await chromium.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage'
      ]
    });

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto(url, { waitUntil: 'networkidle' });

    // Aguarda o seletor específico se fornecido
    if (selector) {
      await page.waitForSelector(selector);
    }

    // Coleta URLs da página
    const jobUrls = await page.evaluate(() => {
      const links = document.querySelectorAll('[data-testid="job-list__listitem-href"]');
      return Array.from(links).map(link => {
        const href = link.getAttribute('href');
        return href ? new URL(href, window.location.origin).href : null;
      }).filter(Boolean);
    });

    res.json({ urls: jobUrls });
  } catch (error) {
    console.error('Erro no scraping:', error);
    res.status(500).json({ error: 'Falha no scraping' });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serviço Playwright rodando na porta ${port}`);
}); 