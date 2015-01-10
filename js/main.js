require.config({
  paths: {
    jquery: 'libs/jquery/jquery',
    underscore: 'libs/underscore/underscore',
    backbone: 'libs/backbone/backbone',
  }
});

require(['jquery', 'underscore', 'backbone', 'models/plant', 'views/plant_view',
        'models/soil', 'views/soil_view', 'models/environment', 'views/environ_view', 'routes/router'],
    function($, _, Backbone, Plant, PlantView, Soil, SoilView, Environment, EnvironView, router){
/*
    var sample_plant = new Plant({species:"Lettuce"});
    var sample_soil = new Soil({plant:sample_plant, ph:7.0});
    var sample_environ = new Environment();
    sample_environ.get("garden").add(sample_soil);
*/
    // Simple main loop for real-time updates. Replace later with RequestAnimationFrame.
    var ONE_FRAME_TIME = 100.0;
    function mainLoop(){
        router.update();
    }
    setInterval(mainLoop, ONE_FRAME_TIME);
});