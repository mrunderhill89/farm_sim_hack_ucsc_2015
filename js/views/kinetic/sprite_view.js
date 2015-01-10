define(['underscore', 'backbone', 'kinetic'], function(_, Backbone, Kinetic){
    var SpriteView = Backbone.View.extend({
        render: function(){
            this.sprite = this.model_view(this.model);
            return this;
        }
    });
    return SpriteView;
})