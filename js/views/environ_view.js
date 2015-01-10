/**
 * Created by Artemis on 1/9/2015.
 */
define(['backbone', 'models/environment'],function(Backbone, Environment){
    var EnvironView = Backbone.View.extend({
        model: Environment,
        render: function(){
            var humidity = this.model.get("humidity");
            var temperature = this.model.get("temperature");
            this.$el.empty().append(humidity + ":" + temperature);
        }
    });
    return EnvironView;
});