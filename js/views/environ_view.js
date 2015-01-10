/**
 * Created by Artemis on 1/9/2015.
 */
define(['backbone', 'models/environment', 'views/soil_view'],function(Backbone, Environment, SoilView){
    var EnvironView = Backbone.View.extend({
        initialize: function(params){
            this.soil_views = [];
        },
        model: Environment,
        render: function(){
            console.log(this);
            var humidity = this.model.get("humidity");
            var temperature = this.model.get("temperature");
            this.$el.empty().append("Environment:"+ humidity + ":" + temperature);
            this.model.get("garden").each(function(soil, id){
                if (!this.soil_views[id]){
                    this.soil_views[id] = new SoilView({model:soil});
                }
                this.soil_views[id].render();
                this.$el.append(this.soil_views[id].$el);
            }.bind(this));
        }
    });
    return EnvironView;
});