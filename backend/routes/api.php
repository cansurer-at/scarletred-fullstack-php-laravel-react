<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TaskController;

// GET endpoint to list tasks
Route::get('/tasks', [TaskController::class, 'index']);

// ✅ POST endpoint to add new tasks
Route::post('/tasks', [TaskController::class, 'store']);
