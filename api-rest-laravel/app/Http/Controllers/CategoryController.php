<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use App\Category;

class CategoryController extends Controller
{
    public function __construct(){
        $this->middleware('api.auth', ['except' => ['index', 'show']]);
    }

    public function index() {
        $category = Category::all();

        return response()->json([
            'code' => 200,
            'status' => 'success',
            'categories' => $category
        ]);
    }

    public function show($id){
        $category = Category::find($id);

        if(is_object($category)){
            $data = [
                'code' => 200,
                'status' => 'success',
                'category' => $category
            ];

            
        }else{
            $data = [
                'code' => 404,
                'status' => 'error',
                'message' => 'No existe'
            ];
        }

        return response()->json($data, $data['code']);
    }

    public function store(Request $request){
        // Recoger los datos por post
        $json = $request->input('json', null);
        $params_array = json_decode($json, true);

        if (!empty($params_array)){
            // Validar los Datos.
            $validate = \Validator::make($params_array, [
                'name' => 'required'
            ]);

            // Guardar la cateforia.
            if ($validate->fails()){
                $data = [
                    'code' => 404,
                    'status' => 'error',
                    'message' => 'Error al registrar la categoria.',
                ];

            }else{
                $category = new Category();
                $category->name = $params_array['name'];
                $category->save();
    
                $data = [
                    'code' => 200,
                    'status' => 'success',
                    'category' => $category,
                ];
            }  
        }else{
            $data = [
                'code' => 404,
                'status' => 'error',
                'message' => 'No has enviado niguna categoria',
            ];
        }

        return response()->json($data, $data['code']);
    }

    public function update($id, Request $request){
       // recoger los datos por post 

       $json = $request->input('json', null);
       $params_array = json_decode($json, true);

       if (!empty($params_array)){
           // validar los datos.
           $validate = \Validator::make($params_array,  [
               'name' => 'required'
           ]);

           unset($params_array['id']);
           unset($params_array['created_at']);

           // actualizar el registro
           $category = Category::where('id', $id)->update($params_array);

           $data = [
            'code' => 200,
            'status' => 'success',
            'message' => $params_array,
           ];
           
       }else{
            $data = [
                'code' => 404,
                'status' => 'error',
                'message' => 'No has enviado niguna categoria',
            ];
       }

       return response()->json($data, $data['code']);

    }
}
