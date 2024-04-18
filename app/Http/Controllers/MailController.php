<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Exception;
use Carbon\Carbon;
use App\Models\TaskEvent;
use App\Notifications\notifBrgyTask;
use Illuminate\Support\Facades\Notification;
use Illuminate\Support\Facades\Queue;

class MailController extends Controller
{
    public function Send()
    {
        $task = TaskEvent::all();
        $currentDate = Carbon::now();

        foreach ($task as $item) {
            $scheduleDate = Carbon::parse($item->start_date);

            if ($currentDate->isSameDay($scheduleDate->subDay()) && $item->status != 1) {

                $employee = Employee::where('position_id', $item->position_id)->get();

                $title = strtoupper($item->name);
                $startTime = date('g:i A', strtotime($item->start_time));
                $startDate = date('F j, Y', strtotime($item->start_date));
                $endDate = date('F j, Y', strtotime($item->end_date));

                if ($startDate === $endDate) {
                    $dateRange = $startDate;
                } else {
                    $dateRange = "{$startDate} - {$endDate}";
                }

                foreach ($employee as $emp) {
                    $name = ucfirst(strtolower($emp->name));

                    $details = [
                        'greeting' => "TASK EVENT: {$title}",
                        'body' => "Name: {$name} <br> Time: {$startTime} <br> Date: {$dateRange}",
                        'lastline' => "Sent to all: {$item->position->name}",
                        'regards' => ''
                    ];

                    Queue::push(function () use ($emp, $details, $item) {
                        Notification::send($emp, new notifBrgyTask($details));
                        $item->status = 1;
                        $item->save();
                    });
                }
            }
        }
    }
}
