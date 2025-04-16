function onScanSuccess(decodedText, decodedResult) {
  //   alert(`Scanned: ${decodedText}`);
  window.location.href = decodedText;
  console.log(`Code matched = ${decodedText}`, decodedResult);
}

function onScanFailure(error) {
  console.warn(`Code scan error = ${error}`);
}

const html5QrcodeScanner = new Html5QrcodeScanner(
  "reader",
  { fps: 10, qrbox: { width: 250, height: 250 } },
  false
);
html5QrcodeScanner.render(onScanSuccess, onScanFailure);
