@extends('layouts.admin_layout')
@section('title', 'BPFM - HOME')
@section('content')
    <div class="row mt-5">
        <div class="col"></div>
        <div class="col">
            <div class="card mt-5">
                <div class="card-title p-2" style="background: #97ADBD">
                    <div class="d-flex justify-content-between">
                        <h5 class="text-white mt-2 mx-2">Add Category</h5>
                        <a href="{{ route('category') }}" class="btn btn-re btn-sm" style="background: #2E4470">Back</a>
                    </div>
                </div>
                <div class="mx-3">
                    @include('shared.success')
                </div>
                <form method="POST"  action="{{ route('category.store') }}" id="createCategoryModalForm">
                    @csrf
                    @method('POST')
                    <div class="card-body pt-0">
                        <div class="row">
                            <div class="col-lg-12 p-3">
                                <div class="mb-3">
                                    <label for="name" class="form-label mt-3 mb-0"><strong>Category
                                            name</strong></label>
                                    <input type="text" class="form-control mt-2" name="cname"  >
                                    @error('cname')
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
@endsection
