import type { Config } from "tailwindcss"
import {plugin as flowbitePlugin, content as flowbiteContent} from "flowbite-react/tailwind";

const config: Config = {
  darkMode: 'media',
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbiteContent()
  ],
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    flowbitePlugin()

  ],
};
export default config;
