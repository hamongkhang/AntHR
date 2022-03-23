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
use Illuminate\Support\Facades\File;

use App\Models\Employee;
use App\Models\Company;
use App\Models\User;

class CompanyController extends Controller
{

    public function __construct() {
        $this->middleware('auth:api', ['except' => []]);
    }
    public function getCompany(Request $request)
    {
        $checkLogin = auth()->user();
        if($checkLogin->role==1){
            $company = Company::first();
            if($company){
                return response()->json([
                    'message' => 'Get company successfully',
                    'company'=>$company
                ], 200);
            }
            else{
                return response()->json([
                    'error'=>1,
                    'error'=>'not found'
                ], 404);
            }
        }
        else{
            return response()->json([
                'code'=>1,
                'error'=>'account login is not admin',
            ], 401);
        }
    }
    public function updateCompany($id, Request $request)
    {
        $validator = Validator::make($request->all(), [
            "name"=> "max:255",
            "size"=> "",
            'logo'=>'image|mimes:png,jpeg,jpg,webp',
            "website"=> "",
            "contact_email"=> "",
            "contact_phone"=> "",
            "permission"=> "",
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 400);      
        }
        $checkLogin = auth()->user();
        if($checkLogin->role==1){
            $company = Company::find($id);
            if($company){
                $company -> name = $request->name?$request->name:$company->name;
                $company -> domain = $request->domain?$request->domain:$company->domain;
                $company -> size = $request->size?$request->size:$company->size;
                $company -> website = $request->website?$request->website:$company->website;
                $company -> contact_email = $request->contact_email?$request->contact_email:$company->contact_email;
                $company -> contact_phone = $request->contact_phone?$request->contact_phone:$company->contact_phone;
                $company -> over_view = $request->over_view?$request->over_view:$company->over_view;
                $company -> permission = $request->permission?$request->permission:$company->permission;
                $company -> updated_at = Carbon::now('Asia/Ho_Chi_Minh');
                $company -> save();
                return response()->json([
                    'message' => 'Update company successfully',
                    'company'=>$company
                ], 200);
            }
            else{
                return response()->json([
                    'error'=>1,
                    'error'=>'not found'
                ], 404);
            }
        }
        else{
            return response()->json([
                'code'=>1,
                'error'=>'account login is not admin',
            ], 401);
        }
    }

    public function changeLogo($id, Request $request)
    {
        $validator = Validator::make($request->all(), [
            'logo'=>'image|mimes:png,jpeg,jpg,webp',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 400);      
        }
        $checkLogin = auth()->user();
        if($checkLogin->role==1){
            $company = Company::find($id);
            if($company){
                if($request->hasfile('logo')) {
                    $destinationPath = public_path().DIRECTORY_SEPARATOR.'upload'.DIRECTORY_SEPARATOR.'logo';
                    if($company->logo!=null){
                        File::delete($destinationPath.DIRECTORY_SEPARATOR.$company->logo);
                    }
                    if (!file_exists($destinationPath)) {
                        File::makeDirectory($destinationPath, 0775, true);
                    }       
                    $file = $request->file('logo');
                    $date = now('Asia/Ho_Chi_Minh');
                    $date = $date->format('d-m-Y-H-i-s');
                    $extension = $file->extension();
                    $newImageName = Str::slug('logo_company', '_').'_'.$date.'.'.$extension;
                    $file->move(public_path().DIRECTORY_SEPARATOR.'upload'.DIRECTORY_SEPARATOR.'logo', $newImageName);
                    $linkFile = $request->getSchemeAndHttpHost().'/'.'upload'.'/'.'logo'.'/'.$newImageName;
                    $company->logo = $newImageName;
                    $company -> updated_at = Carbon::now('Asia/Ho_Chi_Minh');
                    $company->save();
                    return response()->json([
                        'message' => 'Change logo success',
                        'data'=>$company
                        ], 200);
                    
                }
                else{
                    return response()->json([
                        'error' => ['logo'=>['No images selected']],
                        ], 400);
                }
            }
            else{
                return response()->json([
                    'error' => 'not found',
                    ], 404);
            }
        }
        else{
            return response()->json([
                'error' => 'Account login not admin',
                ], 401);
        }
    }
}
