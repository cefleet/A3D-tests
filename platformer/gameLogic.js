var myGame = {
  config : {
      lives: 3,
      speed : 1,
      jumpButton : 32,
      leftButton : 65,
      rightButton : 68,
      gravity : -0.5,

    //  forceResolution : true,
    //  targetRes : [640,480],
      actionButton: 'leftmouse',
      endTrigger : 'Trigger.End',
      playerSettings : {
        jumpAccel : 0.8,
        jumpForce : 1.5,
        meshName: 'Chris',
        rootUrl: './',
        file:'chris.babylon',
        spawnPoint : 'InitialSpawn',
        animationsSetup : [
          {
            name : 'walk',
            start : 10,
            end : 39,
            options : {
              ratio: 2
            }
          },
          {
            name : 'idle',
            start:80,
            end : 120,
            options : {
              loop : true,
              ratio : .2
            }
          },
          {
            name : 'jump',
            start : 125,
            end : 145,
            options : {
              ratio : 2,
              loop : false
            }
          }
        ],
        rotationValues : {
          left : 1.5,
          right : -1.5
        },

        scale : {
          x: 4,
          y: 4,
          z : 4
        },
        boundsOffset : {
          z : -2,
          x : -3,
          y: 13.4
        }

      },
      screenImages : [
        {
          src:'start.png',
          id : 'mainScreen'
        },
        {
          src : 'win.png',
          id : 'winScreen'
        }
      ],
      textObjects :[
        {
          id:'testText',
          x : 0,
          y:0,
          name : 'testText',
          fontSize : '30',
          texts : {
            first: {
              text:'This is the first text',
              next:'second'
            },
            second : {
              text: 'This is the second text',
              next:'first'
            }
          }
        }
      ],
      cameraSettings : {
        offset : {
          x : 30,
          y : 20,
          z : -40
        },
        rotation : {
          x: .3,
          y: -.3,
          z: 0
        }
      }
  },

  scripts : function(){
    var scene = myGame.game.player.scene;
    //TODO this is where you can add your own game logic
    //TODO this trigger should not need this added
    myGame.game.setupEnd = function(scene){
      var te = scene.b3Dscene.getMeshByName(this.endTrigger);
      if(te){
        this.endTrigger = new A3D.Trigger.Object3D.Collision({name:this.endTrigger});
        this.endTrigger.addMeshTo(te);
        this.endTrigger.b3Dmeshes[0].isVisible = false;
        this.endTrigger.addActivateAction(this.actions.showWinScreen);
      }
    };

    myGame.game.createAction({
      name : 'checkIfAtEnd',
      id : 'checkIfAtEnd',
      func : function(){
        if(this.player._collidingWithTrigger){
        if(this.player._collidingWithTrigger.length >= 1){
          console.log('I am hitting a trigger');
          for(var i = 0; i < this.player._collidingWithTrigger.length; i++){
            if(this.player._collidingWithTrigger[i].id === this.endTrigger.name){
              this.showWinScreen();
            }
          }
        }
      }
      }.bind(this)
    });

    myGame.game.showWinScreen = function(){
      //this.resetLevel();
    //  this.showScreen('winScreen');
    //  this.pause();
      myGame.game.player.scene.dispose();
      myGame.game.loadScene('./','platformer_scene2.babylon',myGame.scripts);
    };

   myGame.game.setupEnd(scene);
   myGame.game.showScreen('mainScreen');

   //This works. I just want the intro to run every time
/*
    var introVideo = new A3D.Video({videoFile:'/platformer/aletheia.webm'},myGame.game);
    introVideo.show();
    introVideo.play();
    introVideo.onPlaybackEnd = function(){
      myGame.game.showScreen('mainScreen');
    }
*/
  }
};

function start(){
  //TODO it may make sense to do things a little different. for example make a "player" json file that is loaded
    myGame.game = new A3D.Game.Platformer(myGame.config);
    myGame.game.loadScene('./','platformer.babylon',myGame.scripts);
}

document.addEventListener("DOMContentLoaded", start, false );
