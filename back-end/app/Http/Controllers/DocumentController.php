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
use App\Models\Notify;


use App\Models\Document;
use App\Models\DocumentFolder;

class DocumentController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['downloadDocument']]);
    }
    /**
     * @SWG\POST(
     *     path="/api/document/createDocument",
     *     description="Return document's informaion.",
     *      @SWG\Parameter(
     *         name="name",
     *         in="query",
     *         type="file",
     *         description="Document's name",
     *         required=true,
     *     ),
     *      @SWG\Parameter(
     *         name="size",
     *         in="query",
     *         type="text",
     *         description="Document's size",
     *         required=true,
     *     ),
     *      @SWG\Parameter(
     *         name="folder_id",
     *         in="query",
     *         type="integer",
     *         description="Document's folder",
     *         required=true,
     *     ),
     *     @SWG\Response(
     *         response=200,
     *         description="Create folder successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="name", type="string"),
     *             @SWG\Property(property="size", type="text"),
     *             @SWG\Property(property="folder_id", type="integer"),
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
     *    @SWG\Response(
     *         response=401,
     *         description="Invalid folder!!!"
     *     ),
     *     security={
     *           {"api_key_security_example": {}}
     *      }
     * )
     */
    public function createDocument(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'unique:document',
            'folder_id' => 'integer',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 400);     
        }
        $userFind = auth()->user();
        if($userFind->role==1){
        $folder=DB::table('document_folder')->where('id',$request->folder_id)->first();
        if($folder){
            if ($request->hasFile('name'))
            {
                $destinationPath = public_path().DIRECTORY_SEPARATOR.'upload'.DIRECTORY_SEPARATOR.'document';
                if (!file_exists($destinationPath)) {
                    File::makeDirectory($destinationPath, 0775, true);
                }       
                $file = $request->file('name');
                $date = now('Asia/Ho_Chi_Minh');
                $date = $date->format('d-m-Y-H-i-s');
                $extension = $file->extension();
                $newFileName = Str::slug($request->name, '_').'_'.$date.'.'.$extension;
                $file->move(public_path().DIRECTORY_SEPARATOR.'upload'.DIRECTORY_SEPARATOR.'document', $newFileName);
                $linkFile = $request->getSchemeAndHttpHost().'/'.'upload'.'/'.'document'.'/'.$newFileName;
                $postArray = [
                    'name'  => $newFileName,
                    'size'=>$request->size,
                    'name_show'=>$request->name_show,
                    'folder_id'=>$request->folder_id,
                    'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
                    'updated_at'=> Carbon::now('Asia/Ho_Chi_Minh')
                ];
                $document = Document::create($postArray);
                $folderUpdate= DocumentFolder::find($request->folder_id);
                $folderUpdate->sum=$folderUpdate->sum+1;
                $folderUpdate->save();
                $employeeFind=DB::table('employee')->get();
        for ($i=0;$i<count($employeeFind);$i++){
            $postNotify = [
                'user_id'=>$employeeFind[$i]->user_id,
                'category'=>2,
                'title'  => "Admin just added document to the documents",
                'content'=>$request->name_show,
                'status'=>1,
                'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
                'updated_at'=> Carbon::now('Asia/Ho_Chi_Minh')
            ];
            $notify = Notify::create($postNotify);
        }
                return Response()->json(array("Create document successfully!"=> 1,"data"=>$document ));
            } 
        }else{
            return response()->json(["error" => "Invalid folder!!!"],401);
       }  
    }else{
        return response()->json(["error" => "You are not admin!!!"],401);
    }
    }
    /**
     * @SWG\POST(
     *     path="/api/document/updateDocument/{id}",
     *     description="Return document folder's informaion.",
     *  @SWG\Parameter(
     *         name="name",
     *         in="query",
     *         type="file",
     *         description="Document's Name",
     *         required=true,
     *     ),
     * @SWG\Parameter(
     *         name="size",
     *         in="query",
     *         type="string",
     *         description="Document's size",
     *         required=true,
     *     ),
     * @SWG\Parameter(
     *         name="folder_id",
     *         in="query",
     *         type="integer",
     *         description="Document's folder",
     *         required=true,
     *     ),
     *     @SWG\Response(
     *         response=200,
     *         description="Update folder successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="id", type="integer"),
     *             @SWG\Property(property="name", type="string"),
     *             @SWG\Property(property="size", type="text"),
     *             @SWG\Property(property="folder_id", type="integer"),
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
public function updateDocument($id,Request $request){
    $validator = Validator::make($request->all(), [
        'name_show' => 'max:255',
    ]);
    if ($validator->fails()) {
        return response()->json(['error'=>$validator->errors()], 400);     
    }
    $checkLogin = auth()->user();
    if($checkLogin->role==1){
        $folder= DocumentFolder::find($request->folder_id);
        if ($folder){
            $document=Document::find($id);
            if($document){
                if ($request->name_show==null){
                    $name_show=$document->name_show;
                }else{
                    $name_show=$request->name_show;
                }
                if ($request->name==null){
                    $name=$document->name;
                }else{
                    if ($request->hasFile('name'))
                    {
                        $destinationPath = public_path().DIRECTORY_SEPARATOR.'upload'.DIRECTORY_SEPARATOR.'document';
                        if (!file_exists($destinationPath)) {
                            File::makeDirectory($destinationPath, 0775, true);
                        }       
                        $file = $request->file('name');
                        $date = now('Asia/Ho_Chi_Minh');
                        $date = $date->format('d-m-Y-H-i-s');
                        $extension = $file->extension();
                        $name = Str::slug($request->name, '_').'_'.$date.'.'.$extension;
                        $file->move(public_path().DIRECTORY_SEPARATOR.'upload'.DIRECTORY_SEPARATOR.'document', $name);
                        $linkFile = $request->getSchemeAndHttpHost().'/'.'upload'.'/'.'document'.'/'.$name;
                    }else{
                        $name=$request->name;
                    }
                } 
                if ($request->size==null){
                    $size=$document->size;
                }else{
                    $size=$request->size;
                }  
                $document->name=$name;   
                $document->name_show=$name_show; 
                $document->size=$size;    
                $document->updated_at=Carbon::now('Asia/Ho_Chi_Minh'); 
                $document->save(); 
                return Response()->json(array("Update document successfully!"=> 1,"data"=>$document));
            }else{
                return response()->json(['error'=>"Invalid id !!!"], 400);
            }
        }else{
            return response()->json(['error'=>"Invalid folder id !!!"], 400);
        }
    }else{
        return response()->json(['error'=>"You are not admin !!!"], 401);
    }
}

    /**
     * @SWG\DELETE(
     *     path="/api/document/destroyDocument/{id}",
     *     description="Return document's information",
     *     @SWG\Response(
     *         response=200,
     *         description="Delete document successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="id", type="integer"),
     *             @SWG\Property(property="name", type="string"),
     *             @SWG\Property(property="size", type="text"),
     *             @SWG\Property(property="folder_id", type="integer"),
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
    public function destroyDocument($id){
        $checkLogin = auth()->user();
        if($checkLogin->role==1){
            $document= Document::find($id);
            if ($document){
               $document->delete();
               $folderDelete= DocumentFolder::find($document->folder_id);
               $folderDelete->sum=$folderDelete->sum-1;
               $folderDelete->save();
               return response()->json([
                   'message'=>"Delete folder successfully",
                   'data'=>$document
               ]);
            }else{
                return response()->json(['error'=>"Invalid id !!!"], 400);
            }
        }else{
            return response()->json(['error'=>"You are not admin !!!"], 401);
        }
    }

      /**
     * @SWG\GET(
     *     path="/api/document/downloadDocument/{id}",
     *     description="Return document's information",
     *     @SWG\Response(
     *         response=200,
     *         description="Download document successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="id", type="integer"),
     *             @SWG\Property(property="name", type="string"),
     *             @SWG\Property(property="size", type="text"),
     *             @SWG\Property(property="folder_id", type="integer"),
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
    public function downloadDocument($id)
    {
            $document= Document::find($id);
            if ($document){
                if($document->size==null){
                    $path = public_path().DIRECTORY_SEPARATOR."upload".DIRECTORY_SEPARATOR."document".DIRECTORY_SEPARATOR."cxampptmpphpec6etmp_14-03-2022-08-05-07.docx";
                    $fileName = "cxampptmpphpec6etmp_14-03-2022-08-05-07.docx";
                    return Response::download($path, $fileName, ['Content-Type: application']);
                }else{
                    $path = public_path().DIRECTORY_SEPARATOR."upload".DIRECTORY_SEPARATOR."document".DIRECTORY_SEPARATOR.$document->name;
                    $fileName = $document->name;
                    return Response::download($path, $fileName, ['Content-Type: application']);
                }
            }else{
                return response()->json(['error'=>"Invalid id !!!"], 400);
            }
    }
}