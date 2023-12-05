@extends('layouts.admin_layout')
@section('title', 'BPFM - HOME')
@section('content')
    <div class="row mt-5">
        <div class="col"></div>
        <div class="col">
            <div class="card mt-5">
                <div class="card-title p-2" style="background: #97ADBD">
                    <div class="d-flex justify-content-between">
                        <h5 class="text-white mt-2 mx-2">Upload Files</h5>
                        <a href="{{ route('dashboard') }}" class="btn btn-re btn-sm" style="background: #2E4470">Back</a>
                    </div>
                </div>
                <div class="mx-3">
                    @include('shared.success')
                    @include('shared.error')
                </div>
                <form method="POST" action="{{ route('files.store') }}" enctype="multipart/form-data" id="uploadModalForm">
                    @csrf
                    @method('POST')
                    <div class="card-body pt-0">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="mb-3">
                                    <label for="name" class="form-label mt-2 mb-0"><strong>File
                                            name</strong></label>
                                    <input type="text" class="form-control" name="filename" id="filename" value="{{ old('filename') }}" >
                                    @error('filename')
                                        <span class="d-block text-danger fs-6 mt-1">{{ $message }}</span>
                                    @enderror
                                </div>
                                <div class="mb-3">
                                    <label for="" class="form-label">Category</label>

                                    <select name="categories_id" class="form-select">
                                        <option value="" selected>Choose...</option>
                                        @foreach ($categories as $category)
                                            <option value="{{ $category->id }}">
                                                {{ $category->cname }}</option>
                                        @endforeach
                                    </select>
                                    @error('categories_id')
                                        <span class="d-block text-danger fs-6 mt-1">{{ $message }}</span>
                                    @enderror
                                </div>
                                <div class="mb-3 mt-3">

                                    <label for="file" class="form-label"><strong>Select file to
                                            upload:</strong></label>
                                    <p>File Type:.docx .doc .pptx .ppt .xlsx .xls .pdf .odt</p>
                                    <input type="file" name="ufile" id="ufile" class="form-control"
                                        accept=".docx,.doc,.pptx,.ppt,.xlsx,.xls,.pdf,.odt" >
                                    @error('ufile')
                                        <span class="d-block text-danger fs-6 mt-1">{{ $message }}</span>
                                    @enderror

                                </div>


                                <div class="mb-3">
                                    <button type="submit" name="upload_btn" class="btn btn-re w-100">Save</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="col"></div>
    </div>
    <div class="row mt-5">
        <div class="col-sm-12 mt-5">&nbsp;</div>
    </div>
@endsection
