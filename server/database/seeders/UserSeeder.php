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
        // Super User
        $user = User::factory()->create([
            'id' => 1,
            'name' => 'Admin User',
            'email' => 'admin@gmail.com',
            'phone' => '+880987645534',
            'address' => 'Dhaka, Bangladesh',
            'password' => bcrypt('password'),
            'is_active' => true,
            'is_customer' => false,
            'is_staff' => true,
            'is_administration' => true,
        ]);

        $user->assignRole('administration');


        // customer user
        User::factory()->create([
            'id' => 2,
            'name' => 'Customer',
            'email' => 'customer@gmail.com',
            'phone' => '+880987645000',
            'address' => 'Dhaka, Bangladesh',
            'password' => bcrypt('password'),
            'is_active' => true,
            'is_customer' => true,
        ]);
    }
}
