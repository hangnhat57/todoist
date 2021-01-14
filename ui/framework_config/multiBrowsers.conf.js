/**
 * Use for bypassing chrome headless detection
 */
const userAgent =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.50 Safari/537.36";

exports.multiCapabilities = [
  {
    browserName: "chrome",
    maxInstances: 10,
    shardTestFiles: true,
    chromeOptions: {
      args: [
        "--headless",
        `user-agent=${userAgent}`,
        "--hide-scrollbars",
        "--window-size=1920,1080",
        "--disable-device-emulation",
        "--disable-network-throttling",
        "--disable-cpu-throttling",
        "--no-sandbox",
        "--disable-dev-shm-usage"
      ]
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
  // {
  //   browserName: "firefox",
  //   maxInstances: 3,
  //   shardTestFiles: false,
  //   "moz:firefoxOptions": {
  //     args: ["-headless", "-width=1920", "-height=1080"]
  //   },
  //   metadata: {
  //     device: "Dell XPS",
  //     browser: {
  //       name: "firefox"
  //     },
  //     platform: {
  //       type: "desktop",
  //       name: "windows",
  //       version: "10"
  //     }
  //   }
  // },
  // {
  //   browserName: "chrome",
  //   maxInstances: 3,
  //   shardTestFiles: false,
  //   chromeOptions: {
  //     mobileEmulation: {
  //       deviceName: "iPhone X"
  //     },
  //     args: [
  //       "--use-mobile-user-agent",
  //       "--hide-scrollbars",
  //       "--headless",
  //       "--window-size=1920,1080"
  //     ]
  //   },
  //   metadata: {
  //     browser: {
  //       name: "safari",
  //       version: "12"
  //     },
  //     device: "iPhone X",
  //     platform: {
  //       type: "mobile",
  //       name: "ios",
  //       version: "12.0.1"
  //     }
  //   }
  // },
  // {
  //   browserName: "chrome",
  //   maxInstances: 0,
  //   shardTestFiles: false,
  //   chromeOptions: {
  //     mobileEmulation: {
  //       deviceName: "Galaxy S5"
  //     },
  //     args: [
  //       "--use-mobile-user-agent",
  //       "--hide-scrollbars",
  //       "--headless",
  //       "--window-size=1920,1080"
  //     ]
  //   },
  //   metadata: {
  //     browser: {
  //       name: "chrome",
  //       version: "58"
  //     },
  //     device: "Galaxy S5",
  //     platform: {
  //       type: "mobile",
  //       name: "android",
  //       version: "8"
  //     }
  //   }
  // }
];
