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



class EmployeeController extends Controller
{
     /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['createAccount']]);
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
            'send_mail'=>'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 401);     
        }
        $checkLogin = auth()->user();
        if($checkLogin->role==1){
        $postAccount = [
            'email'  => $request->email,
            'role'  => 0,
            'status'=>"active",
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
        $employee = Employee::create($postEmployee);
        if($request->send_mail==1){
///////////////////
        }else{
//////////////////
        }
        return response()->json([
            'message' => 'Create employee successfully',
            'user' => $employeeFind
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
     *     path="/api/employee/createAccount/",
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
        $account->password = Hash::make($request->password);
        $account->save();
        return response()->json([
            'message' => 'Create account successfully',
            'user' => $account
            ], 201);
       }else{
        return response()->json([
            'error'=>1,
            'description'=>'No one account',
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
     *     )
     * )
     */
    public function getOneEmployee($id){
        $employeeFind = DB::table('employee')->where('id', $request->id)->first();
        $addressFind = DB::table('address')->where('employee_id', $request->id)->first();
        $result=[$employeeFind,$addressFind];
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
     *     )
     * )
     */
    public function getAllEmployee(){
        $employeeFind = DB::table('employee')->get();
        $addressFind = DB::table('address')->get();
        $result=[$employeeFind,$addressFind];
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

}