<?php

namespace App\Http\Controllers\Api\Users;

use App\Http\Controllers\Controller;
use Spatie\Permission\Models\Permission;
use Illuminate\Http\Response;

class PermissionController extends Controller
{
    // get all permissions
    public function index()
    {
        if (auth()->user()->roles->isNotEmpty()) {
            $permission = Permission::get(['id', 'name']);
            return Response::success($permission);
        }
        return Response::forbidden();
    }
}
