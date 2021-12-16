module.exports = Object.freeze({
  LAUNCH_PUPPETEER_OPTS: {
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--disable-gpu",
      "--window-size=1920x1080",
    ],
  },
  PAGE_PUPPETEER_OPTS: {
    networkIdle2Timeout: 5000,
    waitUntil: "networkidle2",
    timeout: 3000000,
  },
  schema: {
    properties: {
      link: {
        pattern:
          /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi,
        message: "enter correct url",
        required: true,
      },
    },
  },
});
