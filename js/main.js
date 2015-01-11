require.config({
  paths: {
    jquery: 'libs/jquery/jquery',
    underscore: 'libs/underscore/underscore',
    backbone: 'libs/backbone/backbone',
    backbone_associations: 'libs/backbone/backbone-associations',
    kinetic: 'libs/kinetic/kinetic',
    bacon:'libs/bacon/bacon'
  },
    shims:{
        backbone_associations:{
            deps:["backbone"],
            exports:"Backbone"
        }
    }
});

require(['routes/router'],
    function(router){
    // Simple main loop for real-time updates. Replace later with RequestAnimationFrame.
    var ONE_FRAME_TIME = 200.0;
    function mainLoop(){
        router.update();
    }
    setInterval(mainLoop, ONE_FRAME_TIME);
});