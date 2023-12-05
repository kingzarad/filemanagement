<?php

namespace App\Http\Controllers;

use App\Models\Files;
use Illuminate\Http\Request;
use App\Models\Categories;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class FilesController extends Controller
{
    public function Index()
    {
        return view('dashboard', [
            'categories' => Categories::orderBy('created_at', 'DESC')->get(),
            'files' => Files::orderBy('created_at', 'DESC')->get(),
            'users_list' => User::orderBy('created_at', 'DESC')->get(),
        ]);
    }


    public function Store()
    {

        request()->validate([
            'filename' => 'required|string|min:5|max:255',
            'categories_id' => 'required',
            'ufile' => 'required',
        ], [

            'categories_id.required' => 'The category field is required.',
            'ufile.required' => 'The file field is required.',
        ]);

        // Get the file details
        $filename = request()->get('filename');
        $originalFileName = request()->file('ufile')->getClientOriginalName();
        $fileSize = request()->file('ufile')->getSize();

        $existingFile = Files::where('filename', $filename)->first();

        if ($existingFile) {
            return back()->with('error', 'File with the same name already exists.');
        }


        $filenamec = str_replace(' ', '_', $filename);
        $ext = strtolower(pathinfo($originalFileName, PATHINFO_EXTENSION));
        $unique = date('YmdHis');
        $fileNameNew = $filenamec . '_' . $unique . '.' . $ext;


        $files = Files::create([
            'filename' => strtolower($filename),
            'filesize' =>  $fileSize,
            'filetype' => $ext,
            'download' => 0,
            'users_id' => Auth::user()->id,
            'categories_id' => request()->get('categories_id'),
            'upload_name' => strtolower($fileNameNew),
        ]);

        if ($files->save()) {
            $uploadedFile = request()->file('ufile')->storeAs('uploads', $fileNameNew, 'public');
        }

        return back()->with('success', 'Files created successfully!');
    }

    public function destroy(Files $id)
    {
        $file = $id;

        Storage::delete('public/uploads/' . $file->upload_name);
        $id->delete();
        return redirect()->route('dashboard')->with('success', 'Delete successfully!');
    }

    public function update(files $category)
    {
        // not implemented
    }

    public function show(Files $id)
    {
        return view('forms.update_files', ['files' => $id]);
    }


    public function add()
    {
        return view('forms.create_files', ['categories' => Categories::orderBy('created_at', 'DESC')->get()]);
    }

    public function downloadFile($filename)
    {
        $filePath = 'public/uploads/' . $filename;

        if (Storage::exists($filePath)) {
            $fileContents = Storage::get($filePath);


            Files::where('upload_name', $filename)->increment('download');

            return response()->stream(
                function () use ($fileContents) {
                    echo $fileContents;
                },
                200,
                [
                    'Content-Type' => Storage::mimeType($filePath),
                    'Content-Disposition' => 'attachment; filename="' . $filename . '"',
                ]
            );
        }

        abort(404, 'File not found');
    }
}
