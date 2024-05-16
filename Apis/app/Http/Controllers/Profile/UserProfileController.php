<?php

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserProfileController extends Controller
{
    // User Profile
    public function profile(Request $request)
    {
        return response()->json([
            'status' => true,
            'user' =>  $request->user(),
        ]);
    }
}
