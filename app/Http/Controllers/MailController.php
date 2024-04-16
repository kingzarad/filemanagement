<?php

namespace App\Http\Controllers;

use App\Mail\NotifMail;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class MailController extends Controller
{
    public function index(){
        $data = [
            'subject'=> 'Hello From Test',
            'body'=> 'Hello this body'
        ];

        try {
           Mail::to('kingzaradbiroin@gmail.com')->send(new NotifMail($data));
           return response()->json(['Check your mail box']);
        } catch (Exception $th) {
            return response()->json(['Sorry something went wrongwwwww']);
        }
    }
}
