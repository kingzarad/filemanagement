<div class="container-fluid">
    <div class="row page-titles">

        <div class="row">
            <!-- column -->
            <div class="col-12">
                <div class="card shadow mt-3 mb-5">
                    <div class="card-body">
                        <h4 class="card-title m-0 mb-4 p-0">
                            <div class="d-flex justify-content-between align-items-center">
                                <h5 class="m-0 font-weight-bold"><strong>Task Scheduler</strong></h5>
                                @if (Auth::user()->user_type == 'superadmin')
                                    <button class="btn btn-re" data-bs-toggle="modal" data-bs-target="#exampleModal"><i
                                            class="fas fa-plus-square"></i>&nbsp;Add Task</button>
                                @endif
                            </div>
                        </h4>
                        <hr>

                        <div id="calendar"></div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    @include('livewire.modal')
    <script>
        document.addEventListener('livewire:init', function() {
            var calendarEl = document.getElementById('calendar');

            var calendar = new FullCalendar.Calendar(calendarEl, {
                timeZone: 'UTC',
                initialView: 'dayGridMonth',
                events: @json($events),
                eventClick: function(info) {
                    console.log(info);

                }
            });

            calendar.render();




        });
    </script>

</div>
