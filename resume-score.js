document.getElementById("resumeForm").addEventListener("submit", async function (e) {
    e.preventDefault();
  
    const fileInput = document.getElementById("resumeInput");
    const file = fileInput.files[0];
  
    if (!file) {
      alert("📎 Please upload a PDF resume.");
      return;
    }
  
    const formData = new FormData();
    formData.append("resume", file);
  
    try {
      const res = await fetch("http://localhost:3000/api/score-resume", {
        method: "POST",
        body: formData
      });
  
      const data = await res.json();
  
      if (res.ok) {
        
        const resultBox = document.getElementById("scoreResult");
        resultBox.innerHTML = `
          <h3> Resume Scored</h3>
          <p><strong>Score:</strong> ${data.score}/100</p>
          <p><strong>Summary:</strong> ${data.summary}</p>
        `;
  
        
        const historyItem = document.createElement("li");
        historyItem.textContent = `Score: ${data.score} — ${new Date().toLocaleString()}`;
        document.getElementById("historyList").prepend(historyItem);
      } else {
        alert("❌ " + data.error || "Failed to score the resume.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("❌ Failed to fetch score.");
    }
  });
  
  function goHome() {
    window.location.href = "index.html";
  }
  