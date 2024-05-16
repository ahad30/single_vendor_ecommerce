<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;

class AuthenticateSessionController extends Controller
{
    // login
    public function login(LoginRequest $request)
    {
        $credentials = $request->only('email', 'password');

        if (auth()->attempt($credentials)) {
            // create a new token for the user
            $token = $request->user()->createToken('token');

            return response()->json([
                'status' => true,
                'message' => 'You are successfully logged in.',
                'access-token' => $token->plainTextToken,
                'token_type' => 'Bearer',
            ]);
        }

        return response()->json([
            'status' => false,
            'message' => 'Invalid Credentials.'
        ], 401);
    }

    // logout
    public function logout(Request $request)
    {
        // Revoke all existing tokens
        $request->user()->tokens()->delete();

        return response()->json([
            'status' => true,
            'message' => 'You are successfully logged out.'
        ]);
    }
}
