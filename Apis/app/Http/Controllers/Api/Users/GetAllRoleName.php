<?php

namespace App\Http\Controllers\Api\Users;

use App\Http\Controllers\Controller;
use Illuminate\Http\Response;
use Spatie\Permission\Models\Role;

class GetAllRoleName extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke()
    {
        $data = Role::orderBy('name', 'asc')->get([
            'id',
            'name',
        ]);

        return Response::success($data);
    }
}
