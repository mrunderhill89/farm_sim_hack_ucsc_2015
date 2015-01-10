require.config({
  paths: {
    jquery: 'libs/jquery/jquery',
    underscore: 'libs/underscore/underscore',
    backbone: 'libs/backbone/backbone',
    backbone_associations: 'libs/backbone/backbone-associations',
    kinetic: 'libs/kinetic/kinetic'
  },
    shims:{
        backbone_associations:{
            deps:["backbone"],
            exports:"Backbone"
        }
    }
});

require(['jquery', 'underscore', 'backbone', 'models/plant', 'views/plant_view',
        'models/soil', 'views/soil_view', 'models/environment', 'views/environ_view', 'routes/router'],
    function($, _, Backbone, Plant, PlantView, Soil, SoilView, Environment, EnvironView, router){
    // Simple main loop for real-time updates. Replace later with RequestAnimationFrame.
    var ONE_FRAME_TIME = 100.0;
    function mainLoop(){
        router.update();
    }
    setInterval(mainLoop, ONE_FRAME_TIME);
});