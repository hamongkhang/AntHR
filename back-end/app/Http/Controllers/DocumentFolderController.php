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

use App\Models\Document;
use App\Models\DocumentFolder;

class DocumentFolderController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api', ['except' => []]);
    }
    /**
     * @SWG\POST(
     *     path="/api/document/createFolder",
     *     description="Return document folder's informaion.",
     * @SWG\Parameter(
     *         name="name",
     *         in="query",
     *         type="string",
     *         description="Document folder's name",
     *         required=true,
     *     ),
     *      * @SWG\Parameter(
     *         name="description",
     *         in="query",
     *         type="text",
     *         description="Document folder's description",
     *         required=true,
     *     ),
     *      * @SWG\Parameter(
     *         name="share",
     *         in="query",
     *         type="integer",
     *         description="Document folder's share",
     *         required=true,
     *     ),
     *     @SWG\Response(
     *         response=200,
     *         description="Create folder successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="name", type="string"),
     *             @SWG\Property(property="description", type="string"),
     *             @SWG\Property(property="share", type="integer"),
     *             @SWG\Property(property="sum", type="integer"),
     *             @SWG\Property(property="author", type="string"),
     *             @SWG\Property(property="created_at", type="timestamp"),
     *             @SWG\Property(property="updated_at", type="timestamp"),
     *            )
     *     ),
     *     @SWG\Response(
     *         response=400,
     *         description="Error"
     *     ),
     *    @SWG\Response(
     *         response=401,
     *         description="You are not admin!!!"
     *     ),
     *     security={
     *           {"api_key_security_example": {}}
     *      }
     * )
     */
    public function createFolder(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:255|unique:document_folder',
            'description' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 400);     
        }
        $userFind = auth()->user();
        $employeeFind=DB::table('employee')->where('user_id',$userFind->id)->first();
        if($userFind->role==1){
        $author=$employeeFind->last_name.' '.$employeeFind->first_name;    
        $postArray = [
            'name'  => $request->name,
            'description'=>$request->description,
            'share'=>1,
            'sum'=>0,
            'author'=>$author,
            'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
            'updated_at'=> Carbon::now('Asia/Ho_Chi_Minh')
        ];
        $folder = DocumentFolder::create($postArray);
        $employeeFind=DB::table('employee')->get();
        for ($i=0;$i<count($employeeFind);$i++){
            $postNotify = [
                'user_id'=>$employeeFind[$i]->user_id,
                'category'=>2,
                'title'  => "Admin just added document folder to the document",
                'content'=>$request->name,
                'status'=>1,
                'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
                'updated_at'=> Carbon::now('Asia/Ho_Chi_Minh')
            ];
            $notify = Notify::create($postNotify);
        }
        return Response()->json(array("Create folder successfully!"=> 1,"data"=>$postArray ));
    }else{
        return response()->json(["error" => "You are not admin!!!"],401);
    }
    }
    /**
     * @SWG\GET(
     *     path="/api/document/getAllFolder",
     *     description="Return all document folder's informaion.",
     *     @SWG\Response(
     *         response=200,
     *         description="Get folder successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="id", type="integer"),
     *             @SWG\Property(property="name", type="string"),
     *             @SWG\Property(property="description", type="string"),
     *             @SWG\Property(property="share", type="integer"),
     *             @SWG\Property(property="sum", type="integer"),
     *             @SWG\Property(property="author", type="string"),
     *             @SWG\Property(property="created_at", type="timestamp"),
     *             @SWG\Property(property="updated_at", type="timestamp"),
     *            )
     *     ),
     *     security={
     *           {"api_key_security_example": {}}
     *      }
     * )
     */
    public function getAllFolder(){
        $userFind = auth()->user();
        if($userFind->role==1){
            $data=DB::table('document_folder')->get();
        }else{
            $data = DB::table('document_folder')->where('share',1)->get();
        } 
        return Response()->json(array("Get folder successfully!"=> 1,"data"=>$data ));
    }
     /**
     * @SWG\GET(
     *     path="/api/document/getOneFolder/id",
     *     description="Return one document folder's informaion.",
     *     @SWG\Response(
     *         response=200,
     *         description="Get folder successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="id", type="integer"),
     *             @SWG\Property(property="size", type="integer"),
     *             @SWG\Property(property="name", type="string"),
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
    public function getOneFolder($id){ 
        $find=DB::table('document_folder')->where('id',$id)->first();
        if($find){
            $data=DB::table('document')->where('folder_id',$id)->get();
            return Response()->json(array("Get folder successfully!"=> 1,"data"=>$data ));
        }else{
            return response()->json(["error" => "Invalid id!!!"],400);
        }
    }
    /**
     * @SWG\POST(
     *     path="/api/document/updateFolder/{id}",
     *     description="Return document folder's informaion.",
     *  @SWG\Parameter(
     *         name="name",
     *         in="query",
     *         type="string",
     *         description="Document folder's Name",
     *         required=true,
     *     ),
     * @SWG\Parameter(
     *         name="description",
     *         in="query",
     *         type="string",
     *         description="Document folder's description",
     *         required=true,
     *     ),
     *     @SWG\Response(
     *         response=200,
     *         description="Update folder successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="id", type="integer"),
     *             @SWG\Property(property="name", type="string"),
     *             @SWG\Property(property="description", type="string"),
     *             @SWG\Property(property="share", type="integer"),
     *             @SWG\Property(property="sum", type="integer"),
     *             @SWG\Property(property="author", type="string"),
     *             @SWG\Property(property="created_at", type="timestamp"),
     *             @SWG\Property(property="updated_at", type="timestamp"),
     *            )
     *     ),
     *     @SWG\Response(
     *         response=400,
     *         description="Invalid id !!!"
     *     ),
     *   @SWG\Response(
     *         response=401,
     *         description="You are not admin !!!"
     *     ),
     * security={
     *           {"api_key_security_example": {}}
     *       }
     * )
     */
