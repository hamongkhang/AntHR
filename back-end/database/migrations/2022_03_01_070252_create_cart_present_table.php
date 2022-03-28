<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCartPresentTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cart_present', function (Blueprint $table) {
            $table->increments('id')->nullable();
            $table->integer('user_id')->unsigned();
            $table->integer('present_id')->unsigned();
            $table->integer('status')->nullable();
            $table->timestamps();   
            $table->foreign('user_id')
            ->references('id')
            ->on('users')
            ->onUpdate('cascade')
            ->onDelete('cascade'); 
            $table->foreign('present_id')
            ->references('id')
            ->on('present')
            ->onUpdate('cascade')
            ->onDelete('cascade'); 
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cart_present');
    }
}
