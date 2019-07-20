# -*- coding: utf-8 -*- 
from wand.image import Image as Img
from PIL import Image
import pyocr
import pyocr.builders
from unidecode import unidecode
import json
from unipath import Path
import sys

pdf_path = sys.argv[1]


# PDF to Images
with Img(filename=pdf_path, resolution=300) as img:
    img.compression_quality = 99
    img.save(filename='./scripts/act.jpg')    

# Prepare images
page1 = Image.open('./scripts/act-0.jpg')
w, h = page1.size
first_part = page1.crop((0,30,w/2,h-30))
first_part.save('./scripts/part_1.jpg')
second_part = page1.crop((w/2,30,w,h-30))
second_part.save('./scripts/part_2.jpg')
page2 = Image.open('./scripts/act-1.jpg')
w, h = page2.size
first_part = page2.crop((0,30,w/2,h-30))
first_part.save('./scripts/part_3.jpg')
second_part = page2.crop((w/2,30,w,h-30))
second_part.save('./scripts/part_4.jpg')

# Open parts
part_1 = Image.open('./scripts/part_1.jpg')
part_2 = Image.open('./scripts/part_2.jpg')
part_3 = Image.open('./scripts/part_3.jpg')
part_4 = Image.open('./scripts/part_4.jpg')

# Extract text
tools = pyocr.get_available_tools()[0] 
data = tools.image_to_string(part_1, lang="spa") + '\n'
data += tools.image_to_string(part_2, lang="spa") + '\n'
data += tools.image_to_string(part_3, lang="spa") + '\n'
data += tools.image_to_string(part_4, lang="spa") + '\n'

# Optional Pages
# Page 3
data_2 = ""
page3 = Path('./scripts/act-2.jpg')
if page3.exists():
    page3 = Image.open('./scripts/act-2.jpg')
    w, h = page3.size
    first_part = page3.crop((0,30,w/2,h-30))
    first_part.save('./scripts/part_5.jpg')
    second_part = page3.crop((w/2,30,w,h-30))
    second_part.save('./scripts/part_6.jpg')
    part_5 = Image.open('./scripts/part_5.jpg')
    part_6 = Image.open('./scripts/part_6.jpg')
    data += tools.image_to_string(part_5, lang="spa") + '\n'
    data += tools.image_to_string(part_6, lang="spa") + '\n'

# Create text file
textfile = open('./scripts/log.txt', 'w')
print(data_2)
# Ignore lines
section_names = {
         'DATOS ODT' : 1,
         'INFORMACION BASICA DEL SUSCRIPTOR' : 2,
         'DATOS DE MEDIDOR ENCONTRADO EN' : 3,
         'SITIO' : 3,
         'INFORMACION DEL PREDIO Y MEDIDOR' : 4,
         'PRUEBAS A MEDIDOR' : 5,
         'CONEXION EN BORNES' : 6,
         'PRUEBA A LA ACOMETIDA EXISTENTE' : 7,
         'GEOREFERENCIACION': 8,
         'AFORO DE CARGA' : 9,
         'ACCIONES TOMADAS - DATOS MEDIDOR' : 10,
         'INSTALADO' : 10,
         'PAGARE A LA ORDEN DE CEDENAR S.A' : 11,
         'E.S.P.' : 11,
         'FINALIZACION' : 12
         }
subsection_names = [
         'PRUEBA DE FUGA',
         'PREDIO',
         'MEDIDOR',
         'PRUEBA DE EXACTITUD (PRUEBA TIEMPO POTENCIA)',
         'PRUEBA REGISTRADOR',
         'Corriente Medida en Poste',
         'Corriente Medida en Bornes',
         'Diferencia Corrientes',
         'Diagrama Conexión',
         'DEL USUARIO',
         'DEL TRANSFORMADOR',
         'TOTAL AFORO',
         'NORMALIZACION MEDIDOR',
         'DATOS MEDIDOR INSTALADO',
         'NORMALIZACION ACOMETIDA',
         'TESTIGO',
         'TECNICO',
         'Firma',
         'PRUEBA DE ARRANQUE (I<01A)',
         'FUNCIONAMIENTO SIN CARGA (Giro en vacio)',
         'MEDIDOR MONOFÁSICO',
         'BIFILAR | IFcse 2 Htos',
         'ASIMÉTRICO',
         'ASMETRICO',
         'Fuente',
         'INICIO ORDEN TRABAJO',
         'BFILAR | IFose 2h dos',
         'Fl',
         'u',
         'Fuente Carga',
         'Corriente (A)',
         'Tension (V)',
         'Potencia (w)',
         '=_',
         'AH AA\u00c1A\u00c1K\u00c1K\u00c1K\u00c1K\u00c1K\u00c1K\u00c1K\u00c1K\u00c1K\u00c1K\u00c1A\u00c1AKAXAKXK\u00e1,',
         'AIINAR | Mase2 1, les',
         'ASIME. RICO',
         'BOMBILLA AHORRADORA',
         'NEVERA',
         'TELEVISOR',
         'EQUIPO DE SONIDO',
         'OTRO 1',
         'LICUADORA',
         'LAVADORA',
         'E',
         'Y',
         'Firma Deudor',
         'PROPIETARIO - ADMINISTRADOR - USUARIO',
         'dal,',
         'TECNTCO',
         'V6o',
         'BIFILAR | Ifese2Htos',
         'a',
         '|',
         'a | | Fl',
         'AND',
         '_',
         'SJ'
         ]
    
# Generate TEXT FILE, Ignore empty files
lines = data.split('\n')
currentSection = ''
currentAttribute = ''
data_json = {}
for line in lines:
    if not line.strip():
        continue
    else:
        if line in section_names:
            currentSection = section_names[line]
            data_json[currentSection] = {}
            #textfile.write('Seccion: ' + line + '\t Id: ' + str(currentSection) + '\n')
            continue
        elif ':' in line.strip():
            line = unidecode(line)
            line_data = line.split(':',1)
            if len(line_data) != 2:
                textfile.write('Error: ' + line + '\n')
            else:
                currentAttribute = line_data[0].strip()
                data_json[currentSection][currentAttribute] = line_data[1].strip()
        elif not line in subsection_names:
            textfile.write('No es atributo: ' + line + '\n')
            #data_json[currentSection][currentAttribute] += ' ' + unidecode(line) 
            
json_file = './scripts/' + data_json[1]['Nro Orden'] + '.json'
with open(json_file, 'w') as jf:
    json.dump(data_json, jf)

textfile.close()
test_file = open('./scripts/' + data_json[1]['Nro Orden'] + '.json','r')
test_data = test_file.read()

print(test_data)
sys.stdout.flush()
