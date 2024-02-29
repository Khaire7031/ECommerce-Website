
from codecarbon import OfflineEmissionsTracker
import requests

Website = "https://www.viit.ac.in/"
# Website = "https://www.muskfoundation.org/"


tracker = OfflineEmissionsTracker(country_iso_code="IND")
tracker.start()


response = requests.get(Website)

emissions = tracker.stop()

print("Emmission : ",emissions)
# print("Emissions per Second:", tracker.emissions_per_second)
# print("Country ISO Code:", tracker._country_iso_code)
# print("Start Time:", tracker.start_time)
# print("End Time:", tracker.end_time)
# print(tracker)

# print("Responce : ",response)
# page_size = len(response.content)
# print("Page Size : ",page_size)

# print("Status Code:", response.status_code)
# print("Headers:", response.headers)
# print("Content Length:", len(response.content))
# print("Content Type:", response.headers['Content-Type'])
