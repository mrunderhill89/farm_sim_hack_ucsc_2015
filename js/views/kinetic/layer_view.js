define(['underscore', 'backbone', 'kinetic', 'views/kinetic/sprite_view'], function(_, Backbone, Kinetic, SpriteView){
    var LayerView = Backbone.View.extend({
        initialize: function(params){
            this.layer = (params && params.layer) 
                || new Kinetic.Layer();
            this.sprite_views = [];
        },
        render: function(){
            this.layer.destroyChildren();
            this.sprite_views = _.reduce(
                this.collection.map(
                    function(model,id){
                        var view;
                        if(this.sprite_views[id]){  //Re-use existing model views if possible.
                            view = this.sprite_views[id];
                        } else {                    
                            if(this.model_view){ //Generate custom sprite if one is defined.
                                view = new this.model_view({model:model});
                            } else { //Just make a default sprite.
                                view = new SpriteView({model:model}); 
                            }
                            view.render();
                        }
                        this.layer.add(view.sprite);
                        return view;
                    }.bind(this))
                , function(sprites, sprite,id){
                    sprites[id] = sprite;
                    return sprites;
                }, []);
            this.layer.batchDraw();
        }
    });
    return LayerView;
})