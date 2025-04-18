const fragmentCodes = {
  chapter1label: "ty35k",
  chapter1fragment1: "fr68n",
  chapter1fragment2: "mx92t",
  chapter1fragment3: "pl47z",
  chapter2label: "ar12n",
  chapter2fragment1: "qw81d",
  chapter2fragment2: "zt65m",
  chapter2fragment3: "kc39v",
  chapter3label: "cw90s",
  chapter3fragment1: "yb04x",
  chapter3fragment2: "ru73c",
  chapter3fragment3: "ng52a",
};

const chapterCode = {
  chapter1: "wi80p",
  chapter2: "ve36c",
  chapter3: "er13u",
};

window.onload = function () {
  // The drag and drop feature
  const fragments = document.querySelectorAll(".fragment");
  const dropZones = document.querySelectorAll(".container.empty");

  let draggedItem = null;

  fragments.forEach((fragment) => {
    fragment.addEventListener("dragstart", (e) => {
      draggedItem = e.target;
    });
  });

  dropZones.forEach((zone) => {
    zone.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    zone.addEventListener("drop", (e) => {
      if (zone.children.length === 0 && draggedItem) {
        zone.appendChild(draggedItem);
        draggedItem.setAttribute("draggable", "false"); // prevent redrag
        draggedItem = null;
        zone.classList.remove("empty");
      }
    });
  });

  /* Checking if a fragment is solved */
  const checkBtn = document.getElementById("checkBtn");
  const dropContainers = document.querySelectorAll(".container");
  const guessContainers = document.querySelectorAll(".container.guess");

  checkBtn.addEventListener("click", function () {
    let isComplete = true;
    let isChapterSolved = true;
    let chapter = document.querySelector("main").dataset.chapter;
    for (let i = 0; i < 4; i++) {
      if (dropContainers[i].classList.contains("empty")) {
        isComplete = false;
      }
    }
    if (isComplete === true) {
      guessContainers.forEach((guessContainer) => {
        if (
          fragmentCodes[guessContainer.id] !== guessContainer.children[0].id
        ) {
          isChapterSolved = false;
        }
      });
    } else {
      isChapterSolved = false;
      return;
    }

    if (isChapterSolved) {
      if (chapterCode.chapter1 === chapter) {
        localStorage.setItem("isChapterOneSolved", "true");
      } else if (chapterCode.chapter2 === chapter) {
        localStorage.setItem("isChapterTwoSolved", "true");
      } else if (chapterCode.chapter3 === chapter) {
        localStorage.setItem("isChapterThreeSolved", "true");
      }

      window.location.href = "result.html";
    } else {
      console.log("The Chapter is not Solved");
      window.location.href = "result.html";
    }
    console.log(localStorage);
  });
};
