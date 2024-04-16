<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <title>@yield('title', '')</title>
    @livewireStyles
    <link href="https://cdn.jsdelivr.net/npm/@fullcalendar/core/main.css" rel="stylesheet">
    @include('layouts.libs.csslib')
    <style>
        #calendar {
            max-width: 1200px;

            height: 100% !important;
            margin-bottom: 300px !important;
        }

        .fc-event {
            background: red !important;
        }
    </style>
</head>

<body class="fix-header card-no-border fix-sidebar">
    <div id="main-wrapper">
        @include('layouts.navbar')
        @yield('content')

        @include('layouts.footer')
    </div>
    @livewireScripts

    <script src="https://cdn.jsdelivr.net/npm/fullcalendar@6.1.11/index.global.min.js"></script>


    @include('layouts.libs.jslib')
</body>

</html>
