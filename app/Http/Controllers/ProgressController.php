<?php

namespace App\Http\Controllers;

use App\Models\Progress;
use Illuminate\Http\Request;

class ProgressController extends Controller
{
    function addProgress(Request $request){

        $input = $request->all();
        $user = $request->user();
        $progress = Progress::factory()->create(
            [
                'tag' => $input['tag'],
                'step' => $input['step'],
                'category' => $input['category'],
            ]
        );
        $user->progress()->create($progress);
    }
}
