<div class="flex flex-col mt-8">
    @if ($notes->isEmpty())
        <div class="text-center mt-16">
            <p class="font-bold text-xl">Let's get started by creating your first note.</p>
            <a class="btn text-white bg-[#605DFF] hover:text-[#605DFF] hover:bg-[#212839] mt-12" href="/create-note">Click
                here</a>
        </div>
    @else
        <div class="flex justify-center">
            <input type="text" wire:model.live.debounce.300ms='search' class="input" placeholder="Search for a note" />
        </div>
        <div class="flex justify-center space-x-8 mt-8">
            <button wire:click="toggleOnlyPinned" class="btn {{ $onlyPinned ? 'btn-outline' : 'btn-primary' }}">
                Show {{ $onlyPinned ? 'All Notes' : 'Pinned Only' }}
            </button>
        </div>
        <div class="grid md:grid-cols-3 grid-cols-1 gap-4 mx-8 mt-10">
            @foreach ($notes as $note)
                <div wire:key="{{ $note->id }}"
                    class="bg-gray-900 p-4 flex flex-col justify-between rounded-sm space-y-4">
                    <div class="flex items-center justify-between">
                        <h3 class=font-bold>{{ $note->title }}</h3>
                        <div>
                            @if ($note->pinned)
                                <svg wire:click='pin({{ $note->id }})' data-slot="icon" fill="currentColor"
                                    viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"
                                    class="w-5 h-5 text-red-500 cursor-pointer" aria-hidden="true">
                                    <path
                                        d="M2 6.342a3.375 3.375 0 0 1 6-2.088 3.375 3.375 0 0 1 5.997 2.26c-.063 2.134-1.618 3.76-2.955 4.784a14.437 14.437 0 0 1-2.676 1.61c-.02.01-.038.017-.05.022l-.014.006-.004.002h-.002a.75.75 0 0 1-.592.001h-.002l-.004-.003-.015-.006a5.528 5.528 0 0 1-.232-.107 14.395 14.395 0 0 1-2.535-1.557C3.564 10.22 1.999 8.558 1.999 6.38L2 6.342Z">
                                    </path>
                                </svg>
                            @else
                                <svg wire:click='pin({{ $note->id }})' data-slot="icon" fill="none"
                                    stroke-width="1.5" stroke="currentColor" viewBox="0 0 24 24"
                                    class="w-5 h-5 cursor-pointer" xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z">
                                    </path>
                                </svg>
                            @endif
                        </div>

                    </div>
                    <div>
                        <p>{{ $note->content }}</p>
                    </div>
                    <div class="flex justify-between items-center">
                        <div>
                            @foreach ($note->tags ?? [] as $tag)
                                <span class="bg-gray-500 px-2 py-1 rounded-sm">{{ $tag }}</span>
                            @endforeach
                        </div>
                        <div>
                            <label for="my_modal_{{ $note->id }}">

                                <svg data-slot="icon" fill="none" stroke-width="1.5" stroke="currentColor"
                                    viewBox="0 0 24 24" class="w-5 h-5 cursor-pointer"
                                    xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0">
                                    </path>
                                </svg>
                            </label>
                            <input type="checkbox" id="my_modal_{{ $note->id }}" class="modal-toggle" />
                            <div class="modal" role="dialog">
                                <div class="modal-box">
                                    <h3 class="text-lg font-bold">Do you want to delete this note</h3>
                                    <p class="py-4">{{ $note->title }} ?</p>
                                    <div class="modal-action">
                                        <label for="my_modal_{{ $note->id }}" class="btn btn-soft">Close</label>
                                        <label for="my_modal_{{ $note->id }}" class="btn btn-primary"
                                            wire:click='delete({{ $note->id }})'>Yes</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
        <div class="my-4 px-8">
            {{ $notes->links() }}
        </div>
    @endif
</div>
