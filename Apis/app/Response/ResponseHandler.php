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
        Response::macro('success', function ($data = null, $message = null, $status = 200) {
            return response()->json([
                'status' => true,
                'data' => $data,
                'message' => $message,
            ], $status);
        });

        /**
         * use case
         * return Response::successWithPagination(data, statuscode);
         */
        Response::macro('successWithPagination', function ($data = null, $status = 200) {
            return response()->json(
                $data,
                $status
            );
        });

        /**
         * use case
         * return Response::created();
         */
        Response::macro('created', function ($data = null, $message = 'data created', $status = 201) {
            return Response::success($data, $message, $status);
        });

        /**
         * use case
         * return Response::updated();
         */
        Response::macro('updated', function ($data = null, $message = 'data updated', $status = 200) {
            return Response::success($data, $message, $status);
        });

        /**
         * use case
         * return Response::error('message', status code, data, headers);
         */
        Response::macro('error', function ($message = 'Error', $status = 400) {
            return response()->json([
                'status' => false,
                'message' => $message,

            ], $status);
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
        Response::macro('notFound', function ($message = 'Data Not Found', $status = 404) {
            return Response::error($message, $status);
        });

        /**
         * use case
         * return Response::unauthorized('message');
         */
        Response::macro('unauthorized', function ($message = 'Unauthorized', $status = 401) {
            return Response::error($message, $status);
        });

        /**
         * use case
         * return Response::unauthorized('message');
         */
        Response::macro('forbidden', function ($message = 'Access Denied', $status = 403) {
            return Response::error($message, $status);
        });
    }
}
