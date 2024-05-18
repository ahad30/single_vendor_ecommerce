<?php

namespace App\Response;
use Illuminate\Http\Response;
class ResponseHandler
{
   public function __construct()
   {
    /**
     * use case
     * return Response::success( data, 'Login successfully', statuscode);
     */
    Response::macro('success', function ($data = null, $message = 'Success', $status = 200) {
        return response()->json([
            'success' => true,
            'data' => $data,
            'message' => $message,
        ], $status );
    });

    /**
     * use case 
     * return Response::created();
     */
    Response::macro('created', function($message = 'data created', $status = 201) {
        return Response::success([],$message, $status );
    });

    /**
     * use case
     * return Response::updated();
     */
    Response::macro('updated', function($message = 'data updated', $status = 200) {
        return Response::success([],$message, $status );
    });

    /**
     * use case
     * return Response::error('message', status code, data, headers);
     */
    Response::macro('error', function ($message = 'Error', $status = 400) {
        return response()->json([
            'success' => false,
            'message' => $message,
           
        ], $status );
    });

    /**
     * use case
     * return Response::internalServerError('Something went wrong on the server');
     */
    Response::macro('internalServerError', function ($message = 'Internal Server Error') {
        return Response::error($message, 500);
    });

    /**
     * use case
     * return Response::pageExpired('Your session has expired');
     */
    Response::macro('pageExpired', function ($message = 'Page Expired') {
        return Response::error($message, 419);
    });
    /**
     * use case
     * return Response::notFound();
     */
    Response::macro('notFound', function ($message = 'data Not Found', $status = 404) {
        return Response::error($message, $status);
    });
    
    /**
     * use case
     * return Response::unauthorized('Unauthorized access');
     */
    Response::macro('unauthorized', function ($message = 'Unauthorized', $status = 401) {
        return Response::error($message, $status);
    });
   }

}
