define(['underscore', 'bacon', 'backbone', 'kinetic', 'views/kinetic/sprite_view'], function(_, Bacon, Backbone, Kinetic, SpriteView){
    var LayerView = Backbone.View.extend({
        initialize: function(params){
            this.layer = (params && params.layer) 
                || new Kinetic.Group();
            this.sprite_views = [];
            this.streams = {};
            this.model_view = params.model_view || null;
            this.collection.on("add", this.add_sprite.bind(this));
            this.collection.on("remove", this.remove_sprite.bind(this));
            this.collection.each(this.add_sprite.bind(this));
        },
        add_sprite: function(model, collection, options){
            var view; var id = options.id || model.id || model.cid;
            if(this.model_view){ //Generate custom sprite if one is defined.
                view = new this.model_view({model:model});
            } else { //Just make a default sprite.
                view = new SpriteView({model:model});
            }
            this.sprite_views[id] = view;
            view.stream("new_stream").onValue(function(params){
                this.stream(params.name).plug(params.stream);
            }.bind(this));
            view.render();
            this.layer.add(view.sprite);
        },
        remove_sprite: function(model, collection, options){
            
        },
        render: function(){
        },
        stream: function(stream_name){
            if (!this.streams[stream_name]){
                this.streams[stream_name] = new Bacon.Bus();
            }
            var stream = this.streams[stream_name];
            return stream;
        }
    });
    return LayerView;
})