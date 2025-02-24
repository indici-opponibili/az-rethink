<?php

namespace App\Http\Middleware;

use Closure;
use Sentry\State\Scope;

use function Sentry\configureScope;

class SentryContext
{
    public function handle($request, Closure $next)
    {
        if (auth()->check() && app()->bound('sentry')) {
            configureScope(function (Scope $scope): void {
                $hashedUser = substr(crypt(auth()->user()->email, 'sentry-template'), 0, 10);
                $scope->setUser([
                    'id' => $hashedUser,
                    'username' => $hashedUser,
                ]);
            });
        }
        return $next($request);
    }
}
