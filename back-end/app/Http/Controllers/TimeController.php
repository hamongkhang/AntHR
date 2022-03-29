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
use App\Models\ScoreSetup;
use App\Models\TimeOff;
use App\Models\OverTime;


class TimeController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api', ['except' => []]);
    }


    public function createTimeOffAdmin(Request $request){
        $validator = Validator::make($request->all(), [
            'user_id' => 'required',
            'date_from' => 'required',
            'note' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 400);     
        }
        if($request->date_to){
            $postArray = [
                'user_id'  => $request->user_id,
                'note'  => $request->note,
                'time_from'  => $request->time_from,
                'time_to'  => $request->time_to,
                'date_from'  => $request->date_from,
                'date_to'  => $request->date_to,
                'status'  => 1,
                'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
                'updated_at'=> Carbon::now('Asia/Ho_Chi_Minh')
            ];
            $timeOff = TimeOff::create($postArray);
            return Response()->json(array("Create folder successfully!"=> 1,"data"=>$timeOff ));
        }else{
            $postArray = [
                'user_id'  => $request->user_id,
                'note'  => $request->note,
                'time_from'  => $request->time_from,
                'time_to'  => $request->time_to,
                'date_from'  => $request->date_from,
                'date_to'  => $request->date_to,
                'status'  => 1,
                'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
                'updated_at'=> Carbon::now('Asia/Ho_Chi_Minh')
            ];
            $timeOff = TimeOff::create($postArray);
            return Response()->json(array("Create folder successfully!"=> 1,"data"=>$timeOff ));
        }
    }
}