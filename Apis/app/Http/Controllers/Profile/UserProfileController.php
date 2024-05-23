<?php

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdatePasswordRequest;
use App\Http\Requests\UpdateProfileRequest;
use App\Trait\UploadImageTrait;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class UserProfileController extends Controller
{
    use UploadImageTrait;
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
    public function updatePassword(UpdatePasswordRequest $request)
    {
        $old = $request->old_password;
        $newPassword = $request->new_password;

        if (Hash::check($old, auth()->user()->password)) {
            request()->user()->update(['password' => Hash::make($newPassword)]);
            return Response::updated(null , "password updated successfully");
        } else {
            return Response::error('Your previous password doesn\'t match');
        }
    }
    public function updateProfile(UpdateProfileRequest $request){
        $user = auth()->user();
        $validated = $request->validated();
            $path = $this->uploadImage($request, 'image', 'assets/images/profiles', $user->image);
            $data = array_merge($validated, ['image' => $path ?: $user->image]);
         $user->update($data);
        return Response::updated($user, 'Profile updated successfully');
    }
}
