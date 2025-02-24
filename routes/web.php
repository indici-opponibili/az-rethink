<?php

use App\Http\Controllers\AppController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/')
    ->middleware(['auth', 'guest', 'verified'])
    ->name('home');

Route::get('/app{path}', [AppController::class, 'main'])
    ->where('path', '.*') // https://stackoverflow.com/q/34634758/11599600, also mind the missing / (must be that way!)
    ->middleware(['auth', 'verified'])
    ->name('app');
