<?php

use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('/categories', CategoryController::class);
Route::apiResource('/products', ProductController::class);

// Autenticacion
Route::post('/register', [AuthController::class, 'register']);  