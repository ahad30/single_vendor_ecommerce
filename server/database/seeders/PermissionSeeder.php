<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Permission::firstOrCreate(['name' => 'view permissions']);

        Permission::firstOrCreate(['name' => 'view role']);
        Permission::firstOrCreate(['name' => 'create role']);
        Permission::firstOrCreate(['name' => 'edit role']);
        Permission::firstOrCreate(['name' => 'delete role']);

        Permission::firstOrCreate(['name' => 'view user']);
        Permission::firstOrCreate(['name' => 'create user']);
        Permission::firstOrCreate(['name' => 'edit user']);
        Permission::firstOrCreate(['name' => 'delete user']);

        Permission::firstOrCreate(['name' => 'view category']);
        Permission::firstOrCreate(['name' => 'create category']);
        Permission::firstOrCreate(['name' => 'edit category']);
        Permission::firstOrCreate(['name' => 'delete category']);

        Permission::firstOrCreate(['name' => 'view brand']);
        Permission::firstOrCreate(['name' => 'create brand']);
        Permission::firstOrCreate(['name' => 'edit brand']);
        Permission::firstOrCreate(['name' => 'delete brand']);

        Permission::firstOrCreate(['name' => 'view attribute']);
        Permission::firstOrCreate(['name' => 'create attribute']);
        Permission::firstOrCreate(['name' => 'edit attribute']);
        Permission::firstOrCreate(['name' => 'delete attribute']);

        Permission::firstOrCreate(['name' => 'view product']);
        Permission::firstOrCreate(['name' => 'create product']);
        Permission::firstOrCreate(['name' => 'edit product']);
        Permission::firstOrCreate(['name' => 'delete product']);

        Permission::firstOrCreate(['name' => 'view package']);
        Permission::firstOrCreate(['name' => 'create package']);
        Permission::firstOrCreate(['name' => 'edit package']);
        Permission::firstOrCreate(['name' => 'delete package']);

        Permission::firstOrCreate(['name' => 'view slider']);
        Permission::firstOrCreate(['name' => 'create slider']);
        Permission::firstOrCreate(['name' => 'edit slider']);
        Permission::firstOrCreate(['name' => 'delete slider']);

        Permission::firstOrCreate(['name' => 'view customer']);
        Permission::firstOrCreate(['name' => 'create customer']);
        Permission::firstOrCreate(['name' => 'edit customer']);
        Permission::firstOrCreate(['name' => 'delete customer']);
    }
}
