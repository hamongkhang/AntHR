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
Route::get('/employee/exportEmployee', [App\Http\Controllers\EmployeeController::class, 'exportEmployee'])->name('employee.exportEmployee');


/////////////////////////////////////// Account APIs //////////////////////////////////////////////////////////////////////////////

Route::get('/account/blockAccount/{id}', [App\Http\Controllers\AccountController::class, 'blockAccount'])->name('account.blockAccount');
Route::get('/account/authoriseAccount/{id}', [App\Http\Controllers\AccountController::class, 'authoriseAccount'])->name('account.authoriseAccount');
Route::get('/account/userProfile', [App\Http\Controllers\AccountController::class, 'userProfile'])->name('account.userProfile');
Route::get('/auth/redirect/{provider}', [App\Http\Controllers\SocialController::class, 'redirect'])->name('user.redirect');
Route::get('/callback/{provider}',  [App\Http\Controllers\SocialController::class, 'callback'])->name('user.callback');


/////////////////////////////////////// Document APIs //////////////////////////////////////////////////////////////////////////////
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


/////////////////////////////////////// News APIs //////////////////////////////////////////////////////////////////////////////
Route::get('/new/getAllNew', [App\Http\Controllers\NewController::class, 'getAllNew'])->name('new.getAllNew');
Route::get('/new/getOneNew/{id}', [App\Http\Controllers\NewController::class, 'getOneNew'])->name('new.getOneNew');
Route::delete('/new/destroyNew/{id}', [App\Http\Controllers\NewController::class, 'destroyNew'])->name('new.destroyNew');
Route::post('/new/createNew', [App\Http\Controllers\NewController::class, 'createNew'])->name('new.createNew');
Route::post('/new/updateNew/{id}', [App\Http\Controllers\NewController::class, 'updateNew'])->name('new.updateNew');
Route::post('/new/changeImportant/{id}', [App\Http\Controllers\NewController::class, 'changeImportant'])->name('new.changeImportant');
Route::get('/new/downloadNew/{id}', [App\Http\Controllers\NewController::class, 'downloadNew'])->name('new.downloadNew');


/////////////////////////////////////// Praises APIs //////////////////////////////////////////////////////////////////////////////
Route::get('/praise/getAllPraise', [App\Http\Controllers\PraiseController::class, 'getAllPraise'])->name('praise.getAllPraise');
Route::get('/praise/getOnePraise/{id}', [App\Http\Controllers\PraiseController::class, 'getOnePraise'])->name('praise.getOnePraise');
Route::delete('/praise/destroyPraise/{id}', [App\Http\Controllers\PraiseController::class, 'destroyPraise'])->name('praise.destroyPraise');
Route::post('/praise/createPraise', [App\Http\Controllers\PraiseController::class, 'createPraise'])->name('praise.createPraise');
Route::get('/praise/changeStatus/{id}', [App\Http\Controllers\PraiseController::class, 'changeStatus'])->name('praise.changeStatus');
Route::get('/praise/getAllLike', [App\Http\Controllers\PraiseController::class, 'getAllLike'])->name('praise.getAllLike');
Route::get('/praise/getAllComment', [App\Http\Controllers\PraiseController::class, 'getAllComment'])->name('praise.getAllComment');
Route::post('/praise/createLike', [App\Http\Controllers\PraiseController::class, 'createLike'])->name('praise.createLike');
Route::post('/praise/createComment', [App\Http\Controllers\PraiseController::class, 'createComment'])->name('praise.createComment');


////////////////////////////////////// Present APIs //////////////////////////////////////////////////////////////////////////////
Route::get('/present/getAllCategory', [App\Http\Controllers\PresentCategoryController::class, 'getAllCategory'])->name('present.getAllCategory');
Route::get('/present/getOneCategory/{id}', [App\Http\Controllers\PresentCategoryController::class, 'getOneCategory'])->name('present.getOneCategory');
Route::delete('/present/destroyCategory/{id}', [App\Http\Controllers\PresentCategoryController::class, 'destroyCategory'])->name('present.destroyCategory');
Route::post('/present/createCategory', [App\Http\Controllers\PresentCategoryController::class, 'createCategory'])->name('present.createCategory');
Route::post('/present/updateCategory/{id}', [App\Http\Controllers\PresentCategoryController::class, 'updateCategory'])->name('present.updateCategory');
Route::post('/present/createPresent', [App\Http\Controllers\PresentController::class, 'createPresent'])->name('present.createPresent');
Route::get('/present/getAllPresent', [App\Http\Controllers\PresentController::class, 'getAllPresent'])->name('present.getAllPresent');
Route::get('/present/getOnePresent/{id}', [App\Http\Controllers\PresentController::class, 'getOnePresent'])->name('present.getOnePresent');
Route::post('/present/updatePresent/{id}', [App\Http\Controllers\PresentController::class, 'updatePresent'])->name('present.updatePresent');
Route::delete('/present/destroyPresent/{id}', [App\Http\Controllers\PresentController::class, 'destroyPresent'])->name('present.destroyPresent');
Route::get('/present/changeStatus/{id}', [App\Http\Controllers\PresentController::class, 'changeStatus'])->name('present.changeStatus');
Route::get('/present/exchangePresent/{id}', [App\Http\Controllers\PresentController::class, 'exchangePresent'])->name('present.exchangePresent');
Route::delete('/notify/destroyNotify/{id}', [App\Http\Controllers\NotifyController::class, 'destroyNotify'])->name('notify.destroyNotify');
Route::get('/notify/getNotify', [App\Http\Controllers\NotifyController::class, 'getNotify'])->name('notify.getNotify');
Route::post('/time/createTimeOffAdmin', [App\Http\Controllers\TimeController::class, 'createTimeOffAdmin'])->name('time.createTimeOffAdmin');
Route::post('/time/createTimeOffEmployee', [App\Http\Controllers\TimeController::class, 'createTimeOffEmployee'])->name('time.createTimeOffEmployee');
Route::get('/time/getTimeOff', [App\Http\Controllers\TimeController::class, 'getTimeOff'])->name('time.getTimeOff');
Route::get('/time/changeStatus/{id}', [App\Http\Controllers\TimeController::class, 'changeStatus'])->name('time.changeStatus');
Route::get('/time/getOverTime', [App\Http\Controllers\TimeController::class, 'getOverTime'])->name('time.getOverTime');



