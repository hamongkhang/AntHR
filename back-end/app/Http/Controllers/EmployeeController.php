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
use Illuminate\Support\Facades\File;
use App\Exports\ExportEmployee;
use Maatwebsite\Excel\Facades\Excel;
use App\Models\Notify;



use App\Models\Employee;
use App\Models\Company;
use App\Models\User;
use App\Models\UserScore;
use App\Models\Address;
use App\Models\Code;
use App\Models\Role;
use App\Models\Bank;
use App\Models\ScoreSetup;



class EmployeeController extends Controller
{
     /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['exportEmployee','createAccount']]);
    }

         /**
     * @SWG\POST(
     *     path="api/employee/createEmployee/",
     *     description="Return a employee's information",
     *     @SWG\Parameter(
     *         name="first_name",
     *         in="query",
     *         type="string",
     *         description="Fist name",
     *         required=true,
     *     ),
     *  @SWG\Parameter(
     *         name="last_name",
     *         in="query",
     *         type="string",
     *         description="Last name",
     *         required=true,
     *     ),
     *  @SWG\Parameter(
     *         name="email",
     *         in="query",
     *         type="string",
     *         description="Employee's email",
     *         required=true,
     *     ),
     *  @SWG\Parameter(
     *         name="send_mail",
     *         in="query",
     *         type="integer",
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
     *         response=401,
     *         description="Unauthorized!"
     *     )
     *  *  security={
     *           {"api_key_security_example": {}}
     *       }
     * )
     */

    public function createEmployee(Request $request)
     {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email'=>'required|string|email|unique:employee',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);     
        }
        $checkLogin = auth()->user();
        if($checkLogin->role==1){
        $postAccount = [
            'email'  => $request->email,
            'role'  => 0,
            'status'=>"block",
            'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
            'updated_at'=>Carbon::now('Asia/Ho_Chi_Minh'),
        ];   
        $account = User::create($postAccount);
        $employeeFind = DB::table('users')->where('email', $request->email)->first();
        $postEmployee = [
            'first_name'  => $request->first_name,
            'last_name'  => $request->last_name,
            'email'  => $request->email,
            'user_id'=>$employeeFind->id,
            'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
            'updated_at'=>Carbon::now('Asia/Ho_Chi_Minh'),
        ];
        $scoreFind= DB::table('score_setup')->get();
        if(count($scoreFind)>0){
            $scoreSetup=$scoreFind[0]->score;
        }else{
            $scoreSetup=500;
        }
        $postScore = [
            'user_id'  =>$employeeFind->id,
            'score'  => $scoreSetup,
            'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
            'updated_at'=>Carbon::now('Asia/Ho_Chi_Minh'),
        ];   
        $score=UserScore::create($postScore);
        $employee = Employee::create($postEmployee);
        $dataSendMail = [
            'description'=>'createNewEmployee',
            'title' => 'Active your account',
            'content'=>"Please access link below to active your account",
            'link'=>'http://localhost:3000/active_account',
            'logo'=>'http://localhost:8000/upload/logo/logo1.png'
        ];
         SendEmail::dispatch($dataSendMail, $request->email)->delay(now());
        return response()->json([
            'message' => 'Create employee successfully',
            'user' => $employeeFind,
            ], 201);
        }else{
            return response()->json([
                'error'=>1,
                'description'=>'account login is not admin',
            ], 401);
        }
    }

    
         /**
     * @SWG\POST(
     *     path="api/employee/createAccount/",
     *     description="Return a account's information",
     *     @SWG\Parameter(
     *         name="password",
     *         in="query",
     *         type="string",
     *         description="> 8 char ",
     *         required=true,
     *     ),
     *  @SWG\Parameter(
     *         name="confirm_password",
     *         in="query",
     *         type="string",
     *         description="> 8 char and same password",
     *         required=true,
     *     ),
     *  @SWG\Parameter(
     *         name="email",
     *         in="query",
     *         type="string",
     *         description="Account's email",
     *         required=true,
     *     ),
     *  @SWG\Parameter(
     *         name="send_mail",
     *         in="query",
     *         type="integer",
     *         required=true,
     *     ),
     *     @SWG\Response(
     *         response=200,
     *         description="Create account successfully",
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
     *         response=401,
     *         description="No one account!"
     *     )
     * )
     */
    public function createAccount(Request $request)
    {
       $validator = Validator::make($request->all(), [
           'email'=>'required|string|email',
           'password' => 'required|string|min:8',
           'confirm_password' => 'required|string|min:8|same:password',
       ]);
       if ($validator->fails()) {
           return response()->json(['error'=>$validator->errors()], 401);     
       }
       $accountFind = DB::table('users')->where('email', $request->email)->first();
       if($accountFind){
        $account = User::find($accountFind->id);
        $account->status = "active";
        $account->password = Hash::make($request->password);
        $account->save();
        return response()->json([
            'message' => 'Create account successfully',
            'user' => $account
            ], 201);
       }else{
        return response()->json([
            'code'=>1,
            'error'=>'No one account',
        ], 401);
       }
    }

             /**
     * @SWG\GET(
     *     path="/api/employee/getOneEmployee/{id}",
     *     description="Return a employee's information",
     *     @SWG\Response(
     *         response=200,
     *         description="Get employee successfully",
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
     *         response=401,
     *         description="No one!"
     *     ),
     *      *  *  security={
     *           {"api_key_security_example": {}}
     *       }
     * )
     */
    public function getOneEmployee($id){
        $employeeFind = DB::table('employee')->where('user_id', $id)->first();
        $addressFind = DB::table('address')->where('employee_id', $employeeFind->id)->first();
        $bankFind = DB::table('bank')->where('employee_id',  $employeeFind->id)->first();
        $roleFind = DB::table('role')->where('employee_id', $employeeFind->id)->first();
        $codeFind = DB::table('code')->where('employee_id',  $employeeFind->id)->first();
        $result=[$employeeFind,$addressFind,$bankFind,$codeFind,$roleFind];
        if($employeeFind){
            return response()->json([
            'message' => 'Get employee successfully',
            'user' => $result
            ], 201);
        }else{
            return response()->json([
                'error'=>1,
                'description'=>'No one',
            ], 401);
        }
    }
             /**
     * @SWG\GET(
     *     path="/api/employee/getAllEmployee/",
     *     description="Return a employee's information",
     *     @SWG\Response(
     *         response=200,
     *         description="Get employee successfully",
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
     *         response=401,
     *         description="No one!"
     *     ),
     *      *  *  security={
     *           {"api_key_security_example": {}}
     *       }
     * )
     */
    public function getAllEmployee(){
        $userFind=DB::table('users')->get();
        $employeeFind=DB::table('employee')->get();
        $result=[$userFind,$employeeFind];
        if($employeeFind){
            return response()->json([
            'message' => 'Get employee successfully',
            'data' => $result
            ], 201);
        }else{
            return response()->json([
                'error'=>1,
                'description'=>'No one',
            ], 401);
        }
    }

                 /**
     * @SWG\DELETE(
     *     path="/api/employee/destroyEmployee/{id}",
     *     description="Return a employee's information",
     *     @SWG\Response(
     *         response=200,
     *         description="Delete employee successfully",
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
     *         response=401,
     *         description="Delete failed!"
     *     ),
     *      *  *  security={
     *           {"api_key_security_example": {}}
     *       }
     * )
     */
    public function destroyEmployee($id){
        $checkLogin = auth()->user();
        if($checkLogin->role==1){
            $employee= Employee::find($id);
            $user = User::find($employee->user_id);
            if ($employee){
               $employee->delete();
               $user->delete();
               return response()->json([
                   'message'=>"Delete successfully",
                   'data'=>$employee
               ]);
            }else{
               return response()->json([
                   'error'=>1,
                   'description'=>'Delete failed'
               ],401);
            }
        }else{
            return response()->json([
                'code'=>1,
                'error'=>'account login is not admin',
            ], 401);
        }
    }

    
        /**
     * @SWG\POST(
     *     path="/api/employee/changeAvatar/",
     *     description="change avatar employee",
     *     @SWG\Parameter(
     *         name="avatar",
     *         in="query",
     *         type="object",
     *         description="image type",
     *         required=true,
     *     )
     *     @SWG\Response(
     *         response=200,
     *         description="Change avatar success",
     *     ),
     *     @SWG\Response(
     *         response=401,
     *         description="Unauthorized"
     *     ),
     *     @SWG\Response(
     *         response=404,
     *         description="Employee not found"
     *     ),
     *     @SWG\Response(
     *         response=400,
     *         description="No image selected"
     *     )
     * )
     */
