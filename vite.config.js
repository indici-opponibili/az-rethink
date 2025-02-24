import { defineConfig, loadEnv } from "vite";
import laravel from "laravel-vite-plugin";
import vue from "@vitejs/plugin-vue";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import path from 'path';


export default defineConfig(({command, mode}) => {

    // https://github.com/getsentry/sentry-javascript-bundler-plugins/issues/344
    // https://main.vitejs.dev/config/#using-environment-variables-in-config
    // Load env file based on `mode` in the current working directory.
    // Set the third parameter to '' to load all env regardless of the `VITE_` prefix. Default is `VITE_` variables only.
    const env = loadEnv(mode, process.cwd())

    return {
        build: {
            sourcemap: true,
        },
        server: {
            hmr: {
                host: 'localhost'
            }
        },
        plugins: [
            laravel({
                input: ["resources/css/app.css", "resources/js/app.js"],
                publicDirectory: 'public',
                refresh: true,
            }),
            vue({
                template: {
                    transformAssetUrls: {
                        base: null,
                        includeAbsolute: false,
                    },
                },
            }),
            sentryVitePlugin({
                authToken: env.VITE_SENTRY_AUTH_TOKEN,
                org: env.VITE_SENTRY_ORG,
                project: env.VITE_SENTRY_PROJECT,
            }),
        ],
        resolve: {
            alias: {
            "@": path.resolve(__dirname, "./resources/js"),
            "~": path.resolve(__dirname, "./storage/platformConfig"),
            },
        },
    }
});
