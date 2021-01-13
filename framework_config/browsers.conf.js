const userAgent =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.50 Safari/537.36";

exports.browsers = {
  chrome: {
    browserName: "chrome",
    maxInstances: 3,
    chromeOptions: {
      args: [
        "--headless",
        "--whitelisted-ips",
        "--no-sandbox",
        "--disable-extensions",
        `user-agent=${userAgent}`,
        "--window-size=1920,1080",
        "--disable-device-emulation",
        "--disable-network-throttling",
        "--disable-dev-shm-usage",
        "--disable-cpu-throttling",
        "idleTimeout=300",
        "--disable-gpu",
        '--disable-infobars'
      ],
      w3c: false
    },

    metadata: {
      browser: {
        name: "chrome"
      },
      device: "Macbook Pro 2018",
      platform: {
        type: "desktop",
        name: "osx",
        version: "10.14"
      }
    }
  },
  firefox: {
    browserName: "firefox",
    maxInstances: 3,
    "moz:firefoxOptions": {
      args: ["-headless", "-width=1920", "-height=1080", "-hide-scrollbar"]
    },
    metadata: {
      device: "Dell XPS",
      browser: {
        name: "firefox"
      },
      platform: {
        type: "desktop",
        name: "windows",
        version: "10"
      }
    }
  },
  safariMobile: {
    browserName: "chrome",
    maxInstances: 3,
    chromeOptions: {
      mobileEmulation: {
        deviceName: "iPhone X"
      },
      args: [
        "--use-mobile-user-agent",
        "--hide-scrollbars",
        "--headless",
        "--window-size=1920,1080"
      ]
    },
    metadata: {
      browser: {
        name: "safari",
        version: "12"
      },
      device: "iPhone X",
      platform: {
        type: "mobile",
        name: "ios",
        version: "12.0.1"
      }
    }
  },
  chromeAndroid: {
    browserName: "chrome",
    maxInstances: 3,
    chromeOptions: {
      mobileEmulation: {
        deviceName: "Pixel2 XL"
      },
      args: [
        "--use-mobile-user-agent",
        "--hide-scrollbars",
        "--headless",
        "--window-size=1920,1080"
      ]
    },
    metadata: {
      browser: {
        name: "chrome",
        version: "58"
      },
      device: "Galaxy S5",
      platform: {
        type: "mobile",
        name: "android",
        version: "8"
      }
    }
  }
};
