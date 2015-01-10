define(['kinetic', 'views/kinetic/layer_view', 'collections/garden', 'views/kinetic/soil_view'], function(Kinetic, LayerView, Garden, SoilView){
    var EnvironView = LayerView.extend({
        collection: Garden,
        model_view: SoilView
    });
    return EnvironView;
})