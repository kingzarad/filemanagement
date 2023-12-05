<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class AuthController extends Controller
{
    public function Index()
    {

        return view('components.users', ['users' => User::orderBy('created_at', 'DESC')->get()]);
    }

    public function authenticate()
    {

        $validated = request()->validate([
            'username' => 'required|max:50',
            'password' => 'required|min:5|max:50'
        ]);

        if (auth()->attempt($validated)) {
            request()->session()->regenerate();
            return redirect()->route('dashboard')->with('success', 'Logged in successfully!');
        }

        return redirect()->route('login')->with('error', 'No matching user found with the provided username and password');
    }

    public function store()
    {
        request()->validate([
            'name' => 'required|min:5|max:50',
            'username' => [
                'required',
                'min:5',
                'max:30',
                Rule::unique('users', 'username'),
            ],
            'email' => [
                'required',
                'email',
                'max:50',
                Rule::unique('users', 'email'),
            ],
            'usertype' => 'required|min:5|max:50',
            'password' => 'required|min:5|max:50',
            'cpassword' => 'required|same:password|min:5|max:50',
        ], [
            'username.unique' => 'The username is already taken.',
            'email.unique' => 'The email is already taken.',
            'cpassword.same' => 'The password confirmation does not match.',
        ]);

        if (request('usertype') === 'superadmin') {
            $superadminCount = User::where('user_type', 'superadmin')->count();
            $maxSuperAdminCount = 2;

            if ($superadminCount >= $maxSuperAdminCount) {
                return redirect()->back()->withErrors(['usertype' => 'There can be at most ' . $maxSuperAdminCount . ' users with superadmin role.']);
            }
        }

        User::create([
            'username' => strtolower(request()->get('username')),
            'name' => request()->get('name'),
            'email' => request()->get('email'),
            'user_type' => request()->get('usertype'),
            'password' => Hash::make(request()->get('password'))
        ]);

        return redirect()->route('users.form')->with('success', 'Account created successfully!');
    }

    public function add()
    {
        return view('forms.create_users');
    }


    public function show(User $id)
    {
        return view('forms.update_users', ['users' => $id]);
    }


    public function update(User $users)
    {

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
                'max:50'
            ],

            'oldpassword' => 'nullable|min:5|max:50',
            'newpassword' => request('oldpassword') ? 'required|min:5|max:50' : 'nullable|min:5|max:50',
        ]);


        if (request('oldpassword') && !Hash::check(request('oldpassword'), $users->password)) {
            return redirect()->back()->withErrors(['oldpassword' => 'The old password is incorrect.']);
        }

        $users->name = request('name');
        $users->username = request('username');
        $users->email = request('email');
        $users->user_type = request('usertype_sub');
        $users->password = Hash::make(request('newpassword'));
        $users->save();
        return back()->with('success', 'User updated successfully!');
    }


    public function destroy(User $id)
    {
        $id->delete();
        return redirect()->route('users')->with('success', 'Delete successfully!');
    }

    public function superstore()
    {
        User::create([
            'username' => 'admin',
            'name' => 'admin',
            'email' => 'admin@admin.com',
            'password' => Hash::make('admin123'),
            'user_type' => 'superadmin'

        ]);
        return redirect()->route('login')->with('success', 'Account created successfully!');
    }

    public function logout()
    {
        auth()->logout();
        return redirect()->route('login');
    }

    public function Login()
    {
        return view('login');
    }
}
