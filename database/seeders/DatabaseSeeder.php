<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use App\Models\Position;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        if (!User::where('username', 'admin')->exists() && !User::where('email', 'admin@admin.com')->exists()) {
            User::create([
                'username' => 'admin',
                'name' => 'admin',
                'email' => 'admin@admin.com',
                'password' => Hash::make('admin123'),
                'user_type' => 'superadmin'
            ]);
        }

        if (!Position::where('name', 'All')->exists()) {
            Position::create([
                'name' => 'All'
            ]);
        }
    }
}
