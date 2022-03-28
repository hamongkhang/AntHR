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

use App\Models\Praise;
use App\Models\User;
use App\Models\UserScore;
use App\Models\Like;
use App\Models\Comment;
use Illuminate\Support\Facades\File;
use App\Models\Notify;



class PraiseController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api', ['except' => []]);
    }
    /**
     * @SWG\POST(
     *     path="/api/praise/createPraise",
     *     description="Return praise's informaion.",
     * @SWG\Parameter(
     *         name="image",
     *         in="query",
     *         type="file",
     *         description="Praise's image",
     *         required=true,
     *     ),
     * @SWG\Parameter(
     *         name="message",
     *         in="query",
     *         type="text",
     *         description="Praise's message",
     *         required=true,
     *     ),
     * @SWG\Parameter(
     *         name="score",
     *         in="query",
     *         type="text",
     *         description="Praise's score",
     *         required=true,
     *     ),
     * @SWG\Parameter(
     *         name="recipient",
     *         in="query",
     *         type="integer",
     *         description="Praise's recipient",
     *         required=true,
     *     ),
     * @SWG\Parameter(
     *         name="present",
     *         in="query",
     *         type="text",
     *         description="Praise's present",
     *         required=true,
     *     ),
     * @SWG\Parameter(
     *         name="cheer",
     *         in="query",
     *         type="text",
     *         description="Praise's cheer",
     *         required=true,
     *     ),
     *  @SWG\Parameter(
     *         name="status",
     *         in="query",
     *         type="integer",
     *         description="Praise's status",
     *         required=true,
     *     ),
     *     @SWG\Response(
     *         response=200,
     *         description="Create new successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="author", type="integer"),
     *             @SWG\Property(property="image", type="text"),
     *             @SWG\Property(property="message", type="text"),
     *             @SWG\Property(property="score", type="text"),
     *             @SWG\Property(property="present", type="text"),
     *             @SWG\Property(property="recipient", type="integer"),
     *             @SWG\Property(property="cheer", type="text"),
     *             @SWG\Property(property="status", type="integer"),                          
     *             @SWG\Property(property="created_at", type="timestamp"),
     *             @SWG\Property(property="updated_at", type="timestamp"),
     *            )
     *     ),
     *     @SWG\Response(
     *         response=400,
     *         description="Error"
     *     ),
     *     security={
     *           {"api_key_security_example": {}}
     *      }
     * )
     */
    public function createPraise(Request $request){
        $validator = Validator::make($request->all(), [
            'message' => 'required',
            'score'=>'required',
            'present'=>'required',
            'recipient'=>'required|integer',
            'cheer'=>'required'
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 400);     
        }
        $scoreUser = DB::table('user_score')->where('user_id',auth()->user()->id)->first();
        if($scoreUser->score>=$request->score){
            $userFind = auth()->user();
            if ($request->hasFile('image'))
            {
                $destinationPath = public_path().DIRECTORY_SEPARATOR.'upload'.DIRECTORY_SEPARATOR.'praise'.DIRECTORY_SEPARATOR.'image';
                if (!file_exists($destinationPath)) {
                    File::makeDirectory($destinationPath, 0775, true);
                }       
                $file = $request->file('image');
                $date = now('Asia/Ho_Chi_Minh');
                $date = $date->format('d-m-Y-H-i-s');
                $extension = $file->extension();
                $name = Str::slug($request->name, '_').'_'.$date.'.'.$extension;
                $file->move(public_path().DIRECTORY_SEPARATOR.'upload'.DIRECTORY_SEPARATOR.'praise'.DIRECTORY_SEPARATOR.'image', $name);
                $linkFile = $request->getSchemeAndHttpHost().'/'.'upload'.'/'.'praise'.'/'.'image'.'/'.$name;
            }else{
                $name = "_17-03-2022-00-25-51.jpg";
            }
            $postArray = [
                'author'=>$userFind->id,
                'image'  => $name,
                'message'=>$request->message,
                'score'=>$request->score,
                'present'=>$request->present,
                'recipient'=>$request->recipient,
                'cheer'=>$request->cheer,
                'status'=>0,
                'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
                'updated_at'=> Carbon::now('Asia/Ho_Chi_Minh')
            ];
            $praise = Praise::create($postArray);
                $postNotify = [
                    'user_id'=>$request->recipient,
                    'category'=>3,
                    'title'  => "New notification",
                    'content'=>"You just received a compliment",
                    'status'=>1,
                    'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
                    'updated_at'=> Carbon::now('Asia/Ho_Chi_Minh')
                ];
                $notify = Notify::create($postNotify);
            $scoreAuthor=UserScore::find($scoreUser->id);
            $scoreAuthor->score=$scoreAuthor->score-$request->score;
            $scoreAuthor->score_spent=$scoreAuthor->score_spent+$request->score;
            $scoreAuthor->save();
            $scoreFind = DB::table('user_score')->where('user_id',$request->recipient)->first();
            $scoreSum=UserScore::find($scoreFind->id);
            $scoreSum->score=$scoreSum->score+$request->score;
            $scoreSum->save();
            return Response()->json(array("Create folder successfully!"=> 1,"data"=>$praise ));
        }else{
            return response()->json(["error" => "Score not found!!!"],400);
        }
        }
        
    /**
     * @SWG\GET(
     *     path="/api/praise/getAllPraise",
     *     description="Return all praise's informaion.",
     *     @SWG\Response(
     *         response=200,
     *         description="Get praises successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="author", type="integer"),
     *             @SWG\Property(property="image", type="text"),
     *             @SWG\Property(property="message", type="text"),
     *             @SWG\Property(property="score", type="text"),
     *             @SWG\Property(property="present", type="text"),
     *             @SWG\Property(property="recipient", type="integer"),
     *             @SWG\Property(property="cheer", type="text"),
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
    public function getAllPraise(){
        $userFind = auth()->user();
        if($userFind->role==1){
            $data=DB::table('praise')->get();
        }else{
            $data = DB::table('praise')->where('status',1)->get();
        } 
        return Response()->json(array("Get folder successfully!"=> 1,"data"=>$data ));
    }

    public function getAllLike(){
        $userFind = auth()->user();
           $data=DB::table('like')->get();
        return Response()->json(array("Get folder successfully!"=> 1,"data"=>$data ));
    }
    public function getAllComment(){
        $userFind = auth()->user();
            $data=DB::table('comment')->get();
        return Response()->json(array("Get folder successfully!"=> 1,"data"=>$data ));
    }
    public function createComment(Request $request){
        $validator = Validator::make($request->all(), [
            'praise_id' => 'required',
            'messeger' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 400);     
        }
        $userFind = auth()->user();
        $postArray = [
            'user_id'=>$userFind->id,
            'praise_id'  => $request->praise_id,
            'messeger'=>$request->messeger,
            'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
            'updated_at'=> Carbon::now('Asia/Ho_Chi_Minh')
        ];
        $praise = Comment::create($postArray);
        return Response()->json(array("Create comment successfully!"=> 1,"data"=>$praise ));
    }
    public function createLike(Request $request){
        $validator = Validator::make($request->all(), [
            'praise_id' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json(['error'=>$validator->errors()], 400);     
        }
        $userFind = auth()->user();
        $postArray = [
            'user_id'=>$userFind->id,
            'praise_id'  => $request->praise_id,
            'created_at'=> Carbon::now('Asia/Ho_Chi_Minh'),
            'updated_at'=> Carbon::now('Asia/Ho_Chi_Minh')
        ];
        $praise = Like::create($postArray);
        return Response()->json(array("Create comment successfully!"=> 1,"data"=>$praise ));
    }
     /**
     * @SWG\GET(
     *     path="/api/praise/getOnePraise/id",
     *     description="Return one praise's informaion.",
     *     @SWG\Response(
     *         response=200,
     *         description="Get praise successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="id", type="integer"),
     *             @SWG\Property(property="author", type="integer"),
     *             @SWG\Property(property="image", type="text"),
     *             @SWG\Property(property="message", type="text"),
     *             @SWG\Property(property="score", type="text"),
     *             @SWG\Property(property="present", type="text"),
     *             @SWG\Property(property="recipient", type="integer"),
     *             @SWG\Property(property="cheer", type="text"),
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
    public function getOnePraise($id){ 
        $data=DB::table('praise')->where('id',$id)->get();
        if($data){
            return Response()->json(array("Get praise successfully!"=> 1,"data"=>$data ));
        }else{
            return response()->json(["error" => "Invalid id!!!"],400);
        }
    }

    /**
     * @SWG\DELETE(
     *     path="/api/praise/destroyPraise/{id}",
     *     description="Return praise's information",
     *     @SWG\Response(
     *         response=200,
     *         description="Delete praise successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="id", type="integer"),
     *             @SWG\Property(property="author", type="integer"),
     *             @SWG\Property(property="image", type="text"),
     *             @SWG\Property(property="message", type="text"),
     *             @SWG\Property(property="score", type="text"),
     *             @SWG\Property(property="present", type="text"),
     *             @SWG\Property(property="recipient", type="integer"),
     *             @SWG\Property(property="cheer", type="text"),
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
    public function destroyPraise($id){
        $checkLogin = auth()->user();
        if($checkLogin->role==1){
            $praise= Praise::find($id);
            if ($praise){
                $scoreUser = DB::table('user_score')->where('user_id',$praise->author)->first();
                $scoreAuthor=UserScore::find($scoreUser->id);
                $scoreAuthor->score=$scoreAuthor->score+$praise->score;
                $scoreAuthor->score_spent=$scoreAuthor->score_spent-$praise->score;
                $scoreAuthor->save();

                $scoreFind = DB::table('user_score')->where('user_id',$praise->recipient)->first();
                $scoreSum=UserScore::find($scoreFind->id);
                $scoreSum->score=$scoreSum->score-$praise->score;
                $scoreSum->save();
                $praise->delete();
                return response()->json([
                   'message'=>"Delete praise successfully",
                   'data'=>$praise
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
     *     path="/api/praise/changeStatus/{id}",
     *     description="Return praise's informaion.",
     *     @SWG\Response(
     *         response=200,
     *         description="Update praise successfully",
     *         @SWG\Schema(
     *             @SWG\Property(property="id", type="integer"),
     *             @SWG\Property(property="author", type="integer"),
     *             @SWG\Property(property="image", type="text"),
     *             @SWG\Property(property="message", type="text"),
     *             @SWG\Property(property="score", type="text"),
     *             @SWG\Property(property="present", type="text"),
     *             @SWG\Property(property="recipient", type="integer"),
     *             @SWG\Property(property="cheer", type="text"),
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
        $praise= Praise::find($id);
        if ($praise){
            if($praise->status==1){
                $praise->status=0;
            }else{
                $praise->status=1;
            }
            $praise->updated_at=Carbon::now('Asia/Ho_Chi_Minh'); 
            $praise->save(); 
            return Response()->json(array("Update praise successfully!"=> 1,"data"=>$praise));
        }else{
            return response()->json(['error'=>"Invalid id !!!"], 400);
        }
    }else{
        return response()->json(['error'=>"You are not admin !!!"], 401);
    }
}
}