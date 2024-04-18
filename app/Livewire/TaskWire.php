<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\Position;
use App\Models\TaskEvent;

class TaskWire extends Component
{
    public $date, $events;
    public $name;
    public $start_time, $start_date, $end_date, $position_id;

    public function mount()
    {
        $this->loadEvents();
    }

    public function loadEvents()
    {

        $this->events = TaskEvent::where('status', '!=', 1)->get()->map(function ($event) {
            $startDateTime = $event->start_date . 'T' . $event->start_time;
            $endDateTime = $event->end_date . 'T' . $event->start_time;
            return [
                'title' => 'Title: ' . $event->name,
                'duration' => '02:00',
                'start' => $startDateTime,
                'end' => $endDateTime,
            ];
        })->toArray();

    }

    public function saveTask()
    {
        $validatedData = $this->validate([
            'name' => 'required|string|min:3',
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'start_time' => 'required',
            'position_id' => 'required',
        ]);

        $existing = TaskEvent::where('name', $validatedData['name'])
            ->where('start_date', $validatedData['start_date'])
            ->where('end_date', $validatedData['end_date'])
            ->where('status', 1)
            ->whereNotNull('start_date')
            ->whereNotNull('end_date')
            ->exists();

        if ($existing) {
            $this->dispatch('saveModal', ['status' => 'warning', 'position' => 'top', 'message' => 'Task already exists.']);
            return;
        }

        $taskData = [
            'name' => $validatedData['name'],
            'start_date' => $validatedData['start_date'],
            'end_date' => $validatedData['end_date'],
            'start_time' => $validatedData['start_time'],
            'position_id' => $validatedData['position_id'],
        ];

        TaskEvent::create($taskData);
        $this->resetInput();
        $this->redirect('task-calendar');
    }

    private function resetInput()
    {
        $this->reset([
            'name',
            'start_time',
            'start_date',
            'end_date'
        ]);
    }

    public function render()
    {
        return view('livewire.task-wire', ['position' => Position::orderBy('created_at', 'DESC')->get()]);
    }
}
