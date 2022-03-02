<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePresentTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('present', function (Blueprint $table) {
            $table->increments('id')->nullable();
            $table->integer('category_id')->unsigned();
            $table->text('name')->nullable();
            $table->text('image')->nullable();
            $table->text('price')->nullable();
            $table->integer('author')->nullable();
            $table->text('description')->nullable();
            $table->text('score')->nullable();
            $table->integer('status')->nullable();
            $table->timestamps();   
            $table->foreign('category_id')
            ->references('id')
            ->on('present_category')
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
        Schema::dropIfExists('present');
    }
}
