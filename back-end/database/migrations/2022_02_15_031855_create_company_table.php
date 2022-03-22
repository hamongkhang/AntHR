<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCompanyTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('company', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name')->nullable();
            $table->text('domain')->nullable();
            $table->integer('size')->nullable();
            $table->string('logo')->nullable();
            $table->text('website')->nullable();
            $table->text('contact_email')->nullable();
            $table->string('contact_phone')->nullable();
            $table->text('over_view')->nullable();
            $table->text('permission')->nullable();
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
        Schema::dropIfExists('company');
    }
}