////////////////////////////////////// Score APIs //////////////////////////////////////////////////////////////////////////////
Route::get('/score/getOneScore', [App\Http\Controllers\ScoreController::class, 'getOneScore'])->name('score.getOneScore');
Route::get('/employee/getUserPoints', [App\Http\Controllers\ScoreController::class, 'getUserPoints'])->name('score.getUserPoints');
Route::post('/score/createScore', [App\Http\Controllers\ScoreController::class, 'createScore'])->name('score.createScore');


////////////////////////////////////// Cart Present APIs //////////////////////////////////////////////////////////////////////////////
Route::delete('/cart_present/destroyCartPresent/{id}', [App\Http\Controllers\CartPresentController::class, 'destroyCartPresent'])->name('cart_present.destroyCartPresent');
Route::get('/cart_present/changeStatusAdmin/{id}', [App\Http\Controllers\CartPresentController::class, 'changeStatusAdmin'])->name('cart_present.changeStatusAdmin');
Route::get('/cart_present/changeStatusClient/{id}', [App\Http\Controllers\CartPresentController::class, 'changeStatusClient'])->name('cart_present.changeStatusClient');
Route::get('/cart_present/getAllCartPresent', [App\Http\Controllers\CartPresentController::class, 'getAllCartPresent'])->name('cart_present.getAllCartPresent');


////////////////////////////////////// Google Drive APIs //////////////////////////////////////////////////////////////////////////////

Route::get('/google_document/checkGoogleDocument', [App\Http\Controllers\SocialController::class, 'checkGoogleDocument'])->name('google_document.checkGoogleDocument');
Route::get('/google-drive/callback', [App\Http\Controllers\SocialController::class, 'googleDriveCallBack'])->name('google_document.googleDriveCallBack');
Route::get('/google-drive/getGoogleDrive/{access_token_google_drive}', [App\Http\Controllers\SocialController::class, 'getGoogleDrive'])->name('google_document.getGoogleDrive');
Route::get('/google-drive/{access_token_google_drive}/{id}/{folder_id}/uploadGoogleDrive', [App\Http\Controllers\SocialController::class, 'uploadGoogleDrive'])->name('google_document.uploadGoogleDrive');

////////////////////////////////////// Company APIs //////////////////////////////////////////////////////////////////////////////
Route::get('/company/getCompany', [App\Http\Controllers\CompanyController::class, 'getCompany'])->name('company.getCompany');
Route::post('/company/updateCompany/{id}', [App\Http\Controllers\CompanyController::class, 'updateCompany'])->name('company.updateCompany');
Route::post('/company/changeLogo/{id}', [App\Http\Controllers\CompanyController::class, 'changeLogo'])->name('company.changeLogo');

////////////////////////////////////// Attendances APIs //////////////////////////////////////////////////////////////////////////////
Route::get('/attendance/getAllAttendance', [App\Http\Controllers\AttendanceController::class, 'getAllAttendance'])->name('attendance.getAllAttendance');
Route::post('/attendance/getOneAttendance', [App\Http\Controllers\AttendanceController::class, 'getOneAttendance'])->name('attendance.getOneAttendance');
Route::get('/attendance/getMyAttendance', [App\Http\Controllers\AttendanceController::class, 'getMyAttendance'])->name('attendance.getMyAttendance');
Route::post('/attendance/createAttendance/{id}', [App\Http\Controllers\AttendanceController::class, 'createAttendance'])->name('attendance.createAttendance');
Route::post('/attendance/updateAttendance/{id}', [App\Http\Controllers\AttendanceController::class, 'updateAttendance'])->name('attendance.updateAttendance');
Route::post('/attendance/createAttendance2/{id}', [App\Http\Controllers\AttendanceController::class, 'createAttendance2'])->name('attendance.createAttendance2');

Route::get('/attendance/getMobileAttendance', [App\Http\Controllers\AttendanceController::class, 'getMobileAttendance'])->name('attendance.getMobileAttendance');






















