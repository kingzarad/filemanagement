@extends('layouts.admin_layout')
@section('title', 'BPFM - LOGIN')
@section('content')
    <div class="row mt-5">
        <div class="col"></div>
        <div class="col mb-5">
            <div class="card mt-5 mb-5">
                <div class="card-title p-2" style="background: #97ADBD">
                    <div class="d-flex justify-content-center">
                        <h5 class="text-white p-1 mt-1">Administrator | Login</h5>

                    </div>
                </div>
                <div class="mx-3">
                    @include('shared.error')
                </div>
                <form method="POST" action="{{ route('login') }}" id="loginForm">
                    @csrf
                    @method('POST')
                    <div class="card-body pt-0">
                        <div class="row p-3">
                            <div class="col-lg-12">
                                <div class="mb-3">
                                    <label for="name" class="form-label mt-2 mb-0"><strong>Username</strong></label>
                                    <input type="text" class="form-control" name="username" id="username" value="{{ old('username') }}" >
                                    @error('username')
                                    <span class="d-block text-danger fs-6 mt-1">{{ $message }}</span>
                                @enderror
                                </div>
                                <div class="mb-3">
                                    <label for="name" class="form-label mt-2 mb-0"><strong>Password</strong></label>
                                    <input type="password" class="form-control" name="password" id="password" >
                                    @error('password')
                                    <span class="d-block text-danger fs-6 mt-1">{{ $message }}</span>
                                @enderror
                                </div>
                                <div class="mb-3">
                                    <button type="submit" name="upload_btn" class="btn btn-re w-100">Login</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="col"></div>
    </div>
    <div class="d-none">
        <form action="{{ route('populate')}}" method="post">
            @csrf
            <button type="submit">Populate User</button>
        </form>
    </div>
@endsection
