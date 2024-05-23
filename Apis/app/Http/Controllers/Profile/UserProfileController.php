<?php

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class UserProfileController extends Controller
{
    public function profile(Request $request)
    {
        $user = $request->user();
        $user->getPermissionsViaRoles();
        $data = [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role_name' => $user->roles->map(function ($role) {
                return [
                    'id' => $role->id,
                    'name' => $role->name,
                    'permissions' => $role->permissions->map(function ($permission) {
                        return [
                            'id' => $permission->id,
                            'name' => $permission->name,
                        ];
                    }),
                ];
            }),
        ];
        return Response::success($data);
    }
}
