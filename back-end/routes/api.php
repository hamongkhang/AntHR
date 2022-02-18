<?php
 
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use app\Http\Controller\Api\UsersController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
 
Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
 
Route::group([
    'middleware' => 'api',
], function ($router) {
    Route::post('/inbox', [App\Http\Controllers\ChatController::class, 'getAllMessages'])->name('inbox');
    Route::post('/inbox_admin', [App\Http\Controllers\ChatController::class, 'getMessageByAdmin'])->name('inboxAdmin');
    Route::post('/sendmess', [App\Http\Controllers\ChatController::class, 'sendMessage'])->name('sendMessage');   
});
/* Api Register */
Route::get('token', function (Request $request) {
    $token = $request->session()->token();
    $token = csrf_token();
    return Response()->json(array("token"=>$token));
});
/////////////////////////////////////// Users APIs //////////////////////////////////////////////////////////////////////////////

Route::post('/user/getCode', [App\Http\Controllers\UsersController::class, 'getCode'])->name('user.getCode');
Route::post('/user/register', [App\Http\Controllers\UsersController::class, 'onRegister'])->name('user.register');
Route::post('/user/checkDomain', [App\Http\Controllers\UsersController::class, 'checkDomain'])->name('user.checkDomain');
Route::post('/user/login', [App\Http\Controllers\UsersController::class, 'onLogin'])->name('user.login');
Route::post('/user/logout', [App\Http\Controllers\UsersController::class, 'onLogout'])->name('user.logout');
Route::post('/user/refresh', [App\Http\Controllers\UsersController::class, 'refresh'])->name('user.refresh');
Route::post('/user/profile', [App\Http\Controllers\UsersController::class, 'userProfile'])->name('user.profile');
Route::post('/user/changePassword', [App\Http\Controllers\UsersController::class, 'changePassword'])->name('user.changePassword');
Route::post('/user/getCodeForgotPassword', [App\Http\Controllers\UsersController::class, 'getCodeForgotPassword'])->name('user.getCodeForgotPassword');
Route::post('/user/changePasswordForgot', [App\Http\Controllers\UsersController::class, 'changePasswordForgot'])->name('user.changePasswordForgot');

/////////////////////////////////////// Employee APIs //////////////////////////////////////////////////////////////////////////////

Route::post('/employee/createEmployee', [App\Http\Controllers\EmployeeController::class, 'createEmployee'])->name('employee.createEmployee');
Route::post('/employee/createAccount', [App\Http\Controllers\EmployeeController::class, 'createAccount'])->name('employee.createAccount');
Route::get('/employee/getAllEmployee', [App\Http\Controllers\EmployeeController::class, 'getAllEmployee'])->name('employee.getAllEmployee');
Route::get('/employee/getOneEmployee/{id}', [App\Http\Controllers\EmployeeController::class, 'getOneEmployee'])->name('employee.getOneEmployee');

