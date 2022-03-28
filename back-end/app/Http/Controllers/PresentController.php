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
use App\Models\Notify;

use App\Models\Present;
use App\Models\CartPresent;
use App\Models\UserScore;
use App\Models\PresentCategory;


class PresentController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api', ['except' => []]);
    }
    /**
     * @SWG\POST(
     *     path="/api/present/createPresent",
     *     description="Return present's informaion.",
     * @SWG\Parameter(
     *         name="category_id",
     *         in="query",
     *         type="integer",
     *         description="Present category's id",
     *         required=true,
     *     ),
     *      @SWG\Parameter(
     *         name="name",
     *         in="query",
     *         type="text",
     *         description="Present's Name",
     *         required=true,
     *     ),
     *      @SWG\Parameter(
     *         name="image",
     *         in="query",
     *         type="file",
     *         description="Present's Image",
     *         required=true,
     *     ),
     *      @SWG\Parameter(
     *         name="price",
     *         in="query",
     *         type="text",
     *         description="Present's Price",
     *         required=true,
     *     ),
     *      @SWG\Parameter(
     *         name="score",
     *         in="query",
     *         type="text",
     *         description="Present's Score",
     *         required=true,
     *     ),
     *      @SWG\Parameter(
     *         name="description",
     *         in="query",
     *         type="text",
     *         description="Present's Description",
     *         required=true,
     *     ),
     *     @SWG\Response(
     *         response=200,
     *         description="Create present successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="category", type="integer"),
     *             @SWG\Property(property="image", type="text"),
     *             @SWG\Property(property="name", type="text"),
     *             @SWG\Property(property="price", type="text"),
     *             @SWG\Property(property="author", type="integer"),
     *             @SWG\Property(property="description", type="text"),
     *             @SWG\Property(property="score", type="text"),
     *             @SWG\Property(property="status", type="integer"),
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
    public function createPresent(Request $request){
        $validator = Validator::make($request->all(), [
            'category_id' => 'required',
            'name' => 'required',
            'image' => 'required',
            'price'=>'required',
            'description'=>'required',
            'score'=>'required',
       ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 400);     
        }
        $dataFind = DB::table('present_category')->where('id',$request->category_id)->first();
        if(!$dataFind){
            $postCategoryItem1 = [
                'category'  => "Foods",
                'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
                'updated_at'=> Carbon::now('Asia/Ho_Chi_Minh')
            ];
            $postCategoryItem2 = [
                'category'  => "Vouchers",
                'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
                'updated_at'=> Carbon::now('Asia/Ho_Chi_Minh')
            ];
            $postCategoryItem3 = [
                'category'  => "Artifacts",
                'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
                'updated_at'=> Carbon::now('Asia/Ho_Chi_Minh')
            ];
            $categoryItem1 = PresentCategory::create($postCategoryItem1);
            $categoryItem2 = PresentCategory::create($postCategoryItem2);
            $categoryItem3 = PresentCategory::create($postCategoryItem3);
        }       
        $userFind = auth()->user();
        if($userFind->role==1){
            if ($request->hasFile('image'))
            {
                $destinationPath = public_path().DIRECTORY_SEPARATOR.'upload'.DIRECTORY_SEPARATOR.'present'.DIRECTORY_SEPARATOR.'image';
                if (!file_exists($destinationPath)) {
                    File::makeDirectory($destinationPath, 0775, true);
                }       
                $file = $request->file('image');
                $date = now('Asia/Ho_Chi_Minh');
                $date = $date->format('d-m-Y-H-i-s');
                $extension = $file->extension();
                $nameFile = Str::slug($request->name, '_').'_'.$date.'.'.$extension;
                $file->move(public_path().DIRECTORY_SEPARATOR.'upload'.DIRECTORY_SEPARATOR.'present'.DIRECTORY_SEPARATOR.'image', $nameFile);
                $linkFile = $request->getSchemeAndHttpHost().'/'.'upload'.'/'.'present'.'/'.'image'.'/'.$nameFile;
            }
        $postArray = [
            'category_id'  => $request->category_id,
            'name'=>$request->name,
            'price'=>$request->price,
            'image'=>$nameFile,
            'description'=>$request->description,
            'score'=>$request->score,
            'status'=>1,
            'author'=>$userFind->id,
            'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
            'updated_at'=> Carbon::now('Asia/Ho_Chi_Minh')
        ];
        $present = Present::create($postArray);
        $employeeFind=DB::table('employee')->get();
        for ($i=0;$i<count($employeeFind);$i++){
            $postNotify = [
                'user_id'=>$employeeFind[$i]->user_id,
                'category'=>3,
                'title'  => "Admin just added new gift to the gift",
                'content'=>$request->name,
                'status'=>1,
                'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
                'updated_at'=> Carbon::now('Asia/Ho_Chi_Minh')
            ];
            $notify = Notify::create($postNotify);
        }
        return Response()->json(array("Create folder successfully!"=> 1,"data"=>$present ));
    }else{
        return response()->json(["error" => "You are not admin!!!"],401);
    }
    }
    /**
     * @SWG\GET(
     *     path="/api/present/getAllPresent",
     *     description="Return all present's informaion.",
     *     @SWG\Response(
     *         response=200,
     *         description="Get present successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="category", type="integer"),
     *             @SWG\Property(property="image", type="text"),
     *             @SWG\Property(property="name", type="text"),
     *             @SWG\Property(property="price", type="text"),
     *             @SWG\Property(property="author", type="integer"),
     *             @SWG\Property(property="description", type="text"),
     *             @SWG\Property(property="score", type="text"),
     *             @SWG\Property(property="status", type="integer"),
     *             @SWG\Property(property="created_at", type="timestamp"),
     *             @SWG\Property(property="updated_at", type="timestamp"),
     *            )
     *     ),
     *     security={
     *           {"api_key_security_example": {}}
     *      }
     * )
     */
    public function getAllPresent(){
        $userFind = auth()->user();
        if($userFind->role==1){
            $data=DB::table('present')->get();
        }else{
            $data = DB::table('present')->where('status',1)->get();
        } 
        return Response()->json(array("Get present successfully!"=> 1,"data"=>$data ));
    }
     /**
     * @SWG\GET(
     *     path="/api/present/getOnePresent/id",
     *     description="Return one present's informaion.",
     *     @SWG\Response(
     *         response=200,
     *         description="Get present successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="category", type="integer"),
     *             @SWG\Property(property="image", type="text"),
     *             @SWG\Property(property="name", type="text"),
     *             @SWG\Property(property="price", type="text"),
     *             @SWG\Property(property="author", type="integer"),
     *             @SWG\Property(property="description", type="text"),
     *             @SWG\Property(property="score", type="text"),
     *             @SWG\Property(property="status", type="integer"),
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
    public function getOnePresent($id){ 
        $data=DB::table('present')->where('id',$id)->get();
        if($data){
            return Response()->json(array("Get present successfully!"=> 1,"data"=>$data ));
        }else{
            return response()->json(["error" => "Invalid id!!!"],400);
        }
    }
    /**
     * @SWG\POST(
     *     path="/api/present/updatePresent/{id}",
     *     description="Return present's informaion.",
    * @SWG\Parameter(
     *         name="category_id",
     *         in="query",
     *         type="integer",
     *         description="Present category's id",
     *         required=true,
     *     ),
     *      @SWG\Parameter(
     *         name="name",
     *         in="query",
     *         type="text",
     *         description="Present's Name",
     *         required=true,
     *     ),
     *      @SWG\Parameter(
     *         name="image",
     *         in="query",
     *         type="file",
     *         description="Present's Image",
     *         required=true,
     *     ),
     *      @SWG\Parameter(
     *         name="price",
     *         in="query",
     *         type="text",
     *         description="Present's Price",
     *         required=true,
     *     ),
     *      @SWG\Parameter(
     *         name="score",
     *         in="query",
     *         type="text",
     *         description="Present's Score",
     *         required=true,
     *     ),
     *      @SWG\Parameter(
     *         name="description",
     *         in="query",
     *         type="text",
     *         description="Present's Description",
     *         required=true,
     *     ),
     *     @SWG\Response(
     *         response=200,
     *         description="Update present successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="category", type="integer"),
     *             @SWG\Property(property="image", type="text"),
     *             @SWG\Property(property="name", type="text"),
     *             @SWG\Property(property="price", type="text"),
     *             @SWG\Property(property="author", type="integer"),
     *             @SWG\Property(property="description", type="text"),
     *             @SWG\Property(property="score", type="text"),
     *             @SWG\Property(property="status", type="integer"),
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
public function updatePresent($id,Request $request){
    $validator = Validator::make($request->all(), [
        'category_id' => 'integer',
        'name' => '',
        'image' => '',
        'price'=>'',
        'description'=>'',
        'score'=>'',
    ]);
    if ($validator->fails()) {
        return response()->json(['error'=>$validator->errors()], 400);     
    }
    $checkLogin = auth()->user();
    if($checkLogin->role==1){
        $present= Present::find($id);
        if ($present){
            if ($request->category_id==null){
                $category_id=$present->category_id;
            }else{
                $category_id=$request->category_id;
            } 

            if ($request->name==null){
                $name=$present->name;
            }else{
                $name=$request->name;
            }

            if ($request->price==null){
                $price=$present->price;
            }else{
                $price=$request->price;
            }

            if ($request->description==null){
                $description=$present->description;
            }else{
                $description=$request->description;
            }

            if ($request->score==null){
                $score=$present->score;
            }else{
                $score=$request->score;
            }
            if($request->image==null){
                $name=$present->image;
            }
            else{
                if ($request->hasFile('image'))
                {
                    $destinationPath = public_path().DIRECTORY_SEPARATOR.'upload'.DIRECTORY_SEPARATOR.'present'.DIRECTORY_SEPARATOR.'image';
                    if (!file_exists($destinationPath)) {
                        File::makeDirectory($destinationPath, 0775, true);
                    }       
                    $file = $request->file('image');
                    $date = now('Asia/Ho_Chi_Minh');
                    $date = $date->format('d-m-Y-H-i-s');
                    $extension = $file->extension();
                    $nameFile = Str::slug($request->name, '_').'_'.$date.'.'.$extension;
                    $file->move(public_path().DIRECTORY_SEPARATOR.'upload'.DIRECTORY_SEPARATOR.'present'.DIRECTORY_SEPARATOR.'image', $nameFile);
                    $linkFile = $request->getSchemeAndHttpHost().'/'.'upload'.'/'.'present'.'/'.'image'.'/'.$nameFile;
                }else{
                    $nameFile =$present->image;
                }
        }
            $present->name=$name;    
            $present->description=$description; 
            $present->score=$score;    
            $present->price=$price;    
            $present->category_id=$category_id;    
            $present->image=$nameFile;    
            $present->updated_at=Carbon::now('Asia/Ho_Chi_Minh'); 
            $present->save(); 
            return Response()->json(array("Update folder successfully!"=> 1,"data"=>$present));
        }else{
            return response()->json(['error'=>"Invalid id !!!"], 400);
        }
    }else{
        return response()->json(['error'=>"You are not admin !!!"], 401);
    }
}

    /**
     * @SWG\DELETE(
     *     path="/api/present/destroyPresent/{id}",
     *     description="Return present's information",
     *     @SWG\Response(
     *         response=200,
     *         description="Delete present successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="category", type="integer"),
     *             @SWG\Property(property="image", type="text"),
     *             @SWG\Property(property="name", type="text"),
     *             @SWG\Property(property="price", type="text"),
     *             @SWG\Property(property="author", type="integer"),
     *             @SWG\Property(property="description", type="text"),
     *             @SWG\Property(property="score", type="text"),
     *             @SWG\Property(property="status", type="integer"),
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
    public function destroyPresent($id){
        $checkLogin = auth()->user();
        if($checkLogin->role==1){
            $present= Present::find($id);
            if ($present){
               $present->delete();
               return response()->json([
                   'message'=>"Delete present successfully",
                   'data'=>$present
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
     *     path="/api/present/changeStatus/{id}",
     *     description="Return present's informaion.",
     *     @SWG\Response(
     *         response=200,
     *         description="Update present successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="id", type="integer"),
     *             @SWG\Property(property="category", type="integer"),
     *             @SWG\Property(property="image", type="text"),
     *             @SWG\Property(property="name", type="text"),
     *             @SWG\Property(property="price", type="text"),
     *             @SWG\Property(property="author", type="integer"),
     *             @SWG\Property(property="description", type="text"),
     *             @SWG\Property(property="score", type="text"),
     *             @SWG\Property(property="status", type="integer"),
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
public function changeStatus($id){
    $checkLogin = auth()->user();
    if($checkLogin->role==1){
        $present= Present::find($id);
        if ($present){
            if($present->status==1){
                $present->status=0;
            }else{
                $present->status=1;
            }
            $present->updated_at=Carbon::now('Asia/Ho_Chi_Minh'); 
            $present->save(); 
            return Response()->json(array("Update present successfully!"=> 1,"data"=>$present));
        }else{
            return response()->json(['error'=>"Invalid id !!!"], 400);
        }
    }else{
        return response()->json(['error'=>"You are not admin !!!"], 401);
    }
}
      /**
     * @SWG\GET(
     *     path="/api/present/exchangePresent/{id}",
     *     description="Return present's information",
     *     @SWG\Response(
     *         response=200,
     *         description="Exchange present successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="id", type="integer"),
     *             @SWG\Property(property="category", type="integer"),
     *             @SWG\Property(property="image", type="text"),
     *             @SWG\Property(property="name", type="text"),
     *             @SWG\Property(property="price", type="text"),
     *             @SWG\Property(property="author", type="integer"),
     *             @SWG\Property(property="description", type="text"),
     *             @SWG\Property(property="score", type="text"),
     *             @SWG\Property(property="status", type="integer"),
     *             @SWG\Property(property="created_at", type="timestamp"),
     *             @SWG\Property(property="updated_at", type="timestamp"),
     *            )
     *     ),
     *     @SWG\Response(
     *         response=400,
     *         description="Invalid id !!!"
     *     ),
     *     @SWG\Response(
     *         response=400,
     *         description="Not enough score !!!"
     *     ),
     *     @SWG\Response(
     *         response=400,
     *         description="Service not supported !!!"
     *     ),
     *   security={
     *           {"api_key_security_example": {}}
     *       }
     * )
     */
    public function exchangePresent($id)
    {
        $user = auth()->user();
        $present= Present::find($id);
        $scoreFind = DB::table('user_score')->where('user_id',$user->id)->first();
        if($present){
            if($present->status==1){
                if($present->score<=$scoreFind->score){
                    $postArray = [
                        'user_id'  => $user->id,
                        'present_id'=>$present->id,
                        'status'=>0,
                        'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
                        'updated_at'=> Carbon::now('Asia/Ho_Chi_Minh')
                    ];
                    $presentCart = CartPresent::create($postArray);
                    $employeeFind=DB::table('users')->get();
                    for ($i=0;$i<count($employeeFind);$i++){
                        if($employeeFind[$i]->role==1){
                            $postNotify = [
                                'user_id'=>$employeeFind[$i]->id,
                                'category'=>3,
                                'title'  => "Waiting for approval",
                                'content'=>"Employee just exchanged gifts",
                                'status'=>1,
                                'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
                                'updated_at'=> Carbon::now('Asia/Ho_Chi_Minh')
                            ];
                            $notify = Notify::create($postNotify);
                        }
                    }
                    return Response()->json(array("Exchange present successfully !"=> 1,"data"=>$postArray));
                }else{
                    return response()->json(['error'=>"Not enough score !!!"], 400);
                }
            }else{
                return response()->json(['error'=>"Service not supported !!!"], 400);
            }
        }else{
            return response()->json(['error'=>"Invalid id !!!"], 400);
        }
    }
}