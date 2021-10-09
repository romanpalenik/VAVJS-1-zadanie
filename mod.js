// Projekt Palenik AIS id: 103803

localStorage.setItem("debugMode", false);
var debugMode = localStorage.getItem("debugMode");

let btn = document.createElement("button");
btn.innerHTML = "Restart";
btn.id = "restart";
document.body.appendChild(btn);

document.getElementById("restart").addEventListener("click", function () {
  console.log("joj mano");

  initSpace2();
  aliens = [1, 3, 5, 7, 9, 23, 25, 27, 29, 31];
  direction = 1;

  ship = [104, 114, 115, 116];
  missiles = [];
  level = 1;
  speed = 512;
  running = false;

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

var loop2 = setInterval(function () {
  levelCounter.innerHTML = "Level: " + level;
}, speed);

let btn2 = document.createElement("button");
btn2.innerHTML = "Hrat muziku";
btn2.id = "audio";
document.body.appendChild(btn2);

var audioRunnig = false;
var audio = new Audio(
  "https://r2---sn-xoxgbvuxa-cunz.googlevideo.com/videoplayback?vprv=1&fexp=24001373,24007246&lmt=1626432571932033&gir=yes&itag=249&expire=1633575887&requiressl=yes&clen=20934475&source=youtube&txp=5511222&c=WEB&dur=3514.541&n=RAqQfSDo7Ag97Q&mime=audio%2Fwebm&keepalive=yes&sig=AOq0QJ8wRgIhAIMHR2Aor8h4GLcI4lEs8nX8PmC4jksG6ThUS-mnh09pAiEA6yre8LNCAsZsDfweZAZdNMLJSgEa7fi9NmgS0x-UeUA%3D&ns=cKWPUTAzvEIZZ6Z6RlEDO24G&ei=bw9eYZWvFKaO2LYP5Ny3iAs&ip=191.102.132.21&id=o-AN62jD31rUaAyd79P_-rIC7RK9hvJ0tyTvUmEA_PPa4g&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Cmime%2Cns%2Cgir%2Cclen%2Cdur%2Clmt&title=Best%20Non%20Copyrighted%20Music%202020%20_%201%20Hour%20Copyright%20Free%20Music%20Mix&redirect_counter=1&rm=sn-ab5yy7z&req_id=1e384bdc13aa3ee&cms_redirect=yes&ipbypass=yes&mh=id&mip=147.175.181.5&mm=31&mn=sn-xoxgbvuxa-cunz&ms=au&mt=1633552623&mv=m&mvi=2&pcm2cms=yes&pl=16&lsparams=ipbypass,mh,mip,mm,mn,ms,mv,mvi,pcm2cms,pl&lsig=AG3C_xAwRQIgQ7m5YY632e_7xGmTnFteCC81n-1fDxX0DBcOoLK_xwICIQCheR5Sh1YJtSuLFqgFgx9KKP3P7IlfoNm1Hqh7ONmBmg%3D%3D"
);
document.getElementById("audio").onclick = function () {
  if (!audioRunnig) {
    audio.play();
    audioRunnig = true;
    btn2.innerHTML = "Zastavit muziku";
  } else {
    audio.pause();
    audioRunnig = false;
    btn2.innerHTML = "Hrat muziku";
  }
  console.log("hram");
};

var DEBUG = true;
if (!DEBUG) {
  if (!window.console) window.console = {};
  var methods = ["log", "debug", "warn", "info"];
  for (var i = 0; i < methods.length; i++) {
    console[methods[i]] = function () {};
  }
}

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
};

window.drawAliens = function () {
  console.log("teraz som v draw aliens");
  // console.log(position);
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
  console.log("teraz som v draw missiles");
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
