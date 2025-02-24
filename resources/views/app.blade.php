<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <!-- Fetch project name dynamically -->
    <title >{{ config('app.name', 'Laravel') }}</title>

    @if(!(env('APP_ENV') === 'prod' || env('APP_ENV') === 'production'))
        {{-- If it's not in production, don't let bots know about it --}}
        <meta name="robots" content="noindex, nofollow">
    @endif

    @if(auth()->check())
        <script>
            // Useful as Sentry unique Id, check app.js
            window.hashedUser = "{{ substr(crypt(auth()->user()->email, 'sentry-template'), 0, 10); }}"
        </script>
    @endif

    <!-- Scripts -->
    @vite('resources/js/app.js') @inertiaHead
  </head>

  <body class="font-sans antialiased">
    @inertia
  </body>
</html>
