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
    const searchTerm = req.query.search;
    const searchColumn = req.query.column;
    let query = '';
    let values = [];

    if (searchTerm) {
        if (searchColumn && searchColumn !== 'all') {
            // Ako je stupac numerički, pretvori ga u tekst
            const numericalColumns = ['godina_proizvodnje', 'snaga_motora', 'broj_vrata', 'cijena', 'težina_vozila'];
            const isNumericalColumn = numericalColumns.includes(searchColumn);
            const columnForQuery = isNumericalColumn ? `CAST("${searchColumn}" AS TEXT)` : `"${searchColumn}"`;

            query = `SELECT * FROM automobili JOIN proizvođači ON automobili.proizvođač_id = proizvođači.id WHERE ${columnForQuery} ILIKE $1`;
            values = [`%${searchTerm}%`];
        } else {
            // Pretraga po svim stupcima
            query = `
          SELECT * FROM automobili
          JOIN proizvođači ON automobili.proizvođač_id = proizvođači.id
          WHERE 
            proizvođači.naziv_proizvođača ILIKE $1 OR 
            proizvođači.sjedište_proizvođača ILIKE $1 OR 
            automobili.model ILIKE $1 OR 
            CAST(automobili.godina_proizvodnje AS TEXT) ILIKE $1 OR 
            automobili.boja ILIKE $1 OR 
            automobili.motor ILIKE $1 OR 
            CAST(automobili.snaga_motora AS TEXT) ILIKE $1 OR 
            automobili.vrsta_goriva ILIKE $1 OR 
            CAST(automobili.broj_vrata AS TEXT) ILIKE $1 OR 
            CAST(automobili.cijena AS TEXT) ILIKE $1 OR 
            CAST(automobili.težina_vozila AS TEXT) ILIKE $1
        `;
            values = [`%${searchTerm}%`];
        }
    } else {
        // Ako nema termina za pretragu, vrati sve
        query = 'SELECT * FROM automobili JOIN proizvođači ON automobili.proizvođač_id = proizvođači.id';
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

    if (searchTerm) {
        if (searchColumn && searchColumn !== 'all') {
            // Ako je stupac numerički, pretvori ga u tekst
            const numericalColumns = ['godina_proizvodnje', 'snaga_motora', 'broj_vrata', 'cijena', 'težina_vozila'];
            const isNumericalColumn = numericalColumns.includes(searchColumn);
            const columnForQuery = isNumericalColumn ? `CAST("${searchColumn}" AS TEXT)` : `"${searchColumn}"`;

            query = `SELECT * FROM automobili JOIN proizvođači ON automobili.proizvođač_id = proizvođači.id WHERE ${columnForQuery} ILIKE $1`;
            values = [`%${searchTerm}%`];
        } else {
            // Pretraga po svim stupcima
            query = `
          SELECT * FROM automobili
          JOIN proizvođači ON automobili.proizvođač_id = proizvođači.id
          WHERE 
            proizvođači.naziv_proizvođača ILIKE $1 OR 
            proizvođači.sjedište_proizvođača ILIKE $1 OR 
            automobili.model ILIKE $1 OR 
            CAST(automobili.godina_proizvodnje AS TEXT) ILIKE $1 OR 
            automobili.boja ILIKE $1 OR 
            automobili.motor ILIKE $1 OR 
            CAST(automobili.snaga_motora AS TEXT) ILIKE $1 OR 
            automobili.vrsta_goriva ILIKE $1 OR 
            CAST(automobili.broj_vrata AS TEXT) ILIKE $1 OR 
            CAST(automobili.cijena AS TEXT) ILIKE $1 OR 
            CAST(automobili.težina_vozila AS TEXT) ILIKE $1
        `;
            values = [`%${searchTerm}%`];
        }
    } else {
        // Ako nema termina za pretragu, vrati sve
        query = 'SELECT * FROM automobili JOIN proizvođači ON automobili.proizvođač_id = proizvođači.id';
    }

    try {
        const { rows } = await pool.query(query, values);

        if (format === 'csv') {
            // Ako je tražen CSV format, pretvori rezultate u CSV
            const json2csvParser = new Parser();
            const csv = json2csvParser.parse(rows);
            res.header('Content-Type', 'text/csv');
            res.attachment('filtrirani_podaci.csv');
            res.send(csv);
        } else {
            // Ako je tražen JSON format ili nije specificiran, šalji JSON
            res.header('Content-Type', 'application/json');
            res.header('Content-Disposition', 'attachment; filename=filtrirani_podaci.json');
            res.send(JSON.stringify(rows));
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