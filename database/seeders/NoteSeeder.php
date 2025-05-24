<?php

namespace Database\Seeders;

use App\Models\Note;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class NoteSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('notes')->truncate();
        $notes = [
            [
                'title' => 'Finish project',
                'content' => 'get my client project done and set up a brief meeting.',
                'tags' => ['freelance', 'work'],
                'user_id' => '1',
            ],
            [
                'title' => 'go to the GYM',
                'tags' => ['sport', 'fitness'],
                'pinned' => 1,
                'user_id' => '1',
            ],
            [
                'title' => 'Clean my room',
                'content' => 'Get the new cleaning product to wash the glass of my windows.',
                'user_id' => '1',
            ],
            [
                'title' => 'Write blog post',
                'content' => 'Draft a new post on productivity hacks for developers.',
                'tags' => ['writing', 'productivity'],
                'user_id' => '1',
            ],
            [
                'title' => 'Grocery shopping',
                'content' => 'Buy vegetables, fruits, eggs, and almond milk.',
                'tags' => ['errands'],
                'user_id' => '1',
            ],
            [
                'title' => 'Update portfolio',
                'content' => 'Add the recent freelance project and adjust layout on mobile.',
                'tags' => ['work', 'design'],
                'user_id' => '1',
            ],
            [
                'title' => 'Call Mom',
                'tags' => ['personal'],
                'pinned' => 1,
                'user_id' => '1',
            ],
            [
                'title' => 'Plan weekend trip',
                'content' => 'Search for hiking trails and book a rental car.',
                'tags' => ['leisure', 'planning'],
                'user_id' => '1',
            ],
            [
                'title' => 'Fix bike',
                'content' => 'Repair flat tire and adjust brakes.',
                'tags' => ['maintenance'],
                'user_id' => '1',
            ],
            [
                'title' => 'Read a chapter',
                'content' => 'Continue reading "Deep Work" by Cal Newport.',
                'tags' => ['reading', 'focus'],
                'user_id' => '1',
            ],
            [
                'title' => 'Meal prep',
                'tags' => ['health', 'routine'],
                'user_id' => '1',
            ],

        ];

        foreach ($notes as $note) {
            Note::create($note);
        }
    }
}
