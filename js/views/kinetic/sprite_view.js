define(['underscore', 'backbone', 'kinetic'], function(_, Backbone, Kinetic){
    var SpriteView = Backbone.View.extend({
        initialize: function(params){
            this.model.on("change", this.update.bind(this));
        },
        update: function(model, options){
        },
        render: function(){
            this.sprite = this.model_view(this.model);
            return this;
        }
    });
    return SpriteView;
})