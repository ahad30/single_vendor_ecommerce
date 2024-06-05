<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterUserRequest;
use App\Models\User;

class RegisterUserController extends Controller
{
    // New user registration
    public function register(RegisterUserRequest $request)
    {
        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' =>  bcrypt($request->password),
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Registration successfull.',
        ], 201);
    }
}
