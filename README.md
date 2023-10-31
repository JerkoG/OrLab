# Baza podataka "Automobili"

Ova baza podataka sadrži informacije o proizvođačima i njihovim automobilima.

## Metapodaci

- **Naziv**: Baza podataka "Automobili"
- **Verzija**: 1.0
- **Datum izrade**: 31.10.2023.
- **Autor**: Jerko Gunjača
- **Broj automobila**: 10
- **Korišteni DBMS**: PostgreSQL
- **Licenca**: MIT
- **Jezik dokumentacije**: Hrvatski
- **Kontakt**: jg53795@fer.hr
- **Skripte za izvoz podataka**: `export_to_csv.py` i `export_to_json.py`

## Korištenje baze podataka

Baza podataka se sastoji od dvije tablice: "proizvođači" i "automobili". 

### Tablica "proizvođači"

Tablica "proizvođači" sadrži informacije o proizvođačima automobila.

#### Stupci tablice "proizvođači"

1. `id` (integer): Jedinstveni identifikator proizvođača.
2. `naziv_proizvođača` (character varying): Naziv proizvođača automobila.
3. `sjedište_proizvođača` (character varying): Sjedište proizvođača.

### Tablica "automobili"

Tablica "automobili" sadrži informacije o pojedinim automobilima.

#### Stupci tablice "automobili"

1. `id` (integer): Jedinstveni identifikator automobila.
2. `proizvođač_id` (integer): Povezuje automobil s odgovarajućim proizvođačem koristeći ID proizvođača.
3. `model` (character varying): Model automobila.
4. `godina_proizvodnje` (integer): Godina proizvodnje automobila.
5. `boja` (character varying): Boja automobila.
6. `motor` (character varying): Opis motora automobila.
7. `snaga_motora` (integer): Snaga motora u konjskim snagama.
8. `vrsta_goriva` (character varying): Vrsta goriva koju automobil koristi.
9. `broj_vrata` (integer): Broj vrata na automobilu.
10. `cijena` (numeric): Cijena automobila.
11. `težina_vozila` (numeric): Težina automobila.

Ova README datoteka je zadnji put ažurirana 31.10.2023.