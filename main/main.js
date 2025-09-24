const { app, BrowserWindow } = require("electron");
const serve = require("electron-serve");
const path = require("path");

const appServe = app.isPackaged ? serve({
  directory: path.join(__dirname, "../out")
}) : null;

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: true, // Keep security enabled
      allowRunningInsecureContent: false,
      // Allow loading CSS and other resources
      additionalArguments: ['--disable-web-security', '--disable-features=VizDisplayCompositor']
    },
    // Add icon and other window properties
    show: false, // Don't show until ready
    titleBarStyle: 'default'
  });

  // Set up CSP to allow styles and scripts
  win.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [
          "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob: http://localhost:*; " +
          "style-src 'self' 'unsafe-inline' http://localhost:*; " +
          "script-src 'self' 'unsafe-inline' 'unsafe-eval' http://localhost:*; " +
          "img-src 'self' data: blob: http://localhost:*; " +
          "font-src 'self' data: http://localhost:*;"
        ]
      }
    });
  });

  // Show window when ready
  win.once('ready-to-show', () => {
    win.show();
  });

  if (app.isPackaged) {
    appServe(win).then(() => {
      win.loadURL("app://-");
    });
  } else {
    // Add delay to ensure Next.js dev server is ready
    const loadDevServer = () => {
      win.loadURL("http://localhost:3000/").catch(() => {
        console.log("Next.js dev server not ready, retrying in 1 second...");
        setTimeout(loadDevServer, 1000);
      });
    };
    
    setTimeout(loadDevServer, 3000); // Increased delay
    win.webContents.openDevTools();
    
    win.webContents.on("did-fail-load", (e, code, desc) => {
      console.log("Failed to load:", code, desc);
      setTimeout(() => {
        win.webContents.reloadIgnoringCache();
      }, 2000);
    });

    // Handle navigation to ensure CSS loads
    win.webContents.on('did-finish-load', () => {
      console.log('Page loaded successfully');
    });
  }
}

app.on("ready", () => {
    createWindow();
});

app.on("window-all-closed", () => {
    if(process.platform !== "darwin"){
        app.quit();
    }
});