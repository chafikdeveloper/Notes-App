<?php

namespace App\Livewire;

use App\Models\Note;
use Illuminate\Support\Facades\Auth;
use Livewire\Attributes\Rule;
use Livewire\Attributes\Title;
use Livewire\Component;

class NoteCreate extends Component
{
    #[Rule('required|string|min:6')]
    public $title;

    #[Rule('string|min:10|max:200')]
    public $content;

    public $tags = [];
    public $tag = "";

    public function addTag() {
        $tag = trim($this->tag);

        if ($tag && !in_array($tag, $this->tags)) {
            $this->tags[] = $tag;
        }

        $this->tag = '';
    }

    public function removeTag($index) {
        unset($this->tags[$index]);
        $this->tags = array_values($this->tags);
    }

    public function save() {
        $this->validate();

        Note::create([
            'title' => $this->title,
            'content' => $this->content,
            'tags' => $this->tags,
            'user_id' => Auth::user()->id,
        ]);

        $this->redirect('/notes', navigate: true);
    }

    #[Title('Create New Note')]
    public function render()
    {
        return view('livewire.note-create');
    }
}