public function changeAvatar(Request $request)
{
    $validator = Validator::make($request->all(), [
        'avatar'=>'image|mimes:png,jpeg,jpg,webp',
    ]);
    if ($validator->fails()) {
        return response()->json(['error'=>$validator->errors()], 400);      
    }
    $checkLogin = auth()->user();
    if($checkLogin){
        $employee = Employee::where('user_id',$checkLogin->id)->first();
        if($employee){
            if($request->hasfile('avatar')) {
                $destinationPath = public_path().DIRECTORY_SEPARATOR.'upload'.DIRECTORY_SEPARATOR.'avatar';
                if($employee->avatar!=null){
                    File::delete($destinationPath.DIRECTORY_SEPARATOR.$employee->avatar);
                }
                if (!file_exists($destinationPath)) {
                    File::makeDirectory($destinationPath, 0775, true);
                }       
                $file = $request->file('avatar');
                $date = now('Asia/Ho_Chi_Minh');
                $date = $date->format('d-m-Y-H-i-s');
                $extension = $file->extension();
                $newImageName = Str::slug('avatar', '_').'_'.$date.'.'.$extension;
                $file->move(public_path().DIRECTORY_SEPARATOR.'upload'.DIRECTORY_SEPARATOR.'avatar', $newImageName);
                $linkFile = $request->getSchemeAndHttpHost().'/'.'upload'.'/'.'avatar'.'/'.$newImageName;
                $employee->avatar = $newImageName;
                $employee->save();
                return response()->json([
                    'message' => 'Change avatar success',
                    'data'=>$employee
                    ], 200);
                
            }
            else{
                return response()->json([
                    'error' => ['avatar'=>['No images selected']],
                    ], 400);
            }
        }
        else{
            return response()->json([
                'error' => 'employee not found',
                ], 404);
        }
    }
    else{
        return response()->json([
            'error' => 'Unauthorized',
            ], 401);
    }
}
   /**
     * @SWG\POST(
     *     path="/api/employee/changeInformation/",
     *     description="change information employee",
     *     @SWG\Parameter(
     *         name="first_name",
     *         in="query",
     *         type="string",
     *         description="employee first name",
     *         required=false,
     *     ),
     *     @SWG\Parameter(
     *         name="last_name",
     *         in="query",
     *         type="string",
     *         description="employee last name",
     *         required=false,
     *     ),
     *     @SWG\Parameter(
     *         name="phone",
     *         in="query",
     *         type="string",
     *         description="employee phone number",
     *         required=false,
     *     ),
     *     @SWG\Parameter(
     *         name="birthday",
     *         in="query",
     *         type="string",
     *         description="employee birthday",
     *         required=false,
     *     ),
     *     @SWG\Parameter(
     *         name="postal_code",
     *         in="query",
     *         type="string",
     *         description="employee postal code",
     *         required=false,
     *     ),
     *     @SWG\Parameter(
     *         name="city",
     *         in="query",
     *         type="string",
     *         description="employee city",
     *         required=false,
     *     ),
     *     @SWG\Parameter(
     *         name="country",
     *         in="query",
     *         type="string",
     *         description="employee country",
     *         required=false,
     *     ),
     *     @SWG\Parameter(
     *         name="state",
     *         in="query",
     *         type="string",
     *         description="employee state",
     *         required=false,
     *     ),
     *     @SWG\Parameter(
     *         name="name_in_bank",
     *         in="query",
     *         type="string",
     *         description="employee name in bank",
     *         required=false,
     *     ),
     *     @SWG\Parameter(
     *         name="user_name",
     *         in="query",
     *         type="string",
     *         description="employee user name in bank",
     *         required=false,
     *     ),
     *     @SWG\Parameter(
     *         name="user_number",
     *         in="query",
     *         type="string",
     *         description="employee bank number",
     *         required=false,
     *     ),
     *     @SWG\Response(
     *         response=200,
     *         description="Change information success",
     *     ),
     *     @SWG\Response(
     *         response=401,
     *         description="Unauthorized"
     *     ),
     *     @SWG\Response(
     *         response=404,
     *         description="Employee not found"
     *     ),
     *     @SWG\Response(
     *         response=400,
     *         description="validation's errors"
     *     )
     *      *      *  *  security={
     *           {"api_key_security_example": {}}
     *       }
     * )
     */
