// Projekt Palenik AIS id: 103803
// music source: https://pixabay.com/music/beats-chill-lofi-song-8444/ co je CC licencia
// mam vlastne obrazky z https://github.com/romanpalenik/VAVJS-1-zadanie, na tieto fotky davam free prava ako majitel fotiek

localStorage.setItem("debugMode", true);

function printMessege(message) {
  if (localStorage.getItem("debugMode") == "true") {
    console.log(message);
  }
}

let btn = document.createElement("button");
btn.innerHTML = "Restart";
btn.id = "restart";
document.body.appendChild(btn);

document.getElementById("restart").addEventListener("click", function () {
  initSpace2();
  aliens = [1, 3, 5, 7, 9, 23, 25, 27, 29, 31];
  direction = 1;

  ship = [104, 114, 115, 116];
  missiles = [];
  level = 1;
  speed = 512;
  running = false;
  skore = 0;
  skoreCounter.innerHTML = "Skore: " + skore;

  document.removeEventListener("keydown", checkKey);
});

// pridanie WASD
function checkKey2(e) {
  e = e || window.event;
  if (e.keyCode == "65") {
    if (ship[0] > 100) {
      var i = 0;
      for (i = 0; i < ship.length; i++) {
        ship[i]--;
      }
    }
  } else if (e.keyCode == "68" && ship[0] < 108) {
    var i = 0;
    for (i = 0; i < ship.length; i++) {
      ship[i]++;
    }
  } else if (e.keyCode == "32") {
    missiles.push(ship[0] - 11);
  }
}

document.addEventListener("keydown", checkKey2);

// ratanie levelov
let levelCounter = document.createElement("h4");
levelCounter.innerHTML = "Level: 1";
levelCounter.id = "levelCounter";
document.body.appendChild(levelCounter);

let skoreCounter = document.createElement("h4");
var skore = 0;
skoreCounter.innerHTML = "Skore: 0";
skoreCounter.id = "skoreCounter";
document.body.appendChild(skoreCounter);

window.checkCollisionsMA = function () {
  for (var i = 0; i < missiles.length; i++) {
    if (aliens.includes(missiles[i])) {
      var alienIndex = aliens.indexOf(missiles[i]);
      aliens.splice(alienIndex, 1);
      missiles.splice(i, 1);
      skore = skore + 10;
    }
  }
};

var loop2 = setInterval(function () {
  levelCounter.innerHTML = "Level: " + level;
  skoreCounter.innerHTML = "Skore: " + skore;
}, speed);

let btn2 = document.createElement("button");
btn2.innerHTML = "Hrat muziku";
btn2.id = "audio";
document.body.appendChild(btn2);

var audioRunnig = false;
var audio = new Audio(
  "https://cdn.pixabay.com/download/audio/2021/09/17/audio_5806ac1e1c.mp3?filename=chill-lofi-song-8444.mp3"
);
document.getElementById("audio").onclick = function () {
  if (!audioRunnig) {
    audio.play();
    audioRunnig = true;
    btn2.innerHTML = "Zastavit muziku";
    printMessege("hra muzika");
  } else {
    audio.pause();
    audioRunnig = false;
    btn2.innerHTML = "Hrat muziku";
    printMessege("nehra muzika");
  }
};

// pome na ten canvas
var canvas = document.createElement("canvas");
canvas.width = 528;
canvas.height = 528;
canvas.id = "canvas";
canvas.style = "border:1px solid #d3d3d3";
var context = canvas.getContext("2d");

var position = [];

function initSpace2() {
  var space = document.getElementById("space");
  space.innerHTML = "";
  space.appendChild(canvas);

  x = 0;
  y = 0;

  p = 0;

  base_image = document.createElement("img");
  base_image.src = "space.jpg";
  base_image.onload = function () {
    for (let i = 0; i < 11; i++) {
      for (let j = 0; j < 11; j++) {
        //realne kreslenie obrazka
        one_coordinates = [x, y];
        position.push(one_coordinates);
        context.drawImage(base_image, x, y, 48, 48);

        x += 48;
      }
      x = 0;
      y += 48;
    }
  };
}

window.drawSpace = function () {
  printMessege("kreslim vesmir ci pana");
  var space = document.getElementById("space");
  space.innerHTML = "";
  space.appendChild(canvas);

  x = 0;
  y = 0;

  p = 0;

  base_image = document.createElement("img");
  base_image.src =
    "https://raw.githubusercontent.com/romanpalenik/VAVJS-1-zadanie/main/space.jpg";
  base_image.onload = function () {
    for (let i = 0; i < 11; i++) {
      for (let j = 0; j < 11; j++) {
        //realne kreslenie obrazka
        one_coordinates = [x, y];
        position.push(one_coordinates);
        context.drawImage(base_image, x, y, 48, 48);

        x += 48;
      }
      x = 0;
      y += 48;
    }
  };
};

window.drawAliens = function () {
  printMessege("kreslim alienov");
  alien = document.createElement("img");
  alien.src =
    "https://raw.githubusercontent.com/romanpalenik/VAVJS-1-zadanie/main/alien.jpg";
  alien.onload = function () {
    var i = 0;
    for (i = 0; i < aliens.length; i++) {
      context.drawImage(
        alien,
        position[aliens[i]][0],
        position[aliens[i]][1],
        48,
        48
      );
    }
  };
};

window.drawMissiles = function () {
  printMessege("kreslim rakety");
  missile = document.createElement("img");
  missile.src =
    "https://raw.githubusercontent.com/romanpalenik/VAVJS-1-zadanie/main/raketa.jpg";
  missile.onload = function () {
    var i = 0;
    for (i = 0; i < missiles.length; i++) {
      context.drawImage(
        missile,
        position[missiles[i]][0],
        position[missiles[i]][1],
        48,
        48
      );
    }
  };
};

window.drawShip = function () {
  space_ship = document.createElement("img");
  space_ship.src =
    "https://raw.githubusercontent.com/romanpalenik/VAVJS-1-zadanie/main/lod.jpg";
  space_ship.onload = function () {
    var i = 0;
    for (i = 0; i < ship.length; i++) {
      context.drawImage(
        space_ship,
        position[ship[i]][0],
        position[ship[i]][1],
        48,
        48
      );
    }
  };
};

window.initSpace = initSpace2();

window.win = function () {
  printMessege("vyhral si, tak to si riadny divocak");
  win_img = document.createElement("img");
  win_img.src =
    "https://raw.githubusercontent.com/romanpalenik/VAVJS-1-zadanie/main/win.jpg";
  win_img.onload = function () {
    var i = 0;
    for (i = 0; i < 121; i++) {
      context.drawImage(win_img, position[i][0], position[i][1], 48, 48);
    }
  };
};

window.loose = function () {
  printMessege("tak to si pekne slaby degesko");
  running = false;

  loose_img = document.createElement("img");
  loose_img.src =
    "https://raw.githubusercontent.com/romanpalenik/VAVJS-1-zadanie/main/loose.jpg";
  loose_img.onload = function () {
    var i = 0;
    for (i = 0; i < 121; i++) {
      context.drawImage(loose_img, position[i][0], position[i][1], 48, 48);
    }
  };
};
