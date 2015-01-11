define(['bacon','underscore', 'backbone', 'kinetic'], function(Bacon, _, Backbone, Kinetic){
    var SpriteView = Backbone.View.extend({
        initialize: function(params){
            this.streams = {
                new_stream: new Bacon.Bus()
            };
            if (this.model){
                this.model.on("change", this.update.bind(this));
            }
        },
        update: function(model, options){
        },
        render: function(){
            this.sprite = this.model_view(this.model);
            return this;
        },
        stream: function(stream_name, sprite_event){
            if (!this.streams[stream_name]){
                var stream = this.streams[stream_name] = new Bacon.Bus();
                this.streams.new_stream.push({name:stream_name, stream:stream});
            }
            var stream = this.streams[stream_name];
            if (sprite_event && this.sprite){
                this.sprite.on(sprite_event, function(e){
                    _.extend(e, {model:this.model});
                    stream.push(e);
                }.bind(this));
            }
            return stream;
        }
    });
    return SpriteView;
})