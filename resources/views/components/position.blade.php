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
                                    <h5 class="m-0 font-weight-bold"><strong>Position</strong></h5>
                                    @if (Auth::user()->user_type == 'superadmin')
                                        <a class="btn btn-re" href="{{ route('position.form') }}"><i
                                                class="fas fa-plus-square"></i>&nbsp;Position</a>
                                    @endif
                                </div>
                            </h4>
                            <div class="table-responsive">
                                <table id="common_table" class="table table-bordered" width="100%">
                                    <thead class="thead-custom text-white">
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>

                                            <th>Created At</th>
                                            @if (Auth::user()->user_type == 'superadmin')
                                                <th>Action</th>
                                            @endif
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr>
                                            <th></th>
                                            <th></th>
                                            <th>Created At</th>
                                            @if (Auth::user()->user_type == 'superadmin')
                                                <th></th>
                                            @endif
                                        </tr>
                                    </tfoot>
                                    <tbody>
                                        @foreach ($position as $index => $item)
                                            <tr>
                                                <td>{{ $index + 1 }}</td>
                                                <td>{{ $item->name }}</td>

                                                <td>{{ $item->created_at }}</td>
                                                @if (Auth::user()->user_type == 'superadmin' &&  $item->name != "All")
                                                    <td class="text-center">

                                                        <div class="d-flex">
                                                            <a class="btn text-success"
                                                                href="{{ route('position.show', $item->id) }}">
                                                                <i class="fas fa-pencil-alt"></i>
                                                            </a>

                                                            <form id="deleteForm_{{ $item->id }}"
                                                                action="{{ route('position.destroy', $item->id) }}"
                                                                method="POST">
                                                                @csrf
                                                                @method('DELETE')
                                                                <button type="button" class="btn text-danger"
                                                                    onclick="confirmAndSubmit('{{ $item->id }}')">
                                                                    <i class="fas fa-trash-alt"></i>
                                                                </button>
                                                            </form>

                                                        </div>

                                                    </td>
                                                @endif
                                            </tr>
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
        if (confirm('Are you sure you want to delete this position?')) {
            document.getElementById('deleteForm_' + itemId).submit();
        }
    }
</script>
