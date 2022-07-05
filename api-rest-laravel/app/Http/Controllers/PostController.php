<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Post;
use App\Helpers\JwtAuth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;


class PostController extends Controller
{
    public function __construct(){
        $this->middleware('api.auth', ['except' => [
            'index',
            'show',
            'getImage',
            'getPostByCategory',
            'getPostByUser'
        ]]);
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
        $post = Post::find($id)->load('category')
                                ->load('user');

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
            $user = $this->getIdentity($request);
            
            // Validar los datos
            $validate = \Validator::make($params_array, [
                'title' =>  'required',
                'content' => 'required',
                'category_id' => 'required'
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

    public function update($id, Request $request){
        // Recoger datos por POST.
        $json = $request->input('json', null);
        $params_array = json_decode($json, true);

        // Devolver los datos.
        $data = array(
            'code' => 400,
            'status' => 'error',
            'message' => 'Datos incorrectos'
        );
        if (!empty($params_array)) {
            // Validar los datos
            $validate = \Validator::make($params_array, [
                'title' =>  'required',
                'content' => 'required',
                'category_id' => 'required'
            ]);

            //En caso de que falle.
            if ($validate->fails()) {
                $data['errors'] = $validate->errors();
                return response()->json($data, $data['code']);
            }

            // Eliminar lo que no se va ha actualiar.
            unset($params_array['id']);
            unset($params_array['user_id']);
            unset($params_array['created_at']);
            unset($params_array['user']);

            $user = $this->getIdentity($request);
            
            $post = Post::where('id', $id)
            ->where('user_id', $user->sub)->first();

            if(!empty($post) && is_object($post)){
                $post->update($params_array);

                 // Devolver algo.
                $data = array(
                    'code' => 200,
                    'status' => 'success',
                    'post' => $post,
                    'changes' => $params_array
                ); 
            }

        }
        
        return response()->json($data, $data['code']);
    }

    public function destroy($id, Request $request){
        // Conseguir el post.
        $user = $this->getIdentity($request);

        //Consegir el registro.
        $post = Post::where('id', $id)->where('user_id', $user->sub)->first();        

        if (!empty($post)){
            // Borrar el post.
            
            $post->delete();

            $data = array(
                'code' => 200,
                'status' => 'success',
                'post' => $post,
            ); 
        }else{
            $data = array(
                'code' => 404,
                'status' => 'error',
                'message' => 'el Post no existe.'
            ); 
        }

        return response()->json($data, $data['code']);
    }

    private function getIdentity(Request $request){
        // Conseguir usuario identificado.
        $jwtAuth = new JwtAuth();
        $token = $request->header('Authorization');
        $user = $jwtAuth->checkToken($token, true);

        return $user;
    }

    public function upload(Request $request){
        //Recoger los datos de la peticion
        $image = $request->file('file0');
 
        //Validation de la imagen 
        $validate = Validator::make($request->all(),[
            'file0'=> ['required','mimes:jpg,jpeg,png,gif']
        ]);
 
        //Guardar imagen
        if(!$image || $validate->fails()){
            $data = array(
                'code' => 400,
                'status' =>'error',
                'message' =>'Error al subir imagen'
            );
 
        }else{
            $image_name = time().$image->getClientOriginalName();
            Storage::disk('images')->put($image_name, File::get($image));
            $data = array(
                'code'=>200,
                'status' =>'success',
                'image' =>$image_name
            );
        }
 
        //Devolver el resultado
        return response()->json($data,$data['code']);
    }
   

    public function getImage($filename){
        // Comprobar si existe el fichero.
        $isset = \Storage::disk('images')->exists($filename);
        
        if ($isset) {
            // Conseguir la imagen.
            $file = \Storage::disk('images')->get($filename);
            
            // Devolver imagen.
            return new Response($file, 200);

        }else{
            $data = [
                'code' => 404,
                'status' => 'error',
                'message' => 'Imagen no existe.'
            ];
        }

        return response()->json($data, $data['code']);

    }

    public function getPostByCategory($id){
        $posts = Post::where('category_id', $id)->get();

        return response()->json([
            'status' => 'success',
            'posts' => $posts
        ], 200);
    }

    public function getPostByUser($id){
        $posts = Post::where('user_id', $id)->get();

        return response()->json([
            'status' => 'success',
            'posts' => $posts
        ], 200);
    }
}
