<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\Position;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    public function Index()
    {
        return response()->view(
            'components.employee',
            ['employee' => Employee::orderBy('created_at', 'DESC')->get()]
        )->header('Cache-Control', 'no-cache, no-store, must-revalidate')
            ->header('Pragma', 'no-cache')
            ->header('Expires', '0');
    }

    public function store()
    {

        request()->validate([
            'name' => [
                'required',
                'min:5',
                'max:50',
                'regex:/^(?!.*([^\w\s])\1)(?!.*(\w)\2)\w+$/u',
            ],
            'email' => 'required|email',
            'position_id' => 'required'
        ], [
            'name.regex' => 'The name field cannot contain special characters or repeated characters.',
        ]);

        $existingEmployee = Employee::where('name', request()->get('name'))->where('email', request()->get('email'))->exists();

        if ($existingEmployee) {
            return redirect()->route('employee.form')->with('error', 'Employee with this email already exists.');
        }

        $emp = Employee::create([
            'name' => request()->get('name'),
            'email' => request()->get('email'),
            'position_id' => request()->get('position_id')
        ]);

        $emp->save();
        return redirect()->route('employee.form')->with('success', 'Employee created successfully!');
    }

    public function destroy(Employee $id)
    {
        $id->delete();
        return redirect()->route('employee')->with('success', 'Delete successfully!');
    }

    public function update(Employee $employee)
    {
        request()->validate([
            'name' => 'required|min:5|max:50',
            'email' => 'required|email',
            'position_id' => 'required'
        ]);

        $employee->name = request()->get('name', '');
        $employee->email = request()->get('email', '');
        $employee->position_id = request()->get('position_id', '');
        $employee->save();
        return back()->with('success', 'Employee updated successfully!');
    }

    public function show(Employee $id)
    {
        $positions = Position::where('name', '!=', 'All')->orderBy('created_at', 'DESC')->get();

        return view('forms.update_employee', ['employee' => $id, 'position' => $positions]);
    }

    public function add()
    {
        $positions = Position::where('name', '!=', 'All')->orderBy('created_at', 'DESC')->get();

        return view('forms.create_employee', ['position' => $positions]);
    }
}
