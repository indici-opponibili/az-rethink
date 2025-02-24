<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserProgressionResource;
use App\Http\Resources\UserProgressResource;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AppController extends Controller
{
    public function main(Request $request): Response {
        /**
         * @var $user User
         */
        $user = $request->user();

        return Inertia::render('Home', [
            'userProgression' => new UserProgressResource($user),
            'user' => new UserResource($user)
        ]);
    }
}
