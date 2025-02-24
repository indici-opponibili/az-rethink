// basics
import "../css/app.css";
import { createApp, h } from "vue";

// Inertia
import { createInertiaApp } from "@inertiajs/vue3";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";

// Sentry
import * as Sentry from '@sentry/vue';

// other Vue stuff
import { createPinia } from "pinia";
import { router } from './router';
import { i18n } from './i18n';

const pinia = createPinia();

createInertiaApp({
    title: (title) => `${title}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.vue`,
            import.meta.glob("./Pages/**/*.vue")
        ),
    setup({ el, App, props, plugin }) {

        var app = createApp({ render: () => h(App, props) });

        // SENTRY INTEGRATION
        // https://docs.sentry.io/platforms/javascript/guides/vue/
        // https://andrewrminion.com/2023/07/adding-sentry-to-a-laravel-inertia-vue-3-app/
        Sentry.init({
            app,
            dsn: import.meta.env.VITE_SENTRY_DSN_PUBLIC,
            environment: import.meta.env.VITE_APP_ENV,  // should be set equal to APP_ENV => VITE_APP_ENV=${APP_ENV}
            // "To prevent accidentally leaking env variables to the client,
            // only variables prefixed with VITE_ are exposed to your Vite-processed code."
            integrations: [
                Sentry.browserTracingIntegration({ router }),
                Sentry.replayIntegration(),
                Sentry.feedbackIntegration(),  // as default, it autoinjects a button in the bottom right corner
            ],
            // Set tracesSampleRate to 1.0 to capture 100%
            // of transactions for performance monitoring.
            // We recommend adjusting this value in production
            tracesSampleRate: import.meta.env.VITE_SENTRY_TRACES_SAMPLE_RATE,

            // Set `tracePropagationTargets` to control for which URLs distributed tracing should be enabled
            tracePropagationTargets: ['localhost', /^\//],
            // The default value of tracePropagationTargets is ['localhost', /^\//].
            // This means that by default, tracing headers are only attached to requests that contain localhost
            // in their URL or requests whose URL starts with a '/' (for example GET /api/v1/users).

            // Capture Replay for 10% of all sessions,
            // plus for 100% of sessions with an error
            replaysSessionSampleRate: 0.1,
            replaysOnErrorSampleRate: 1.0,
        });

        // Useful as Sentry unique Id, check app.blade.php
        Sentry.setUser({ id: window.hashedUser, username: window.hashedUser});
        window.hashedUser = undefined // clear

        app.use(plugin);
        app.use(pinia);
        app.use(router);
        app.use(i18n);
        app.mount(el);

        return app;
    },
});
