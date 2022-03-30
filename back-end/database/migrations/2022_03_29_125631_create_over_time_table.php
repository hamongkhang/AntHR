<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOverTimeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('over_time', function (Blueprint $table) {
            $table->increments('id')->nullable();
            $table->integer('user_id')->unsigned();
            $table->text('date_to')->nullable();
            $table->text('date_from')->nullable();
            $table->text('time_from')->nullable();
            $table->text('time_to')->nullable();
            $table->text('status')->nullable();
            $table->foreign('user_id')
            ->references('id')
            ->on('users')
            ->onUpdate('cascade')
            ->onDelete('cascade');
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
        Schema::dropIfExists('over_time');
    }
}
