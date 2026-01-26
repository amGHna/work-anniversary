const puppeteer = require('puppeteer');
const { PuppeteerScreenRecorder } = require('puppeteer-screen-recorder');

(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  
  // Matches your email display size
  await page.setViewport({ width: 600, height: 400 });

  const name = process.env.EMPLOYEE_NAME || 'Team Member';
  // Points to your specific URL
  const url = `https://oh3alarab-jpg.github.io/happy-birthday/?name=${encodeURIComponent(name)}`;
  
  const recorder = new PuppeteerScreenRecorder(page);
  await page.goto(url, { waitUntil: 'networkidle0' });

  // Records 10 seconds of your animation
  await recorder.start('video.mp4');
  await new Promise(resolve => setTimeout(resolve, 5000)); 
  await recorder.stop();

  await browser.close();
})();
