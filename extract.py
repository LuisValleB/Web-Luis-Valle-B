import re

with open(r"C:\Users\luisv\.gemini\antigravity-ide\brain\baacfd17-0991-49f1-9610-c568fe4a8dac\.system_generated\steps\5\content.md", "r", encoding="utf-8") as f:
    text = f.read()

text = re.sub(r'<script.*?</script>', '', text, flags=re.DOTALL|re.IGNORECASE)
text = re.sub(r'<style.*?</style>', '', text, flags=re.DOTALL|re.IGNORECASE)
text = re.sub(r'<[^>]+>', ' ', text)
text = re.sub(r'\s+', ' ', text)
print(text.strip())
