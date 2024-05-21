<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Spatie\Permission\Models\Permission;
use Illuminate\Http\Response;

class PermissionController extends Controller
{
    // get all permissions
    public function index()
    {
        $permissions = Permission::get(['id', 'name']);

        return Response::success($permissions);
    }
}
