<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@gmail.com',
            'phone' => '+880987645534',
            'address' => 'Dhaka, Bangladesh',
            'password' => bcrypt('password'),
            'is_active' => true,
            'is_administration' => true,
            'is_customer' => false,
        ]);

        $user->assignRole('administration');
    }
}
