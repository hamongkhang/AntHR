<?php

namespace App\Http\Controllers;
use Carbon\Carbon;

use Illuminate\Http\Request;
use Validator,Redirect,Response,File;
use Socialite;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use App\Models\Employee;



class SocialController extends Controller
{



    public function __construct() {
        $this->middleware('auth:api', ['except' => ['callback','redirect','createUser']]);
    }


     public function redirect($provider)
     {
       return response()->json(['link' => Socialite::driver($provider)->stateless()->redirect()->getTargetUrl()]);
     }
     public function callback($provider)
     {   
        $getInfo = Socialite::driver($provider)->stateless()->user();
        $user = $this->createUser($getInfo,$provider);
        if(!$user['error']){
              return redirect()->to('http://localhost:3000/login?access_token='.$user['access_token'].'&avatar='.$user['avatar'].'&first_name='.$user['first_name'].'&last_name='.$user['last_name'].'&avatar_google='.$user['avatar_google']);

       }
       else{
              return redirect()->to('http://localhost:3000/login?error='.$user['error']);
          }
}



function createUser($getInfo,$provider){

 $user = User::where('provider_id', $getInfo->id)->first();
 if($user){
 $result=DB::table('employee')->where('user_id', $user->id)->first();
}
 if (!$user) {
    $postAccount = [
        'email'  => $getInfo->user['email'],
        'role'  => 0,
        'status'=>"active",
        'password'=>Hash::make('password'),
        'provider' => $provider,
        'provider_id' => $getInfo->id,
        'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
        'updated_at'=>Carbon::now('Asia/Ho_Chi_Minh'),
    ];   
    $account = User::create($postAccount);
    $count=DB::table('users')->where('email', $getInfo->email)->count();
    $employee=DB::table('users')->where('email', $getInfo->email)->get();
    $employeeFind = $employee[$count-1];
        $postEmployee = [
            'first_name'  => $getInfo->user['given_name'],
            'last_name'  => $getInfo->user['family_name'],
            'email'  => $getInfo->user['email'],
            'user_id'=>$employeeFind->id,
            'avatar'=>$getInfo->avatar,
            'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
            'updated_at'=>Carbon::now('Asia/Ho_Chi_Minh'),
        ];
    $employee = Employee::create($postEmployee);
    $userLogin=[
        'email'=>$getInfo->user['email'],
        'password'=>'password',
    ];
    if (! $token = auth()->attempt($userLogin)) {
        return ['error' => 'Unauthorized'];
    }
    if (auth()->user()->status==="block") {
        return ['error' => 'Blocked'];
    }
    return [
        'error' =>null,    
        'access_token' => $token,
        'token_type' => 'bearer',
        'expires_in' => auth()->factory()->getTTL() * 60,
        'avatar_google'=> $getInfo->avatar,
        'avatar'=> null,
        'email'    => $getInfo->email,
        'first_name'  => $getInfo->user['given_name'],
        'last_name'  => $getInfo->user['family_name'],
    ];
}
else{
    $userNomal=[
        'email'=>$getInfo->email,
        'password'=>'password',
    ];

  if (! $token = auth()->attempt($userNomal)) {
      return ['error' => 'Unauthorized'];
  }
  if (auth()->user()->status==="block") {
      return ['error' => 'Blocked'];
  }
      return [
      'error' =>null,    
      'access_token' => $token,
      'token_type' => 'bearer',
      'expires_in' => auth()->factory()->getTTL() * 60,
      'avatar_google'=>null,
      'avatar'=>$result->avatar,
      'email'    => $result->email,
      'first_name'  =>  $result->first_name,
      'last_name'  =>  $result->last_name,
  ];
}
}
}
