<?php

namespace App\Http\Controllers\Api\Users;

use App\Models\User;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Http\Requests\CreateUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use App\Trait\UploadImageTrait;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    use UploadImageTrait;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = User::latest()->paginate();
        $users = UserResource::collection($data);

        // Merge the additional 'status' key with the paginated data
        $response = [
            'status' => true,
            'data' => $users,
            'meta' => [
                'active_page' => $data->currentPage() ? false : true,
                'current_page' => $data->currentPage(),
                'last_page' => $data->lastPage(),
                'per_page' => $data->perPage(),
                'total' => $data->total(),
                'next_page_url' => $data->nextPageUrl(),
                'prev_page_url' => $data->previousPageUrl(),
            ],
        ];

        return Response::successWithPagination($response);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CreateUserRequest $request)
    {
        try {
            $user = [];
            DB::transaction(function () use ($request, &$user) {
                // create user
                $path = $this->uploadImage($request, 'image', 'assets/images/users');
                $user = User::create(array_merge($request->validated(), ['password' => Hash::make($request->password)], ['image' => $path]));

                // assign role
                $user->assignRole($request->role);

                return $user;
            });

            return Response::created(new UserResource($user), "User successfully created");
        } catch (\Exception $e) {
            return Response::error("Something went wrong");
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        if ($user->is_administration == true) {
            return Response::error("Sorry, This user cannot be editable");
        }

        try {
            DB::transaction(function () use ($request, $user) {
                // update user
                $inputs = $request->validated();
                if ($path = $this->uploadImage($request, 'image', 'assets/images/users', $user->image)) {
                    $inputs['image'] = $path;
                }
                $user->update($inputs);

                // remove previous role and assign new role
                $user->syncRoles($request->role);
            });

            return Response::updated(new UserResource($user), "User successfully updated");
        } catch (\Exception $e) {
            return Response::error("Something went wrong");
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        if ($user->is_administration == true) {
            return Response::error("Sorry, This user cannot be deleteable.");
        }

        try {
            $user->delete();
            return Response::success(null, "User successfully deleted");
        } catch (\Exception $e) {
            return Response::error("Something went wrong");
        }
    }
}
