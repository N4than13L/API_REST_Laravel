<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Usando nuestro middleware

use App\Http\Middleware\ApiAuthMiddleware;

Route::get('/', function () {
    return "<h1>Hola mundo</h1>";
});

Route::get('/welcome', function () {
    return view('welcome');
});

Route::get('/pruebas/{nombre?}', function ($nombre = null){
    
    $texto = "<h2>Texto de pruebas</h2>";
    $texto .= 'Nombre: '.$nombre;

    return view('pruebas', array(
        'texto' => $texto
    ));
});

Route::get('/animales', 'PruebasController@index');

Route::get('/test-Orm', 'PruebasController@testOrm');

//Rutas de prueba.

// Route::get('/usuario/pruebas', 'UserController@pruebas');
// Route::get('/categoria/pruebas', 'CategoryController@pruebas');
// Route::get('/entrada/pruebas', 'PostController@pruebas');

// Rutas del api.
Route::post('/api/register', 'UserController@register');
Route::post('/api/login', 'UserController@login');

Route::put('/api/user/update', 'UserController@update');

Route::post('/api/user/upload', 'UserController@upload')->Middleware(ApiAuthMiddleware::class);
Route::get('/api/user/avatar/{filename}', 'UserController@getImage');
Route::get('/api/user/detail/{id}', 'UserController@detail');

// Rutas para las categorias.
Route::resource('api/category', 'CategoryController');

//Rutas para colocar los POSTS.
Route::resource('api/post', 'PostController');
Route::post('/api/post/upload', 'PostController@upload');