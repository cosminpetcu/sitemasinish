import requests
from bs4 import BeautifulSoup
import csv

how_many_pages = int(input("Pages "))


def main():
    cars_list = []

    for num in range(1, how_many_pages + 1):

        url = f"https://www.autovit.ro/autoturisme?page={num}"

        response = requests.get(url)

        soup = BeautifulSoup(response.content, "html")

        cars = soup.find_all("article", class_="ooa-1t80gpj ev7e6t818")

        for car in cars:
            car_name = car.find("h1", class_="ev7e6t89 ooa-1xvnx1e er34gjf0").text.strip()
            car_year = car.find("dd", attrs={'data-parameter': 'year'}).text.strip()
            car_mileage = car.find("dd", attrs={'data-parameter': 'mileage'})
            if car_mileage is not None:
                car_mileage = car_mileage.text.strip()
            car_price = car.find("h3", class_="ev7e6t82 ooa-bz4efo er34gjf0").text.strip()

            car_info = {
                "Car Name": car_name,
                "Car year": car_year,
                "Car Mileage": car_mileage,
                "Car Price": car_price,
            }

            cars_list.append(car_info)

    if cars_list:
        keys = cars_list[0].keys()

        with open("cars.csv", "w", newline="") as f:
            writer = csv.DictWriter(f, keys)
            writer.writeheader()
            writer.writerows(cars_list)

        print("Scraping complete. Data saved in cars.csv")
    else:
        print("No cars found.")


main()
