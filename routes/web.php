<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FilesController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/


Route::get('/login', [AuthController::class, 'Login'])->name('login');
Route::post('/login', [AuthController::class, 'authenticate']);
Route::post('/login/populate', [AuthController::class, 'superstore'])->name('populate');

Route::middleware(['auth'])->group(function () {

    // route for categories
    Route::get('/category', [CategoryController::class, 'Index'])->name('category');
    Route::get('/category/add', [CategoryController::class, 'add'])->name('category.form');
    Route::get('/category/edit/{id}', [CategoryController::class, 'show'])->name('category.show');
    Route::post('/category/add', [CategoryController::class, 'store'])->name('category.store');
    Route::put('/category/update/{category}', [CategoryController::class, 'update'])->name('category.update');
    Route::delete('/category/delete/{id}', [CategoryController::class, 'destroy'])->name('category.destroy');

    // route for files
    Route::get('/', [FilesController::class, 'Index'])->name('dashboard');
    Route::get('/files/add', [FilesController::class, 'add'])->name('files.form');
    Route::get('/files/edit/{id}', [FilesController::class, 'show'])->name('files.show');
    Route::post('/files/add', [FilesController::class, 'store'])->name('files.store');
    Route::put('/files/update/{files}', [FilesController::class, 'update'])->name('files.update');
    Route::delete('/files/delete/{id}', [FilesController::class, 'destroy'])->name('files.destroy');
    Route::get('/download/{filename}', [FilesController::class, 'downloadFile'])->name('file.download');

    // route for users
    Route::get('/users', [AuthController::class, 'Index'])->name('users');
    Route::get('/users/add', [AuthController::class, 'add'])->name('users.form');
    Route::get('/users/edit/{id}', [AuthController::class, 'show'])->name('users.show');
    Route::post('/users/add', [AuthController::class, 'store'])->name('users.store');
    Route::put('/users/update/{users}', [AuthController::class, 'update'])->name('users.update');
    Route::delete('/users/delete/{id}', [AuthController::class, 'destroy'])->name('users.destroy');

    Route::get('/profile', [DashboardController::class, 'profile'])->name('profile');
    Route::put('/profile/update/{id}', [DashboardController::class, 'update'])->name('profile.update');
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

});

