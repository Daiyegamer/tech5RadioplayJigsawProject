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

  /* Checking if the sequence is solved */
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
    if (isComplete === true) {
      guessContainers.forEach((guessContainer) => {
        if (chapterCode[guessContainer.id] !== guessContainer.children[0].id) {
          isSequenceSolved = false;
        }
      });
    } else {
      isSequenceSolved = false;
    }

    if (isSequenceSolved) {
      console.log("The Sequence is Solved");

      localStorage.setItem("isGameSolved", "true");
    } else {
      console.log("The Sequence is not Solved");
    }
    console.log(localStorage);
  });
};
