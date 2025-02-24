<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    function createGuestUser(){

        $user = User::factory()
            ->create([
                'email' => fake()->unique()->safeEmail(),
                'password' => null,
                'role' => 'guest',
                'email_verified_at' => now()
            ]);

        Auth::login($user, true);
    }
}
