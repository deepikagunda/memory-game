let sampleImgsToBeUsed;
let lastOpenedImg;
let result = 0,
  rows,
  cols;
function setupgrid(event) {
  let sampleImgs = [
    "butterfly",
    "foxes",
    "fox",
    "monster",
    "lamb",
    "tiger",
    "unicorn",
    "penguin",
  ];
  //select rows*cols / 2 images .
  let rowsEle = document.querySelector('[name="rows"]');
  let colsEle = document.querySelector('[name="cols"]');
  let gridEle = document.querySelector("#grid");
  rows = rowsEle.value;
  cols = colsEle.value;
  gridEle.innerHTML = "";
  if (rows && cols) {
    sampleImgsToBeUsed = sampleImgs.slice(0, (rows * cols) / 2);
    sampleImgsToBeUsed = [...sampleImgsToBeUsed, ...sampleImgsToBeUsed].sort(
      () => Math.random() - 0.5
    );

    let count = 1;
    for (let i = 0; i < rows; i++) {
      let row = document.createElement("div");
      row.className = "row";
      for (let j = 0; j < cols; j++) {
        let colEle = document.createElement("img");
        colEle.setAttribute("src", "white.jpeg");
        colEle.setAttribute("id", count++);
        colEle.className = "cell";
        colEle.onclick = showImg;
        row.append(colEle);
      }
      gridEle.appendChild(row);
    }
  }
}
function showImg(event) {
  const elem = document.getElementById(Number(event.target.id));

  if (
    lastOpenedImg > -1 &&
    sampleImgsToBeUsed[lastOpenedImg] ===
      sampleImgsToBeUsed[Number(event.target.id) - 1]
  ) {
    const lastOpenedElem = document.getElementById(lastOpenedImg + 1);

    setTimeout(() => {
      elem.setAttribute("src", "blank.png");
      lastOpenedElem.setAttribute("src", "blank.png");
      result += 2;
      if (result === rows * cols) {
        alert("Game over");
      }
    }, 300);
  } else if (lastOpenedImg > -1) {
    const lastOpenedElem = document.getElementById(lastOpenedImg + 1);
    if (lastOpenedElem.getAttribute("src") !== "blank.png") {
      lastOpenedElem.setAttribute("src", "white.jpeg");
    }
  }

  elem.setAttribute(
    "src",
    `${sampleImgsToBeUsed[Number(event.target.id) - 1]}.webp`
  );
  lastOpenedImg = Number(event.target.id) - 1;
}
