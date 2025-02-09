<?php

namespace App\Models;
use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
  /** @use HasFactory<\Database\Factories\TaskFactory> */
  use HasFactory;

  protected $fillable = [
    'name',
    'description',
    'due_date',
    'status',
    'priority',
    'image_path',
    'assigned_user_id',
    'created_by',
    'updated_by',
    'project_id',
  ];
  public function project()
  {
    return $this->belongsTo(Project::class, 'project_id');
  }
  public function assignedUser()
  {
    return $this->belongsTo(User::class, 'assigned_user_id');
  }
  public function createdBy()
  {
    return $this->belongsTo(User::class, 'created_by');
  }
  public function updatedBy()
  {
    return $this->belongsTo(User::class, 'updated_by');
  }

}
