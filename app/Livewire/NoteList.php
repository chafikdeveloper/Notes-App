<?php

namespace App\Livewire;

use App\Models\Note;
use Illuminate\Support\Facades\Auth;
use Livewire\Attributes\Title;
use Livewire\Component;
use Livewire\WithPagination;

class NoteList extends Component
{
    use WithPagination;

    public $search = "";
    public $onlyPinned = false;

    public function pin(Note $note)
    {
        $note->update([
            'pinned' => !$note->pinned,
        ]);
    }

    public function delete(Note $note)
    {
        $note->delete();
    }

    public function updatingOnlyPinned() {
        $this->resetPage();
    }

    public function toggleOnlyPinned()
    {
        $this->onlyPinned = !$this->onlyPinned;
    }

    #[Title('Note List')]
    public function render()
    {
        if ($this->search) {
                $notes = Note::when($this->onlyPinned, fn ($query) => $query->where('pinned', true))->search($this->search)->orderBy('created_at', 'DESC')->where('user_id', Auth::user()->id)->paginate(6);
                return view('livewire.note-list', [
                    'notes' => $notes,
                ]);
            }

            $notes = Note::when($this->onlyPinned, fn ($query) => $query->where('pinned', true))->orderBy('created_at', 'DESC')->where('user_id', Auth::user()->id)->paginate(6);

            return view(
                'livewire.note-list',
                [
                    'notes' => $notes,
                ]
            );
    }
}
