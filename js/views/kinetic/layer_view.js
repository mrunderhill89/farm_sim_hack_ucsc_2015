define(['underscore', 'backbone', 'kinetic', 'views/kinetic/sprite_view'], function(_, Backbone, Kinetic, SpriteView){
    var LayerView = Backbone.View.extend({
        initialize: function(params){
            this.layer = (params && params.layer) 
                || new Kinetic.Group();
            this.sprite_views = [];
            this.model_view = params.model_view || null;
            this.collection.on("add", this.add_sprite);
            this.collection.on("remove", this.remove_sprite);
            this.collection.each(this.add_sprite.bind(this));
        },
        add_sprite: function(model, id){
            var view;
            if(this.model_view){ //Generate custom sprite if one is defined.
                view = new this.model_view({model:model});
            } else { //Just make a default sprite.
                view = new SpriteView({model:model});
            }
            this.sprite_views[id] = view;
            view.render();
            this.layer.add(view.sprite);
        },
        remove_sprite: function(model, id){
            
        },
        render: function(){
        }
    });
    return LayerView;
})