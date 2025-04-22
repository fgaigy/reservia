import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";


export default defineConfig([
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"] },
  { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.browser } }, // before modification-1
//  { 
    // changed to this after getting 'process not defined' error
//    files: ["**/*.{js,mjs,cjs}"], 
/*     languageOptions: 
    { 
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: 
      {
        process: 'readonly', // 👈 allow usage of process
        __dirname: 'readonly', // optional, for Node globals
        require: 'readonly' // if you're mixing CommonJS } },
      },
    } */
//  }
]);