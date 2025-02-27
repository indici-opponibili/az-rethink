<?php

namespace App\Http\Controllers;

use App\Models\CourseProgress;
use App\Models\GlossaryWordProgress;
use Illuminate\Http\Request;

class GlossaryWordProgressController extends Controller
{
    public function addGlossaryWordProgress(Request $request)
    {
        $input = $request->all();
        $user = $request->user();
        $progress = GlossaryWordProgress::factory()->create(
            [
                'tag' => $input['tag'],
                'user_id' => $user->id,
            ]
        );
        $user->courseProgress()->save($progress);
    }
}
