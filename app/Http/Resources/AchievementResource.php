<?php

namespace App\Http\Resources;

use App\Models\Achievement;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AchievementResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */

    /** @mixin  Achievement*/
    public function toArray(Request $request): array
    {
        return [
            'tag' => $this->tag,
            'step' => $this->step
        ];
    }
}
