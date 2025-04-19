const chapterCode = {
  chapter1: "wi80p",
  chapter2: "ve36c",
  chapter3: "er13u",
};

window.onload = function () {
  const fragments = document.querySelectorAll(".fragment");
  const dropZones = document.querySelectorAll(".container.empty");
  const originalZone = document.getElementById("fragment-zone");

  let draggedItem = null;
  let currentTouchZone = null;
  let offsetX = 0;
  let offsetY = 0;

  fragments.forEach((fragment) => {
    // Desktop
    fragment.addEventListener("dragstart", (e) => {
      draggedItem = e.target;
    });

    // Mobile - Touch Start
    fragment.addEventListener("touchstart", (e) => {
      e.preventDefault();
      draggedItem = e.target;

      const touch = e.touches[0];
      const rect = draggedItem.getBoundingClientRect();
      offsetX = touch.clientX - rect.left;
      offsetY = touch.clientY - rect.top;

      draggedItem.classList.add("dragging");
      draggedItem.style.left = rect.left + "px";
      draggedItem.style.top = rect.top + "px";
      draggedItem.style.position = "fixed";
    });

    // Mobile - Touch Move
    fragment.addEventListener("touchmove", (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      const x = touch.clientX - offsetX;
      const y = touch.clientY - offsetY;

      draggedItem.style.left = x + "px";
      draggedItem.style.top = y + "px";

      currentTouchZone = null;
      dropZones.forEach((zone) => {
        const rect = zone.getBoundingClientRect();
        const isInside =
          touch.clientX > rect.left &&
          touch.clientX < rect.right &&
          touch.clientY > rect.top &&
          touch.clientY < rect.bottom;

        zone.classList.toggle("highlight", isInside);
        if (isInside) currentTouchZone = zone;
      });
    });

    // Mobile - Touch End
    fragment.addEventListener("touchend", () => {
      dropZones.forEach((z) => z.classList.remove("highlight"));

      if (currentTouchZone && currentTouchZone.children.length === 0) {
        currentTouchZone.appendChild(draggedItem);
        draggedItem.setAttribute("draggable", "false");
        draggedItem.classList.remove("dragging");
        draggedItem.style.left = "";
        draggedItem.style.top = "";
        draggedItem.style.position = "relative";
        currentTouchZone.classList.remove("empty");
        if (navigator.vibrate) navigator.vibrate(50);
      } else {
        draggedItem.style.transition = "transform 0.2s ease-out";
        draggedItem.style.left = "";
        draggedItem.style.top = "";
        draggedItem.style.position = "relative";
        setTimeout(() => {
          draggedItem.style.transition = "";
        }, 200);
      }

      draggedItem.classList.remove("dragging");
      draggedItem = null;
      currentTouchZone = null;
    });
  });

  // Desktop drop support
  dropZones.forEach((zone) => {
    zone.addEventListener("dragover", (e) => e.preventDefault());

    zone.addEventListener("drop", (e) => {
      e.preventDefault();
      if (zone.children.length === 0 && draggedItem) {
        zone.appendChild(draggedItem);
        draggedItem.setAttribute("draggable", "false");
        draggedItem.classList.remove("dragging");
        draggedItem.style.left = "";
        draggedItem.style.top = "";
        draggedItem.style.position = "relative";
        zone.classList.remove("empty");
        draggedItem = null;
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

    localStorage.setItem("isGameSolved", isSequenceSolved ? "true" : "false");
    window.location.href = "./result.html";
  });

  const resetBtn = document.getElementById("resetBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      fragments.forEach((fragment) => {
        originalZone.appendChild(fragment);
        fragment.setAttribute("draggable", "true");
        fragment.style.left = "";
        fragment.style.top = "";
        fragment.style.position = "relative";
        fragment.classList.remove("dragging");
      });

      dropZones.forEach((zone) => {
        zone.classList.add("empty");
      });
    });
  }
};

document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
});
