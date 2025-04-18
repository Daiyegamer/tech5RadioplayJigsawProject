#drop-zone,
#fragment-zone {
  display: flex;
  gap: 10px;
  margin: 20px;
  flex-wrap: wrap;
  justify-content: center;
}

.container {
  width: 100px;
  height: 100px;
  border: 2px dashed #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.container img,
.fragment {
  width: 100px;
  height: 100px;
  object-fit: cover;
  cursor: grab;
}

/* Static container image styles */
.container img {
  position: static;
  margin-bottom: 0;
  box-shadow: none;
  touch-action: none;
  user-select: none;
}

/* Draggable fragment styles */
.fragment {
  position: fixed;
  touch-action: none;
  user-select: none;
  z-index: 1000;
  transition: transform 0.2s ease-out;
}

/* Allows two-finger scroll on page */
body {
  touch-action: pan-y pinch-zoom;
}
