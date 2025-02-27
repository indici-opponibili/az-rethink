<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class PlatformConfigController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, $path)
    {
        abort_if(
            ! Storage::disk('platformConfig')->exists($path),
            404,
            "The file doesn't exist. Check the path."
        );

        return Storage::disk('platformConfig')->get($path);
    }
}
