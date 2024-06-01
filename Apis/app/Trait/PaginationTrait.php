<?php

namespace App\Trait;

trait PaginationTrait
{
    /**
     * @param object|null $collection
     * @param object|null $resources
     * @return array
     */
    public function getMetaPagination(object $collection = null, object $resources = null): array
    {
        return [
            'status' => true,
            'data' => $resources,
            'meta' => [
                'active_page' => $collection->currentPage() ? false : true,
                'current_page' => $collection->currentPage(),
                'last_page' => $collection->lastPage(),
                'per_page' => $collection->perPage(),
                'total' => $collection->total(),
                'next_page_url' => $collection->nextPageUrl(),
                'prev_page_url' => $collection->previousPageUrl(),
            ],
        ];
    }
}
