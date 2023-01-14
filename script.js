//==============================================================================================================
//=============================================Task 1===========================================================
//==============================================================================================================

let result = document.getElementById("result")
let errorArea = document.getElementById("errorArea")

function Promotion(regionCode) {
  //JSON File-dan dataları çəkirik.
  fetch('./oldorders.json')
    .then(response => response.json())
    .then(data => {
      //Hər bir datanı ayrılıqda region koduna uyğun filter edir və promotion kodunu tapır.
      let arr = data.customers.filter(user => user.region === regionCode)
        .map(user => user.promotion);

      //Ən çox işlədilən Promotion kodunu tapırıq
      let mostUsed = arr.reduce((obj, item) => {
        obj[item] = (obj[item] || 0) + 1;
        return obj;
      }, {});
      let keys = Object.keys(mostUsed);
      let values = Object.values(mostUsed);
      let max = Math.max(...values);
      let i = values.findIndex(x => x === max);

      //Elementi ekrana yazdırırıq.
      result.innerHTML += `${regionCode} Regionu üçün Promotion Code: ${keys[i]} </>`
      //Element tapılmazsa xəta kodunu ekrana yazdırırıq.
      if (keys[i] == undefined) {
        errorArea.innerHTML += `<span> Axtardığınız region kodu üzrə promosya kodu tapılmadı. </span>`
      }
    }).catch(function (err) {
      console.log('Something went wrong.', err);
    });
}
//Funksyamız(Daxilinə Region kodunu veririk)
Promotion("A")



//==============================================================================================================
//=============================================Task 2===========================================================
//==============================================================================================================
let chessResult = document.getElementById("chessResult")

//Şahmat Taxtası kordinatları
class board {
  constructor(x, y, distance) {
    [this.x, this.y, this.distance] = [x, y, distance];
  }
}

//Gedişin sərhədlər daxilində olub olmadığını yoxlayan function
function isInside(x, y, N) {
  if (x >= 1 && x <= N && y >= 1 && y <= N)
    return true;
  return false;
}

//Hədəf üçün lazım olan minimum addımlar üçün method
function minStepToReachTarget(startPosition, endPosition, N) {
  // x and y direction, where a knight can move
  let dx = [-2, -1, 1, 2, -2, -1, 1, 2];
  let dy = [-1, -2, -2, -1, 1, 2, 2, 1];

  // Queue atın taxta üzərindəki kordinatlarını yadda saxlayıe
  let queue = [{ x: startPosition[0], y: startPosition[1], distance: 0 }];

  let target;
  let x, y;
  let visit = new Array(N + 1).fill(false).map

  // bütün xanaları tək tək tanıması üçün for döngüsü
  for (let i = 1; i <= N; i++) {
    visit[i] = new Array(N + 1);
    for (let j = 1; j <= N; j++)
      visit[i][j] = false;
  }

  // başlama kordinatını təyin edir
  visit[startPosition[0]][startPosition[1]] = true;

  // parametr kimi daxil edinən elementi tapana qədər davam edən loop
  while (queue.length != 0) {
    target = queue.shift();

    //Əgər başlama kordinatı bitiş kordinatına bərabər olarsa, məsafəni qaytarır.
    if (target.x == endPosition[0] && target.y == endPosition[1])
      return target.distance;

    // Bütün xanaları yoxlayır.
    for (let i = 0; i < 8; i++) {
      x = target.x + dx[i];
      y = target.y + dy[i];

      if (isInside(x, y, N) && !visit[x][y]) {
        visit[x][y] = true;
        queue.push(new board(x, y, target.distance + 1));
      }
    }
  }
  return Number.MAX_VALUE;
}

// Test
let N = 30;
//Parametrlər
let startPosition = [1, 2];
let endPosition = [30, 30];

var TargetNumber = minStepToReachTarget(
  startPosition, endPosition, N);
  chessResult.innerHTML += `[${startPosition}] və [${endPosition}] arası gediş sayı: ${TargetNumber}`















