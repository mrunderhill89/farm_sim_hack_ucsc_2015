define(['underscore', 'kinetic', 'bacon',
        'views/kinetic/layer_view', 'views/kinetic/sprite_view'
], function(_, Kinetic, Bacon, LayerView, SpriteView){
    var Button = SpriteView.extend({
        width: 32,
        height:32,
        initialize: function(params){
            this.x = (params && params.x) || 0;
            this.y = (params && params.y) || 0;
            this.streams = {new_stream: new Bacon.Bus()};
        },
        render: function(){
            this.sprite = new Kinetic.Rect({
                x: this.x,
                y: this.y,
                width: this.width,
                height: this.height,
                fill: 'grey',
                stroke: 'black',
                strokeWidth: 3
            });
            this.stream("click","mousedown");
            this.stream("over", "mouseover").onValue(function(e){
                e.target.fill('cyan');
                e.target.draw();
            });
            this.stream("out", "mouseout").onValue(function(e){
                e.target.fill('grey');
                e.target.draw();
            });
            return this;
        }
    })
    var MenuView = LayerView.extend({
        initialize:function(params){
            this.layer = (params && params.layer) 
                || new Kinetic.Group();
            this.streams={};
            this.buttons = {
                add_plant: new Button({
                    x:0,
                    y:0,
                }),
                destroy_plant: new Button({
                    x:32,
                    y:0
                }),
                add_soil: new Button({
                    x:0,
                    y:32
                }),
                remove_soil: new Button({
                    x:32,
                    y:32
                })
            };
            _.each(this.buttons, function(button,name){
                button.stream("new_stream").onValue(function(params){
                    this.stream(params.name).plug(params.stream.map(function(){return name;}));
                }.bind(this));
                this.layer.add(button.render().sprite);
            }.bind(this));
        },
        render:function(){
        }
    })
    return MenuView;
})