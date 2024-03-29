import React, { useState, useEffect } from 'react';

const Shuffler = () => {

    function Title(){
        useEffect(() => {
            document.title = "Shuffle";
        }, []);
    }
    Title();
    const [jmlOrang, setJmlOrang] = useState('');
    const [jmlPerKelompok, setJmlPerKelompok] = useState('');
    const [results, setResults] = useState([]);
    const [choices, setChoices] = useState([]);

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
            if (jmlOrang < 0 || jmlPerKelompok < 0) {
                setResults(['Error: Tidak bisa dengan angka minus']);
            } else {
                const jml = parseInt(jmlOrang);
                const klm = parseInt(jmlPerKelompok);
                if (jml < klm) {
                    setResults(['Error: Tidak mungkin dibagi kelompok']);
                } else if (klm === 0 || jml === 0) {
                    setResults(['Error: Tidak bisa dibagi dengan 0']);
                } else if (klm > 1000 || jml > 1000) {
                    setResults(['Error: Tidak bisa lebih dari 1000']);
                } else {
                    const res = hitung(jml, klm);
                    if (jml != 0, 1) {
                        const choice = generateRandomNumber(jml);
                        setChoices(choice);
                    }
                    setResults(res);
                }
            }
        }
    };

    const generateRandomNumber = (jml) => {
        let a = Math.floor(Math.random() * jml) + 1;
        if (a > 9) {
            return [`Nomor yang terpilih adalah urut absen ke-${a}`];
        } else {
            return [`Nomor yang terpilih adalah urut absen ke-${a}`];
        }
    };

    const hitung = (jml, klm) => {

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
                if(kelompokG[j] < 10){
                    output.push(`[*] Urut Absen ke-0${kelompokG[j]}`);
                } else {
                    output.push(`[*] Urut Absen ke-${kelompokG[j]}`);
                }
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
        for (let i = 1; i <= jml; i++) {
            g.push(i);
        }
        let d = shuffleArray(g);
        return d;
    };

    function shuffleArray(array) {
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex > 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }

    const downloadCSV = () => {
        const csvContent = results.join('\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', 'output.csv');
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const isButtonDisabled = jmlOrang === '' || jmlPerKelompok === '';
    const isDownloadButtonDisabled = results.length === 0;

    return (
        <div className='md:p-10'>
            <h1 className='font-extrabold text-2xl md:text-4xl font-mono overflow-hidden p-5'>Let's Shuffle and Determine the Group</h1>
            <div className='p-2 md:p-10'>
                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col justify-center md:mx-96 mx-10'>
                        <label> Jumlah orang: </label>
                        <input className='border border-gray-950 rounded-full px-5 py-2' type="number" value={jmlOrang} onChange={handleJmlOrangChange} placeholder='Jumlah Orang' />
                    </div>
                    <br />
                    <div className='flex flex-col justify-center md:mx-96 mx-10'>
                        <label>Jumlah orang per-kelompok:</label>
                        <input className='border border-gray-950 rounded-full px-5 py-2' type="number" value={jmlPerKelompok} onChange={handleJmlPerKelompokChange} placeholder='Jumlah Orang Di Kelompok' />
                    </div>
                    <br />
                    <button className='bg-gray-800 text-white rounded-full px-5 py-2 hover:bg-gray-600' type="submit">Go!</button>
                </form>
            </div>
            {/* <div>
                <pre>{results}</pre>
            </div> */}
            <div>
                <pre>{choices}</pre>
            </div>
            <div>
                {results.map((result, index) => (
                    index <= 3 ? (
                        <p key={index} className='font-bold'>{result}</p>
                    ) : (
                        <ul key={index}>
                            {result.split('\n').map((item, i) => (
                                <li className='text-slate-800' key={i}>{item}</li>
                            ))}
                        </ul>
                    )
                ))}
            </div>
            <div className="mb-5">
                <button onClick={isDownloadButtonDisabled ? undefined : downloadCSV} disabled={isButtonDisabled} className={`px-3 py-2 hover:bg-slate-700 hover:text-white rounded-full ${isButtonDisabled ? "text-white mt-96" : "text-black mt-5 border border-black"}`}>Download</button>
            </div>
        </div>
    );
};

export default Shuffler;
