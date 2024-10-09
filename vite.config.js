import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})


// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     extensions: ['.js', '.jsx', '.ts', '.tsx'],
//   },
//   esbuild: {
//     loader: 'jsx',
//     include: /src\/.*\.jsx?$/,
//     exclude: [],
//   },
// });