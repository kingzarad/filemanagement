<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use Illuminate\Http\Request;

class CategoryController extends Controller
{

    public function Index()
    {
        return view('components.category', ['categories' => Categories::orderBy('created_at', 'DESC')->get()]);
    }

    public function store()
    {

        request()->validate([
            'cname' => 'required|min:5|max:50'
        ], [
            'cname.required' => 'The category field is required.',
        ]);

        $categories = Categories::create([
            'cname' => request()->get('cname')
        ]);

        $categories->save();
        return redirect()->route('category.form')->with('success', 'Category created successfully!');
    }

    public function destroy(Categories $id)
    {
        $id->delete();
        return redirect()->route('category')->with('success', 'Delete successfully!');
    }

    public function update(Categories $category)
    {
        request()->validate([
            'cname' => 'required|min:5|max:50'
        ], [

            'cname.required' => 'The category field is required.',
        ]);

        $category->cname = request()->get('cname', '');
        $category->save();
        return back()->with('success', 'Category updated successfully!');

    }

    public function show(Categories $id)
    {
        return view('forms.update_category', ['category' => $id]);
    }


    public function add()
    {
        return view('forms.create_category');
    }
}
