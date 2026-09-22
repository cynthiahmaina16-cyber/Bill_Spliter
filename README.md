#  Interactive Bill Splitter

An interactive command-line Python application designed to quickly calculate and evenly divide restaurant bills among a group of friends. It features granular category logging, automated mathematical breakdowns, and clean currency formatting.

## Features
* **Interactive Aggregation:** Prompts users for specific itemized totals across four distinct restaurant categories: Appetizers, Main Courses, Desserts, and Drinks.
* **Custom Tip Adjustments:** Dynamically calculates an exact tip based on a user-defined percentage rather than a locked flat rate.
* **Compounding Operators:** Cleanly manages subtotal calculations using advanced arithmetic compound assignment operators (`+=`).
* **Precision Formatting:** Leverages Python f-strings to enforce strict two-decimal float values (e.g., `$62.10` instead of `$62.1`), matching real-world monetary systems.

##  How It Works
1. Run the script in your terminal window.
2. Enter the number of people splitting the transaction.
3. Input individual category costs when prompted by the program.
4. Input your preferred tip percentage (e.g., enter `20` for a 20% tip).
5. The application instantly outputs a perfectly structured receipt breakdown along with the final amount each individual owes.

##  Terminal Output Structure
The application processes inputs and prints out a clean, aligned summary receipt layout:
```text
==============================
Subtotal:         \$198.83
Tip Amount:       \$49.71
Total Bill:       \$248.54
------------------------------
Each person pays: \$62.13
==============================
```

##  Built With
* **Python 3** (Standard built-in modules)

##  Live Demo
 **[Click here to run the live Bill Splitter](https://bill-splitter-1237.ai.studio)**

```bash
