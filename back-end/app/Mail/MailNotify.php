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
            return $this->from('web.vatly365@gmail.com')->view('mails.mailGetNewCode')->subject('[VatLy365]_Email xác nhận đăng kí');

        }
        else if ($this->data['description'] == 'notiRegisterSuccess'){
            return $this->from('web.vatly365@gmail.com')->view('mails.mailNotification')->subject('[VatLy365]_Thông báo đăng kí thành công');

        }
        else if ($this->data['description'] == 'notiChangePasswordSuccess'){
            return $this->from('web.vatly365@gmail.com')->view('mails.mailNotification')->subject('[VatLy365]_Thông báo cập nhật tài khoản');

        }
        else if($this->data['description'] == 'getCodeForgot'){
            return $this->from('web.vatly365@gmail.com')->view('mails.mailGetNewCode')->subject('[VatLy365]_Email xác nhận thay đổi');

        }
    }
}
