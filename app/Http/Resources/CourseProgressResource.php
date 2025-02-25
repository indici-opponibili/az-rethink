<?php

namespace App\Http\Resources;

use App\Models\CourseProgress;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CourseProgressResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */

    /**
     * @mixin CourseProgress
     */
    public function toArray(Request $request): array
    {
        return [
            'tag' => $this->tag,
            'status' => $this->status,
        ];
    }
}
