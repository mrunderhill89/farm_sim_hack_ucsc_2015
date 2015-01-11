define(['jquery', 'underscore', 'backbone', 'kinetic',
        'models/environment', 'views/kinetic/environ_view'], function($, _, Backbone, Kinetic, Environment, EnvironView){
    var Router = Backbone.Router.extend({
        routes: {
            "init": "initialize",
            "init/*params":"initialize",
            "time":"time",
            "*actions": "defaultRoute"
        },
        current_model: null,
        current_view: null,
        el: '',
        initialize: function(params){
            this.el = (params && params.el) || "view";
            this.stage = new Kinetic.Stage({
                container: this.el,
                width: (params && params.width) || 800,
                height: (params && params.height) || 800
            });
            this.reset(params);
            this.render();
        },
        reset: function(params){
            this.current_model = new Environment((params && params.environment));
            this.current_view = new EnvironView({model:this.current_model});
            return this;
        },
        render: function(){
            this.current_view.render();
            this.stage.add(this.current_view.layer);
            return this;
        },
        update: function(time){
            this.current_model.update(time);
            this.current_view.render();
        }
    });
    var app_router = new Router();
    //Creates a new environment and view, discarding the old one.
    app_router.on('route:initialize', function(params){
        console.log(params);
        app_router.reset().render();
    });
    //Catch anything the router didn't recognize and report it in the console.
    app_router.on('route:defaultRoute', function (actions) {
        //alert( actions ); 
    });
    
    Backbone.history.start();
    //We really should have only one router, so declare as singleton.
    return app_router;
});