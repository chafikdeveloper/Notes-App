<div class="flex justify-center mt-16 min-h-screen">
    <form wire:submit='signup'>
        @csrf

        <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
            <legend class="fieldset-legend">Signup</legend>

            @if ($errors->any())
                <ul class="px-2 py-1 bg-red-100 rounded-sm">
                    @foreach ($errors->all() as $error)
                        <li class="my-1 text-red-500">{{ $error }}</li>
                    @endforeach
                </ul>
            @endif

            <label for="name" class="label">Name:</label>
            <input type="text" wire:model='name' class="input" placeholder="Name" />

            <label for="email" class="label">Email:</label>
            <input type="email" wire:model='email' class="input" placeholder="Email" />

            <label for="password" class="label">Password:</label>
            <input type="password" wire:model='password' class="input" placeholder="Password" />

            <button type="submit" class="btn btn-neutral mt-4">Signup</button>
            <p class="mt-4 text-center">Already have an account ? Login <a href="/login"
                    class="text-blue-600 underline">here</a></p>
        </fieldset>
    </form>
</div>
