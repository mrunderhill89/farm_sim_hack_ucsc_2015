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
    var sample_soil = new Soil({plant:sample_plant, ph:6.0});
    var sample_environ = new Environment();
    sample_environ.get("garden").add(sample_soil);

    //var sample_environ_view = new EnvironView({el:'#view', model:sample_environ});
    //sample_environ_view.render();
    var sample_plant_view = new PlantView({el:'#view', model: sample_plant});

    // Simple main loop for real-time updates. Replace later with RequestAnimationFrame.
    var ONE_FRAME_TIME = 100.0;
    function mainLoop(){
        sample_environ.update(1.0);
        sample_plant_view.render();
    }
    setInterval(mainLoop, ONE_FRAME_TIME);
});