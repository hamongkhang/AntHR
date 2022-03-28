<?php
 
namespace App\Http\Controllers;
 
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\UsersResource;
use App\Jobs\SendEmail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

use App\Models\Employee;
use App\Models\Company;
use App\Models\User;
use App\Models\RegisterCode;
use App\Models\ForgotCode;
use App\Models\UserScore;



class UsersController extends Controller
{
     /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['onLogin','onRegister','checkDomain','getCode','getCodeForgotPassword','changePasswordForgot','checkForm1','checkForm2','checkForm3']]);
    }
     /**
     * @SWG\POST(
     *     path="api/users/login/",
     *     description="Return a user's information",
     *     @SWG\Parameter(
     *         name="email",
     *         in="query",
     *         type="string",
     *         description="Your email",
     *         required=true,
     *     ),
     *  @SWG\Parameter(
     *         name="password",
     *         in="query",
     *         type="string",
     *         description="Your password(length>=8)",
     *         required=true,
     *     ),
     *     @SWG\Response(
     *         response=200,
     *         description="Successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="access_token", type="string"),
     *             @SWG\Property(property="token_type", type="string"),
     *             @SWG\Property(property="expires_in", type="integer"),
     *             @SWG\Property(property="id", type="integer"),
     *             @SWG\Property(property="email", type="string"),
     *             @SWG\Property(property="email_verified_at", type="datetime"),
     *             @SWG\Property(property="status", type="string"),
     *             @SWG\Property(property="created_at", type="timestamp"),
     *             @SWG\Property(property="updated_at", type="timestamp"),
     *            )
     *     ),
     *     @SWG\Response(
     *         response=401,
     *         description="Unauthorized!"
     *     )
     * )
     */
    public function onLogin(Request $request)
     {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
            'password' => 'required|string|min:8',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 400);      
        }

        if (!$token = auth()->attempt($validator->validated())) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        if (auth()->user()->status=="block") {
            return response()->json(['error' => 'Blocked'], 401);
        }
        return $this->createNewToken($token); 
    }


       /**
     * @SWG\POST(
     *     path="api/users/checkDomain/",
     *     description="Return a company's information",
     *     @SWG\Parameter(
     *         name="domain",
     *         in="query",
     *         type="string",
     *         description="Company Domain",
     *         required=true,
     *     ),
     *     @SWG\Response(
     *         response=200,
     *         description="Successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="name", type="string"),
     *             @SWG\Property(property="domain", type="string"),
     *             @SWG\Property(property="size", type="integer"),
     *             @SWG\Property(property="created_at", type="datetime"),
     *             @SWG\Property(property="updated_at", type="datetime"),
     *            )
     *     ),
     *     @SWG\Response(
     *         response=422,
     *         description="No one have domain!"
     *     )
     * )
     */
    public function checkDomain(Request $request){
        $validator=Validator::make($request->All(),[
            'domain'=>'required'
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 400);      
        }
        $domainFind=DB::table('company')->where('domain', $request->domain)->first();
        if($domainFind){
            return Response()->json(array("Successfully"=> 1,"data"=>$domainFind));
        }
        else{
            return response()->json(['error'=>"No one have domain"], 422);
        }
    }
    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function createNewToken($token){
        $name=DB::table('employee')->where('user_id', auth()->user()->id)->first();
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user(),
            'name' => $name
        ]);
    }
 
    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    /**
     * @SWG\POST(
     *     path="api/users/logout/",
     *     description="Return a user's information",
     *     @SWG\Response(
     *         response=200,
     *         description="User successfully signed out",
     *     ),
     *     @SWG\Response(
     *         response=401,
     *         description="No one login!"
     *     ),
     *  security={
     *           {"api_key_security_example": {}}
     *       }
     * )
     */
    public function onLogout() {
        auth()->logout();
        return response()->json(['message' => 'User successfully signed out']);
    }

     /**
     * @SWG\POST(
     *     path="api/users/refresh/",
     *     description="Return a user's information",
     *     @SWG\Response(
     *         response=200,
     *         description="Successfully",
     *         @SWG\Schema(
     *              @SWG\Property(property="access_token", type="string"),
     *             @SWG\Property(property="token_type", type="string"),
     *             @SWG\Property(property="expires_in", type="integer"),
     *             @SWG\Property(property="id", type="integer"),
     *             @SWG\Property(property="email", type="string"),
     *             @SWG\Property(property="email_verified_at", type="datetime"),
     *             @SWG\Property(property="status", type="string"),
     *             @SWG\Property(property="created_at", type="timestamp"),
     *             @SWG\Property(property="updated_at", type="timestamp"),
     *            )
     *     ),
     *     @SWG\Response(
     *         response=401,
     *         description="Unauthorized!"
     *     ),
     * security={
     *           {"api_key_security_example": {}}
     *       }
     * )
     */
    public function refresh() {
        return $this->createNewToken(auth()->refresh());
    }
     /**
     * @SWG\POST(
     *     path="api/users/register/",
     *     description="Return a account's information",
     *     @SWG\Parameter(
     *         name="code",
     *         in="query",
     *         type="string",
     *         description="6 char",
     *         required=true,
     *     ),
     *     @SWG\Response(
     *         response=200,
     *         description="Successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="email", type="string"),
     *             @SWG\Property(property="role", type="integer"),
     *             @SWG\Property(property="password", type="string"),
     *             @SWG\Property(property="status", type="string"),
     *             @SWG\Property(property="created_at", type="datetime"),
     *             @SWG\Property(property="updated_at", type="datetime"),
     *            )
     *     ),
     *     @SWG\Response(
     *         response=422,
     *         description="No one have code"
     *     )
     * )
     */
    public function onRegister(Request $request){
        $validator = Validator::make($request->all(), [
            'code' => 'required|size:6',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);     
        }
        $dataFind = DB::table('register_code')->where('code', $request->code)->first();
        if($dataFind){
            $postAccount = [
                'email'  => $dataFind->email,
                'role'  => $dataFind->role,
                'password'=>Hash::make($dataFind->password),
                'status'=>"active",
                'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
                'updated_at'=>Carbon::now('Asia/Ho_Chi_Minh'),
            ];   
            $account = User::create($postAccount);
            $employeeFind = DB::table('users')->where('email', $dataFind->email)->first();

        $postEmployee = [
            'first_name'  => $dataFind->first_name,
            'last_name'  => $dataFind->last_name,
            'email'  => $dataFind->email,
            'user_id'=>$employeeFind->id,
            'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
            'updated_at'=>Carbon::now('Asia/Ho_Chi_Minh'),
        ];
        $postCompany = [
            'name'  => $dataFind->name,
            'domain'=>$dataFind->domain,
            'size'=>$dataFind->size,
            'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
            'updated_at'=>Carbon::now('Asia/Ho_Chi_Minh'),
        ];
        $postScore = [
            'user_id'  =>$employeeFind->id,
            'score'  => 5000000,
            'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
            'updated_at'=>Carbon::now('Asia/Ho_Chi_Minh'),
        ];   
        DB::delete('delete from register_code where id = ?',[$dataFind->id]);
        $employee = Employee::create($postEmployee);
        $company = Company::create($postCompany);
        $score=UserScore::create($postScore);
        //Send mail notification Register account success
        $dataSendMail = [
            'description'=>'notiRegisterSuccess',
            'title' => ' Successful account registration',
            'content'=>"Congratulations, you have successfully registered an account at our AntHR"
        ];
        SendEmail::dispatch($dataSendMail, $request->email)->delay(now());
        return Response()->json(array("successfully"=> 1,"account"=>$postAccount));
    }
    else{
        return response()->json(['error'=>"No one have code"], 422);
    }
}

     /**
     * @SWG\POST(
     *     path="api/users/getCode/",
     * 
     *     description="Return a user's information",
     *     @SWG\Parameter(
     *         name="first_name",
     *         in="query",
     *         type="string",
     *         description="max 255 char",
     *         required=true,
     *     ),
     * @SWG\Parameter(
     *         name="last_name",
     *         in="query",
     *         type="string",
     *         description="max 255 char",
     *         required=true,
     *     ),
     * @SWG\Parameter(
     *         name="email",
     *         in="query",
     *         type="string",
     *         description="email",
     *         required=true,
     *     ),
     * @SWG\Parameter(
     *         name="password",
     *         in="query",
     *         type="string",
     *         description="min 8 char",
     *         required=true,
     *     ),
     * @SWG\Parameter(
     *         name="domain",
     *         in="query",
     *         type="string",
     *         description="max 255 char",
     *         required=true,
     *     ),
     * @SWG\Parameter(
     *         name="size",
     *         in="query",
     *         type="integer",
     *         required=true,
     *     ),
     * @SWG\Parameter(
     *         name="company_name",
     *         in="query",
     *         type="string",
     *         description="max 255 char",
     *         required=true,
     *     ),
     * @SWG\Parameter(
     *         name="role",
     *         in="query",
     *         type="integer",
     *         required=true,
     *     ),
     * @SWG\Parameter(
     *         name="over_view",
     *         in="query",
     *         type="string",
     *         required=true,
     *     ),
     *     @SWG\Response(
     *         response=200,
     *         description="Successfully. Please check code your email!",
     *     ),
     *     @SWG\Response(
     *         response=401,
     *         description="Missing Data"
     *     )
     * )
     */
    public function checkForm1(Request $request){
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|max:255',
            'last_name' => 'required|max:255',
            'email'=>'required|email|unique:employee',
            'password'=>'required|min:8',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);     
        }
        return Response()->json(array("Successfully. Please check code your email!"=> 1));
    }
    public function checkForm2(Request $request){
        $validator = Validator::make($request->all(), [
            'domain'=>'required',
            'size'=>'required|integer|',
            'company_name'=>'required|max:255',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);     
        }
        return Response()->json(array("Successfully. Please check code your email!"=> 1));
    }
    public function checkForm3(Request $request){
        $validator = Validator::make($request->all(), [
            'role'=>'required',
            'over_view'=>'required'
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);     
        }
        return Response()->json(array("Successfully. Please check code your email!"=> 1));
    }
    public function getCode(Request $request){
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|max:255',
            'last_name' => 'required|max:255',
            'email'=>'required|email|unique:employee',
            'password'=>'required|min:8',
            'domain'=>'required',
            'size'=>'integer|required',
            'company_name'=>'required|max:255',
            'role'=>'required',
            'over_view'=>'required'
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);     
        }
        $code=$random = Str::random(6);
        $data = DB::table('register_code')->where('email', $request->email)->first();
        if($data){
        $registerCode = RegisterCode::find($data->id);
        $registerCode->first_name = $request->first_name;
        $registerCode->last_name = $request->last_name;
        $registerCode->email = $request->email;
        $registerCode->password = Hash::make($request->password);
        $registerCode->domain = $request->domain;
        $registerCode->size = $request->size;
        $registerCode->name = $request->company_name;
        $registerCode->role = $request->role;
        $registerCode->over_view = $request->over_view;
        $registerCode->code = $code;
        $registerCode->created_at = Carbon::now('Asia/Ho_Chi_Minh');
        $registerCode->updated_at = Carbon::now('Asia/Ho_Chi_Minh');
        $registerCode->save();
        // Mail send new code for new account register
        $dataSendMail = [
            'description'=>'getNewCode',
            'title' => ' Registration confirmation code',
            'content'=>'To confirm,  Please enter using the code below',
            'note'=>'note: The code has a distinction between uppercase and lowercase characters.',
            'code'=>$code
        ];
        SendEmail::dispatch($dataSendMail, $request->email)->delay(now());
        return Response()->json(array("Successfully. Please check code your email!"=> 1));    }
    else{
        $post = [
            'first_name'  => $request->first_name,
            'last_name'  => $request->last_name,
            'email'  => $request->email,
            'password'  => $request->password,
            'domain'  => $request->domain,
            'size'  => $request->size,
            'role'  => $request->role,
            'name'  => $request->company_name,
            'over_view'     => $request->over_view,
            'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
            'updated_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
            'code'=>$code,
        ];
         $user = RegisterCode::create($post);
          // Mail send new code for new account register
         $dataSendMail = [
            'description'=>'getNewCode',
            'title' => ' Confirm email',
            'note'=>'note: The code has a distinction between uppercase and lowercase characters.',
            'content'=>'To confirm,  Please enter using the code below',
            'code'=>$code
        ];
         SendEmail::dispatch($dataSendMail, $request->email)->delay(now());
       return Response()->json(array("Successfully. Please check code your email!"=> 1));
    }
    }

