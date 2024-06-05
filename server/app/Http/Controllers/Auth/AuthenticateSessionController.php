<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Http\Resources\LoginUserResource;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class AuthenticateSessionController extends Controller
{
    // login
    public function login(LoginRequest $request)
    {
        return $this->authenticate($request);
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

    // authenticate
    protected function authenticate($request)
    {
        $credentials = $request->only('email', 'password');
        if (!auth()->attempt($credentials)) {
            return Response::error('Credential doesn\'t match our records');
        }

        return $this->createTokenResponse($request);
    }

    // create token response
    protected function createTokenResponse($request)
    {
        $this->revokeExistingToken($request);
        // merge user information with the token information
        $data = [
            'token' => $request->user()->createToken('token')->plainTextToken,
            'user' => new LoginUserResource($request->user()),
        ];
        // return the response
        return Response::success($data, 'Login successfully');
    }

    // Revoke all existing tokens
    protected function revokeExistingToken($request)
    {
        $request->user()->tokens()->delete();
    }
}
