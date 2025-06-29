const express = require('express');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const pdfParse = require('pdf-parse');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const upload = multer({ dest: 'uploads/' });

const requiredKeywords = [
  "JavaScript", "Python", "Node.js", "React", "Express", "MongoDB",
  "REST API", "HTML", "CSS", "SQL", "Git", "Agile", "Scrum"
];

function scoreResume(text) {
  const textLower = text.toLowerCase();
  let matchCount = 0;

  requiredKeywords.forEach(keyword => {
    if (textLower.includes(keyword.toLowerCase())) {
      matchCount++;
    }
  });

  const score = Math.round((matchCount / requiredKeywords.length) * 100);
  return {
    score,
    summary: `Your resume matched ${matchCount} out of ${requiredKeywords.length} key skills.`
  };
}

app.post('/api/score-resume', upload.single('resume'), async (req, res) => {
  const filePath = req.file.path;

  try {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    const resumeText = data.text;

    const result = scoreResume(resumeText);

    // ✅ Show in terminal
    console.log(` New Resume Scored`);
    console.log(` Score: ${result.score}/100`);
    console.log(` Summary: ${result.summary}`);
    console.log("===================================");

    res.json(result);
  } catch (err) {
    console.error(" Scoring Error:", err);
    res.status(500).json({ error: 'Failed to score resume.' });
  } finally {
    fs.unlink(filePath, () => {});
  }
});

app.listen(port, () => {
  console.log(` ATS Resume Scoring running at http://localhost:${port}`);
});
