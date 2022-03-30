<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTimeOffTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('time_off', function (Blueprint $table) {
            $table->increments('id')->nullable();
            $table->integer('user_id')->nullable();
            $table->text('date_to')->nullable();
            $table->text('date_from')->nullable();
            $table->text('time_from')->nullable();
            $table->text('time_to')->nullable();
            $table->text('note')->nullable();
            $table->text('status')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('time_off');
    }
}
