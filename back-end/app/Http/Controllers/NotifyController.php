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

use App\Models\Notify;


class NotifyController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api', ['except' => []]);
    }
   
    public function destroyNotify($id){
            $notify= Notify::find($id);
            if ($notify){
               $notify->delete();
               return response()->json([
                   'message'=>"Delete present category successfully",
                   'data'=>$notify
               ]);
            }else{
                return response()->json(['error'=>"Invalid id !!!"], 400);
            }
    }
    public function getNotify(){
        $data=DB::table('notify')->where('user_id',auth()->user()->id)->get();
        return Response()->json(array("Get notify successfully!"=> 1,"data"=>$data ));
    }

}