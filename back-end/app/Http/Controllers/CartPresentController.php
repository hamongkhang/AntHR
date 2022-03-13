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
use Illuminate\Support\Facades\Response;


use App\Models\Present;
use App\Models\CartPresent;
use App\Models\UserScore;
use App\Models\User;

class CartPresentController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['downloadDocument']]);
    }

    /**
     * @SWG\DELETE(
     *     path="/api/cart_present/destroyCartPresent/{id}",
     *     description="Return cart present's information",
     *     @SWG\Response(
     *         response=200,
     *         description="Delete cart present successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="id", type="integer"),
     *             @SWG\Property(property="user_id", type="integer"),
     *             @SWG\Property(property="present_id", type="integer"),
     *             @SWG\Property(property="status", type="integer"),
     *             @SWG\Property(property="created_at", type="timestamp"),
     *             @SWG\Property(property="updated_at", type="timestamp"),
     *            )
     *     ),
     *     @SWG\Response(
     *         response=400,
     *         description="Invalid id !!!"
     *     ),
     *   security={
     *           {"api_key_security_example": {}}
     *       }
     * )
     */
    public function destroyCartPresent($id){
        $user = auth()->user();
        $cartPresent= CartPresent::find($id);
        if ($cartPresent){
            $cartPresent->delete();
            return response()->json([
                'message'=>"Delete folder successfully",
                'data'=>$cartPresent
            ]);
        }else{
            return response()->json(['error'=>"Invalid id !!!"], 400);
        }
    }
    /**
     * @SWG\GET(
     *     path="/api/cart_present/changeStatusAdmin/{id}",
     *     description="Return cart present's information",
     *     @SWG\Response(
     *         response=200,
     *         description="Delete cart present successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="id", type="integer"),
     *             @SWG\Property(property="user_id", type="integer"),
     *             @SWG\Property(property="present_id", type="integer"),
     *             @SWG\Property(property="status", type="integer"),
     *             @SWG\Property(property="created_at", type="timestamp"),
     *             @SWG\Property(property="updated_at", type="timestamp"),
     *            )
     *     ),
     *     @SWG\Response(
     *         response=400,
     *         description="Invalid id !!!"
     *     ),
     *   security={
     *           {"api_key_security_example": {}}
     *       }
     * )
     */
    public function changeStatusAdmin($id){
            $checkLogin = auth()->user();
            if($checkLogin->role===1){
                $cartPresent= CartPresent::find($id);
                if ($cartPresent){
                    if($cartPresent->status===1){
                        $cartPresent->status=0;
                        $scoreFind = DB::table('user_score')->where('user_id',$cartPresent->user_id)->first();
                        $present= Present::find($cartPresent->present_id);
                        $scoreSum=UserScore::find($scoreFind->id);
                        $scoreSum->score=$scoreSum->score+$present->score;
                        $scoreSum->save();
                    }else{
                        $cartPresent->status=1;
                        $scoreFind = DB::table('user_score')->where('user_id',$cartPresent->user_id)->first();
                        $present= Present::find($cartPresent->present_id);
                        $scoreSum=UserScore::find($scoreFind->id);
                        $scoreSum->score=$scoreSum->score-$present->score;
                        $scoreSum->save();
                    }                  
                    $cartPresent->updated_at=Carbon::now('Asia/Ho_Chi_Minh'); 
                    $cartPresent->save(); 
                    return Response()->json(array("Update cartPresent successfully!"=> 1,"data"=>$cartPresent));
                }else{
                    return response()->json(['error'=>"Invalid id !!!"], 400);
                }
            }else{
                return response()->json(['error'=>"You are not admin !!!"], 401);
            }
    }

    /**
     * @SWG\GET(
     *     path="/api/cart_present/changeStatusClient/{id}",
     *     description="Return cart present's information",
     *     @SWG\Response(
     *         response=200,
     *         description="Delete cart present successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="id", type="integer"),
     *             @SWG\Property(property="user_id", type="integer"),
     *             @SWG\Property(property="present_id", type="integer"),
     *             @SWG\Property(property="status", type="integer"),
     *             @SWG\Property(property="created_at", type="timestamp"),
     *             @SWG\Property(property="updated_at", type="timestamp"),
     *            )
     *     ),
     *     @SWG\Response(
     *         response=400,
     *         description="Invalid id !!!"
     *     ),
     *   security={
     *           {"api_key_security_example": {}}
     *       }
     * )
     */
    public function changeStatusClient($id){
            $cartPresent= CartPresent::find($id);
            if ($cartPresent){
                $cartPresent->status=2;
                $cartPresent->updated_at=Carbon::now('Asia/Ho_Chi_Minh'); 
                $cartPresent->save(); 
                return Response()->json(array("Update cartPresent successfully!"=> 1,"data"=>$cartPresent));
            }else{
                return response()->json(['error'=>"Invalid id !!!"], 400);
            }
}
    
}