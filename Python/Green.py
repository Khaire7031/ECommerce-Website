# from codecarbon import OfflineEmissionsTracker

# tracker = OfflineEmissionsTracker(country_iso_code="IND")

# tracker.start()
# sum = 0
# for i in range(100):
#     sum = sum + 1

# print(sum)
# tracker.stop()


from codecarbon import OfflineEmissionsTracker


def fibonacci_recursive(n):
    if n <= 1:
        return n
    return fibonacci_recursive(n - 1) + fibonacci_recursive(n - 2)

def fibonacci_dp(n):
    fib = [0, 1]
    for i in range(2, n + 1):
        fib.append(fib[i - 1] + fib[i - 2])
    return fib[n]

def main():
    n = 37
    tracker1 = OfflineEmissionsTracker(country_iso_code="IND")
    tracker2 = OfflineEmissionsTracker(country_iso_code="IND")

    print("\n")
    print("Fibonacci Series using Recursive Approach:")
    tracker1.start()
    for i in range(n):
        print(fibonacci_recursive(i), end=" ")
    
    print("\n")
    tracker1.stop()


    print("\n----------------------\n")

    tracker2.start()
    print("Fibonacci Series using Dynamic Programming:")
    for i in range(n):
        print(fibonacci_dp(i), end=" ")

    print("\n")
    tracker2.stop()

if __name__ == "__main__":
    main()
