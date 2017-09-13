/**
 * Created by lzc on 2017/9/5.
 */
function LazyMan (name) {

    let   curActionIndex = 0,
        actions = [],
        doAction = () => {
            actions[curActionIndex] && actions[curActionIndex++]();
        }

    actions.push(()=> {
        console.info("Hi! This is " + name);
        doAction();
    });

    this.sleep = (time) => {
        actions.push(function() {
            setTimeout(function(){
                console.info('Wake up after ' + time);
                doAction();
            }, time);
        })
        return this;
    }

    this.eat = (food) => {
        actions.push(function(){
            console.info('Eat Dinner ' + food);
            doAction();
        })
        return this;
    }

    this.sleepFirst = (time) => {
        actions.splice(actions.length-2, 0, function() {
            setTimeout(function(){
                console.info("Wake up after " + time);
                doAction();
            }, time)
        })
        return this;
    }

    setTimeout(function(){
        doAction();
    }, 0);
    return this;
}

LazyMan("lzc").sleepFirst(300).eat("meat").sleep(500).eat("fish");