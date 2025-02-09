<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class TaskResource extends JsonResource
{
  public static $wrap = false;
  /**
   * Transform the resource into an array.
   *
   * @return array<string, mixed>
   */
  public function toArray(Request $request): array
  {
    // dd($this);
    return [
      "name" => $this->name,
      "id" => $this->id,
      'description' => $this->description,
      'created_at' => (new Carbon($this->created_at))->format('Y-m-d'),
      'due_date' => (new Carbon($this->due_date))->format('Y-m-d'),
      'status' => $this->status,
      'priority' => $this->priority,
      'image_path' => $this->image_path ? Storage::url($this->image_path) : '',
      'project' => new ProjectResource($this->project),
      'assignedUser' => new UserResource($this->assignedUser),
      'createdBy' => new UserResource($this->createdBy),
      'updatedBy' => new UserResource($this->updatedBy),
    ];
  }
}
