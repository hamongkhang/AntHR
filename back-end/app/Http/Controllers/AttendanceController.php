<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use App\Models\Notify;


use App\Models\Employee;
use App\Models\Company;
use App\Models\User;
use App\Models\Attendance;

class AttendanceController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api', ['except' => []]);
    }

    public function getAllAttendance () {
        $admin=auth()->user();
        if($admin->role==1){
            $attendances = Attendance::select('user_id')->get();
            foreach($attendances as $a){
                $employee = Employee::where('user_id', $a->user_id)->first();
                $result = $this->getInforAttendance($a->user_id);
                $a->name = $employee->last_name.' '.$employee->first_name;
                $a->avatar = $employee->avatar;
                $a->work_schedule = $result['infor']['work_schedule'];
                $a->logged_time = $result['infor']['logged_time'];
                $a->paid_time = $result['infor']['paid_time'];
                $a->deficit = $result['infor']['deficit'];
            }
            return response()->json([
                'message'=>"Get all attendances successfully",
                'attendances'=>$attendances
            ]);
        }
        else{
            return response()->json([
                'code'=>1,
                'error'=>'account login is not admin',
            ], 401);
        }
    }
    public function getOneAttendance (Request $request) {
        $admin=auth()->user();
        if($admin->role==1){
            $attendances = Attendance::where('user_id', $request->user_id)->get();
            return response()->json([
                'message'=>"Get attendances successfully",
                'attendances'=>$attendances
            ]);
        }
        else{
            return response()->json([
                'code'=>1,
                'error'=>'account login is not admin',
            ], 401);
        }
    }
    public function getMyAttendance () {
        $user=auth()->user();
        if($user){
            $result = $this->getInforAttendance($user->id);
            return response()->json([
                'message'=>"Get attendances successfully",
                'attendances'=>$result['attendances'],
                'infor' => $result['infor']
            ]);
        }
        else{
            return response()->json([
                'code'=>1,
                'error'=>'Please login first',
            ], 401);
        }
    }
    public function getMobileAttendance () {
        $admin=auth()->user();
            $attendances = Attendance::where('user_id', $admin->id)->get();
            return response()->json([
                'message'=>"Get attendances successfully",
                'attendances'=>$attendances
            ]);
    }
    private function getInforAttendance($user_id){
        $attendances = Attendance::where('user_id', $user_id) ->orderByDesc('created_at')->get();
        $infor = [
            'work_schedule'=>0,
            'logged_time'=>0,
            'paid_time'=>0,
            'deficit'=>0
        ];
        foreach($attendances as $a){
            $infor['work_schedule'] = $infor['work_schedule'] + round($a->work_schedule/60);

            $infor['logged_time'] = $infor['logged_time'] + $a->logged_time;
            $hour = floor($a->logged_time/60);
            $minute = $a->logged_time - $hour * 60;
            $hour = $hour == 0?'':$hour.'h ';
            $minute = $minute == 0?'':$minute.'m';
            $logged_time_str = $hour.$minute;
            $a->logged_time = $logged_time_str;

            $infor['paid_time'] = $infor['paid_time'] + $a->paid_time;
            $hour = floor($a->paid_time/60);
            $minute = $a->paid_time - $hour * 60;
            $hour = $hour == 0?'':$hour.'h ';
            $minute = $minute == 0?'':$minute.'m';
            $paid_time_str = $hour.$minute;
            $a->paid_time = $paid_time_str;

            $infor['deficit'] = $infor['deficit'] + $a->deficit;
            $hour = floor($a->deficit/60);
            $deficit_str = $hour.'h';
            $a->deficit = $deficit_str;
        }
        $hour = floor($infor['logged_time']/60);
        $minute = $infor['logged_time'] - $hour * 60;
        $hour = $hour == 0?'':$hour.'h ';
        $minute = $minute == 0?'':$minute.'m';
        $logged_time_str = $hour.$minute;
        $infor['logged_time'] = $logged_time_str;

        $hour = floor($infor['paid_time']/60);
        $minute = $infor['paid_time'] - $hour * 60;
        $hour = $hour == 0?'':$hour.'h ';
        $minute = $minute == 0?'':$minute.'m';
        $paid_time_str = $hour.$minute;
        $infor['paid_time'] = $paid_time_str;

        $hour = floor($infor['deficit']/60);
        $minute = $infor['deficit'] - $hour * 60;
        $hour = $hour == 0?'':$hour.'h ';
        $minute = $minute == 0?'':$minute.'m';
        $deficit_str = $hour.$minute;
        $infor['deficit'] = $deficit_str;
        return array('infor'=>$infor, 'attendances'=> $attendances);
    }
    public function createAttendance ($id) {
        
        $user = User::find($id);
        $attenCheck = Attendance::where('user_id', $id)->where('created_at', '>=', now()->subDay())->first();
        if($user){
                $attendance = new Attendance;
                $attendance -> user_id = $id;
                $attendance -> date = Carbon::now('Asia/Ho_Chi_Minh');
                $attendance -> clock_in = Carbon::now('Asia/Ho_Chi_Minh');
                $attendance -> work_schedule = 60*8;
                $attendance -> logged_time = 0;
                $attendance -> paid_time = 0;
                $attendance -> deficit = 0;
                $attendance -> status = 'pending';
                $attendance -> note = 'nothing';
                $attendance -> created_at = Carbon::now('Asia/Ho_Chi_Minh');
                $attendance -> updated_at = Carbon::now('Asia/Ho_Chi_Minh');
                $attendance->save();
                return Response()->json(array("Create attendance successfully!"=> 1,"data"=>$attendance));
        }
        else{
            return response()->json(["error" => "Invalid user!!!"],401);
        }
    }
    public function createAttendance2 ($id) {
        
        $user = User::find($id);
        $dataCheck = Attendance::where('user_id', $id)->get();
         $first=Attendance::find($dataCheck[count($dataCheck)-1]->id);
        if($user){
                $first -> clock_out = Carbon::now('Asia/Ho_Chi_Minh');
                $first->save();
                return Response()->json(array("Create attendance successfully!"=> 1,"data"=>$first));
        }
        else{
            return response()->json(["error" => "Invalid user!!!"],401);
        }
    }
    public function updateAttendance ($id, Request $req) {
        $attendance = Attendance::find($id);
        if($attendance){
            $clock_in = $attendance->clock_in;
            $schedule = $attendance->work_schedule;
            $logged_time = Carbon::now('Asia/Ho_Chi_Minh')->diffInMinutes($clock_in);
            $paid_time = $logged_time > $schedule ? $schedule : $logged_time;
            $paid_time = $paid_time > 0 ? $paid_time : 0;
            $attendance->clock_out = Carbon::now('Asia/Ho_Chi_Minh');
            $attendance->logged_time = $logged_time;
            $attendance->deficit = $schedule - $logged_time;
            $attendance->paid_time = $paid_time;
            $attendance->status = 'pending';
            $attendance->note = 'This is note';
            $attendance->updated_at = Carbon::now('Asia/Ho_Chi_Minh');
            $attendance->save();
            return Response()->json(array("Create attendance successfully!"=> 1,"data"=>$attendance ));
        }
        else{
            return response()->json(["error" => "Invalid user!!!"],401);
        }
    }
}
