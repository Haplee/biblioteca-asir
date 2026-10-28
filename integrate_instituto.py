import json
import os
import re

# --- Load Instituto file list ---
d = json.load(open('instituto_files.json', encoding='utf-8'))

# --- Define subject mapping based on path keywords ---
def classify_subject(path_str):
    """Classify a file path into one of the existing subjects."""
    p = path_str.lower()
    # BD / BBDD
    if re.search(r'\\bdd[\\\\/]', p) or 'bd' in p and ('base' in p or 'datos' in p or 'sql' in p or 'oracle' in p):
        return 'bbdd'
    # ASO
    if 'aso' in p or 'administra' in p or 'windows' in p or 'power' in p or 'linux' in p or 'servidor' in p:
        return 'aso'
    # IAW / IMAW
    if 'iaw' in p or 'imaw' in p or 'aplicaciones web' in p or 'joomla' in p or 'djang' in p or 'apache' in p or 'cms' in p:
        return 'iaw'
    # Programación / Python
    if 'python' in p or 'prog' in p or 'script' in p and 'pwr' not in p:
        return 'programacion'
    # Git
    if 'git' in p:
        return 'git'
    # Control
    if 'control' in p or 'dudas' in p or 'indice' in p or 'inventario' in p or 'duplicad' in p:
        return 'control'
    # EIE
    if 'eie' in p or 'emprend' in p or 'empresa' in p:
        return 'control'  # EIE goes to control as it's about process/index
    # Default
    return None

# --- Collect and classify files ---
collected = {'aso': [], 'bbdd': [], 'iaw': [], 'programacion': [], 'git': [], 'control': []}

for x in d:
    p = x['path']
    pl = p.lower()
    
    # Only consider 2024-2025 folder
    if '2024-2025' not in pl:
        continue
    
    # Skip sqldeveloper and tool directories
    if 'sqldeveloper' in pl or 'oracle.jdeveloper' in pl:
        continue
    
    subject = classify_subject(p)
    if subject is None:
        # Try broader matching
        if any(k in pl for k in ['python', 'ejemplos', 'boletin']):
            subject = 'programacion'
        elif 'manual' in pl:
            subject = 'git'
        else:
            continue  # skip unclassified
    
    # Read file content if text-based
    try:
        with open(p, 'r', encoding='utf-8', errors='ignore') as fh:
            content = fh.read()
    except:
        content = ''
    
    collected[subject].append({
        'path': p,
        'name': os.path.basename(p),
        'content': content[:500],  # first 500 chars for summary
        'size': x.get('size', 0)
    })

# --- Print summary ---
for subj, files in collected.items():
    print(f"\n=== {subj.upper()} ({len(files)} files) ===")
    for f in files[:10]:
        print(f"  {f['name']}")
    if len(files) > 10:
        print(f"  ... and {len(files)-10} more")

# Save classification
with open('instituto_collected.json', 'w', encoding='utf-8') as f:
    json.dump(collected, f, ensure_ascii=False, indent=2)

print("\n\nCollected data saved to instituto_collected.json")