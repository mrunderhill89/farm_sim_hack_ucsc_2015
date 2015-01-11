define(['bacon','underscore'],function(Bacon,_){
    function BehaviorTree(run){
        _.extend(this, {
            parent: null,
            children : [],
            streams : {
                child: new Bacon.Bus(),
                results: new Bacon.Bus(),
                run: new Bacon.Bus()
            }
        });
        var bound_run = run.bind(this);
        this.streams.run.onValue(bound_run);
        return this;
    };
    _.extend(BehaviorTree, {
        prototype: _.extend(BehaviorTree.prototype,{
            run: function(params){this.streams.run.push(params);},
            result: function(value){this.streams.results.push(value);},
            onResult: function(f){
                this.streams.results.onValue(f);
                return this;
            },
            child: function(run){
                var child = new BehaviorTree(run);
                child.parent = this;
                return child;
            },
            leaf: function(run){
                this.child(run);
                return this;
            }
        }),
        sequence: function(params, index){
            var i = index || 0;
            if (i >= this.children.length){
                this.result(true);
            } else {
                var child = this.children[i];
                child.run(params);
                child.streams.results.onValue(function(result){
                    if (result == false){
                        this.result(false);
                    } else {
                        this.sequence(params, i+1);
                    }
                    return Bacon.noMore;
                }.bind(this));
            }
        },
        select: function(params, index){
            var i = index || 0;
            if (i >= this.children.length){
                this.result(false);
            } else {
                var child = this.children[i];
                child.run(params);
                child.streams.results.onValue(function(result){
                    if (result == true){
                        this.result(true);
                    } else {
                        this.select(params, i+1);
                    }
                    return Bacon.noMore;
                }.bind(this));
            }
        },
        para_sequence: function(params){
        },
        para_select: function(params){
        },
        check: function(test){
            return function(){
                var result = _.isFunction(test)? test(arguments):test;
                this.result(result);
            }
        },
        wait_for: function(stream, test){
            stream.onValue(function(params){
                var result = _.isFunction(test)? test(params):test;
                return Bacon.noMore;
            });
        }
    });
    return BehaviorTree;
});