<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDocumentFolderTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('document_folder', function (Blueprint $table) {
            $table->increments('id')->nullable();
            $table->text('name')->nullable();
            $table->text('description')->nullable();
            $table->integer('share')->nullable();
            $table->string('author')->nullable();
            $table->integer('sum')->nullable();
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
        Schema::dropIfExists('document_folder');
    }
}
