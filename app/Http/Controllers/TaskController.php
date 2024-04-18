<?php

namespace App\Http\Controllers;

use App\Http\Controllers\MailController;
use App\Models\TaskEvent;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function Index()
    {
        $mailController = new MailController();
        $mailController->Send();

        return response()->view(
            'components.task'
        )->header('Cache-Control', 'no-cache, no-store, must-revalidate')
            ->header('Pragma', 'no-cache')
            ->header('Expires', '0');
    }

    public function History()
    {
        // $mailController = new MailController();
        // $mailController->Send();

        return response()->view(
            'components.taskhistory',
            ['taskevent' => TaskEvent::orderBy('created_at', 'DESC')->get()]
        )->header('Cache-Control', 'no-cache, no-store, must-revalidate')
            ->header('Pragma', 'no-cache')
            ->header('Expires', '0');
    }

    public function destroy(TaskEvent $id)
    {
        $id->delete();
        return redirect()->route('taskHistory')->with('success', 'Delete successfully!');
    }
}
