<?php

namespace App\Http\Controllers;

use App\Models\Position;
use Illuminate\Http\Request;

class PositionController extends Controller
{
    public function Index()
    {
        return response()->view(
            'components.position',
            ['position' =>  Position::where('name', '!=', 'All')->orderBy('created_at', 'DESC')->get()]
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
                'regex:/^(?!.*(\w)\1{2,}).+$/'
            ],
        ], [
            'name.regex' => 'The name field cannot contain repeated characters.',
        ]);

        $existing = Position::where('name', request()->get('name'))->exists();

        if ($existing) {
            return redirect()->route('position.form')->with('error', 'Position with this name already exists.');
        }

        $emp = Position::create([
            'name' => request()->get('name')
        ]);

        $emp->save();
        return redirect()->route('position.form')->with('success', 'Position created successfully!');
    }

    public function destroy(Position $id)
    {
        $id->delete();
        return redirect()->route('position')->with('success', 'Delete successfully!');
    }

    public function update(Position $position)
    {
        request()->validate([
            'name' => 'required|min:5|max:50',

        ]);

        $position->name = request()->get('name', '');
        $position->save();
        return back()->with('success', 'Position updated successfully!');
    }

    public function show(Position $id)
    {
        return view('forms.update_position', ['position' => $id]);
    }

    public function add()
    {
        return view('forms.create_position');
    }
}
