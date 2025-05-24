<?php

namespace App\Livewire;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Livewire\Attributes\Rule;
use Livewire\Attributes\Title;
use Livewire\Component;

class Login extends Component
{
    #[Rule('required|email')]
    public $email;

    #[Rule('required|string')]
    public $password;

    public function login(Request $request) {
        $validated = $this->validate();

        if (Auth::attempt($validated)) {
            $request->session()->regenerate();

            $this->redirect('/notes', navigate: true);
        }

        throw ValidationException::withMessages([
            'credentails' => 'Sorry, incorrect credentials',
        ]);
    }
    
    #[Title('Login to your Account - Note App')]
    public function render()
    {
        return view('livewire.login');
    }
}
