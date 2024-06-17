#!/bin/bash

grep -v "eas.json" .gitignore > temp && mv temp .gitignore
grep -v "google-services.json" .gitignore > temp && mv temp .gitignore
