define(['backbone', 'models/plant'],function(Backbone, Plant){
    var PlantView = Backbone.View.extend({
        model: Plant,
        render: function(){
            var species = this.model.get("species");
            var health = this.model.get("health");
            this.$el.empty().append(species + ":" + health);
        }
    });
    return PlantView;
});