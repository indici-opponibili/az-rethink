<?php

use App\Http\Controllers\AchievementsController;
use App\Http\Controllers\AppController;
use App\Http\Controllers\ContentProgressController;
use App\Http\Controllers\CourseProgressController;
use App\Http\Controllers\GlossaryWordProgressController;
use App\Http\Controllers\PlatformConfigController;
use App\Http\Controllers\PushController;
use App\Http\Controllers\UserController;
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

Route::post('/guest-login', [UserController::class, 'createGuestUser'])
    ->middleware('guest');

Route::post('/user/achievements/add', [AchievementsController::class, 'addAchievement'])
    ->middleware(['auth', 'verified']);

Route::post('/user/contentProgress/add', [ContentProgressController::class, 'addProgress'])
    ->middleware(['auth', 'verified']);

Route::post('/user/courseProgress/add', [CourseProgressController::class, 'addCourseProgress'])
    ->middleware(['auth', 'verified']);

Route::post('/user/glossaryWord/add', [GlossaryWordProgressController::class, 'addGlossaryWordProgress'])
    ->middleware(['auth', 'verified']);

Route::post('/subscribe-web-push',[PushController::class, 'store'])
    ->middleware(['auth', 'verified']);

Route::get('/notification', [PushController::class, 'notify'])
    ->middleware(['auth', 'verified']);

Route::get('/platformConfig/{path}', PlatformConfigController::class)
    ->where('path', '.*') // https://stackoverflow.com/q/34634758/11599600
    ->middleware('auth')
    ->name('platformConfig');
