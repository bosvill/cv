import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	//enable support for absolute imports for convenience
	resolve: {
		alias: {
			src: '/src',
			app: '/src/app',
			entities: '/src/entities',
			features: '/src/features',
			pages: '/src/pages',
			shared: '/src/shared',
			widgets: '/src/widgets'
		}
	},
	css: {
		modules: {
			generateScopedName: '[name]__[local]__[hash:8]',
			localsConvention: null
		}
	}
})
