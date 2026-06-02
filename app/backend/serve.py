from pathlib import Path
import runpy
import sys


APP_DIR = Path(__file__).resolve().parents[1]
APP_ENTRYPOINT = APP_DIR / "serve.py"

if __name__ == "__main__":
    sys.path.insert(0, str(APP_DIR))
    runpy.run_path(str(APP_ENTRYPOINT), run_name="__main__")
