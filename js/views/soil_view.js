define(['backbone', 'models/soil'],function(Backbone, Soil){
    var SoilView = Backbone.View.extend({
        model: Soil,
        render: function(){
            var x = this.model.get("x");
            var y = this.model.get("y");
            var plant = this.model.get("plant") ? this.model.get("plant").get("species") : "Empty";
            var water = this.model.get("water");
            var ph = this.model.get("ph");
            var feed = this.model.get("feed");
            this.$el.empty().append("("+x+","+y+") "+plant + ":" + water + ":" + ph + ":" + feed);
        }
    });
    return SoilView;
});
