<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Spatie\Permission\Models\Permission;

class AuthenticateSessionController extends Controller
{
    // login
    public function login(LoginRequest $request)
    {
        $credentials = $request->only('email', 'password');

        if (auth()->attempt($credentials)) {
            $user = $request->user();
            $userData = [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ];
            $data = [
                'token' => $user->createToken('token')->plainTextToken,
                'user' => $user,
            ];

            return Response::success($data, 'Login successfully');
        }

        return Response::error('Credential doesn\'t match our records');
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

    // auth me 
    
}
