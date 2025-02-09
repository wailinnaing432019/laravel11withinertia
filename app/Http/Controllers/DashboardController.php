<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Task;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
  public function index()
  {
    $user = auth()->user();
    $myPendingTasks = Task::query()
      ->where('assigned_user_id', $user->id)
      ->where('status', 'pending')
      ->count();
    $myProgressTask = Task::query()
      ->where('assigned_user_id', $user->id)
      ->where('status', 'in_progress')
      ->count();
    $myCompletedTask = Task::query()
      ->where('assigned_user_id', $user->id)
      ->where('status', 'completed')
      ->count();
    $totalPendingTasks = Task::query()
      ->where('status', 'pending')
      ->count();
    $totalProgressTasks = Task::query()
      ->where('status', 'in_progress')
      ->count();
    $totalCompletedTasks = Task::query()
      ->where('status', 'completed')
      ->count();
    $myActiveTasks = Task::query()
      ->where('assigned_user_id', $user->id)
      ->whereIn('status', ['in_progress', 'completed'])
      ->limit(10)->get();
    $myActiveTasks = TaskResource::collection($myActiveTasks);
    return inertia('Dashboard', compact(
      'myPendingTasks',
      'myProgressTask',
      'myCompletedTask',
      'totalPendingTasks',
      'totalProgressTasks',
      'totalCompletedTasks',
      'myActiveTasks'
    ));
  }
}
