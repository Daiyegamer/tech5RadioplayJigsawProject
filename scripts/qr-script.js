document.addEventListener("DOMContentLoaded", () => {
  const chapters = ["Chapter 1", "Chapter 2", "Chapter 3"];
  const correctAnswers = [1, 2, 3, 1, 3, 2, 2, 1, 3]; // Customize per story

  if (document.getElementById("guessForm")) {
    const container = document.getElementById("inputs");
    for (let i = 1; i <= 9; i++) {
      const label = document.createElement("label");
      label.textContent = `Fragment ${i}: `;
      const select = document.createElement("select");
      select.name = `fragment${i}`;
      chapters.forEach((chapter, idx) => {
        const option = document.createElement("option");
        option.value = idx + 1;
        option.textContent = chapter;
        select.appendChild(option);
      });
      container.appendChild(label);
      container.appendChild(select);
      container.appendChild(document.createElement("br"));
    }

    document.getElementById("guessForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const userAnswers = [];
      for (let i = 1; i <= 9; i++) {
        userAnswers.push(parseInt(e.target[`fragment${i}`].value));
      }
      localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
      window.location.href = "result.html";
    });
  }

  if (document.getElementById("resultContainer")) {
    const answers = JSON.parse(localStorage.getItem("userAnswers"));
    const resultDiv = document.getElementById("resultContainer");
    let correct = 0;
    answers.forEach((ans, i) => {
      const isCorrect = ans === correctAnswers[i];
      if (isCorrect) correct++;
      resultDiv.innerHTML += `<p>Fragment ${i + 1}: ${
        isCorrect ? "✅" : "❌"
      }</p>`;
    });

    if (correct === 9) {
      resultDiv.innerHTML += `<h3>🎉 You unlocked the story!</h3>`;
      resultDiv.innerHTML += `<audio controls src="audio/final.mp3"></audio>`;
    } else {
      resultDiv.innerHTML += `<h3>You got ${correct}/9 correct. Try again!</h3>`;
    }
  }
});
