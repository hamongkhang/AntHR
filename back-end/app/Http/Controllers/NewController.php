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
use Illuminate\Support\Facades\File;


use App\Models\News;
use App\Models\Notify;


class NewController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api', ['except' => []]);
    }
    /**
     * @SWG\POST(
     *     path="/api/new/createNew",
     *     description="Return new's informaion.",
     * @SWG\Parameter(
     *         name="title",
     *         in="query",
     *         type="string",
     *         description="New's Title",
     *         required=true,
     *     ),
     *      @SWG\Parameter(
     *         name="content",
     *         in="query",
     *         type="text",
     *         description="New's Content",
     *         required=true,
     *     ),
     *      @SWG\Parameter(
     *         name="file",
     *         in="query",
     *         type="file",
     *         description="New's File",
     *         required=true,
     *     ),
     *      @SWG\Parameter(
     *         name="important",
     *         in="query",
     *         type="integer",
     *         description="New's important",
     *         required=true,
     *     ),
     *     @SWG\Response(
     *         response=200,
     *         description="Create new successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="title", type="string"),
     *             @SWG\Property(property="content", type="string"),
     *             @SWG\Property(property="file", type="text"),
     *             @SWG\Property(property="important", type="integer"),
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
    public function createNew(Request $request){
        $validator = Validator::make($request->all(), [
            'title' => 'required',
            'content' => 'required',
            'important' => 'required|integer',
            'file'=>''
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 400);     
        }
        $userFind = auth()->user();
        if($userFind->role==1){
            if ($request->hasFile('file'))
            {
                $destinationPath = public_path().DIRECTORY_SEPARATOR.'upload'.DIRECTORY_SEPARATOR.'new';
                if (!file_exists($destinationPath)) {
                    File::makeDirectory($destinationPath, 0775, true);
                }       
                $file = $request->file('file');
                $date = now('Asia/Ho_Chi_Minh');
                $date = $date->format('d-m-Y-H-i-s');
                $extension = $file->extension();
                $name = Str::slug($request->name, '_').'_'.$date.'.'.$extension;
                $file->move(public_path().DIRECTORY_SEPARATOR.'upload'.DIRECTORY_SEPARATOR.'new', $name);
                $linkFile = $request->getSchemeAndHttpHost().'/'.'upload'.'/'.'new'.'/'.$name;
            }else{
                $name=$request->file;
            }
            $postArray = [
            'title'  => $request->title,
            'content'=>$request->content,
            'important'=>$request->important,
            'file'=>$name,
            'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
            'updated_at'=> Carbon::now('Asia/Ho_Chi_Minh')
        ];
        $new = News::create($postArray);
        $employeeFind=DB::table('employee')->get();
        for ($i=0;$i<count($employeeFind);$i++){
            $postNotify = [
                'user_id'=>$employeeFind[$i]->user_id,
                'category'=>1,
                'title'  => "Admin just added new news to the news",
                'content'=>$request->title,
                'status'=>1,
                'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
                'updated_at'=> Carbon::now('Asia/Ho_Chi_Minh')
            ];
            $notify = Notify::create($postNotify);
        }
        return Response()->json(array("Create folder successfully!"=> 1,"data"=>$new ));
    }else{
        return response()->json(["error" => "You are not admin!!!"],401);
    }
    }
    
    /**
     * @SWG\GET(
     *     path="/api/new/getAllNew",
     *     description="Return all news's informaion.",
     *     @SWG\Response(
     *         response=200,
     *         description="Get news successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="id", type="integer"),
     *             @SWG\Property(property="title", type="text"),
     *             @SWG\Property(property="content", type="text"),
     *             @SWG\Property(property="important", type="integer"),
     *             @SWG\Property(property="file", type="text"),
     *             @SWG\Property(property="created_at", type="timestamp"),
     *             @SWG\Property(property="updated_at", type="timestamp"),
     *            )
     *     ),
     *     security={
     *           {"api_key_security_example": {}}
     *      }
     * )
     */
    public function getAllNew(){
        $data=DB::table('news')->get();
        return Response()->json(array("Get folder successfully!"=> 1,"data"=>$data ));
    }
     /**
     * @SWG\GET(
     *     path="/api/new/getOneNew/id",
     *     description="Return one new's informaion.",
     *     @SWG\Response(
     *         response=200,
     *         description="Get new successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="id", type="integer"),
     *             @SWG\Property(property="title", type="text"),
     *             @SWG\Property(property="content", type="text"),
     *             @SWG\Property(property="important", type="integer"),
     *             @SWG\Property(property="file", type="text"),
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
    public function getOneNew($id){ 
        $data=DB::table('news')->where('id',$id)->first();
        if($data){
            return Response()->json(array("Get new successfully!"=> 1,"data"=>$data ));
        }else{
            return response()->json(["error" => "Invalid id!!!"],400);
        }
    }
    /**
     * @SWG\POST(
     *     path="/api/new/updateNew/{id}",
     *     description="Return new's informaion.",
     * @SWG\Parameter(
     *         name="title",
     *         in="query",
     *         type="string",
     *         description="New's Title",
     *         required=true,
     *     ),
     *      * @SWG\Parameter(
     *         name="content",
     *         in="query",
     *         type="text",
     *         description="New's Content",
     *         required=true,
     *     ),
     *      * @SWG\Parameter(
     *         name="file",
     *         in="query",
     *         type="file",
     *         description="New's File",
     *         required=true,
     *     ),
     *      * @SWG\Parameter(
     *         name="important",
     *         in="query",
     *         type="integer",
     *         description="New's important",
     *         required=true,
     *     ),
     *     @SWG\Response(
     *         response=200,
     *         description="Update new successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="id", type="integer"),
     *             @SWG\Property(property="title", type="text"),
     *             @SWG\Property(property="content", type="text"),
     *             @SWG\Property(property="important", type="integer"),
     *             @SWG\Property(property="file", type="text"),
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
public function updateNew($id,Request $request){
    $validator = Validator::make($request->all(), [
        'title' => '',
        'content' => '',
        'file'=>'',
        'important'=>''
    ]);
    if ($validator->fails()) {
        return response()->json(['error'=>$validator->errors()], 400);     
    }
    $checkLogin = auth()->user();
    if($checkLogin->role==1){
        $new= News::find($id);
        if ($new){
            if ($request->title==null){
                $title=$new->title;
            }else{
                $title=$request->title;
            } 
            if ($request->content==null){
                $content=$new->content;
            }else{
                $content=$request->content;
            }
            if ($request->important==null){
                $important=$new->important;
            }else{
                $important=$request->important;
            }
            if ($request->hasFile('file'))
            {
                $destinationPath = public_path().DIRECTORY_SEPARATOR.'upload'.DIRECTORY_SEPARATOR.'new';
                if (!file_exists($destinationPath)) {
                    File::makeDirectory($destinationPath, 0775, true);
                }       
                $file = $request->file('file');
                $date = now('Asia/Ho_Chi_Minh');
                $date = $date->format('d-m-Y-H-i-s');
                $extension = $file->extension();
                $name = Str::slug($request->name, '_').'_'.$date.'.'.$extension;
                $file->move(public_path().DIRECTORY_SEPARATOR.'upload'.DIRECTORY_SEPARATOR.'new', $name);
                $linkFile = $request->getSchemeAndHttpHost().'/'.'upload'.'/'.'new'.'/'.$name;
            }else{
                $name=$new->file;
            }
            $new->content=$content;    
            $new->title=$title;    
            $new->file=$name;  
            $new->important=$important;   
            $new->updated_at=Carbon::now('Asia/Ho_Chi_Minh'); 
            $new->save(); 
            return Response()->json(array("Update folder successfully!"=> 1,"data"=>$new));
        }else{
            return response()->json(['error'=>"Invalid id !!!"], 400);
        }
    }else{
        return response()->json(['error'=>"You are not admin !!!"], 401);
    }
}

    /**
     * @SWG\DELETE(
     *     path="/api/new/destroyNew/{id}",
     *     description="Return new's information",
     *     @SWG\Response(
     *         response=200,
     *         description="Delete new successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="id", type="integer"),
     *             @SWG\Property(property="title", type="text"),
     *             @SWG\Property(property="content", type="text"),
     *             @SWG\Property(property="important", type="integer"),
     *             @SWG\Property(property="file", type="text"),
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
    public function destroyNew($id){
        $checkLogin = auth()->user();
        if($checkLogin->role==1){
            $new= News::find($id);
            if ($new){
               $new->delete();
               return response()->json([
                   'message'=>"Delete new successfully",
                   'data'=>$new
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
     *     path="/api/new/changeImportant/{id}",
     *     description="Return new's informaion.",
     *     @SWG\Response(
     *         response=200,
     *         description="Update new successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="id", type="integer"),
     *             @SWG\Property(property="title", type="text"),
     *             @SWG\Property(property="content", type="text"),
     *             @SWG\Property(property="important", type="integer"),
     *             @SWG\Property(property="file", type="text"),
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
public function changeImportant($id){
    $checkLogin = auth()->user();
    if($checkLogin->role==1){
        $new= News::find($id);
        if ($new){
            if($new->important==1){
                $new->important=0;
            }else{
                $new->important=1;
            }
            $new->updated_at=Carbon::now('Asia/Ho_Chi_Minh'); 
            $new->save(); 
            return Response()->json(array("Update new successfully!"=> 1,"data"=>$new));
        }else{
            return response()->json(['error'=>"Invalid id !!!"], 400);
        }
    }else{
        return response()->json(['error'=>"You are not admin !!!"], 401);
    }
}
      /**
     * @SWG\GET(
     *     path="/api/new/downloadNew/{id}",
     *     description="Return new's information",
     *     @SWG\Response(
     *         response=200,
     *         description="Download document successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="id", type="integer"),
     *             @SWG\Property(property="title", type="text"),
     *             @SWG\Property(property="content", type="text"),
     *             @SWG\Property(property="important", type="integer"),
     *             @SWG\Property(property="file", type="text"),
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
    public function downloadNew($id)
    {
            $new= News::find($id);
            if ($new){
               $path = public_path().DIRECTORY_SEPARATOR."upload".DIRECTORY_SEPARATOR."new".DIRECTORY_SEPARATOR.$new->file;
               $fileName = $new->file;
               return Response::download($path, $fileName, ['Content-Type: application']);
            }else{
                return response()->json(['error'=>"Invalid id !!!"], 400);
            }
    }
}