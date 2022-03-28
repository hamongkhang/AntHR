<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDocumentTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('document', function (Blueprint $table) {
            $table->increments('id')->nullable();
            $table->text('name')->nullable();
            $table->text('name_show')->nullable();
            $table->text('size')->nullable();
            $table->integer('folder_id')->unsigned();
            $table->timestamps();   
            $table->foreign('folder_id')
            ->references('id')
            ->on('document_folder')
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
        Schema::dropIfExists('document');
    }
}
