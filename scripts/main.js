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
  const fragments = document.querySelectorAll(".fragment");
  const dropZones = document.querySelectorAll(".container.empty");

  let draggedItem = null;
  let currentTouchZone = null;
  let offsetX = 0;
  let offsetY = 0;

  fragments.forEach((fragment) => {
    let originalTransform = "";
    let originalZ = "";
    fragment.dataset.originalParent = fragment.parentElement.id || "";

    fragment.addEventListener("dragstart", (e) => {
      draggedItem = e.target;
    });

    fragment.addEventListener("touchstart", (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      const rect = fragment.getBoundingClientRect();
      offsetX = touch.clientX - rect.left;
      offsetY = touch.clientY - rect.top;
      draggedItem = e.target;
      originalTransform = draggedItem.style.transform || "";
      originalZ = draggedItem.style.zIndex || "1";
      draggedItem.style.zIndex = "1000";
    });

    fragment.addEventListener("touchmove", (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      const x = touch.clientX;
      const y = touch.clientY;
      draggedItem.style.transform = `translate(${x - draggedItem.offsetWidth / 2}px, ${y - draggedItem.offsetHeight / 2}px)`;

      currentTouchZone = null;

      dropZones.forEach((zone) => {
        const rect = zone.getBoundingClientRect();
        const isInside =
          touch.clientX > rect.left &&
          touch.clientX < rect.right &&
          touch.clientY > rect.top &&
          touch.clientY < rect.bottom;

        zone.classList.toggle("highlight", isInside);

        if (isInside) {
          currentTouchZone = zone;
        }
      });
    });

    fragment.addEventListener("touchend", () => {
      dropZones.forEach((z) => z.classList.remove("highlight"));

      if (currentTouchZone && currentTouchZone.children.length === 0) {
        currentTouchZone.appendChild(draggedItem);
        draggedItem.style.transform = "translate(0, 0)";
        draggedItem.style.position = "static";
        draggedItem.setAttribute("draggable", "false");
        currentTouchZone.classList.remove("empty");
        if (navigator.vibrate) navigator.vibrate(50);
      } else {
        draggedItem.style.transition = "transform 0.2s ease-out";
        draggedItem.style.transform = originalTransform;
        setTimeout(() => {
          draggedItem.style.transition = "";
        }, 200);
      }

      draggedItem.style.zIndex = originalZ;
      draggedItem = null;
      currentTouchZone = null;
    });
  });

  dropZones.forEach((zone) => {
    zone.addEventListener("dragover", (e) => e.preventDefault());

    zone.addEventListener("drop", (e) => {
      e.preventDefault();
      if (zone.children.length === 0 && draggedItem) {
        zone.appendChild(draggedItem);
        draggedItem.setAttribute("draggable", "false");
        zone.classList.remove("empty");
        if (navigator.vibrate) navigator.vibrate(50);
        draggedItem = null;
      }
    });
  });

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

    if (isComplete) {
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

  const resetBtn = document.getElementById("resetBtn");

  resetBtn.addEventListener("click", () => {
    fragments.forEach((fragment) => {
      document.body.appendChild(fragment);
      fragment.style.transform = "translate(0, 0)";
      fragment.style.position = "absolute";
      fragment.style.zIndex = "";
      fragment.setAttribute("draggable", "true");
    });

    dropZones.forEach((zone) => {
      zone.classList.add("empty");
    });
  });
};

document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});
