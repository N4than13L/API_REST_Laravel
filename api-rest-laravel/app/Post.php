<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $table = 'posts';

    // relacion de muchos a unos.
    public function user(){
        return $this-> belongsTo('App\User', 'user_id');
    }

    public function category(){
        return $this->belongsTo('App\Categoy', 'category_id');
    } 
}
