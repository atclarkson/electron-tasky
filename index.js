const path = require('path')
const electron = require('electron')
const TimerTray =require('./app/timer_tray')

const { CleanPlugin } = require('webpack')
const { contextIsolated } = require('process')
const {app, BrowserWindow} = electron

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
    trayIcon = new TimerTray(iconPath)

    trayIcon.on('click', (event, bounds)=> {
        // Click event bounds
        const { x, y} = bounds

        // Window height and width
        const {height, width} = mainWindow.getBounds()
        
        if(mainWindow.isVisible()){
            mainWindow.hide()
        } else {
            mainWindow.setBounds({
                x: x - width/ 2, 
                y: process.platform === 'darwin' ? y : y - height,
                height,
                width
            })
            mainWindow.show()
        }
        
    })
})

