@extends('layouts.admin_layout')
@section('title', 'BRGY POBLACION FILE MANAGEMENT')
@section('content')
    <div class="row mt-5">
        <div class="col"></div>
        <div class="col">
            <div class="card mt-2">
                <div class="card-title p-2" style="background: #2E4470">
                    <div class="d-flex justify-content-between">
                        <h5 class="text-white mt-2 mx-2">Account Profile</h5>
                        <a href="{{ route('dashboard') }}" class="btn btn-re btn-sm" style="background: #97ADBD">Back</a>
                    </div>
                </div>

                <div class="mx-3">
                    @include('shared.error')
                    @include('shared.success')
                </div>
                <form method="POST" action="{{ route('profile.update', $users->id) }}" id="updateUsersForm">
                    @csrf
                    @method('PUT')
                    <div class="card-body pt-0">
                        <div class="row">
                            <div class="col-lg-12 p-3">
                                <div class="mb-3">
                                    <label for="name" class="form-label  mb-0"><strong>Name </strong></label>
                                    <input type="text" class="form-control " name="name" value="{{ $users->name }}"
                                        required>
                                    @error('name')
                                        <span class="d-block text-danger fs-6 mt-1">{{ $message }}</span>
                                    @enderror
                                </div>
                                <div class="mb-3">
                                    <label for="name" class="form-label  mb-0"><strong>Username</strong></label>
                                    <input type="text" class="form-control" value="{{ $users->username }}"
                                        name="username" readonly required>
                                    @error('username')
                                        <span class="d-block text-danger fs-6 mt-1">{{ $message }}</span>
                                    @enderror
                                </div>
                                <div class="mb-3">
                                    <label for="name" class="form-label  mb-0"><strong>Email</strong></label>
                                    <input type="email" class="form-control " value="{{ $users->email }}" name="email"
                                        required>
                                    @error('email')
                                        <span class="d-block text-danger fs-6 mt-1">{{ $message }}</span>
                                    @enderror
                                </div>
                                <div class="mb-3">
                                    <label for="name" class="form-label  mb-0"><strong>User Type</strong></label>
                                    <select name="usertype" class="form-select" disabled>
                                        <option value="" selected>Choose...</option>
                                        <option value="administrator"
                                            {{ old('usertype', $users->user_type) == 'administrator' ? 'selected' : '' }}>
                                            Administrator</option>
                                        <option value="superadmin"
                                            {{ old('usertype', $users->user_type) == 'superadmin' ? 'selected' : '' }}>
                                            SuperAdmin </option>
                                    </select>
                                    <input type="hidden" name="usertype_sub" value="{{ $users->user_type }}" >
                                    @error('usertype')
                                        <span class="d-block text-danger fs-6 mt-1">{{ $message }}</span>
                                    @enderror
                                </div>
                                <div class="mb-3">
                                    <hr>
                                    <label for="name" class="form-label  mb-0 text-warning"><strong>Change
                                            Password</strong></label>
                                    <hr>
                                </div>
                                <div class="mb-3">
                                    <label for="name" class="form-label  mb-0"><strong>Old Password</strong></label>
                                    <input type="text" class="form-control " name="oldpassword" >
                                    @error('oldpassword')
                                        <span class="d-block text-danger fs-6 mt-1">{{ $message }}</span>
                                    @enderror
                                </div>
                                <div class="mb-3">
                                    <label for="name" class="form-label  mb-0"><strong>New Password</strong></label>
                                    <input type="text" class="form-control " name="newpassword" >
                                    @error('newpassword')
                                        <span class="d-block text-danger fs-6 mt-1">{{ $message }}</span>
                                    @enderror
                                </div>
                                <div class="mb-3">
                                    <button type="submit" name="upload_btn" class="btn btn-re w-100">Update</button>
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
