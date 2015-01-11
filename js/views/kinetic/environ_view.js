define(['backbone', 'kinetic', 
        'views/kinetic/layer_view', 
        'models/environment',
        'views/kinetic/soil_view','views/kinetic/plant_view'], function(Backbone, Kinetic, LayerView, Environment, SoilView, PlantView){
    var EnvironView = LayerView.extend({
        model: Environment,
        initialize: function(params){
            this.layer = new Kinetic.Layer();
            
            this.soil_view = new LayerView({
                model_view:SoilView,
                collection:this.model.get("garden")
            });
            this.layer.add(this.soil_view.layer);
            
            this.plant_view = new LayerView({
                model_view:PlantView,
                collection:this.model.get("plants")
            });
            this.layer.add(this.plant_view.layer);
        },
        render:function(){
            this.soil_view.render();
            this.plant_view.render();
        }
    });
    return EnvironView;
})