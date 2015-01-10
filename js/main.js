require.config({
  paths: {
    jquery: 'libs/jquery/jquery',
    underscore: 'libs/underscore/underscore',
    backbone: 'libs/backbone/backbone',
  }
});

require(['jquery', 'underscore', 'backbone', 'models/plant', 'views/plant_view'], function($, _, Backbone, Plant, PlantView){
    var sample_plant = new Plant({species:"Lettuce"});
    var sample_plant_view = new PlantView({model: sample_plant, el:"#view"});
    sample_plant_view.render();
});