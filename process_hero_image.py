import os
from rembg import remove

img_path = "public/Fotos productos/Carpas PAN/Carpas PAN Naranjo.png"
full_path = os.path.join(".", img_path)
if os.path.exists(full_path):
    print(f"Processing {img_path}...")
    try:
        with open(full_path, "rb") as i:
            input_data = i.read()
        output_data = remove(input_data)
        
        dir_name = os.path.dirname(full_path)
        base_name = os.path.basename(full_path)
        name_without_ext = os.path.splitext(base_name)[0]
        new_path = os.path.join(dir_name, name_without_ext + "_nobg.png")
        
        with open(new_path, "wb") as o:
            o.write(output_data)
        print(f"Saved: {new_path}")
    except Exception as e:
        print(f"Error: {e}")
else:
    print(f"File not found: {full_path}")
