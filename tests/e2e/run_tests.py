#!/usr/bin/env python3
import sys
import os
import pytest

# Ensure project root is in sys.path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))

def main():
    """
    Runner script for Boardroom E2E tests.
    Discovers and runs all pytest tests in the tests/e2e directory.
    """
    # Find the directory of this script (tests/e2e)
    e2e_dir = os.path.dirname(os.path.abspath(__file__))
    
    # We want to run pytest targeting the E2E tests directory
    args = [e2e_dir, "-v"]
    
    # Forward any additional command line arguments passed to run_tests.py
    if len(sys.argv) > 1:
        args.extend(sys.argv[1:])
        
    print(f"Starting Boardroom E2E test suite in directory: {e2e_dir}")
    print(f"Running pytest with arguments: {args}")
    
    # Run pytest and exit with its code
    exit_code = pytest.main(args)
    sys.exit(exit_code)

if __name__ == "__main__":
    main()
