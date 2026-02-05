import pymupdf.layout 
import pymupdf4llm
import pathlib

json_text = pymupdf4llm.to_json("BHA_PT_20260128.pdf")


pathlib.Path("output.json").write_text(json_text)