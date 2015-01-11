define(['underscore', 'kinetic', 
        'views/kinetic/layer_view'
], function(_, Kinetic, LayerView){
    function button(x,y,callback){
        var b = new Kinetic.Rect({
            x: x,
            y: y,
            width: 32,
            height: 32,
            fill: 'grey',
            stroke: 'black',
            strokeWidth: 3
        });
        b.on("mouseup", callback);
        return b;
    }
    var MenuView = LayerView.extend({
        initialize:function(params){
            this.layer = (params && params.layer) 
                || new Kinetic.Group();
            this.buttons = {
                add_plant: button(0,0,function(){console.log("Add Plant");})
            };
            _.each(this.buttons, function(button){
                this.layer.add(button);
            }.bind(this));
        },
        render:function(){
        }
    })
    return MenuView;
})