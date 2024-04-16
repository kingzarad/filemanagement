<?php

namespace App\Livewire;

use App\Models\TaskEvent;
use Livewire\Component;

class TaskWire extends Component
{
    public $date, $events;
    public $name;
    public $start_time, $start_date, $end_date;



    public function mount()
    {
        $this->loadEvents();
    }

    public function loadEvents()
    {

        $this->events = TaskEvent::all()->map(function ($event) {
            $startDateTime = $event->start_date . 'T' . $event->start_time;
            $endDateTime = $event->end_date . 'T' . $event->start_time;
            return [
                'title' => 'Title: ' . $event->name,
                'duration'=>'02:00',
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
            'start_time' => 'required'
        ]);

        $existing = TaskEvent::where('name', $validatedData['name'])
            ->where('start_date', $validatedData['start_date'])
            ->where('end_date', $validatedData['end_date'])
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
            'start_time' => $validatedData['start_time']
        ];

        TaskEvent::create($taskData);
        $this->resetInput();
        $this->redirect('task');

    }

    private function resetInput()
    {
        $this->reset(['name',
        'start_time',
        'start_date',
        'end_date']);
    }

    public function render()
    {
        return view('livewire.task-wire');
    }
}
