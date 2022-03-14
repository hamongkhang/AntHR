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


class ScoreController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api', ['except' => []]);
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