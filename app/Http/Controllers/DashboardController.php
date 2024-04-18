<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;


class DashboardController extends Controller
{
    public function profile()
    {
        $user = User::find(Auth::user()->id);
        return response()->view('components.profile', ['users' => $user])->header('Cache-Control', 'no-cache, no-store, must-revalidate')
        ->header('Pragma', 'no-cache')
        ->header('Expires', '0');
    }

    public function update(User $id)
    {
        $users = $id;

        request()->validate([
            'name' => 'required|min:5|max:50',
            'username' => [
                'required',
                'min:5',
                'max:30'
            ],
            'email' => [
                'required',
                'email',
                'max:50',
                Rule::unique('users')->ignore($users->id),
            ],

            'oldpassword' => 'nullable|min:5|max:50',
            'newpassword' => request('oldpassword') ? 'required|min:5|max:50' : 'nullable|min:5|max:50',
        ]);

        $users->name = request('name');
        $users->username = request('username');
        $users->user_type = request('usertype_sub');

        if (request('oldpassword') && !Hash::check(request('oldpassword'), $users->password)) {
            return redirect()->back()->withErrors(['oldpassword' => 'The old password is incorrect.']);
        }

        if (request('newpassword')) {
            // Update the password only if a new password is provided
            $users->password = Hash::make(request('newpassword'));
        }

        $users->save();

        return redirect()->route('profile')->with('success', 'Account updated successfully!');
    }
}
