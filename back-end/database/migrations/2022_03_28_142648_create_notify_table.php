<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNotifyTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('notify', function (Blueprint $table) {
            $table->increments('id')->nullable();
            $table->integer('user_id')->unsigned();
            $table->integer('category')->nullable();
            $table->text('title')->nullable();
            $table->text('content')->nullable();
            $table->integer('status')->nullable();
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
        Schema::dropIfExists('notify');
    }
}
