from PyPDF2 import PdfReader, PdfWriter
import os

# Path to the PDF
pdf_path = os.path.expanduser(r"~\Desktop\пхукет_новая презентация_2026.pdf")
output_path = os.path.expanduser(r"~\Desktop\пхукет_новая презентация_2026_edited.pdf")

# Pages to remove (1-based)
pages_to_remove = {2, 3, 5, 7, 22}

# Read the PDF
reader = PdfReader(pdf_path)
writer = PdfWriter()

# Add pages except the ones to remove
for i in range(len(reader.pages)):
    if (i + 1) not in pages_to_remove:
        writer.add_page(reader.pages[i])

# Write the new PDF
with open(output_path, "wb") as f:
    writer.write(f)

print(f"Edited PDF saved to {output_path}")