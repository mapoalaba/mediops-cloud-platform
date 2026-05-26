import time


def main():
    print("MediOps Worker started")

    while True:
        print("Worker heartbeat...")
        time.sleep(30)


if __name__ == "__main__":
    main()
