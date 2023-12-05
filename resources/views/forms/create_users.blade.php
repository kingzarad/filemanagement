@extends('layouts.admin_layout')
@section('title', 'BPFM - HOME')
@section('content')
    <div class="row mt-5">
        <div class="col"></div>
        <div class="col">
            <div class="card mt-2">
                <div class="card-title p-2" style="background: #97ADBD">
                    <div class="d-flex justify-content-between">
                        <h5 class="text-white mt-2 mx-2">Add User</h5>
                        <a href="{{ route('users') }}" class="btn btn-re btn-sm" style="background: #2E4470">Back</a>
                    </div>
                </div>
                <div class="mx-3">
                    @include('shared.success')
                </div>
                <form method="POST" action="{{ route('users.store') }}" id="createUsersForm">
                    @csrf
                    @method('POST')
                    <div class="card-body pt-0">
                        <div class="row">
                            <div class="col-lg-12 p-3">
                                <div class="mb-3">
                                    <label for="name" class="form-label  mb-0"><strong>Name </strong></label>
                                    <input type="text" class="form-control " name="name" value="{{ old('name') }}">
                                    @error('name')
                                        <span class="d-block text-danger fs-6 mt-1">{{ $message }}</span>
                                    @enderror
                                </div>
                                <div class="mb-3">
                                    <label for="name" class="form-label  mb-0"><strong>Username</strong></label>
                                    <input type="text" class="form-control " name="username"
                                        value="{{ old('username') }}">
                                    @error('username')
                                        <span class="d-block text-danger fs-6 mt-1">{{ $message }}</span>
                                    @enderror
                                </div>
                                <div class="mb-3">
                                    <label for="name" class="form-label  mb-0"><strong>Email</strong></label>
                                    <input type="email" class="form-control " name="email" value="{{ old('email') }}">
                                    @error('email')
                                        <span class="d-block text-danger fs-6 mt-1">{{ $message }}</span>
                                    @enderror
                                </div>
                                <div class="mb-3">
                                    <label for="name" class="form-label  mb-0"><strong>User Type</strong></label>
                                    <select name="usertype" class="form-select">
                                        <option value="" selected>Choose...</option>
                                        <option value="administrator"
                                            {{ old('usertype') == 'administrator' ? 'selected' : '' }}>
                                            Administrator</option>
                                        <option value="superadmin"
                                            {{ old('usertype') == 'superadmin' ? 'selected' : '' }}>
                                            SuperAdmin </option>
                                    </select>
                                    @error('usertype')
                                        <span class="d-block text-danger fs-6 mt-1">{{ $message }}</span>
                                    @enderror
                                </div>
                                <div class="mb-3">
                                    <label for="name" class="form-label  mb-0"><strong>Password</strong></label>
                                    <input type="text" class="form-control " name="password">
                                    @error('password')
                                        <span class="d-block text-danger fs-6 mt-1">{{ $message }}</span>
                                    @enderror
                                </div>
                                <div class="mb-3">
                                    <label for="name" class="form-label  mb-0"><strong>Confirm Password</strong></label>
                                    <input type="text" class="form-control " name="cpassword">
                                    @error('cpassword')
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
