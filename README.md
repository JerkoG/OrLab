# Baza podataka "Automobili"

Ova baza podataka sadrži informacije o automobilima i dostupnim bojama.

## Web Aplikacija

Web aplikacija omogućava korisnicima interakciju s bazom podataka kroz različite funkcionalnosti:

- **Autentifikacija**: Za pristup nekim funkcionalnostima potrebno je prijaviti se ili registrirati.
- **Pregled podataka**: Prikaz svih zapisa iz baze podataka u tabličnom formatu.
- **Filtriranje podataka**: Mogućnost pretrage podataka po ključnim atributima.
- **Preuzimanje podataka**: Opcije za preuzimanje podataka u CSV i JSON formatima.
- **Dodavanje automobila**: Dodavanje novih zapisa o automobilima.
- **Ažuriranje automobila**: Ažuriranje postojećih zapisa o automobilima.
- **Brisanje automobila**: Brisanje postojećih zapisa o automobilima.
- **Prijava i registracija korisnika**: Autentifikacija korisnika putem Auth0 servisa.
- **Upravljanje korisničkim profilom**: Pregled korisničkog profila.

### Kako koristiti

- **Početna stranica**: Na početnoj stranici (`index.html`) možete pronaći opće informacije i linkove za preuzimanje podataka.
- **Navigacijska traka**: Koristite navigacijsku traku za prelazak između različitih dijelova aplikacije.
- **Pregled podataka**: Na stranici za pregled podataka (`datatable.html`) koristite filtre za pretragu i preuzmite prikazane podatke u željenom formatu.
- **Dodavanje automobila**: Na stranici `add_car.html` možete dodavati nove informacije o automobilima.
- **Ažuriranje automobila**: Na stranici `update_car.html` možete ažurirati postojeće informacije o automobilima.
- **Autentifikacija korisnika**: Pristupite funkcionalnostima prijave i registracije putem linka "Prijava" u navigacijskoj traci.

## Struktura Projekta

- `index.html`: Ulazna točka web aplikacije s informacijama i linkovima za preuzimanje.
- `datatable.html`: Stranica s tabličnim prikazom podataka i mogućnošću filtriranja.
- `add_car.html`: Stranica za dodavanje novih zapisa o automobilima.
- `update_car.html`: Stranica za ažuriranje postojećih zapisa o automobilima.
- `profil.html`: Stranica za prikaz korisničkog profila i upravljanje korisničkim postavkama.
- `server.js`: Server-side skripta koja upravlja API zahtjevima i poslužuje web stranice.
- `styles.css`: Stilovi za oblikovanje web stranica.
- `public/`: Direktorij koji sadrži statičke datoteke poput CSV i JSON datoteka.

## Metapodaci

- **Naziv**: Baza podataka Automobili
- **Verzija**: 4.0
- **Datum izrade**: 31.10.2023.
- **Datum posljednjeg ažuriranja**: 13.1.2024.
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

### Tablica "automobili"

Sadrži detalje o pojedinim automobilima.

#### Atributi

- `id` (integer): Jedinstveni identifikator automobila.
- `model` (character varying): Model automobila.
- `godina_proizvodnje` (integer): Godina proizvodnje automobila.
- `boje_id` (integer[]): Lista ID-jeva boja u kojima auto može biti.
- `motor` (character varying): Opis motora automobila.
- `snaga_motora` (integer): Snaga motora u konjskim snagama.
- `vrsta_goriva` (character varying): Vrsta goriva koju automobil koristi.
- `broj_vrata` (integer): Broj vrata na automobilu.
- `cijena` (numeric): Cijena automobila.
- `težina_vozila` (numeric): Težina automobila.

### Tablica "boje"

Sadrži informacije o dostupnim bojama za automobile.

#### Atributi

- `id`: Jedinstveni identifikator
- `naziv_boje`: Naziv boje

