<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Permission::create(['name' => 'create-books']);
        Permission::create(['name' => 'edit-books']);
        Permission::create(['name' => 'delete-books']);

        $author = Role::create(['name' => 'author']);
        $user = Role::create(['name' => 'user']);

        $author->givePermissionTo(['create-books', 'edit-books', 'delete-books']);
        $user->givePermissionTo('create-books');
    }
}
