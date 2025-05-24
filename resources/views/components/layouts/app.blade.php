<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>{{ $title ?? 'Page Title' }}</title>
    @vite('resources/css/app.css')
</head>

<body class="min-h-screen flex flex-col">
    <nav class="bg-[#111519] shadow-sm flex justify-between items-center p-4 w-full">
        <div>
            <h1 class="font-bold text-2xl">Notes</h1>
        </div>
        @auth
            <div class="flex items-center space-x-4 text-lg">
                <a wire:navigate href="/notes" class="{{ request()->is('notes') ? 'text-[#5655E4]' : '' }}">Note List</a>
                <a wire:navigate href="/create-note" class="{{ request()->is('create-note') ? 'text-[#5655E4]' : '' }}">Add
                    Note</a>
                <div class="dropdown dropdown-end">
                    <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                        <div class="w-10 rounded-full bg-[#605DFF] text-white flex items-center justify-center text-xl font-semibold uppercase">
                            <p class="mt-1 mr-0.5">{{ strtoupper(auth()->user()->name[0]) }}</p>
                        </div>
                    </div>
                    <ul tabindex="0"
                        class="menu menu-sm dropdown-content rounded-box z-1 mt-4 w-52 p-2 shadow bg-[#686c71]">
                        <li>
                            <form action="/logout" method="POST">
                                @csrf
                                <button type="submit">Logout</button>
                            </form>
                        </li>
                    </ul>
                </div>
            </div>
            </div>
        @endauth
        @guest
            <div class="flex space-x-4 text-lg">
                <a wire:navigate href="/register" class="{{ request()->is('register') ? 'text-[#5655E4]' : '' }}">Signup</a>
                <a wire:navigate href="/login" class="{{ request()->is('login') ? 'text-[#5655E4]' : '' }}">Login</a>
            </div>
        @endguest
    </nav>
    <main class="flex-1">
        {{ $slot }}
    </main>

    <footer class="bg-[#111519] text-center p-4 ">
        <p>Copyright &copy; {{ date('Y') }} - All right reserved.</p>
    </footer>
</body>

</html>
