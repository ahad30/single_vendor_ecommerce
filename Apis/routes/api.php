<?php

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:api');


Route::get('/login', function (Request $request) {
    if (Auth::attempt(['email' => $request->email, 'password' => $request->password], $request->get('remember'))) {
        $token = $request->user()->createToken('token')->accessToken;
        return response()->json(['token' => $token], 200);
    } else {
        return response()->json([
            'message'  => 'Invalid password',
        ]);
    }
});
