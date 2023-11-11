# Baza podataka "Automobili"

Ova baza podataka sadrži informacije o proizvođačima i njihovim automobilima.

## Web Aplikacija

Web aplikacija omogućava korisnicima interakciju s bazom podataka kroz različite funkcionalnosti:

- **Pregled podataka**: Prikaz svih zapisa iz baze podataka u tabličnom formatu.
- **Filtriranje podataka**: Mogućnost pretrage podataka po ključnim atributima.
- **Preuzimanje podataka**: Opcije za preuzimanje podataka u CSV i JSON formatima.

### Kako koristiti

- **Početna stranica**: Na početnoj stranici (`index.html`) možete pronaći opće informacije i linkove za preuzimanje podataka.
- **Navigacijska traka**: Koristite navigacijsku traku za prelazak između početne stranice i stranice za pregled podataka (`datatable.html`).
- **Filtriranje i preuzimanje**: Na stranici za pregled, koristite filtre za pretragu i preuzmite prikazane podatke u željenom formatu.

## Struktura Projekta

- `index.html`: Ulazna točka web aplikacije s informacijama i linkovima za preuzimanje.
- `datatable.html`: Stranica s tabličnim prikazom podataka i mogućnošću filtriranja.
- `server.js`: Server-side skripta koja upravlja API zahtjevima i poslužuje web stranice.
- `styles.css`: Stilovi za oblikovanje web stranica.
- `public/`: Direktorij koji sadrži statičke datoteke poput CSV i JSON datoteka.

## Metapodaci

- **Naziv**: Baza podataka Automobili
- **Verzija**: 2.0
- **Datum izrade**: 31.10.2023.
- **Autor**: Jerko Gunjača
- **Broj zapisa**: 10 zapisa o automobilima
- **DBMS**: PostgreSQL
- **Licenca**: MIT Licenca
- **Jezik dokumentacije**: Hrvatski
- **Kontakt**: [jg53795@fer.hr](mailto:jg53795@fer.hr)
- **Skripte za izvoz**: `export_to_csv.py`, `export_to_json.py`
- **Tehnologije**: HTML5, CSS3, JavaScript, Node.js, Express.js
- **Node.js verzija**: v20.9.0
- **Express.js verzija**: V4.18.2

## Detalji Baze Podataka

### Tablica "proizvođači"

Sadrži podatke o proizvođačima automobila.

#### Atributi

- `id`: Jedinstveni identifikator
- `naziv_proizvođača`: Naziv proizvođača
- `sjedište_proizvođača`: Sjedište proizvođača

### Tablica "automobili"

Sadrži detalje o pojedinim automobilima.

#### Atributi

- `id` (integer): Jedinstveni identifikator automobila.
- `proizvođač_id` (integer): Povezuje automobil s odgovarajućim proizvođačem koristeći ID proizvođača.
- `model` (character varying): Model automobila.
- `godina_proizvodnje` (integer): Godina proizvodnje automobila.
- `boja` (character varying): Boja automobila.
- `motor` (character varying): Opis motora automobila.
- `snaga_motora` (integer): Snaga motora u konjskim snagama.
- `vrsta_goriva` (character varying): Vrsta goriva koju automobil koristi.
- `broj_vrata` (integer): Broj vrata na automobilu.
- `cijena` (numeric): Cijena automobila.
- `težina_vozila` (numeric): Težina automobila.

## Ažuriranja

Posljednje ažuriranje ove README datoteke izvršeno je 11.11.2023. godine.
