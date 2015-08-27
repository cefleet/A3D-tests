var myGame = {
  config : {
    //  containerId:'game',//Probably not needed
    //  playerName : 'SpinyShell',//remove when possible
    //  mainCamera: 'Camera.Main',
      lives: 3,
      speed : 2,
      actionButton: 'leftmouse',
  //    collisionNames : ['Icosphere','Cube'],//remove when possible
      endTrigger : 'Trigger.End',
      screenImages : [
        {
          src:'./main.png',
          id : 'mainScreen'
        },
        {
          src : './lose.png',
          id : 'loseScreen'
        },
        {
          src : './win.png',
          id : 'winScreen'
        }
      ],
      livesImage : {
        src : './heart.png',
        dX:0,
        dY:10,
        dWidth:30,
        dHeight:30
      },
      cameraSettings : {
        offset : {
          x : 0,
          y : 0,
          z : -20
        },
        rotation : {
          x: 0,
          y: 0,
          z: 0.000
        }
      },
      /*
        These are optional
      */
      playerSettings : {
        boundsOffset : {
          x:-1,
          y:1.5,
          z:0
        },
        boundsSize : {
          x:-1,
          y:1.5,
          z:0
        }
      }
  },

  scripts : function(){
    //TODO this is where you can add your own game logic
    myGame.game.player.hitSequence = function(){
      this._move(new BABYLON.Vector3(2,0,0));
    }

  }
};

function start(){
    myGame.game = new A3D.Game.Scroller(myGame.config);
    myGame.game.loadScene('./scenes/','Scroller.babylon',myGame.scripts);
}

document.addEventListener( "DOMContentLoaded", start, false );
