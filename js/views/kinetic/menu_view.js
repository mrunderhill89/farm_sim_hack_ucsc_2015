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
            this.name = params.name || "";
        },
        render: function(){
            this.parts = {
                background: new Kinetic.Rect({
                    x: 0,
                    y: 0,
                    width: this.width,
                    height: this.height,
                    fill: 'grey',
                    stroke: 'black',
                    strokeWidth: 3
                }),
                label: new Kinetic.Label({
                    x: 32,
                    y: 32
                })
            };
            this.parts.label.hide();
            //Tag
            this.parts.label.add(new Kinetic.Tag({
              fill: '#bbb',
              stroke: '#333',
              shadowColor: 'black',
              opacity: 0.5,
              lineJoin: 'round',
              pointerDirection: 'down',
              pointerWidth: 3,
              pointerHeight: 3,
              cornerRadius: 3
            }));
            //Text
            this.parts.label.add(new Kinetic.Text({
              text: this.name || '?',
              fontSize: 16,
              lineHeight: 1.2,
              padding: 3,
              fill: 'white'
             }));
            this.sprite = _.reduce(this.parts, function(group,sprite){
                group.add(sprite);
                return group;
            }, new Kinetic.Group({
                x:this.x,
                y:this.y
            }))
            this.stream("click","mouseup");
            this.stream("over", "mouseover").onValue(function(e){
                this.parts.background.fill('cyan');
                this.parts.label.show();
                this.sprite.draw();
            }.bind(this));
            this.stream("out", "mouseout").onValue(function(e){
                this.parts.background.fill('grey');
                this.parts.label.hide();
                this.sprite.draw();
            }.bind(this));
            return this;
        }
    })
    var ProbeView = SpriteView.extend({
        width: 160,
        height:120,
        initialize: function(params){
            this.x = (params && params.x) || 0;
            this.y = (params && params.y) || 0;
            this.streams = {new_stream: new Bacon.Bus()};
        },
        update: function(model){
            this.parts.text.text(model.toString());
            //this.sprite.draw();
        },
        render: function(){
            this.parts = {
                background: new Kinetic.Rect({
                    x: -this.width/2,
                    y: 0,
                    width: this.width,
                    height: this.height,
                    fill: 'grey',
                    stroke: 'black',
                    strokeWidth: 3
                }),
                text: new Kinetic.Text({
                    x: -70,
                    y: 10,
                    text: (this.model && this.model.toString()) || "Query Tool",
                    fontSize: 16,
                    fontFamily: 'Calibri',
                    fill: 'black'
                })
            };
            this.sprite = _.reduce(this.parts, function(group,sprite){
                group.add(sprite);
                return group;
            }, new Kinetic.Group({
                x:480,
                y:0,
                draggable:true
            }))
            this.stream("data").onValue(function(target){
                if (this.model) this.model.off("change", this.update, this);
                this.model = target;
                this.model.on("change", this.update, this);
                this.update(target);
            }.bind(this));
            return this;
        }        
    });
    var MenuView = LayerView.extend({
        initialize:function(params){
            this.layer = (params && params.layer) 
                || new Kinetic.Group();
            this.streams={};
            this.buttons = {
                add_plant: new Button({
                    name:"Add Plant",
                    x:0,
                    y:0,
                }),
                destroy_plant: new Button({
                    name:"-Remove Plant",
                    x:32,
                    y:0
                }),
                add_soil: new Button({
                    name:"-Add Soil",
                    x:0,
                    y:32
                }),
                remove_soil: new Button({
                    name:"-Remove Soil",
                    x:32,
                    y:32
                }),
                add_water: new Button({
                    name:"Water",
                    x:0,
                    y:64
                })
            };
            _.each(this.buttons, function(button,name){
                button.stream("new_stream").onValue(function(params){
                    this.stream(params.name).plug(params.stream.map(function(){return name;}));
                }.bind(this));
                this.layer.add(button.render().sprite);
            }.bind(this));
            this.probe = new ProbeView();
            this.probe.stream("data").plug(this.stream("data"));
            this.layer.add(this.probe.render().sprite);
        },
        render:function(){
        }
    })
    return MenuView;
})