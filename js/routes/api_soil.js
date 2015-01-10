define([], function(){
    var SoilAPI = {
        add: function(params){
            console.log(this);
            this.current_model.get("garden").create(params);
        }
    };
    return SoilAPI;
})