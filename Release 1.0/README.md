# Baza podataka "Automobili"

Ova baza podataka dizajnirana je za pohranu informacija o automobilima i njihovim proizvođačima. Sastoji se od dvije tablice: "proizvođači" i "automobili".

## Tablica "proizvođači"

Tablica "proizvođači" sadrži informacije o proizvođačima automobila.

### Stupci tablice "proizvođači"

1. `id` (integer): Jedinstveni identifikator proizvođača.
2. `naziv_proizvođača` (character varying): Naziv proizvođača automobila.
3. `sjedište_proizvođača` (character varying): Sjedište proizvođača.

## Tablica "automobili"

Tablica "automobili" sadrži informacije o pojedinim automobilima.

### Stupci tablice "automobili"

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

## Korištenje baze podataka

Ova baza podataka može se koristiti za pohranu i upravljanje informacijama o proizvođačima i automobilima. Tablice su međusobno povezane putem stupca "proizvođač_id" u tablici "automobili", što omogućava da svaki automobil bude povezan s odgovarajućim proizvođačem.

Napomena: Prije korištenja baze podataka, provjerite jesu li svi potrebni softverski alati i pristupi bazi podataka pravilno konfigurirani.

## Licenca

Ova baza podataka je dostupna pod [MIT licencom](LICENSE). To znači da je moguće slobodno koristiti, mijenjati i distribuirati sadržaj baze podataka, uz pridržavanje uvjeta navedenih u MIT licenci.

## Autor

Ova baza podataka i README datoteka su kreirani od strane Jerka Gunjače. Ako imate bilo kakvih pitanja ili trebate dodatne informacije o bazi podataka, slobodno me kontaktirajte na jg53795@fer.hr.

## Datum izrade

Ova README datoteka je zadnji put ažurirana 31.10.2023.
