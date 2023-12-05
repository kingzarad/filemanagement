@extends('layouts.admin_layout')
@section('title', 'BRGY POBLACION FILE MANAGEMENT')
@section('content')
    <div class="container-fluid">
        <div class="row page-titles">

            <div class="row">
                <!-- column -->
                <div class="col-12">
                    <div class="card shadow mt-3 mb-5">
                        <div class="card-body">
                            <h4 class="card-title m-0 p-0">
                                <div class="d-flex justify-content-between align-items-center">
                                    <h5 class="m-0 font-weight-bold"><strong>Users Management</strong></h5>
                                    <a class="btn btn-re" href="{{ route('users.form') }}"><i
                                            class="fa fa-plus-square"></i>&nbsp;User</a>
                                </div>
                            </h4>
                            <div class="table-responsive">
                                <table id="common_table" class="table table-bordered" width="100%">
                                    <thead class="thead-custom text-white">
                                        <tr>
                                            <th>#</th>
                                            <th>Username</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>UserType</th>
                                            <th>Created At</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th></th>
                                            <th>UserType</th>
                                            <th>Created At</th>
                                            <th>Action</th>
                                        </tr>
                                    </tfoot>
                                    <tbody>
                                        @foreach ($users as $index => $item)
                                            @if ( Str::ucfirst(Auth::user()->name) != Str::ucfirst($item->username) )
                                                <td>{{ $index + 1 }}</td>
                                                <td>{{ $item->username }}</td>
                                                <td>{{ $item->name }}</td>
                                                <td>{{ $item->email }}</td>
                                                <td>{{ $item->user_type }}</td>
                                                <td>{{ $item->created_at }}</td>
                                                <td>
                                                    <div class="d-flex justify-content-evenly align-items-center">
                                                        <a href="{{ route('users.show', $item->id) }}"  class="btn btn-sm btn-info text-white mr-3"
                                                            ><i class="fa fa-pencil-alt"></i></a>
                                                            <form id="deleteForm_{{ $item->id }}"
                                                                action="{{ route('users.destroy', $item->id) }}" method="POST">
                                                                @csrf
                                                                @method('DELETE')
                                                                <button type="button" class="btn btn-danger btn-sm mr-3"
                                                                    onclick="confirmAndSubmit('{{ $item->id }}')">
                                                                    <i class="fa fa-trash"></i>
                                                                </button>
                                                            </form>
                                                    </div>
                                                </td>
                                            @endif
                                        @endforeach
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

@endsection
<script>
    function confirmAndSubmit(itemId) {
        if (confirm('Are you sure you want to delete this user?')) {
            document.getElementById('deleteForm_' + itemId).submit();
        }
    }
</script>
