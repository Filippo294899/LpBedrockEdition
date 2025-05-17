import os
import subprocess
import time
import shutil
import sys
import glob

RESET = "\033[0m"
GREEN = "\033[32m"
RED = "\033[31m"
YELLOW = "\033[33m"
CYAN = "\033[36m"
BOLD = "\033[1m"
BLUE = "\033[34m"

def print_header():
    print(f"{CYAN}{BOLD}")
    print("╔" + "═" * 45 + "╗")
    print("║{:^45}║".format("TypeScript Compiler"))
    print("╚" + "═" * 45 + "╝")
    print(f"{RESET}")

def get_ts_files():
    """Recupera la lista dei file TypeScript prima della compilazione"""
    return set(glob.glob('**/*.ts', recursive=True))

def get_compiled_files(before_files):
    """Trova i file JavaScript generati confrontando con i file TS originali"""
    after_files = set(glob.glob('**/*.js', recursive=True))
    compiled_files = []
    
    for js_file in after_files:
        ts_file = js_file.replace('.js', '.ts')
        if ts_file in before_files:
            compiled_files.append(js_file)
    
    return compiled_files

def spinner(message, command):
    spinner_cycle = ['|', '/', '-', '\\']
    process = subprocess.Popen(command, stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)
    idx = 0
    
    # Ottieni la lista dei file TS prima della compilazione
    ts_files_before = get_ts_files()
    compiled_files_shown = set()
    
    while process.poll() is None:
        sys.stdout.write(f"\r{YELLOW}[{spinner_cycle[idx % len(spinner_cycle)]}] {message}...{RESET}")
        sys.stdout.flush()
        
        # Controlla i nuovi file compilati
        compiled_files = get_compiled_files(ts_files_before)
        for file in compiled_files:
            if file not in compiled_files_shown:
                print(f"\n{BLUE}[📄] Compilato: {file}{RESET}")
                compiled_files_shown.add(file)
                sys.stdout.write(f"\r{YELLOW}[{spinner_cycle[idx % len(spinner_cycle)]}] {message}...{RESET}")
                sys.stdout.flush()
        
        idx += 1
        time.sleep(0.1)
    
    stdout, stderr = process.communicate()
    print('\r', end='')  # Clear spinner line
    return process.returncode, stdout.decode(), stderr.decode()

def main():
    os.system("cls" if os.name == "nt" else "clear")
    print_header()

    print(f"{YELLOW}[🔍] Checking for tsc...{RESET}")
    if not shutil.which("tsc"):
        print(f"{RED}[❌] 'tsc' not found. Please install it using: npm install -g typescript{RESET}")
        return

    print(f"{GREEN}[✅] tsc found!{RESET}\n")

    print(f"{CYAN}[🚀] Compiling your TypeScript project...{RESET}")
    return_code, out, err = spinner("Compiling", "tsc")

    if return_code == 0:
        print(f"{GREEN}[✅] Compilation successful!{RESET}")
    else:
        print(f"{RED}[❌] Compilation failed:{RESET}")
        print(f"{RED}{err}{RESET}")

    print()

if __name__ == "__main__":
    main()