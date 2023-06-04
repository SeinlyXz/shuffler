import React, { useState } from 'react';

const Shuffler = () => {
    const [jmlOrang, setJmlOrang] = useState('');
    const [jmlPerKelompok, setJmlPerKelompok] = useState('');
    const [results, setResults] = useState([]);

    const handleJmlOrangChange = (event) => {
        setJmlOrang(event.target.value);
    };

    const handleJmlPerKelompokChange = (event) => {
        setJmlPerKelompok(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (jmlOrang === '' || jmlPerKelompok === '') {
            setResults(['Usage: Masukkan jumlah orang dan jumlah orang per-kelompok']);
        } else {
            const jml = parseInt(jmlOrang);
            const klm = parseInt(jmlPerKelompok);
            const res = hitung(jml, klm);
            setResults(res);
        }
    };

    const hitung = (jml, klm) => {
        if (jml < klm) {
            return ['ERROR: TIDAK MUNGKIN DIBAGI KELOMPOK'];
        }

        const g = generateArray(jml);
        const div = Math.floor(jml / klm);
        const sisa = jml % klm;

        let output = [];
        output.push(`Jumlah orang: ${jml}`);
        output.push(`Jumlah orang per-kelompok: ${klm}`);
        output.push(`Jumlah Kelompok: ${div}`);
        output.push(`Sisa: ${sisa}`);

        let kelompok = 1;
        for (let i = 0; i < g.length; i += klm) {
            output.push(`-------------Kelompok ${kelompok}-------------`);
            kelompok += 1;

            const kelompokG = g.slice(i, i + klm);
            shuffleArray(kelompokG);

            for (let j = 0; j < kelompokG.length; j++) {
                output.push(`[*] NIM-22.61.02${kelompokG[j]}`);
            }

            if (i + klm >= g.length) {
                output.push('-------------Program Selesai-------------');
                return output;
            }
        }

        return output;
    };

    const generateArray = (jml) => {
        const g = [];
        for (let i = 31; i <= jml + 30; i++) {
            g.push(i);
        }
        return g;
    };

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    };

    const downloadCSV = () => {
        const csvContent = results.join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        if (link.download !== undefined) {
          const url = URL.createObjectURL(blob);
          link.setAttribute('href', url);
          link.setAttribute('download', 'output.csv');
          link.style.visibility = 'hidden';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      };

      const isButtonDisabled = jmlOrang === '' || jmlPerKelompok === '';

    return (
        <div className='md:p-10'>
            <h1 className='font-extrabold text-2xl md:text-4xl font-mono overflow-hidden p-5'>Let's Shuffle and Determine the Group</h1>
            <div className='p-2 md:p-10'>
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col justify-center md:mx-96 mx-10'>
                        <label> Jumlah orang: </label>
                        <input className='border border-gray-950 rounded-full px-5 py-2' type="number" value={jmlOrang} onChange={handleJmlOrangChange} />
                    </div>
                    <br />
                    <div className='flex flex-col justify-center md:mx-96 mx-10'>
                        <label>Jumlah orang per-kelompok:</label>
                        <input className='border border-gray-950 rounded-full px-5 py-2' type="number" value={jmlPerKelompok} onChange={handleJmlPerKelompokChange} />
                    </div>
                    <br />
                    <button className='bg-gray-800 text-white rounded-full px-5 py-2 hover:bg-gray-600' type="submit">Go!</button>
                </form>
            </div>
            <div>
                {results.map((result, index) => (
                    index <= 3 ? (
                        <p key={index}>{result}</p>
                    ) : (
                        <ul key={index}>
                            {result.split('\n').map((item, i) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    )
                ))}
            </div>
            <button onClick={downloadCSV} disabled={isButtonDisabled} className={`px-3 py-2 hover:bg-slate-700 hover:text-white rounded-full ${isButtonDisabled ? "text-white" : "text-black mt-5 border border-black"}`}>Download</button>
        </div>
    );
};

export default Shuffler;
