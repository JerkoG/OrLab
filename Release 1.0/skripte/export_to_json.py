import psycopg2
import json
import getpass
from decimal import Decimal

# Definiranje prilagođenog enkodera za serijalizaciju Decimal objekata
class DecimalEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, Decimal):
            return str(obj)  # Pretvaranje Decimal u string
        return super(DecimalEncoder, self).default(obj)

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

# Naziv datoteke JSON u koju želimo spremiti podatke
json_filename = 'automobili.json'

# Pretvaranje rezultata u JSON format
data = []
for row in results:
    data.append({
        'Proizvođač ID': row[0],
        'Naziv proizvođača': row[1],
        'Sjedište proizvođača': row[2],
        'Automobil ID': row[3],
        'Model': row[4],
        'Godina proizvodnje': row[5],
        'Boja': row[6],
        'Motor': row[7],
        'Snaga motora': row[8],
        'Vrsta goriva': row[9],
        'Broj vrata': row[10],
        'Cijena': row[11],
        'Težina vozila': row[12]
    })

# Spremanje rezultata u JSON datoteku s prilagođenim enkoderom
with open(json_filename, 'w', encoding='utf-8') as jsonfile:
    json.dump(data, jsonfile, ensure_ascii=False, indent=4, cls=DecimalEncoder)

print(f'Podaci su spremljeni u {json_filename}.')
