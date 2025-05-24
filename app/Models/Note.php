<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Note extends Model
{
    protected $fillable = ['title', 'content', 'pinned', 'tags', 'user_id'];

    protected $casts = [
        'tags' => 'array',
    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function scopeSearch($query, $value) {
        $query->where('title', 'like', "%{$value}%")->orWhere('content', 'like', "%{$value}%")->orWhere('tags', 'like', "%{$value}%");
    }
}
