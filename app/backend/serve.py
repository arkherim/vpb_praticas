from pathlib import Path
import runpy
import sys


PROJECT_DIR = Path(__file__).resolve().parents[2]
APP_DIR = PROJECT_DIR / "app"
APP_ENTRYPOINT = APP_DIR / "serve.py"

if __name__ == "__main__":
    sys.path.insert(0, str(PROJECT_DIR))
    runpy.run_path(str(APP_ENTRYPOINT), run_name="__main__")
