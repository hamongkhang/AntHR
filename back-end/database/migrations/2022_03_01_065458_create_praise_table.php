<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePraiseTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('praise', function (Blueprint $table) {
            $table->increments('id')->nullable();
            $table->integer('author')->nullable();
            $table->text('image')->nullable();
            $table->text('message')->nullable();
            $table->text('score')->nullable();
            $table->text('present')->nullable();
            $table->integer('recipient')->nullable();
            $table->text('cheer')->nullable();
            $table->integer('status')->nullable();
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
        Schema::dropIfExists('praise');
    }
}
