const electron = require('electron')
const{Tray} = electron

class TimerTray extends Tray {
    constructor(iconPath, options) {
        super(iconPath)
    }
}

module.exports = TimerTray