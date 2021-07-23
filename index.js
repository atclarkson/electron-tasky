const path = require('path')

const electron = require('electron')
const {app, BrowserWindow, Tray} = electron

let mainWindow
let trayIcon = null

app.on('ready', ()=>{
    mainWindow = new BrowserWindow({
        height: 500,
        width: 300,
        frame: false,
        resizable: false,
        show: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    })

    mainWindow.loadURL(`file://${__dirname}/src/index.html`)

    const iconName = process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png'
    const iconPath = path.join(__dirname, `./src/assets/${iconName}`)
    trayIcon = new Tray(iconPath)

    trayIcon.on('click', ()=> {
        if(mainWindow.isVisible()){
            mainWindow.hide()
        } else {
            mainWindow.show()
        }
        
    })
})

