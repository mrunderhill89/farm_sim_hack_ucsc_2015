define(['backbone', 'models/soil'],function(Backbone, Soil){
    var SoilView = Backbone.View.extend({
        model: Soil,
        render: function(){
            var plant = this.model.get("plant") ? this.model.get("plant").get("species") : "Empty";
            var water = this.model.get("water");
            var ph = this.model.get("ph");
            var feed = this.model.get("feed");
            this.$el.empty().append(plant + ":" + water + ":" + ph + ":" + feed);
        }
    });
    return SoilView;
});
