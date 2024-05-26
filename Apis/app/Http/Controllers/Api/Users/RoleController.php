<?php

namespace App\Http\Controllers\Api\Users;

use App\Http\Controllers\Controller;
use App\Http\Requests\RoleCreateRequest;
use App\Http\Requests\RoleUpdateRequest;
use App\Http\Resources\RoleResource;
use Illuminate\Http\Response;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Role::with('permissions:id,name')->paginate();
        $roles = RoleResource::collection($data);

        // Merge the additional 'status' key with the paginated data
        $response = [
            'status' => true,
            'data' => $roles,
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
    public function store(RoleCreateRequest $request)
    {
        $role = Role::create(array_merge($request->validated(), ['guard_name' => 'web']));

        $role->syncPermissions($request->permissions);
        return Response::created(new RoleResource($role), "Role successfully created");
    }

    /**
     * Display the specified resource.
     */
    public function show(Role $role)
    {
        $data = [
            'role' => [
                'id' => $role->id,
                'name' => $role->name,
            ],
            'total-permissions' => $role->permissions->count(),
            'permissions' => $role->permissions->pluck('id', 'name'),
        ];

        return Response::success($data);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(RoleUpdateRequest $request, Role $role)
    {
        if ($role->id == 1) {
            return Response::notFound("This role cannot be editable");
        }
        try {
            // update role
            $role->update($request->validated());
            // sync permissions
            $role->syncPermissions($request->permissions);

            return Response::updated($role, "Role successfully Updated");
        } catch (\Exception $e) {
            return Response::notFound("Role not found");
        };
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role)
    {
        if ($role->id == 1) {
            return Response::notFound("This role cannot be able to delete");
        }

        $role->delete();
        return Response::success(null, "Role successfully deleted");
    }
}
