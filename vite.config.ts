import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

const pathSrc = resolve(__dirname, './src')
// https://vitejs.dev/config/
export default defineConfig(() => {
	return {
		plugins: [vue()],
		resolve: {
			alias: {
				'@': pathSrc,
			},
		},
		base: './',
		server: {
			hmr: {
				overlay: false,
			},
		},
	}
})
