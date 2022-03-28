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

use App\Models\PresentCategory;
use App\Models\Notify;


class PresentCategoryController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api', ['except' => []]);
    }
    /**
     * @SWG\POST(
     *     path="/api/present/createPresentCategory",
     *     description="Return new's informaion.",
     * @SWG\Parameter(
     *         name="category",
     *         in="query",
     *         type="string",
     *         description="Category's Name",
     *         required=true,
     *     ),
     *     @SWG\Response(
     *         response=200,
     *         description="Create present category successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="category", type="text"),
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
    public function createCategory(Request $request){
        $validator = Validator::make($request->all(), [
            'category' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 400);     
        }
        $userFind = auth()->user();
        if($userFind->role==1){
        $postArray = [
            'category'  => $request->category,
            'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
            'updated_at'=> Carbon::now('Asia/Ho_Chi_Minh')
        ];
        $category = PresentCategory::create($postArray);
        return Response()->json(array("Create folder successfully!"=> 1,"data"=>$category ));
    }else{
        return response()->json(["error" => "You are not admin!!!"],401);
    }
    }
    /**
     * @SWG\GET(
     *     path="/api/present/getAllCategory",
     *     description="Return all present category's informaion.",
     *     @SWG\Response(
     *         response=200,
     *         description="Get present category successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="category", type="text"),
     *             @SWG\Property(property="created_at", type="timestamp"),
     *             @SWG\Property(property="updated_at", type="timestamp"),
     *            )
     *     ),
     *     security={
     *           {"api_key_security_example": {}}
     *      }
     * )
     */
    public function getAllCategory(){
        $data=DB::table('present_category')->get();
        return Response()->json(array("Get present category successfully!"=> 1,"data"=>$data ));
    }
     /**
     * @SWG\GET(
     *     path="/api/present/getOneCategory/id",
     *     description="Return one present category's informaion.",
     *     @SWG\Response(
     *         response=200,
     *         description="Get present category successfully",
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
    public function getOneCategory($id){ 
        $find=DB::table('present_category')->where('id',$id)->first();
        if($find){
            $data=DB::table('present')->where('category_id',$id)->get();
            return Response()->json(array("Get present category successfully!"=> 1,"data"=>$data ));
        }else{
            return response()->json(["error" => "Invalid id!!!"],400);
        }
    }
    /**
     * @SWG\POST(
     *     path="/api/present/updateCategory/{id}",
     *     description="Return present category's informaion.",
     * @SWG\Parameter(
     *         name="category",
     *         in="query",
     *         type="string",
     *         description="Present category's Name",
     *         required=true,
     *     ),
     *     @SWG\Response(
     *         response=200,
     *         description="Update new successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="category", type="text"),
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
public function updateCategory($id,Request $request){
    $validator = Validator::make($request->all(), [
        'category' => '',
    ]);
    if ($validator->fails()) {
        return response()->json(['error'=>$validator->errors()], 400);     
    }
    $checkLogin = auth()->user();
    if($checkLogin->role==1){
        $new= PresentCategory::find($id);
        if ($new){
            if ($request->category==null){
                $category=$new->category;
            }else{
                $category=$request->category;
            } 
            $new->category=$category;        
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
     *     path="/api/present/destroyCategory/{id}",
     *     description="Return present category's information",
     *     @SWG\Response(
     *         response=200,
     *         description="Delete present category successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="category", type="text"),
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
    public function destroyCategory($id){
        $checkLogin = auth()->user();
        if($checkLogin->role==1){
            $new= PresentCategory::find($id);
            if ($new){
               $new->delete();
               return response()->json([
                   'message'=>"Delete present category successfully",
                   'data'=>$new
               ]);
            }else{
                return response()->json(['error'=>"Invalid id !!!"], 400);
            }
        }else{
            return response()->json(['error'=>"You are not admin !!!"], 401);
        }
    }

}