public function changeInformation(Request $request){
    $validator = Validator::make($request->all(), [
        'first_name' => 'max:255',
        'last_name' => 'max:255',
        'phone' => 'max:11|min:9',
        'birthday' => 'before:today',

        'postal_code' => 'max:255',
        'city' => 'max:255',
        'country' => 'max:255',
        'state' => 'max:255',

        'name_in_bank' => 'max:255',
        'user_name' => 'max:255',
        'user_number' => 'max:255',
    ]);
    if ($validator->fails()) {
        return response()->json(['error'=>$validator->errors()], 400);      
    }
    $onLogin = auth()->user();
    if($onLogin){
        // update information in employee table
        $employee = Employee::where('user_id',$onLogin->id)->first();
        if($employee){
            $employee->first_name =$request->first_name != null? $request->first_name:$employee->first_name;
            $employee->last_name = $request->last_name != null? $request->last_name:$employee->last_name;
            $employee->phone = $request->phone != null? $request->phone:$employee->phone;
            $employee->birthday = $request->birthday != null?$request->birthday:$employee->birthday;
            $employee->gender = $request->gender != null? $request->gender:$employee->gender;
            $employee->updated_at = Carbon::now('Asia/Ho_Chi_Minh');
            $employee->save();
            // update information in address table
            $address = DB::table('address')->where('employee_id', $employee->id)->first();
            if($address){
                $address = DB::table('address')
                ->where('employee_id',$employee->id)
                ->update(
                    [
                        'postal_code' => $request->postal_code!=null?$request->postal_code:$address->postal_code,
                        'city' => $request->city!=null?$request->city:$address->city,
                        'country' => $request->country!=null?$request->country:$address->country,
                        'state' => $request->state!=null?$request->state:$address->state,
                        'updated_at' => Carbon::now('Asia/Ho_Chi_Minh'),
                    ]
                    );
            }
            else{
                $address = DB::table('address')->insert(
                    [
                        'employee_id' => $employee->id,
                        'postal_code' => $request->postal_code,
                        'city' => $request->city,
                        'country' => $request->country,
                        'state' => $request->state,
                        'created_at' => Carbon::now('Asia/Ho_Chi_Minh'),
                        'updated_at' => Carbon::now('Asia/Ho_Chi_Minh'),
                    ]
                    );
            }
            // update information in bank table
            $bank = DB::table('bank')->where('employee_id', $employee->id)->first();
            if($bank){
                $bank = DB::table('bank')
                ->where('employee_id',$employee->id)
                ->update(
                    [
                        'name' => $request->name_in_bank!=null?$request->name_in_bank:$bank->name,
                        'user_name' => $request->user_name!=null?$request->user_name:$bank->user_name,
                        'user_number' => $request->user_number!=null?$request->user_number:$bank->user_number,
                        'updated_at' => Carbon::now('Asia/Ho_Chi_Minh'),
                    ]
                    );
            }
            else{
                $bank = DB::table('bank')->insert(
                    [
                        'employee_id' => $employee->id,
                        'name' => $request->name_in_bank,
                        'user_name' => $request->user_name,
                        'user_number' => $request->user_number,
                        'created_at' => Carbon::now('Asia/Ho_Chi_Minh'),
                        'updated_at' => Carbon::now('Asia/Ho_Chi_Minh'),
                    ]
                    );
            }
            return response()->json([
                'message' => 'Change your information success',
                ], 200);
        }
        else{
            return response()->json([
                'error' => 'employee not found',
                ], 404);
        }
        
    }
    else{
        return response()->json([
            'error' => 'Unauthorized',
            ], 401);
    }
}
public function exportEmployee(){
    return Excel::download(new ExportEmployee, 'employee.xlsx');
}

}
