const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const { Parser } = require('json2csv');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Automobili',
    password: 'Jerko2404',
    port: 5432,
});

app.get('/api/automobili', async (req, res) => {
    const searchTerm = req.query.search || '';
    const searchColumn = req.query.column || 'all';
    let query = '';
    let values = [];
    const numericalColumns = ['godina_proizvodnje', 'snaga_motora', 'broj_vrata', 'cijena', 'težina_vozila'];

    if (searchTerm) {
        if (searchColumn === 'all') {
            // Pretraga po svim poljima
            query = `
                SELECT 
                    a.id,
                    a.marka,
                    a.model, 
                    a.godina_proizvodnje, 
                    (SELECT STRING_AGG(b.naziv, ', ') FROM boje b WHERE b.id = ANY(string_to_array(a.boje_id, ',')::int[])) AS boje, 
                    a.motor, 
                    a.snaga_motora, 
                    a.vrsta_goriva, 
                    a.broj_vrata, 
                    a.cijena, 
                    a.težina_vozila
                FROM 
                    automobili a
                WHERE 
                    CONCAT(a.marka, ' ', a.model, ' ', a.motor, ' ', a.vrsta_goriva, ' ', a.godina_proizvodnje, ' ', (SELECT STRING_AGG(b.naziv, ' ') FROM boje b WHERE b.id = ANY(string_to_array(a.boje_id, ',')::int[]))) ILIKE $1
                ORDER BY 
                    a.id;
            `;
            values = [`%${searchTerm}%`];
        } else {
            // Logika za pretragu po specifičnim kolonama
            let columnForQuery = numericalColumns.includes(searchColumn) ? `CAST(a."${searchColumn}" AS TEXT)` : `a."${searchColumn}"`;

            if (searchColumn === 'boje') {
                columnForQuery = `(SELECT STRING_AGG(b.naziv, ', ') FROM boje b WHERE b.id = ANY(string_to_array(a.boje_id, ',')::int[]))`;
            }

            query = `
                SELECT 
                    a.id,
                    a.marka,
                    a.model, 
                    a.godina_proizvodnje, 
                    (SELECT STRING_AGG(b.naziv, ', ') FROM boje b WHERE b.id = ANY(string_to_array(a.boje_id, ',')::int[])) AS boje, 
                    a.motor, 
                    a.snaga_motora, 
                    a.vrsta_goriva, 
                    a.broj_vrata, 
                    a.cijena, 
                    a.težina_vozila
                FROM 
                    automobili a
                WHERE 
                    ${columnForQuery} ILIKE $1
                ORDER BY 
                    a.id;
            `;
            values = [`%${searchTerm}%`];
        }
    } else {
        // Logika za prikaz svih zapisa
        query = `
            SELECT 
                a.id,
                a.marka,
                a.model, 
                a.godina_proizvodnje, 
                (SELECT STRING_AGG(b.naziv, ', ') FROM boje b WHERE b.id = ANY(string_to_array(a.boje_id, ',')::int[])) AS boje, 
                a.motor, 
                a.snaga_motora, 
                a.vrsta_goriva, 
                a.broj_vrata, 
                a.cijena, 
                a.težina_vozila
            FROM 
                automobili a
            ORDER BY 
                a.id;
        `;
    }
    try {
        const { rows } = await pool.query(query, values);
        res.json(rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

app.get('/api/automobili/download', async (req, res) => {
    const searchTerm = req.query.search || '';
    const searchColumn = req.query.column || 'all';
    const format = req.query.format || 'json';
    let query = '';
    let values = [];
    const numericalColumns = ['godina_proizvodnje', 'snaga_motora', 'broj_vrata', 'cijena', 'težina_vozila'];

    if (searchTerm) {
        let columnForQuery;
        if (searchColumn === 'all') {
            query = `
                SELECT 
                    a.id,
                    a.marka,
                    a.model, 
                    a.godina_proizvodnje, 
                    (SELECT STRING_AGG(b.naziv, ', ') FROM boje b WHERE b.id = ANY(string_to_array(a.boje_id, ',')::int[])) AS boje, 
                    a.motor, 
                    a.snaga_motora, 
                    a.vrsta_goriva, 
                    a.broj_vrata, 
                    a.cijena, 
                    a.težina_vozila
                FROM 
                    automobili a
                WHERE 
                    CONCAT(a.marka, ' ', a.model, ' ', a.motor, ' ', a.vrsta_goriva, ' ', a.godina_proizvodnje, ' ', (SELECT STRING_AGG(b.naziv, ' ') FROM boje b WHERE b.id = ANY(string_to_array(a.boje_id, ',')::int[]))) ILIKE $1
                ORDER BY 
                    a.id;
            `;
            values = [`%${searchTerm}%`];
        } else {
            columnForQuery = numericalColumns.includes(searchColumn) ? `CAST(a."${searchColumn}" AS TEXT)` : `a."${searchColumn}"`;

            if (searchColumn === 'boje') {
                columnForQuery = `(SELECT STRING_AGG(b.naziv, ', ') FROM boje b WHERE b.id = ANY(string_to_array(a.boje_id, ',')::int[]))`;
            }

            query = `
                SELECT 
                    a.id,
                    a.marka,
                    a.model, 
                    a.godina_proizvodnje, 
                    (SELECT STRING_AGG(b.naziv, ', ') FROM boje b WHERE b.id = ANY(string_to_array(a.boje_id, ',')::int[])) AS boje, 
                    a.motor, 
                    a.snaga_motora, 
                    a.vrsta_goriva, 
                    a.broj_vrata, 
                    a.cijena, 
                    a.težina_vozila
                FROM 
                    automobili a
                WHERE 
                    ${columnForQuery} ILIKE $1
                ORDER BY 
                    a.id;
            `;
            values = [`%${searchTerm}%`];
        }
    } else {
        query = `
            SELECT 
                a.id,
                a.marka,
                a.model, 
                a.godina_proizvodnje, 
                (SELECT STRING_AGG(b.naziv, ', ') FROM boje b WHERE b.id = ANY(string_to_array(a.boje_id, ',')::int[])) AS boje, 
                a.motor, 
                a.snaga_motora, 
                a.vrsta_goriva, 
                a.broj_vrata, 
                a.cijena, 
                a.težina_vozila
            FROM 
                automobili a
            ORDER BY 
                a.id;
        `;
    }

    try {
        const { rows } = await pool.query(query, values);

        if (format === 'csv') {
            const json2csvParser = new Parser();
            const csv = json2csvParser.parse(rows);
            res.header('Content-Type', 'text/csv');
            res.attachment('automobili.csv');
            res.send(csv);
        } else {
            res.header('Content-Type', 'application/json');
            res.attachment('automobili.json');
            res.send(JSON.stringify(rows));
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// GET metoda za filtriranje po cijeni
app.get('/api/automobili/cijena', async (req, res) => {
    const minCijena = req.query.minCijena;
    const maxCijena = req.query.maxCijena;
    query = `
                SELECT
                    a.id,
                    a.marka,
                    a.model, 
                    a.godina_proizvodnje, 
                    (SELECT STRING_AGG(b.naziv, ', ') FROM boje b WHERE b.id = ANY(string_to_array(a.boje_id, ',')::int[])) AS boje, 
                    a.motor, 
                    a.snaga_motora, 
                    a.vrsta_goriva, 
                    a.broj_vrata, 
                    a.cijena, 
                    a.težina_vozila
                FROM 
                    automobili a
                WHERE 
                    a.cijena BETWEEN $1 AND $2 ORDER BY a.cijena;
            `;
    try {
        const { rows } = await pool.query(query, [minCijena, maxCijena]);
        res.json(rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// GET metoda za filtriranje po godini proizvodnje
app.get('/api/automobili/godina', async (req, res) => {
    const minGodina = req.query.minGodina;
    const maxGodina = req.query.maxGodina;
    query = `
                SELECT 
                    a.id,
                    a.marka,
                    a.model, 
                    a.godina_proizvodnje, 
                    (SELECT STRING_AGG(b.naziv, ', ') FROM boje b WHERE b.id = ANY(string_to_array(a.boje_id, ',')::int[])) AS boje, 
                    a.motor, 
                    a.snaga_motora, 
                    a.vrsta_goriva, 
                    a.broj_vrata, 
                    a.cijena, 
                    a.težina_vozila
                FROM 
                    automobili a
                WHERE 
                    a.godina_proizvodnje BETWEEN $1 AND $2 ORDER BY a.godina_proizvodnje;
            `;
    try {
        const { rows } = await pool.query(query, [minGodina, maxGodina]);
        res.json(rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

app.get('/api/automobili/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const query = `
            SELECT
                a.id,
                a.marka,
                a.model, 
                a.godina_proizvodnje, 
                (SELECT STRING_AGG(b.naziv, ', ') FROM boje b WHERE b.id = ANY(string_to_array(a.boje_id, ',')::int[])) AS boje, 
                a.motor, 
                a.snaga_motora, 
                a.vrsta_goriva, 
                a.broj_vrata, 
                a.cijena, 
                a.težina_vozila
            FROM 
                automobili a
            WHERE 
                a.id = $1;
        `;
        const { rows } = await pool.query(query, [id]);
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).send('Automobil s tim ID-om nije pronađen.');
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

//Dodaj novi
app.post('/api/automobili', async (req, res) => {
    try {
        const { marka, model, godina_proizvodnje, motor, snaga_motora, vrsta_goriva, broj_vrata, cijena, težina_vozila, boje_id } = req.body;
        const query = `
            INSERT INTO automobili (marka, model, godina_proizvodnje, motor, snaga_motora, vrsta_goriva, broj_vrata, cijena, težina_vozila, boje_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            RETURNING *;
        `;
        const values = [marka, model, godina_proizvodnje, motor, snaga_motora, vrsta_goriva, broj_vrata, cijena, težina_vozila, boje_id];
        const { rows } = await pool.query(query, values);
        res.status(201).json(rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

//Obrisi
app.delete('/api/automobili/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const query = `
            DELETE FROM automobili
            WHERE id = $1
            RETURNING *;
        `;
        const { rows } = await pool.query(query, [id]);
        if (rows.length > 0) {
            res.json({ message: 'Automobil obrisan.' });
        } else {
            res.status(404).send('Automobil s tim ID-om nije pronađen.');
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

//Azuriraj
app.put('/api/automobili/:id', async (req, res) => {
    const { id } = req.params;
    const { marka, model, godina_proizvodnje, motor, snaga_motora, vrsta_goriva, broj_vrata, cijena, tezina_vozila, boje_id } = req.body;

    try {
        const query = `
            UPDATE automobili
            SET marka = $1, model = $2, godina_proizvodnje = $3, motor = $4, snaga_motora = $5, vrsta_goriva = $6, broj_vrata = $7, cijena = $8, tezina_vozila = $9, boje_id = $10
            WHERE id = $11
            RETURNING *;
        `;
        const values = [marka, model, godina_proizvodnje, motor, snaga_motora, vrsta_goriva, broj_vrata, cijena, tezina_vozila, boje_id, id];
        const { rows } = await pool.query(query, values);

        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).send('Automobil s tim ID-om nije pronađen.');
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
