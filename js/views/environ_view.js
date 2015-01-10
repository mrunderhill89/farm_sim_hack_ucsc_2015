/**
 * Created by Artemis on 1/9/2015.
 */
define(['jquery', 'backbone', 'models/environment', 'views/soil_view'],function($, Backbone, Environment, SoilView){
    var EnvironView = Backbone.View.extend({
        initialize: function(params){
            this.soil_views = [];
            this.simulation_running = true;
            this.$rt = $("<div>");
        },
        model: Environment,
        render: function(){
            this.$el.empty()
            .append(this.$rt)
            .append($("<a>").html("Add Soil").attr({href:'javascript:;',id:'add_soil'}).click(function(e){
                e.preventDefault();
                this.model.get("garden").create();
            }.bind(this)));
        },
        update: function(){
            var humidity = this.model.get("humidity");
            var temperature = this.model.get("temperature");
            var garden = this.model.get("garden");
            this.$rt.empty().append("Environment:"+ humidity + ":" + temperature);
            garden.each(function(soil, id){
                if (!this.soil_views[id]){
                    this.soil_views[id] = new SoilView({model:soil});
                }
                this.soil_views[id].render();
                this.$rt.append(this.soil_views[id].$el);
            }.bind(this));
        }
    });
    return EnvironView;
});