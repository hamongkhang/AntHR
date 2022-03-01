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
Route::post('/user/checkForm1', [App\Http\Controllers\UsersController::class, 'checkForm1'])->name('user.checkForm1');
Route::post('/user/checkForm2', [App\Http\Controllers\UsersController::class, 'checkForm2'])->name('user.checkForm2');
Route::post('/user/checkForm3', [App\Http\Controllers\UsersController::class, 'checkForm3'])->name('user.checkForm3');
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
Route::delete('/employee/destroyEmployee/{id}', [App\Http\Controllers\EmployeeController::class, 'destroyEmployee'])->name('employee.destroyEmployee');
Route::post('/employee/changeAvatar', [App\Http\Controllers\EmployeeController::class, 'changeAvatar'])->name('employee.changeAvatar');
Route::post('/employee/changeInformation', [App\Http\Controllers\EmployeeController::class, 'changeInformation'])->name('employee.changeInformation');

/////////////////////////////////////// Account APIs //////////////////////////////////////////////////////////////////////////////

Route::get('/account/blockAccount/{id}', [App\Http\Controllers\AccountController::class, 'blockAccount'])->name('account.blockAccount');
Route::post('/account/authoriseAccount', [App\Http\Controllers\AccountController::class, 'authoriseAccount'])->name('account.authoriseAccount');
Route::get('/account/userProfile', [App\Http\Controllers\AccountController::class, 'userProfile'])->name('account.userProfile');
Route::get('/auth/redirect/{provider}', [App\Http\Controllers\SocialController::class, 'redirect'])->name('user.redirect');
Route::get('/callback/{provider}',  [App\Http\Controllers\SocialController::class, 'callback'])->name('user.callback');


/////////////////////////////////////// Document Folder APIs //////////////////////////////////////////////////////////////////////////////
Route::get('/document/getAllFolder', [App\Http\Controllers\DocumentFolderController::class, 'getAllFolder'])->name('document.getAllFolder');
Route::get('/document/getOneFolder/{id}', [App\Http\Controllers\DocumentFolderController::class, 'getOneFolder'])->name('document.getOneFolder');
Route::delete('/document/destroyFolder/{id}', [App\Http\Controllers\DocumentFolderController::class, 'destroyFolder'])->name('document.destroyFolder');
Route::post('/document/createFolder', [App\Http\Controllers\DocumentFolderController::class, 'createFolder'])->name('document.createFolder');
Route::post('/document/updateFolder/{id}', [App\Http\Controllers\DocumentFolderController::class, 'updateFolder'])->name('document.updateFolder');
Route::post('/document/changeShare/{id}', [App\Http\Controllers\DocumentFolderController::class, 'changeShare'])->name('document.changeShare');
Route::post('/document/createDocument', [App\Http\Controllers\DocumentController::class, 'createDocument'])->name('document.createDocument');
Route::post('/document/updateDocument/{id}', [App\Http\Controllers\DocumentController::class, 'updateDocument'])->name('document.updateDocument');
Route::delete('/document/destroyDocument/{id}', [App\Http\Controllers\DocumentController::class, 'destroyDocument'])->name('document.destroyDocument');
Route::get('/document/downloadDocument/{id}', [App\Http\Controllers\DocumentController::class, 'downloadDocument'])->name('document.downloadDocument');
