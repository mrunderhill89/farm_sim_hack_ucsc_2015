define(['backbone', 'kinetic', 
        'views/kinetic/layer_view', 
        'models/environment',
        'views/kinetic/soil_view','views/kinetic/plant_view','views/kinetic/menu_view'], 
       function(Backbone, Kinetic, LayerView, Environment, SoilView, PlantView, MenuView){
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
            this.field_stream = this.soil_view.stream("click").map(function(e){return _.extend(e, {class:"soil"})})
                .merge(this.plant_view.stream("click").map(function(e){return _.extend(e, {class:"plant"})}));
            this.field_over = this.soil_view.stream("over").map(function(e){return _.extend(e, {class:"soil"})})
                .merge(this.plant_view.stream("over").map(function(e){return _.extend(e, {class:"plant"})}));
            this.menu = new MenuView();
            this.layer.add(this.menu.layer);

            this.menu.stream("data").plug(
                this.field_over.map(function(e){return e.model;}
            ));
            
            this.control_stream = this.menu.stream("click").sampledBy(this.field_stream, function(menu, field){
                return {
                    field:field,
                    menu: menu,
                }
            });
            this.control_stream.onValue(function(e){
                this.control(e);
            }.bind(this))
        },
        control: function(e){
            if (e.menu === "add_plant"){
                console.log(e.menu);
                if (e.field.class == "soil"){
                    this.add_plant(e.field.model);
                }
            }
        },
        add_plant: function(tile,type){
            var type = type || require('models/plant');
            var plants = this.model.get("plants");
            if (!tile.get("plant")){
                var plant = new type({species:"Lettuce"});
                console.log(plant);
                plant.get("footprint").push(tile);
                tile.set("plant",plant);
                plants.add(plant);
                this.render();
            }
        },
        render:function(){
            this.soil_view.render();
            this.plant_view.render();
            this.layer.draw();
        }
    });
    return EnvironView;
})