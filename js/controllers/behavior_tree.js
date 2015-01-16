define(['bacon','underscore'],function(Bacon,_){
    function BehaviorTree(run){
        this.streams = {
            results : new Bacon.Bus(),
            run : new Bacon.Bus(),
            prime : new Bacon.Bus()
        }
        if (run){
            this.streams.run.onValue(function(){
                run.apply(this,arguments);
            }.bind(this));
        }
        this.streams.prime.onValue(function(args){
            if (args.i < this.children.length){
                var child = this.children[args.i];
                child.onResult(args.callback).run.apply(child, args.arguments);
            } else {
                console.warn("Trying to prime a child that does not exist:"+args.i);
            }
        }.bind(this));
        this.children = [];
        this.parent = null;
    }
    function _sequence(index, result){
        if (result === false){
            this.result(false);
        } else if (index+1 >= this.children.length){
            this.result(true);
        } else {
            this.prime(index+1, _sequence.bind(this,index+1));
        }
        return Bacon.noMore;
    }
    function _select(index, result){
        if (result === true){
            this.result(true);
        } else if (index+1 >= this.children.length){
            this.result(false);
        } else {
            this.prime(index+1, _select.bind(this,index+1));
        }
        return Bacon.noMore;
    }
    function _para_sequence(){
        console.log("Para Sequence");
        var combined = _.reduce(this.children, function(stream, child, i){
            return stream.combine(child.streams.result, function(rest, next){
                if (rest && !next){
                    this.result(false);
                } else if (i+1 >= this.children.length){
                    this.result(true);
                }
                return rest && next;
            });
        }, Bacon.once(true));
        _.each(this.children, function(child){
            child.run();
        });
    }
    function _repeatUntil(value, result){
        if (this.children.length < 1 ){
            this.result(false);
        } else {
            if (result === value){
                this.result(true);
            } else {
                this.prime(0, _repeatUntil.bind(this,value));
            }
        }
        return Bacon.noMore;
    }
    function _map(f){
        if (this.children.length > 0){
            this.prime(0, function(result){
                if (_.isFunction(f)){
                    this.result(f(result));
                } else {
                    this.result(f);
                }
                return Bacon.noMore;
            }.bind(this));
        } else {
            if (_.isFunction(f)){
                this.result(false);
            } else {
                this.result(f);
            }
        }
    }
    function _lock(t){
        this.times = this.times || 0;
        if (this.times < t){
            this.times++;
            this.prime(0, function(r){
                this.times--;
            }.bind(this));
        } else {
            console.warn("Lock overrun:"+this.times);
        }
    }
    var types = {
        sequence: function(){
            return _sequence.bind(this,-1,true);
        },
        select: function(){
            return _select.bind(this,-1,false);
        },
        para_sequence: function(){
            return _para_sequence.bind(this);
        },
        para_select: function(){
        },
        repeatUntil: function(value){
            return _repeatUntil.bind(this,value,undefined);
        },
        map: function(f){
            return _map.bind(this,f);
        },
        lock: function(times){
            return _lock.bind(this, times);
        }
    }
    _.extend(BehaviorTree, 
         _.reduce(types, function(memo, fun, key){
            memo[key] = function(){
                var node = new BehaviorTree();
                var args = arguments;
                node.run = fun.apply(node,args);
                return node;
            }.bind(this);
            return memo;
        }, {}),
        {
        prototype: _.extend(
            BehaviorTree.prototype, 
            {
                run: function(){
                    this.streams.run.push(arguments);
                    return this;
                },
                onResult: function(callback){
                    this.streams.results.onValue(callback);
                    return this;
                },
                result: function(value){
                    this.streams.results.push(value);
                    return this;
                },
                prime: function(index, callback, args){
                    this.streams.prime.push({i:index, callback:callback, arguments:args});
                    return this;
                },
                child: function(node){
                    this.children.push(node);
                    node.parent = this;
                    return this;
                },
                log: function(name){
                    this.onResult(function(r){
                        console.log(name+": returning "+r);
                    });
                    this.streams.run.onValue(function(){
                        console.log(name+": running");
                    });
                    this.streams.prime.onValue(function(args){
                        console.log(name+": priming "+args.i);
                    });
                    return this;
                }
            }
        ),
        every: function(delay, value){
            var node = new BehaviorTree();
            node.streams.results.plug(Bacon.interval(delay,value));
            return node;
        },
        map_stream: function(stream, fun){
            var node = new BehaviorTree();
            node.streams.results.plug(stream.map(fun));
            return node;
        }
    })
    console.log(BehaviorTree.prototype);
    return BehaviorTree;
});