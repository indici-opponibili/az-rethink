<?php

namespace App\Http\Controllers;

use App\Models\CourseProgress;
use Illuminate\Http\Request;

class CourseProgressController extends Controller
{
    function addCourseProgress(Request $request)
    {
        $input = $request->all();
        $user = $request->user();
        $progress = CourseProgress::factory()->create(
            [
                'tag' => $input['tag'],
                'status' => $input['status'],
                'user_id' => $user->id,
            ]
        );
        $user->courseProgress()->save($progress);
    }
}
