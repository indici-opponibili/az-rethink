<?php

namespace App\Http\Controllers;

use App\Notifications\TestNotification;
use Illuminate\Http\Request;

class PushController extends Controller
{
    public function store(Request $request){
        $this->validate($request,[
            'endpoint'    => 'required',
            'keys.auth'   => 'required',
            'keys.p256dh' => 'required'
        ]);
        $endpoint = $request->endpoint;
        $token = $request->keys['auth'];
        $key = $request->keys['p256dh'];
        $user = $request->user();
        $user->updatePushSubscription($endpoint, $key, $token);
    }

    public function notify(Request $request)
    {
        $user = $request->user();
        $user->notify(new TestNotification());
    }
}
