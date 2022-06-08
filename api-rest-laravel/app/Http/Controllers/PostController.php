<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Post;
use App\Helpers\JwtAuth;

class PostController extends Controller
{
    public function __construct(){
        $this->middleware('api.auth', ['except' => ['index', 'show']]);
    }

    public function index(){
        $post = Post::all();

        return response()->json([
            'code' => 200,
            'status' => 'success',
            'post' => $post
        ], 200);
    }

    public function show($id){
        $post = Post::find($id);

        if (is_object($post)) {
            $data = [
                'code' => 200,
                'status' => 'success',
                'post' => $post
            ];
        }else{
            $data = [
                'code' => 404,
                'status' => 'error',
                'message' => 'Error, la informacion no existe'
            ];
        }

        return response()->json($data, $data['code']);
    }

    public function store(Request $request) {
        // Recoger datos por POST
        $json = $request->input('json', null);
        $params = json_decode($json);
        $params_array = json_decode($json, true);
        
        if (!empty($params_array)) {
            // Conseguir usuario identificado
            $jwtAuth = new JwtAuth();
            $token = $request->header('Authorization');
            $user = $jwtAuth->checkToken($token, true);
            
            // Validar los datos
            $validate = \Validator::make($params_array, [
                'title'     =>  'required',
                'content'   => 'required',
                'category_id'   => 'required'
            ]);
            
            if($validate->fails()){
                $data = [
                  'code' => 400,
                    'status' => 'error',
                    'message' => 'No se ha guardado el post, faltan datos'
                ];
            }else{
               // Guardar el artículo
                $post = new Post();
                $post->user_id = $user->sub;
                $post->category_id = $params->category_id;
                $post->title = $params-> title;
                $post->content = $params->content;
                $post->image = $params->image;
                $post->save();
                
                $data = [
                  'code' => 200,
                    'status' => 'success',
                    'post' => $post
                ];
            }
        
        } else {
             $data = [
                  'code' => 400,
                    'status' => 'error',
                    'message' => 'Error al enviar los datos'
                ];
        }
        
        return response()->json($data, $data['code']);
    }
}
