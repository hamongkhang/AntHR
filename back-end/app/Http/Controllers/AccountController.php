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



class AccountController extends Controller
{
      /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct() {
        $this->middleware('auth:api', ['except' => []]);
    }

             /**
     * @SWG\GET(
     *     path="/api/account/blockAccount/{id}",
     *     description="Return a account's information",
     *     @SWG\Response(
     *         response=200,
     *         description="Block or Active account successfully",
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
     *         description="Failed!"
     *     )
     * )
     */
    public function blockAccount($id){
        $admin=auth()->user();
        if($admin->role==1){
            $account=User::find($id);
            if($account){
               if($account->status==='active'){
                     $account->status = 'block';
                     $account->save();
                     return response()->json([
                        'message' => 'Block account successfully',
                        'user' => $account
                        ], 201);
               }else{
                   $account->status='active';
                   $account->save();
                   return response()->json([
                    'message' => 'Active account successfully',
                    'user' => $account
                    ], 201);
               }
            }else{
                return response()->json([
                    'error'=>1,
                    'message'=>"Failed"
                ]);
            }
        }else{
            return response()->json([
                'error'=>1,
                'message'=>"Account login is not admin"
            ]);
        }
    }
}