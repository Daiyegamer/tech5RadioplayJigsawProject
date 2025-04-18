const chapterCode = {
  chapter1: "wi80p",
  chapter2: "ve36c",
  chapter3: "er13u",
};

window.onload = function () {
  const fragments = document.querySelectorAll(".fragment");
  const dropZones = document.querySelectorAll(".container.empty");
  const originalZone = document.getElementById("fragment-zone"); // required for reset

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
        draggedItem.setAttribute("draggable", "false");
        draggedItem = null;
        zone.classList.remove("empty");
      }
    });
  });

  const checkBtn = document.getElementById("checkBtn");
  const guessContainers = document.querySelectorAll(".container.guess");

  checkBtn.addEventListener("click", function () {
    let isComplete = true;
    let isSequenceSolved = true;

    for (let i = 0; i < 3; i++) {
      if (guessContainers[i].classList.contains("empty")) {
        isComplete = false;
      }
    }

    if (isComplete) {
      guessContainers.forEach((guessContainer) => {
        if (chapterCode[guessContainer.id] !== guessContainer.children[0].id) {
          isSequenceSolved = false;
        }
      });
    } else {
      isSequenceSolved = false;
      return;
    }

    if (isSequenceSolved) {
      localStorage.setItem("isGameSolved", "true");
      window.location.href = "../result.html";
    } else {
      window.location.href = "../result.html";
    }

    console.log(localStorage);
  });

  const resetBtn = document.getElementById("resetBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      fragments.forEach((fragment) => {
        originalZone.appendChild(fragment);
        fragment.setAttribute("draggable", "true");
      });

      dropZones.forEach((zone) => {
        zone.classList.add("empty");
      });
    });
  }
};
