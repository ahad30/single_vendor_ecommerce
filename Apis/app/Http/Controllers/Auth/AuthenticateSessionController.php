<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AuthenticateSessionController extends Controller
{
    // login
    public function login(LoginRequest $request)
    {
        $credentials = $request->only('email', 'password');

        if (auth()->attempt($credentials)) {
            // create a new token for the user
            $user = $request->user();
            $userinfo['id'] = $request->user()->id;
            $userinfo['name'] = $request->user()->name;
            $userinfo['email'] = $request->user()->email;

            $data = [
                'access-token' => $request->user()->createToken('token')->plainTextToken,
                'user' =>  $userinfo,
                'role' => $user->getRoleNames(),
            ];
            return Response::success( $data, 'Login successfully');
        }
        return Response::error('Creadential dosen\'t match our records');
        
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
