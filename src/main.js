import {app, BrowserWindow, Tray, screen} from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
    app.quit();
}

let tray = null;

function animateShow(window) {
    window.setOpacity(0);
    window.show();
    window.focus();

    let opacity = 0;
    const interval = setInterval(() => {
        opacity += 0.1;
        if (opacity >= 1) {
            opacity = 1;
            clearInterval(interval);
        }
        window.setOpacity(opacity);
    }, 8); // ~60fps
}

function animateHide(window) {
    let opacity = 1;
    const interval = setInterval(() => {
        opacity -= 0.1;
        if (opacity <= 0) {
            opacity = 0;
            clearInterval(interval);
            window.hide();
        }
        window.setOpacity(opacity);
    }, 8);
}

const createWindow = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 600,
        height: 800,
        frame: false,
        show: false,
        resizable: false,
        alwaysOnTop: true,
        skipTaskbar: true,
        transparent: true,
        vibrancy: process.platform === 'darwin' ? 'ultra-thin' : undefined,
        backgroundMaterial: process.platform === 'win32' ? 'acrylic' : undefined,
        visualEffectState: 'active',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false
        },
    });

    // and load the index.html of the app.
    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
        mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
    } else {
        mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
    }

    const iconPath = 'src/assets/icon.png'
    tray = new Tray(iconPath);


    tray.setToolTip('Apontamento de horas');

    tray.on('click', (event, bounds) => {
        const visivel = mainWindow.isVisible();
        if (visivel) {
            animateHide(mainWindow);
        } else {
            const trayBounds = tray.getBounds();
            const display = screen.getDisplayNearestPoint(screen.getCursorScreenPoint());
            const {width, height} = mainWindow.getBounds();

            let x, y;
            if (process.platform === 'win32') {
                x = display.workArea.x + display.workArea.width - width - 10;
                y = display.workArea.y + display.workArea.height - height - 10;
            } else {
                x = trayBounds.x;
                y = trayBounds.y;
            }

            mainWindow.setBounds({x, y, width, height});
            animateShow(mainWindow);
        }
    });

    mainWindow.on('blur', () => {
        if (!mainWindow.webContents.isDevToolsOpened()) {
            mainWindow.hide();
        }
    });

    mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow();

    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
