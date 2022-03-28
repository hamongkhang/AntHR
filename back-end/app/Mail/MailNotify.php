<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class MailNotify extends Mailable
{
    use Queueable, SerializesModels;

    public $data;
   /**
    * Create a new data instance.
    *
    * @return void
    */

   public function __construct($data)
   {
       $this->data = $data;
   }

   /**
    * Build the message.
    *
    * @return $this
    */
    public function build()
    {
        if($this->data['description'] == 'getNewCode'){
            return $this->from('anthrcloverteam@gmail.com')->view('mails.mailGetNewCode')->subject('[AntHR-CloverTeam]_Email register verification');

        }
        else if ($this->data['description'] == 'notiRegisterSuccess'){
            return $this->from('anthrcloverteam@gmail.com')->view('mails.mailNotification')->subject('[AntHR-CloverTeam]_Successful register');

        }
        else if ($this->data['description'] == 'notiChangePasswordSuccess'){
            return $this->from('anthrcloverteam@gmail.com')->view('mails.mailNotification')->subject('[AntHR-CloverTeam]_Update account');

        }
        else if($this->data['description'] == 'getCodeForgot'){
            return $this->from('anthrcloverteam@gmail.com')->view('mails.mailGetNewCode')->subject('[AntHR-CloverTeam]_Email confirm the change');
        }
        else if($this->data['description'] == 'createNewEmployee'){
            return $this->from('anthrcloverteam@gmail.com')->view('mails.mailNotification')->subject('[AntHR-CloverTeam]_Email create new employee');
        }
    }
}
