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
use Google\Client;
use App\Models\Document;
use App\Models\DocumentFolder;
use App\Models\UserScore;


class SocialController extends Controller
{



    public function __construct() {
        $this->middleware('auth:api', ['except' => ['callback','redirect','createUser','googleDriveCallBack','getGoogleDrive','uploadGoogleDrive']]);
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
              return redirect()->to('http://localhost:3000/login?access_token='.$user['access_token'].'&avatar='.$user['avatar'].'&first_name='.$user['first_name'].'&last_name='.$user['last_name'].'&avatar_google='.$user['avatar_google'].'&id='.$user['id'].'&role='.$user['role'].'&email='.$user['email']);

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
    $scoreFind= DB::table('score_setup')->get();
    if(count($scoreFind)>0){
        $scoreSetup=$scoreFind[0]->score;
    }else{
        $scoreSetup=500;
    }
    $postScore = [
        'user_id'  =>$account->id,
        'score'  => $scoreSetup,
        'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
        'updated_at'=>Carbon::now('Asia/Ho_Chi_Minh'),
    ];   
    $score=UserScore::create($postScore);
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
    if (auth()->user()->status=="block") {
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
        'role'=>0,
        'id'=>$account->id
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
  if (auth()->user()->status=="block") {
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
      'role'=>auth()->user()->role,
      'id'=>auth()->user()->id
  ];
}
}
public function checkGoogleDocument(){
    $client = new Client();
    $client->setClientId('829518173901-g56megrbtrgras8gnjvmhor2cmu7f2oe.apps.googleusercontent.com');
    $client->setClientSecret('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');
    $client->setRedirectUri('http://localhost:8000/api/google-drive/callback');
    $client->setScopes([
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/drive.appdata',
        'https://www.googleapis.com/auth/drive.metadata',
        'https://www.googleapis.com/auth/drive.metadata.readonly',
        'https://www.googleapis.com/auth/drive.photos.readonly',
        'https://www.googleapis.com/auth/drive.scripts'
    ]);
    $url = $client->createAuthUrl();
    return Response()->json(array("successfully"=> 1,"data"=>$url));
}
public function googleDriveCallBack(){
    $client = new Client();
    $client->setClientId('829518173901-g56megrbtrgras8gnjvmhor2cmu7f2oe.apps.googleusercontent.com');
    $client->setClientSecret('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');
    $client->setRedirectUri('http://localhost:8000/api/google-drive/callback');
    $code = request('code');
    $access_token = $client->fetchAccessTokenWithAuthCode($code);
    return redirect()->to('http://localhost:3000/home/documents/check?access_token_drive='.$access_token['access_token']);
}
public function getGoogleDrive($access_token_google_drive){
    $client = new Client();
    $client->setAccessToken($access_token_google_drive);
    $service = new \Google_Service_Drive($client);
    $optParams = array(
            'pageSize' => 100,
            'fields' => 'nextPageToken, files(id, name)'
    );
    $results = $service->files->listFiles($optParams);
    return Response()->json(array("successfully"=> 1,"data"=>$results));
}
public function uploadGoogleDrive($access_token_google_drive,$id,$folder_id){
    $client = new Client();
    $client->setAccessToken($access_token_google_drive);
    $service = new \Google_Service_Drive($client);
    $export = $service->files->export($id, array('mimeType' => "application/pdf","encoding"=> null));
    $file=$service->files->get($id);
    $postArray = [
        'name'  => $file->name,
        'size'=>$file->size,
        'name_show'=> $file->name,
        'folder_id'=>$folder_id,
        'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
        'updated_at'=> Carbon::now('Asia/Ho_Chi_Minh')
    ];
    $document = Document::create($postArray);
    $folderUpdate= DocumentFolder::find($folder_id);
    $folderUpdate->sum=$folderUpdate->sum+1;
    $folderUpdate->save();
    return redirect()->to('http://localhost:3000/home/documents/view/'.$folder_id);
    //return response($export->getBody(), 200, $export->getHeaders());
}
}
