<?php

namespace App\Http\Controllers\Api\Ecommerce;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Trait\PaginationTrait;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class CustomerController extends Controller
{
    use PaginationTrait;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = User::latest()->where('is_customer', true)->paginate();
        $users = UserResource::collection($data);

        // Get response paginated data
        $response = $this->getMetaPagination($data, $users);

        return Response::successWithPagination($response);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(User $customer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $customer)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $customer)
    {
        // check if the user is staff or customer
        if ($customer->is_staff == true) {
            return Response::error("Sorry, you are trying to delete a staff");
        }

        // delete the customer
        $customer->delete();
        return Response::success(null, "Customer successfully deleted");
    }
}
