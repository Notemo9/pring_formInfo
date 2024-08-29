import { app, BrowserWindow } from 'electron'
import { join } from 'path'

const isDev = process.env.npm_lifecycle_event === 'app:dev' ? true : false

function createWindow() {
	const mainWindow = new BrowserWindow({
		width: 800,
		height: 800,
		webPreferences: {
			preload: join(__dirname, 'preload.js'),
			nodeIntegration: false,
			contextIsolation: true,
		},
	})

	if (isDev) {
		console.log('🚀 ~ createWindow ~ isDev:', process.env.npm_lifecycle_event)
		mainWindow.loadURL('http://localhost:3000')
		mainWindow.webContents.openDevTools()
	} else {
		mainWindow.loadFile(join(__dirname, '../../../index.html'))
		mainWindow.webContents.openDevTools()
	}
}

app.whenReady().then(() => {
	createWindow()

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow()
	})
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})
