<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\UsersResource;
use App\Jobs\SendEmail;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

use App\Models\UserScore;
use App\Models\Employee;
use App\Models\User;


class ScoreController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api', ['except' => []]);
    }
    public function getUserPoints(){
        $dataFind = DB::table('user_score')->get();
        $data=[];
        for ($i=0;$i<count($dataFind);$i++){
            $EmployeeFind= DB::table('employee')->where('user_id',$dataFind[$i]->user_id)->first();
            $userFind= DB::table('users')->where('id',$dataFind[$i]->user_id)->first();
            $postData=[
                        'id'=> $dataFind[$i]->id,
                        'first_name'=> $EmployeeFind->first_name,
                        'last_name' => $EmployeeFind->last_name,
                        'email' => $EmployeeFind->email,
                        'role'=>$userFind->role,
                        'user_id' => $EmployeeFind->user_id,
                        'avatar' => $EmployeeFind->avatar,
                        'score' => $dataFind[$i]->score,
                        'score_spent' => $dataFind[$i]->score_spent,
                        'gift' => $dataFind[$i]->gift,
                        'created_at' => $dataFind[$i]->created_at,
                        'updated_at' => $dataFind[$i]->updated_at,
                    ];
            array_push($data,$postData);
        }
        return Response()->json(array("Get present successfully!"=> 1,"data"=>$data ));
    }
     /**
     * @SWG\GET(
     *     path="/api/score/getOneScore/id",
     *     description="Return one new's informaion.",
     *     @SWG\Response(
     *         response=200,
     *         description="Get score successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="id", type="integer"),
     *             @SWG\Property(property="user_id", type="integer"),
     *             @SWG\Property(property="score", type="text"),
     *             @SWG\Property(property="created_at", type="timestamp"),
     *             @SWG\Property(property="updated_at", type="timestamp"),
     *            )
     *     ),
     *     @SWG\Response(
     *         response=400,
     *         description="Invalid id!!!"
     *     ),
     *     security={
     *           {"api_key_security_example": {}}
     *      }
     * )
     */
    public function getOneScore(){ 
        $data=DB::table('user_score')->where('user_id',auth()->user()->id)->first();
        if($data){
            return Response()->json(array("Get score successfully!"=> 1,"data"=>$data));
        }else{
            return response()->json(["error" => "Invalid id!!!"],400);
        }
    }
}