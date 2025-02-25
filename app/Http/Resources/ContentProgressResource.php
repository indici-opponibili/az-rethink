<?php

namespace App\Http\Resources;

use App\Models\ContentProgress;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ContentProgressResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */

    /** @mixin ContentProgress */

    public function toArray(Request $request): array
    {
        return [
            'tag' => $this->tag,
            'step' => $this->step,
            'category' => $this->category
        ];
    }
}
