// eslint.config.js
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
        files:["src/**/*"],
        ignores:[
            "node_modules"
        ],
		rules: {
			semi: "error",
			"prefer-const": "error",
        },
	},
]);