public function updateFolder($id,Request $request){
    $validator = Validator::make($request->all(), [
        'name' => 'max:255',
        'description' => '',
    ]);
    if ($validator->fails()) {
        return response()->json(['error'=>$validator->errors()], 400);     
    }
    $checkLogin = auth()->user();
    if($checkLogin->role==1){
        $folder= DocumentFolder::find($id);
        if ($folder){
            if ($request->name==null){
                $name=$folder->name;
            }else{
                $name=$request->name;
            } 
            if ($request->description==null){
                $description=$folder->description;
            }else{
                $description=$request->description;
            }  
            $folder->name=$name;    
            $folder->description=$description;    
            $folder->updated_at=Carbon::now('Asia/Ho_Chi_Minh'); 
            $folder->save(); 
            return Response()->json(array("Update folder successfully!"=> 1,"data"=>$folder));
        }else{
            return response()->json(['error'=>"Invalid id !!!"], 400);
        }
    }else{
        return response()->json(['error'=>"You are not admin !!!"], 401);
    }
}

    /**
     * @SWG\DELETE(
     *     path="/api/document/destroyFolder/{id}",
     *     description="Return document folder's information",
     *     @SWG\Response(
     *         response=200,
     *         description="Delete folder successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="id", type="integer"),
     *             @SWG\Property(property="name", type="string"),
     *             @SWG\Property(property="description", type="string"),
     *             @SWG\Property(property="share", type="integer"),
     *             @SWG\Property(property="sum", type="integer"),
     *             @SWG\Property(property="author", type="string"),
     *             @SWG\Property(property="created_at", type="timestamp"),
     *             @SWG\Property(property="updated_at", type="timestamp"),
     *            )
     *     ),
     *     @SWG\Response(
     *         response=400,
     *         description="Invalid id !!!"
     *     ),
     *   @SWG\Response(
     *         response=401,
     *         description="You are not admin !!!"
     *     ),
     *   security={
     *           {"api_key_security_example": {}}
     *       }
     * )
     */
    public function destroyFolder($id){
        $checkLogin = auth()->user();
        if($checkLogin->role==1){
            $folder= DocumentFolder::find($id);
            if ($folder){
               $folder->delete();
               return response()->json([
                   'message'=>"Delete folder successfully",
                   'data'=>$folder
               ]);
            }else{
                return response()->json(['error'=>"Invalid id !!!"], 400);
            }
        }else{
            return response()->json(['error'=>"You are not admin !!!"], 401);
        }
    }

     /**
     * @SWG\POST(
     *     path="/api/document/changeShare/{id}",
     *     description="Return document folder's informaion.",
     *     @SWG\Response(
     *         response=200,
     *         description="Update folder successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="id", type="integer"),
     *             @SWG\Property(property="name", type="string"),
     *             @SWG\Property(property="description", type="string"),
     *             @SWG\Property(property="share", type="integer"),
     *             @SWG\Property(property="sum", type="integer"),
     *             @SWG\Property(property="author", type="string"),
     *             @SWG\Property(property="created_at", type="timestamp"),
     *             @SWG\Property(property="updated_at", type="timestamp"),
     *            )
     *     ),
     *     @SWG\Response(
     *         response=400,
     *         description="Invalid id !!!"
     *     ),
     *   @SWG\Response(
     *         response=401,
     *         description="You are not admin !!!"
     *     ),
     * security={
     *           {"api_key_security_example": {}}
     *       }
     * )
     */
public function changeShare($id){
    $checkLogin = auth()->user();
    if($checkLogin->role==1){
        $folder= DocumentFolder::find($id);
        if ($folder){
            if($folder->share==1){
                $folder->share=0;
            }else{
                $folder->share=1;
            }
            $folder->updated_at=Carbon::now('Asia/Ho_Chi_Minh'); 
            $folder->save(); 
            return Response()->json(array("Update folder successfully!"=> 1,"data"=>$folder));
        }else{
            return response()->json(['error'=>"Invalid id !!!"], 400);
        }
    }else{
        return response()->json(['error'=>"You are not admin !!!"], 401);
    }
}
}