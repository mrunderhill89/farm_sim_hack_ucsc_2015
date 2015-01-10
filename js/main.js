require.config({
  paths: {
    jquery: 'libs/jquery/jquery',
    underscore: 'libs/underscore/underscore',
    backbone: 'libs/backbone/backbone',
  }
});

require(['jquery', 'underscore', 'backbone', 'models/plant', 'views/plant_view',
        'models/soil', 'views/soil_view', 'models/environment', 'views/environ_view'],
    function($, _, Backbone, Plant, PlantView, Soil, SoilView, Environment, EnvironView){
    var sample_plant = new Plant({species:"Lettuce"});
    var sample_soil = new Soil({plant:sample_plant});
    var sample_soil_view = new SoilView({el:'#view', model:sample_soil});
    var sample_environ = new Environment();
    var sample_environ_view = new EnvironView({el:'#env', model:sample_environ});

    sample_soil_view.render();
    sample_environ_view.render();
});