## Inspiration
With an increasing amount of new immigrants and refugee displacement in the world, we identified a lack of resources for those looking to make an informed decision about a relocation. Many individuals and families face challenges in accessing reliable information on key factors such as job opportunities, cost of living, legal requirements, healthcare, and cultural integration in their prospective new homes.

## What it does
To address this gap, we aim to develop a comprehensive platform that consolidates critical resources, providing accurate and up-to-date information tailored to different migration needs. Our full-stack webapp offers expert insights and neighborhood recommendations to help individuals navigate the complexities of resettlement with confidence.

## How we built it
We developed this web-app with a React.js frontend, connected to a Django backend with a REST.API, and a RDS AWS instance hosting a PostgreSQL database. Using a LLM, it allows our system to parse the most relevant information based on a large 400k+ datapoint geographical dataset to provide the most insight.

## Challenges we ran into
A major challenge we ran into was learning how to implementing a complex geographical API (Mapbox) into our frontend while communicating with our backend with a REST.API under a 2 day time constraint. Another major challenge was finding reliable datasets for our customized LLM to provide reliable and dependable data.

## Accomplishments that we're proud of
Some accomplishments that we're most proud of are:

- Aesthetic UI design to webapp
- Responsive backend implementation
- Frontend to Backend Connection
- AWS Database integration
- A full-stack webapp in 2 days :)

## What we learned
We learned how to implement Mapbox API within our React.js frontend to provide a enjoyable and intuitive user experience. We also learned how to develop a responsive REST.API to fit our needs of communication.
