<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;

class TaskController extends Controller
{
    public function index()
    {
        return Task::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
        ]);

        $task = Task::create([
            'title' => $request->title,
            'completed' => false,
        ]);

        return response()->json($task, 201);
    }

   public function update(Request $request, $id)
{
    $request->validate([
        'title' => 'required|string|max:255',
        'completed' => 'boolean',
    ]);

    $task = Task::findOrFail($id);
    $task->title = $request->title;
    $task->completed = $request->completed;
    $task->save();

    return response()->json($task);
}

    public function destroy($id)
{
    $task = Task::findOrFail($id);
    $task->delete();

    return response()->json(['message' => 'Task deleted successfully']);
}
}
