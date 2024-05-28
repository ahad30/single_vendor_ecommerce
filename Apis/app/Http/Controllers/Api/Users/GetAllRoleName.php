<?php

namespace App\Http\Controllers\Api\Users;

use App\Http\Controllers\Controller;
use Spatie\Permission\Models\Role;
use Illuminate\Http\Response;

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

        return Response::successWithPagination($data);
    }
}
