define(['backbone', 'kinetic', 
        'views/kinetic/layer_view', 
        'models/environment',
        'views/kinetic/soil_view','views/kinetic/plant_view','views/kinetic/menu_view'], function(Backbone, Kinetic, LayerView, Environment, SoilView, PlantView, MenuView){
    var EnvironView = LayerView.extend({
        model: Environment,
        initialize: function(params){
            this.layer = new Kinetic.Layer();
            this.field = new Kinetic.Group();
            this.field.setX(64);
            this.field.setY(64);
            this.soil_view = new LayerView({
                model_view:SoilView,
                collection:this.model.get("garden")
            });
            this.field.add(this.soil_view.layer);
            
            this.plant_view = new LayerView({
                model_view:PlantView,
                collection:this.model.get("plants")
            });
            this.field.add(this.plant_view.layer);
            this.layer.add(this.field);
            
            this.menu = new MenuView();
            this.layer.add(this.menu.layer);
        },
        render:function(){
            this.soil_view.render();
            this.plant_view.render();
        }
    });
    return EnvironView;
})