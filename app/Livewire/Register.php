<?php

namespace App\Livewire;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Livewire\Attributes\Rule;
use Livewire\Attributes\Title;
use Livewire\Component;

class Register extends Component
{
    #[Rule('required|string|max:100')]
    public $name;

    #[Rule('required|email|unique:users')]
    public $email;

    #[Rule('required|string|min:6|max:15')]
    public $password;

    public function signup() {
        $this->validate();

        $user = User::create([
            'name' => $this->name,
            'email' => $this->email,
            'password' => $this->password
        ]);

        Auth::login($user);

        $this->redirect('/notes', navigate: true);
    }
    
    #[Title('Create an Account - Note App')]
    public function render()
    {
        return view('livewire.register');
    }
}
