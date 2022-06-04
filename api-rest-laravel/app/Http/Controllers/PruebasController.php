<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;
use App\Category;

class PruebasController extends Controller
{
    public function index(){
        $titulo = 'Animales';

        $Animales = ['perro', 'gato', 'tigre'];

        return view('pruebas.index', array(
            'titulo' => $titulo,
            'Animales' => $Animales
        ));
    }

    public function testOrm(){

        $posts = Post::all();
        $categories = Category::all();
        
        foreach ($categories as $category) {
            foreach ($category->post as $post ) {
                echo "<span style=color:gray>
                    {$post->user->name}
                    {$post->caterory} 
                </span>";

                echo "<h2>{$category->name}</h2>";
                echo "<h2>".$post->title."</h3>";
        //--------------------------------------------------
                echo "<hr>";
            }
            
        }
        
    }     
}
