<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>@yield('title', '')</title>
    @include('layouts.libs.csslib')
</head>

<body class="fix-header card-no-border fix-sidebar">
    <div id="main-wrapper">
        @include('layouts.navbar')
        @yield('content')

        @include('layouts.footer')
    </div>
    @include('layouts.libs.jslib')
</body>

</html>
