import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import fs from 'fs';

export default defineConfig({
  // server: {
  //   host: "140.116.245.147",
  //   port: 5173,
  //   https: {
  //     key: fs.readFileSync("decrypted-key.pem"),
  //     cert: fs.readFileSync("cert.pem")
  //   }
  // },
  plugins: [react()],
});
