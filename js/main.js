require.config({
  paths: {
    jquery: 'libs/jquery/jquery',
    underscore: 'libs/underscore/underscore',
    backbone: 'libs/backbone/backbone',
  }
});

require(['jquery', 'underscore', 'backbone'], function($, _, Backbone){
    console.log("JS seems to be working.");
    $("#view").html("Hello World!");
});