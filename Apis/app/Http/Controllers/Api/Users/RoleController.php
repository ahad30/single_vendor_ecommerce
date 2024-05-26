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
        return Response::created($role, "Role created");
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $permissions = Permission::get(['id', 'name']);
        $role = Role::with('permissions:id,name')->find($id, ['id', 'name']);
        if ($role) {
            $checkedPermissions = $role->permissions()->pluck('id')->toArray();
            return Response::success([
                'role' => $role,
                'checkedPermissions' => $checkedPermissions,
                'permissions' => $permissions
            ]);
        }
        return Response::notFound("Role not found");
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(RoleUpdateRequest $request, string $id)
    {
        $role = Role::find($id);
        if ($role) {
            $role->update($request->validated());
            $role->syncPermissions($request->permissions);
            return Response::updated($role, "Role Updated");
        }
        return Response::notFound("Role not found");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $role = Role::find($id);
        if ($role) {
            $role->delete();
            return Response::success(null, "Role Deleted");
        }
        return Response::notFound("Role not found");
    }
}
