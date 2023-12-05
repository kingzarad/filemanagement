<div class="container-fluid">
    <div class="row page-titles">

        <div class="row">
            <!-- column -->
            <div class="col-12">
                <div class="card shadow mt-3 mb-5">
                    <div class="card-body">
                        <h4 class="card-title m-0 p-0">
                            <div class="d-flex justify-content-between align-items-center">
                                <h5 class="m-0 font-weight-bold"><strong>Documents files Management</strong></h5>
                                <a class="btn btn-re" href="{{ route('files.form') }}"><i
                                        class="fa fa-plus-square"></i>&nbsp;Upload</a>
                            </div>
                        </h4>
                        <div class="table-responsive">
                            <table id="common_table" class="table table-bordered" width="100%">
                                <thead class="thead-custom text-white">
                                    <tr>
                                        <th>#</th>
                                        <th>File name</th>
                                        <th>File size</th>
                                        <th>File type</th>
                                        <th>Download</th>
                                        <th>Uploader</th>
                                        <th>Category</th>
                                        <th>Created At</th>

                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tfoot>
                                    <tr>
                                        <th></th>
                                        <th></th>
                                        <th></th>
                                        <th>File type</th>
                                        <th></th>
                                        <th>Uploader</th>
                                        <th>Category</th>
                                        <th>Created At</th>

                                        <th>Action</th>
                                    </tr>
                                </tfoot>
                                <tbody>
                                    @foreach ($files as $index => $item)
                                        <tr>
                                            <td>{{ $index + 1 }}</td>
                                            <td>{{ $item->filename }}</td>
                                            <td>{{ App\Helper\convertBytes($item->filesize) }}</td>
                                            <td>{{ $item->filetype }}</td>
                                            <td>{{ $item->download }}</td>
                                            <td>
                                                @foreach ($users_list as $user)
                                                    @if ($user->id == $item->users_id)
                                                        {{ $user->username }}
                                                    @endif
                                                @endforeach

                                            </td>
                                            <td>
                                                @foreach ($categories as $category)
                                                    @if ($category->id == $item->categories_id)
                                                        {{ $category->cname }}
                                                    @endif
                                                @endforeach

                                            </td>
                                            <td>{{ $item->created_at }}</td>
                                            <td>
                                                <div class="d-flex justify-content-evenly align-items-center">
                                                    <a href="{{ route('file.download', ['filename' => $item->upload_name]) }}"
                                                        class="btn btn-sm btn-info text-white mr-3"
                                                        data-bs-toggle="tooltip" data-bs-placement="bottom"
                                                        title="Download"><i class="fa fa-download"></i></a>

                                                    @if (Auth::user()->user_type == 'superadmin')
                                                        <form id="deleteForm_{{ $item->id }}"
                                                            action="{{ route('files.destroy', ['id' => $item->id]) }}"
                                                            method="POST">
                                                            @csrf
                                                            @method('DELETE')
                                                            <button type="button" class="btn  btn-sm btn-danger"
                                                                onclick="confirmAndSubmit('{{ $item->id }}')">
                                                                <i class="fas fa-trash-alt"></i>
                                                            </button>
                                                        </form>
                                                    @endif


                                                </div>
                                            </td>
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
<script>
    function confirmAndSubmit(itemId) {
        if (confirm('Are you sure you want to delete this file?')) {
            document.getElementById('deleteForm_' + itemId).submit();
        }
    }
    // Assuming you're using jQuery
    $(document).ready(function() {
        // Attach a click event to the download link
        $('#download-link').click(function(event) {
            event.preventDefault();

            // Perform an AJAX request to trigger the file download
            $.ajax({
                url: $(this).attr('href'),
                method: 'GET',
                success: function(data) {
                    // If download is successful, redirect to the dashboard
                    window.location.href = '{{ route('dashboard') }}';
                },
                error: function() {
                    // Handle error if needed
                    console.log('Error downloading file');
                }
            });
        });
    });
</script>
