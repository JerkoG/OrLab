import psycopg2
import csv
import getpass

# Unos korisničkog imena i lozinke
username = input("Unesite korisničko ime baze podataka: ")
password = getpass.getpass("Unesite lozinku: ")

# Postavke za povezivanje s bazom podataka
db_settings = {
    'dbname': 'Automobili',  # Ime baze podataka "Automobili"
    'user': username,
    'password': password,
    'host': 'localhost'
}

# Povezivanje s bazom podataka
try:
    conn = psycopg2.connect(**db_settings)
    cursor = conn.cursor()
except Exception as e:
    print(f"Greška prilikom povezivanja s bazom podataka: {e}")
    exit(1)

# SQL upit za izvlačenje podataka iz tablica
sql_query = """
SELECT p.id, p.naziv_proizvođača, p.sjedište_proizvođača, a.id, a.model, a.godina_proizvodnje, a.boja, a.motor, a.snaga_motora, a.vrsta_goriva, a.broj_vrata, a.cijena, a.težina_vozila
FROM proizvođači p
INNER JOIN automobili a ON p.id = a.proizvođač_id;
"""

# Izvršavanje upita
cursor.execute(sql_query)

# Izvlačenje rezultata upita
results = cursor.fetchall()

# Zatvaranje veze s bazom podataka
cursor.close()
conn.close()

# Naziv datoteke CSV u koju želimo spremiti podatke
csv_filename = 'automobili.csv'

# Spremanje rezultata u CSV datoteku
with open(csv_filename, 'w', newline='', encoding='utf-8') as csvfile:
    csv_writer = csv.writer(csvfile)
    
    # Zapisivanje zaglavlja (nazivi stupaca)
    csv_writer.writerow(['Proizvođač ID', 'Naziv proizvođača', 'Sjedište proizvođača', 'Automobil ID', 'Model', 'Godina proizvodnje', 'Boja', 'Motor', 'Snaga motora', 'Vrsta goriva', 'Broj vrata', 'Cijena', 'Težina vozila'])
    
    # Zapisivanje redova podataka
    for row in results:
        csv_writer.writerow(row)

print(f'Podaci su spremljeni u {csv_filename}.')
