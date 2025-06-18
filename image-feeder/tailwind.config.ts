import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
      './app/**/*.{js,ts,jsx,tsx}',         // App Router pages
      './components/**/*.{js,ts,jsx,tsx}',  // Reusable UI components
      './lib/**/*.{js,ts,jsx,tsx}',         // Utilities or helpers
    ],
    theme: {
      extend: {
        
      },
    },
    plugins: []
  };
  
  export default config;
  