/**
     * @SWG\POST(
     *     path="api/users/userProfile/",
     *     description="Return a user's information",
     *     @SWG\Response(
     *         response=200,
     *         description="Successfully",
     *         @SWG\Schema(
     *            @SWG\Property(property="access_token", type="string"),
     *             @SWG\Property(property="token_type", type="string"),
     *             @SWG\Property(property="expires_in", type="integer"),
     *             @SWG\Property(property="id", type="integer"),
     *             @SWG\Property(property="email", type="string"),
     *             @SWG\Property(property="email_verified_at", type="datetime"),
     *             @SWG\Property(property="status", type="string"),
     *             @SWG\Property(property="created_at", type="timestamp"),
     *             @SWG\Property(property="updated_at", type="timestamp"),
     *            )
     *     ),
     *     @SWG\Response(
     *         response=422,
     *         description="Missing Data"
     *     ),
     *  security={
     *           {"api_key_security_example": {}}
     *       }
     * )
     */
    public function userProfile() {
        return response()->json(auth()->user());
    }

     /**
     * @SWG\POST(
     *     path="api/users/changePassword/",
     *     description="Return a user's information",
     *     @SWG\Parameter(
     *         name="current_password",
     *         in="query",
     *         type="string",
     *         description="Your old current password(length=8)",
     *         required=true,
     *     ),
     *  @SWG\Parameter(
     *         name="new_password",
     *         in="query",
     *         type="string",
     *         description="Your new password(length=8)",
     *         required=true,
     *     ),
     *  @SWG\Parameter(
     *         name="new_password_confirmed",
     *         in="query",
     *         type="string",
     *         description="Your new password confirmed(length=8)",
     *         required=true,
     *     ),
     *     @SWG\Response(
     *         response=200,
     *         description="User successfully changed password",
     *         @SWG\Schema(
     *             @SWG\Property(property="message", type="string"),
     *             @SWG\Property(property="user", type="integer"),
     *            )
     *     ),
     *     @SWG\Response(
     *         response=422,
     *         description="Missing Data"
     *     ),
     * security={
     *           {"api_key_security_example": {}}
     *       }
     * )
     */
    public function changePassword(Request $request) {
        $validator = Validator::make($request->all(), [
            'current_password' => 'required|string|min:8',
            'new_password' => 'required|string|min:8',
            'new_password_confirmed' => 'required|string|same:new_password|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);     
        }
        $hashedPassword = auth()->user()->password;
        if (!Hash::check($request->current_password , $hashedPassword)) {
            return response()->json(['error'=>"Current password is not correct"], 401);
        }
        $userId = auth()->user()->id;

        $user = User::where('id',$userId)->update(
                    ['password' => bcrypt($request->new_password)]
                );
        // Mail notification about change password success
         $dataSendMail = [
            'description'=>'notiChangePasswordSuccess',
            'title' => ' Update Password Successful',
            'content'=>'Change Password Successful'
        ];
         SendEmail::dispatch($dataSendMail,  auth()->user()->email)->delay(now());
        return response()->json([
            'message' => 'User successfully changed password',
            'user' => $user
        ], 201);
    }       

     /**
     * @SWG\POST(
     *     path="api/users/getCodeForgotPassword/",
     *     description="Return a user's information",
     *     @SWG\Parameter(
     *         name="email",
     *         in="query",
     *         type="string",
     *         description="Your email",
     *         required=true,
     *     ),
     *     @SWG\Response(
     *         response=200,
     *         description="Successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="code", type="string"),
     *            )
     *     ),
     *     @SWG\Response(
     *         response=422,
     *         description="Missing Data"
     *     )
     * )
     */
    public function getCodeForgotPassword(Request $request) {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email',
        ]);

        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);     
        }
        $code=$random = Str::random(6);
        $data = DB::table('users')->where('email', $request->email)->first();
        if($data){
            if($data->status!="block"){
                $usercheck = DB::table('forgot_code')->where('email', $request->email)->first();
                if($usercheck){
                    $user = ForgotCode::find($usercheck->id);
                    $user->email = $request->email;
                    $user->created_at = Carbon::now('Asia/Ho_Chi_Minh');
                    $user->updated_at = Carbon::now('Asia/Ho_Chi_Minh');
                    $user->code = $code;
                    $user->save();
                    // Mail send code for account forgot password
                    $dataSendMail = [
                        'description'=>'getCodeForgot',
                        'title' => ' Confirm change password',
                        'note'=>'Note: The code has a distinction between uppercase and lowercase characters.',
                        'content'=>'To Confirm change password, Please enter using the code below ',
                        'code'=>$code,
                        'link'=>'http://localhost:3000/forgot-password'
                    ];
                    SendEmail::dispatch($dataSendMail, $request->email)->delay(now());
                    return Response()->json(array("Successfully. Please check code your email!"=> 1,"email"=>$user->email, 'code'=>$code ));    
                }else{
                    $postArrayRes = [
                        'email'     => $request->email,
                        'code'  => $code,
                        'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
                        'updated_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
                    ];
                     $user = ForgotCode::create($postArrayRes);
                    // Mail send code for account forgot password
                     $dataSendMail = [
                        'description'=>'getCodeForgot',
                        'title' => ' Confirm change password',
                        'note'=>'Note: The code has a distinction between uppercase and lowercase characters.',
                        'content'=>'TO Confirm change password, Please enter using the code below ',
                        'code'=>$code,
                        'link'=>'http://localhost:3000/forgot-password'
                    ];
                    SendEmail::dispatch($dataSendMail, $request->email)->delay(now());
                   return Response()->json(array("Successfully. Please check code your email!"=> 1,"data"=>$request->email, 'code'=>$code ));
                }
        }else{
            return response()->json([
                'error' => 'blocked',
            ], 401);
        }
        }
        return response()->json([
            'error' => 'No email',
        ], 401);
    }      
    
     /**
     * @SWG\POST(
     *     path="api/users/changePasswordForgot/",
     *     description="Return a user's information",
     *     @SWG\Parameter(
     *         name="code",
     *         in="query",
     *         type="string",
     *         description="Your code",
     *         required=true,
     *     ),
     *   @SWG\Parameter(
     *         name="new_password",
     *         in="query",
     *         type="string",
     *         description="Your new password(length=8)",
     *         required=true,
     *     ),
     *  @SWG\Parameter(
     *         name="new_password_confirmed",
     *         in="query",
     *         type="string",
     *         description="Your new password confirmed(length=8)",
     *         required=true,
     *     ),
     *     @SWG\Response(
     *         response=200,
     *         description="User successfully changed password",
     *         @SWG\Schema(
     *             @SWG\Property(property="user", type="integer"),
     *            )
     *     ),
     *     @SWG\Response(
     *         response=422,
     *         description="Missing Data"
     *     )
     * )
     */
    public function changePasswordForgot(Request $request) {
        $validator = Validator::make($request->all(), [
            'code' => 'required|string|min:6',
            'new_password' => 'required|string|min:8',
            'new_password_confirmed' => 'required|string|same:new_password|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);     
        }

        $data = DB::table('forgot_code')->where('code', $request->code)->first();
        if($data){
            $userEmail = $data->email;
            $userFind = DB::table('users')->where('email', $userEmail)->first();

            $user = User::where('id',$userFind->id)->update(
                        ['password' => bcrypt($request->new_password)]
                    );
    
            DB::delete('delete from forgot_code where id = ?',[$data->id]);
            // Mail notification for change password success for account forgot
            $dataSendMail = [
                'description'=>'notiChangePasswordSuccess',
                'title' => ' Confirm change password',
                'content'=>'Password was changed'
            ];
            SendEmail::dispatch($dataSendMail, $data->email)->delay(now());
            return response()->json([
                'message' => 'User successfully changed password',
                'user' => $user
            ], 201);
        }else{
            return response()->json(['error'=>"No one have code"], 422);
        }
    }       
   
   
}