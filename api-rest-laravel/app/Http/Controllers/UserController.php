<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;

use App\User;

class UserController extends Controller
{
    public function register(Request $request)
    {
        // Recojer los datos el usuario
        $json = $request->input('json', null);
        $params = json_decode($json);
        $params_array = json_decode($json, true); 

        if (!empty($params) && !empty($params_array)){

            // Limpiar datos
            $params_array = array_map('trim', $params_array);

            // validar los datos
            $validate = \Validator::make($params_array, [
                    'name' => 'required|alpha',
                    'surname' => 'required|alpha',
                    'email' => 'required|email|unique:users',
                    'password' => 'required'
                ]);

            if ($validate->fails()){

                // Error al enviar los datos 
                $data = array(
                    'status' => 'error',
                    'code' => 404,
                    'message' => 'Usuario no creado',
                    'errors' => $validate->errors()
                );
            }else{
                //pasado correctamente
                
                 //Cifrado de contrasena
                $pwd = hash('sha256', $params->password);

                // crear usuario 
                $user = new User();
                $user->name = $params_array['name'];
                $user->surname = $params_array['surname'];
                $user->email = $params_array['email'];
                $user->password = $pwd;
                $user->role = 'ROLE_USER';  

                //guardar el usuario
                $user->save();

                $data = array(
                    'status' => 'success',
                    'code' => 200,
                    'message' => 'Usuario creado correctamente',
                    'user' => $user
                );
            }
            
        }else{
            $data = array(
                'status' => 'error',
                'code' => 404,
                'message' => 'Los datos enviados no son correctos',
            );
        }

        return response()->json($data, $data['code']);
    }

    public function login(Request $request)
    {
        $jwtAuth = new \JwtAuth();

        // Recibir los datos por POST.
        $json = $request->input('json', null);
        $params = json_decode($json);
        $params_array = json_decode($json, true);

        // Validar esos datos.
        $validate = \Validator::make($params_array, [
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if ($validate->fails()){
            // Error al enviar los datos 
            $signup = array(
                'status' => 'error',
                'code' => 404,
                'message' => 'Usuario no se a podido crear',
                'errors' => $validate->errors()
            );
        }else{
            // Cifrar la contrasena.
            $pwd = hash('sha256', $params->password);
            
            // Devolver los datos del token.
            $signup = $jwtAuth->signup($params->email, $pwd);
            
            if (!empty($params->gettoken)){
                $signup = $jwtAuth->signup($params->email, $pwd, true);
            }

        }

        return response()->json($signup, 200);

    }

    public function update(Request $request){
        $token = $request->header('Authorization');

        $jwtAuth = new \JwtAuth();
        $checkToken = $jwtAuth->checkToken($token, true);

        // recoger los datos por POST.
        $json = $request->input('json', null);
        $params_array = json_decode($json, true);

        if ($checkToken && !empty($params_array)){

               //Sacar Usuario identificado.
               $user = $jwtAuth->checkToken($token, true);

               //Validar datos.
               $validate = \Validator::make($params_array, [
                'name' => 'required|alpha',
                'surname' => 'required|alpha',
                'email' => 'required|email|unique:userrs,'.$user->sub
            ]);

            // Quitar los campos que no se actualizaran.

            unset($params_array['id']);
            unset($params_array['role']);
            unset($params_array['password']);
            unset($params_array['created_at']);
            unset($params_array['remeber_token']);

            // Actualizar usuario en la DB.
            $user_update = User::where('id', $user->sub)->update($params_array);
            // Devolver con el resultado.
            
            $data = array(
                'code' => 200,
                'status' => 'success',
                'user' => $user,
                'changes' => $params_array
            );
        }
        else{
            $data = array(
                'code' => 404,
                'status' => 'error',
                'message' => 'Usuario no identificado'
            );
        }
        
        return response()->json($data, $data['code']);
        
    }

    public function upload(Request $request){
        //Recoger Datos.
        $image = $request->file('file0');

        // Validar imagen.
        $validate = \Validator::make($request->all(),[
            'file0' => 'required|image|mimes:jpg,jpeg,png,gif'
        ]);

        //Guardar Imagen.
        if (!$image || $validate->fails()){
            $data = array(
                'code' => 404,
                'status' => 'error',
                'message' => 'Error al cargar la imagen',
            );
        }
        else{
            $image_name = time().$image->getClientOriginalName();
            \Storage::disk('user')->put($image_name, \File::get($image)); 

            $data = array(
                'code' => 200,
                'status' => 'success',
                'message' => $image_name,
            );
        }

        return response()->json($data, $data['code']);
    }

    public function getImage($filename){
        $isset = \Storage::disk('user')->exists($filename);

        if ($isset) {
            $file = \Storage::disk('user')->get($filename);
            return new Response($file, 200);

        }else {
            $data = array(
                'code' => 404,
                'status' => 'error',
                'message' => 'Error imagen no existe',
            );

        return response()->json($data, $data['code']);
        }

    }

    public function detail($id){
        $user = User::find($id);

        if (is_object($user)){
            $data = array(
                'code' => 200,
                'status' => 'success',
                'user' => $user
            );
        }else{
            $data = array(
                'code' => 404,
                'status' => 'error',
                'message' => 'Usuario no existe.',
            );
        }
        return response()->json($data, $data['code']);
    }

}
