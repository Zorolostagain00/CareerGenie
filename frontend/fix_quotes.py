import pathlib

p = pathlib.Path(r'C:\Zoro\CareerRaasta\frontend\src\pages\Assessment.tsx')
text = p.read_text(encoding='utf-8')

# Replace RIGHT SINGLE QUOTATION MARK (U+2019) with regular apostrophe
count = text.count('\u2019')
print(f"Found {count} smart quote(s)")

text = text.replace('\u2019', "'")
p.write_text(text, encoding='utf-8')
print("Fixed!")
