var YHBug=YHBug||{};(function () {        var Circle=yhge.renderer.canvas.shape.Circle;        var PlayerState={Normal:0,Jump:1,Move:2};    var Player=yhge.core.Class(Circle,{        classname:"Player",                _power:0,        _pressing:false,        _speed:10,        _hp:0,        _state:0,        _z:0,        initialize:function(){            this._animationMap={                idle:{},                move:{}            };            this._currentAnimation=null;            Player._super_.initialize.apply(this,arguments);//            this._radius=8;//            this._solid=true;        },        addAnimationMapItem:function (animationName,animation) {            this._animationMap[animationName]= animation;            return this;        },        getAnimationMapItem:function (animationName) {            return this._animationMap[animationName];        },        addAnimationMapItemWithDirection:function (animationName,directionName,animation) {            if(!this._animationMap[animationName]){                this._animationMap[animationName]={};            }            this._animationMap[animationName][directionName]=animation;            return this;        },        getAnimationMapItemWithDirection:function (animationName,directionName) {            return this._animationMap[animationName] && this._animationMap[animationName][directionName];        },        setCurrentAnimation:function (animation) {            if(this._currentAnimation==animation) return;            if(this._currentAnimation) {                game.mainTimeLine.remove(this._currentAnimation);            }            animation.gotoAndPlay(0);            this._currentAnimation=animation;            game.mainTimeLine.add(animation);        },        draw:function (context) {            this._currentAnimation.render(context);        },        update:function (delta) {                        switch (this._state) {                case PlayerState.Normal:                                        break;                 case PlayerState.Move:                    if(this._pressing) this._power++;                    var position=this._position;                    var targetPosition=this._targetPosition;                    var dx=targetPosition.x-position.x;                    var dy=targetPosition.y-position.y;                    if((dx*dx+dy*dy)>this._radius){                        var ang=Math.atan2(dy,dx);                        var sx=Math.cos(ang) * this._speed;                        var sy=Math.sin(ang) * this._speed;                        position.x+=sx;                        position.y+=sy;                        this.setPosition(position);                        //改变方向                        var directionIndex=this.hadap(ang);                        this.setCurrentAnimation(this._animationMap.move[directionIndex]);                     }                     break;                 case PlayerState.Jump:                     this.setPosition(this._targetPosition);                     //只播放一次。当帧号超过一半，加个标记，并且当帧号小于一半的时候，说明一遍循环已经完成了。                     if(this._halfJumpAnimation){                        if(this._currentAnimation.getCurrentFrameIndex()==this._currentAnimation.getFramesCount()-1                             || this._currentAnimation.getCurrentFrameIndex()<this._currentAnimation.getFramesCount()/2){                            this.jumpEnd();                        }                     }else{                         if(this._currentAnimation.getCurrentFrameIndex()>this._currentAnimation.getFramesCount()/2){                             this._halfJumpAnimation=true;                         }                     }                     break;            }        },        jump:function () {            this._state=PlayerState.Jump;            this._z=94;            this._normalColor=this._color;            this._color="#0FF";            this._halfJumpAnimation=false;            this._beforeJumpAnimation=this._currentAnimation;            this.setCurrentAnimation(this._animationMap.jump);        },        jumpEnd:function () {             this._state=PlayerState.Normal;             this._color=this._normalColor;             this.setCurrentAnimation(this._beforeJumpAnimation);             this.onJumpEnd();        },        /**         * 弧度转成8方向         */        hadap:function(ang){            var c = 4 + Math.floor(ang * 1.250000 + 0.625000);            if (c == 0)            {                c = 8;            } // end if            return c;        },        //event        onJumpEnd:function () {                },                        //get set        setPressiong:function(pressiong) {            this._pressiong = pressiong;            return this;        },        getPressiong:function() {            return this._pressiong;        },                setSpeed:function(speed) {            this._speed = speed;            return this;        },        getSpeed:function() {            return this._speed;        },        setHp:function(hp) {            this._hp = hp;            return this;        },        getHp:function() {            return this._hp;            },              setTargetPosition:function(targetPosition) {            this._targetPosition = targetPosition;            //if(this._state==PlayerState.Jump)return this;            if(this._state==PlayerState.Normal) this._state=PlayerState.Move;            return this;        },        setTargetPosition2:function(x,y) {            this._targetPosition = {x:x,y:y};            return this;        },        getTargetPosition:function() {            return this._targetPosition;        },        isInvincible:function () {            return this._state==PlayerState.Jump;        }               });    YHBug.Player=Player;})();