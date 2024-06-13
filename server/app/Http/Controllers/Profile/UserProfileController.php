<?php

namespace App\Http\Controllers\Profile;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdatePasswordRequest;
use App\Http\Requests\UpdateProfileRequest;
use App\Http\Resources\ProfileResource;
use App\Trait\UploadImageTrait;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class UserProfileController extends Controller
{
    use UploadImageTrait;

    // profile
    public function profile(Request $request)
    {
        $data = new ProfileResource($request->user());

        return Response::success($data);
    }

    // update profile
    public function updateProfile(UpdateProfileRequest $request)
    {
        $inputs = $request->validated();
        // Only merge image path if it was successfully uploaded
        if ($path = $this->uploadImage($request, 'image', 'assets/images/profiles', $request->user()->image)) {
            $inputs['image'] = $path;
        }
        $request->user()->update($inputs);

        return Response::updated($request->user, 'Profile updated successfully');
    }


    // update password
    public function updatePassword(UpdatePasswordRequest $request)
    {
        return $this->createNewPassword($request);
    }

    // create New Password
    protected function createNewPassword($request)
    {
        if (!Hash::check($request->old_password, $request->user()->password)) {
            return Response::error('Your previous password doesn\'t match');
        }

        return $this->updateNewPassword($request);
    }

    // update new password
    protected function updateNewPassword($request)
    {
        $request->user()->update([
            'password' => Hash::make($request->password)
        ]);
        return Response::updated(null, "password updated successfully");
    }
}
