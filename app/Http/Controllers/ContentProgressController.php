<?php

namespace App\Http\Controllers;

use App\Models\ContentProgress;
use Illuminate\Http\Request;

class ContentProgressController extends Controller
{
    function addProgress(Request $request){

        $input = $request->all();
        $user = $request->user();
        $progress = ContentProgress::factory()->create(
            [
                'tag' => $input['tag'],
                'step' => $input['step'],
                'category' => $input['category'],
                'user_id' => $user->id,
            ]
        );
        $user->contentProgress()->save($progress);
    }
}
