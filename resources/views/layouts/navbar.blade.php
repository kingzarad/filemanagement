<header class="topbar">
    <div class="boxTopNav ">
        <h1>&nbsp;</h1>
    </div>
    <nav class="navbar top-navbar navbar-expand-md navbar-light">
        <div class="navbar-header d-flex justify-content-start align-items-center gap-3">
            <a class="navbar-brand" href="{{ route('dashboard') }}">
                <img src="{{ asset('images/logo.ico') }}" alt="LOGO" class="logo" />
            </a>
            <div class="title-container">
                <h3><strong>BRGY POBLACION FILE MANAGEMENT</strong></h3>
            </div>
        </div>

        <div class="navbar-collapse ">
            @auth
                <ul class="navbar-nav ">

                    <li class="nav-item dropdown account u-pro">
                        <a class="nav-link dropdown-toggle waves-effect waves-dark  profile-pic"
                            href="{{ route('dashboard') }}"> <span
                                class="{{ request()->is('/') || request()->is('files*') ? 'active-navbar' : '' }} ">File
                                Management</span></a>
                    </li>
                    <li class="nav-item dropdown account u-pro">
                        <a class="nav-link dropdown-toggle waves-effect waves-dark  profile-pic"
                            href="{{ route('task') }}"> <span
                                class="{{ request()->is('task') || request()->is('task') ? 'active-navbar' : '' }} ">
                                Task</span></a>
                    </li>
                    <li class="nav-item dropdown account u-pro">
                        <a class="nav-link dropdown-toggle waves-effect waves-dark profile-pic" href="#"
                            id="navbarDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <span
                                class="{{ request()->is('category*') || request()->is('users*') ? 'active-navbar' : '' }}">Management</span></a>
                        <ul class="dropdown-menu " aria-labelledby="navbarDropdown">
                            <li>
                                <a class="btn btn-sm btn-outline m-2 btn-drop waves-effect waves-dark "
                                    href="{{ route('employee') }}"><span>Employee</span> </a>
                            </li>
                            <li>
                                <a class="btn btn-sm btn-outline m-2 btn-drop waves-effect waves-dark "
                                    href="{{ route('category') }}"><span>Category</span> </a>
                            </li>
                            <li class="d-none">
                                @if (Auth::user()->user_type == 'superadmin')
                                    <a class="btn btn-sm btn-outline m-2 btn-drop waves-effect waves-dark "
                                        href="{{ route('users') }}"><span>Users</span> </a>
                                @endif

                            </li>


                        </ul>
                    </li>
                    </li>
                    <li class="nav-item dropdown account u-pro">
                        <a class="nav-link dropdown-toggle waves-effect waves-dark profile-pic" href="#"
                            id="navbarDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> <span
                                class="{{ request()->is('profile') ? 'active-navbar' : '' }}">Account <span
                                    class="text-warning">( {{ Str::ucfirst(Auth::user()->name) }})</span></span></a>
                        <ul class="dropdown-menu " aria-labelledby="navbarDropdown">
                            <li>
                                <a class="btn btn-sm btn-outline m-2 btn-drop waves-effect waves-dark "
                                    href="{{ route('profile') }}"><span>VIEW / EDIT</span> </a>
                            </li>

                            <li class="nav-item ">
                                <form action="{{ route('logout') }}" method="post">
                                    @csrf
                                    <button class="btn btn-sm btn-outline m-2  btn-drop logout waves-effect waves-dark"
                                        type="submit">
                                        <span>LOGOUT</span>
                                    </button>
                                </form>

                            </li>
                        </ul>
                    </li>
                </ul>
            @endauth

            @guest
                <ul class="navbar-nav ">

                    <li class="nav-item dropdown account u-pro">
                        <a class="nav-link dropdown-toggle waves-effect waves-dark  profile-pic" href="javascript:void(0)">
                            <span class="">&nbsp;</span></a>
                    </li>


                </ul>
            @endguest
        </div>

    </nav>
</header>
