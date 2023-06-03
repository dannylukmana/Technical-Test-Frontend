import React, { useState } from 'react';

const App = () => {
  const [mahasiwa, setmahasiwa] = useState([
    { name: 'mahasiswa_1', scores: [0, 0, 0, 0] },
    { name: 'mahasiswa_2', scores: [0, 0, 0, 0] },
    { name: 'mahasiswa_3', scores: [0, 0, 0, 0] },
    { name: 'mahasiswa_4', scores: [0, 0, 0, 0] },
    { name: 'mahasiswa_5', scores: [0, 0, 0, 0] },
    { name: 'mahasiswa_6', scores: [0, 0, 0, 0] },
    { name: 'mahasiswa_7', scores: [0, 0, 0, 0] },
    { name: 'mahasiswa_8', scores: [0, 0, 0, 0] },
    { name: 'mahasiswa_9', scores: [0, 0, 0, 0] },
    { name: 'mahasiswa_10', scores: [0, 0, 0, 0] }
  ]);

  const handleScoreChange = (index, aspectIndex, value) => {
    // Memastikan nilai skor berada dalam rentang 0-10
    if (value >= 0 && value <= 10) {
      setmahasiwa(prevmahasiwa => {
        const updatedmahasiwa = [...prevmahasiwa];
        updatedmahasiwa[index].scores[aspectIndex] = value;
        return updatedmahasiwa;
      });
    }
  };

  const handleCalculateClick = (e) => {
    e.preventDefault();
    const aspectScores = {};

    for (let i = 0; i < mahasiwa[0].scores.length; i++) {
      const aspectName = `aspek_penilaian_${i + 1}`;
      const aspectmahasiwacores = {};
      mahasiwa.forEach(student => {
        aspectmahasiwacores[student.name] = student.scores[i].toString();
      });
      aspectScores[aspectName] = aspectmahasiwacores;
    }

    setResult(JSON.stringify(aspectScores, null, 2));
  };

  const [result, setResult] = useState(null);

  return (
    <div>
      <h1 style={{
            marginLeft: '180px',
            marginTop: '10px'
          }}>Aplikasi Penilaian Mahasiswa</h1>
      <div style={{ position: 'absolute' }}>
      <form onSubmit={handleCalculateClick}>
        <table>
          <thead>
            <tr>
              <th>Nama</th>
              {Array.from({ length: mahasiwa[0].scores.length }, (_, i) => (
                <th key={i}>Aspek Penilaian {i + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mahasiwa.map((student, index) => (
              <tr key={index}>
                <td>{student.name}</td>
                {student.scores.map((score, aspectIndex) => (
                  <td key={aspectIndex}>
                    <input
                      type="number"
                      value={score}
                      onChange={e => handleScoreChange(index, aspectIndex, parseInt(e.target.value))}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <button
          type="submit"
          style={{
            position: 'absolute',
            right: '5px',
            marginTop: '10px'
          }}
        >
          Simpan
        </button>
      </form>
      {result && (
        <div>
          <h2>Hasil Output JSON</h2>
          <pre>{result}</pre>
        </div>
      )}
    </div>
      </div>
      
  );
};

export default App;
