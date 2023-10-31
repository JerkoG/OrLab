import subprocess
import getpass

# Unos korisničkog imena i lozinke
username = input("Unesite korisničko ime baze podataka: ")
password = getpass.getpass("Unesite lozinku: ")

# Naziv baze podataka koju želite izvesti
database_name = "Automobili"

# Naziv datoteke za spremanje dumpa
dump_filename = "automobili_dump.sql"

# Izvršavanje naredbe pg_dump za izvoz baze podataka
try:
    subprocess.run([
        'pg_dump',
        f'--dbname={database_name}',
        f'--username={username}',
        f'--file={dump_filename}'
    ], input=password, text=True, check=True)

    print(f"Dump baze podataka spremljen u {dump_filename}")
except subprocess.CalledProcessError as e:
    print(f"Greška prilikom izvoza baze podataka: {e}")
except Exception as e:
    print(f"Greška: {e}")
