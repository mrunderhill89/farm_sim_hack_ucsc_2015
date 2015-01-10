require.config({
  paths: {
    jquery: 'libs/jquery/jquery',
    underscore: 'libs/underscore/underscore-min',
    backbone: 'libs/backbone/backbone-min',
  }
});

require(['jquery', 'underscore', 'backbone'], function($, _, Backbone){
    console.log("JS seems to be working.");
    $("#view").html("Hello World!");
});