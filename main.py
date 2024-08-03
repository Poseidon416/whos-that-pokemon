from app import app
import pandas as pd

def convert_meters(meters):
    inches = round(meters * 39.37)
    feet, inches = divmod(inches, 12)
    return f'{feet}\' {inches}"'

def convert_kgs(kgs):
    return round((kgs*2.205), 1)

stats = pd.read_csv('app/static/pokedex/stats.csv')
stats.set_index('Name')

