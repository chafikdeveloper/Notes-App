<div class="flex justify-center items-center my-6">
    <form wire:submit='save'>
        @csrf
        
        <fieldset class="fieldset bg-base-200 border-base-300 rounded-box w-md border p-4">
            <legend class="fieldset-legend">Note details</legend>

            <label class="fieldset-legend">Title:</label>
            <input type="text" wire:model='title' class="input w-full" placeholder="I need to.." />
            @error('title')
                <p class="text-red-500 mt-2 px-2 py-1 bg-red-100 rounded-sm">{{ $message }}</p>
            @enderror

            <fieldset class="fieldset">
                <legend class="fieldset-legend">Content</legend>
                <textarea wire:model='content' class="textarea h-28 w-full" placeholder="What do you have in mind ?"></textarea>
            </fieldset>
            @error('content')
                <p class="text-red-500 mt-2 px-2 py-1 bg-red-100 rounded-sm">{{ $message }}</p>
            @enderror

            <label class="fieldset-legend" for="tags">Tags:</label>
            <div class="flex items-center space-x-2">

                <input type="text" wire:model='tag' wire:keydown.enter.prevent="addTag" class="input w-full"
                    placeholder="Enter a tag and hit Enter" />
            </div>
            @error('tags')
                <p class="text-red-500 mt-2 px-2 py-1 bg-red-100 rounded-sm">{{ $message }}</p>
            @enderror

            <div class="mt-3 space-x-2 space-y-2">
                @foreach ($tags as $index => $tag)
                    <span class="inline-flex items-center bg-[#212839] text-[#605DFF] px-2 py-1 rounded">
                        {{ $tag }}
                        <button wire:click="removeTag({{ $index }})"
                            class="ml-2 text-red-600 font-bold cursor-pointer">&times;</button>
                    </span>
                @endforeach
            </div>


            <button class="btn btn-soft btn-primary mt-4">Create Note</button>
        </fieldset>

        <!-- validation errors -->
        @if ($errors->any())
            <ul class="px-2 py-1">
                @foreach ($errors->all() as $error)
                    <li class="my-1 text-red-500">{{ $error }}</li>
                @endforeach
            </ul>
        @endif

    </form>
</div>
