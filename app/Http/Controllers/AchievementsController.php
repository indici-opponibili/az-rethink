<?php

namespace App\Http\Controllers;

use App\Models\Achievement;
use Illuminate\Http\Request;

class AchievementsController extends Controller
{
    function addAchievement(Request $request)
    {
        $input = $request->all();
        $user = $request->user();
        $achievement = Achievement::factory()->create(
            [
                'tag' => $input['tag'],
                'step' => $input['step'],
                'user_id' => $user->id,
            ]);
        $user->achievements()->save($achievement);
    }
}
