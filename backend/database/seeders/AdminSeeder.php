<?php

namespace Database\Seeders;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

/**
 * Class AdminSeeder
 *
 * @package Database\Seeders
 */
class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admin = new User();

        $admin->name = 'Admin';
        $admin->email = 'admin@admin.ro';
        $admin->password = Hash::make('parola');
        //merge sa te loghezi cu orice id din baza de date , am mai pus si adminul ca sa nu mai stau sa copiez emailurile de seederi 
        $admin->save();
    }
}