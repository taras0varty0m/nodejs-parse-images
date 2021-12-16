const puppeteer = require("puppeteer");
const prompt = require("prompt");
const requestImageSize = require("request-image-size");
const {
  PAGE_PUPPETEER_OPTS,
  LAUNCH_PUPPETEER_OPTS,
  schema,
} = require("./helpers/consts");
const autoScroll = require("./helpers/autoScroll");

(async () => {
  try {
    prompt.start();
    const { link } = await prompt.get(schema);
    prompt.stop();
    const browser = await puppeteer.launch(LAUNCH_PUPPETEER_OPTS);
    const page = await browser.newPage();

    page.on("response", async (response) => {
      if (
        response.request().resourceType() === "image" &&
        !response.url().includes("data")
      ) {
        requestImageSize(response.url())
          .then((size) =>
            console.log(
              response.url(),
              `width: ${size.width}`,
              `height: ${size.height}`,
              response.headers()["content-length"] / 1000 // Conversion to kilobytes
            )
          )
          .catch((err) => console.error(`${response.url()}, ${err}`));
      }
    });

    await page.goto(link, PAGE_PUPPETEER_OPTS);
    await autoScroll(page); // for get all images

    await browser.close();
  } catch (error) {
    console.error(error);
  }
})();
