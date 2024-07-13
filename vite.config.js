import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		host: "140.116.245.147",
		port: "5173"
		

	},
  plugins: [react()],
})
