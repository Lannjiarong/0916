# Taiwan Weather Forecast — Project Workflow

## 1. Project Overview

Build a Taiwan weather data application using the Central Weather Administration (CWA) Open Data API, Python, JSON, Pandas, SQLite, SQL, Streamlit, and GitHub.

The final product is an interactive **Taiwan Weather Forecast Dashboard**. Users can select a region/date and view forecast information such as minimum temperature, maximum temperature, weather condition, and precipitation probability, together with tables, charts, and a Taiwan map.

The project is designed as a learning project: understand the complete data flow instead of only copying a finished application.

---

## 2. Core Data Flow

```text
Central Weather Administration (CWA)
            |
            | REST API / HTTP GET
            v
      Python requests
            |
            | JSON response
            v
       JSON Parser
            |
            | extract / clean
            v
     Pandas DataFrame
            |
            | INSERT
            v
          SQLite
            |
            | SQL SELECT
            v
     Pandas / Python
            |
            v
        Streamlit
            |
            v
   Web Weather Dashboard
```

The most important learning path is:

**HTTP → API → JSON → Python data structures → Pandas → SQL/SQLite → Streamlit → Web App**

---

## 3. Project Goals

- Learn how to obtain real-world data from a public API.
- Understand HTTP requests and JSON responses.
- Practice extracting nested data from JSON.
- Convert API data into a clean tabular structure.
- Store forecast data in SQLite.
- Practice SQL queries for data retrieval and validation.
- Build an interactive web application with Streamlit.
- Display weather trends with charts and tables.
- Display regional weather information on a Taiwan map.
- Use Git/GitHub for version control.
- Deploy the application through Streamlit Community Cloud with GitHub auto-deployment.
- Keep API keys/secrets out of source control.
- Leave room for later AI-based weather analysis.

---

## 4. Development Milestones

### Milestone 1 — CWA API

Goal: successfully retrieve real weather data.

Tasks:

1. Create/obtain a CWA Open Data API key.
2. Select an appropriate forecast dataset.
3. Learn the API endpoint and required parameters.
4. Use Python `requests` to send an HTTP GET request.
5. Check the HTTP response.
6. Convert the response to JSON.

Expected result:

```python
response = requests.get(url, headers=headers)
response.raise_for_status()
data = response.json()
```

---

### Milestone 2 — JSON Parsing

Goal: understand and extract the required fields from the CWA JSON structure.

Tasks:

- Inspect the JSON hierarchy.
- Understand dictionaries and lists.
- Locate regions/cities.
- Extract forecast time periods.
- Extract weather condition (`Wx`).
- Extract minimum temperature (`MinT`).
- Extract maximum temperature (`MaxT`).
- Extract precipitation probability (`PoP`).
- Convert the nested structure into a simple Python list/dictionary structure.

Target structure:

```text
regionName | dataDate | minT | maxT | weather | pop
```

---

### Milestone 3 — Pandas Data Processing

Goal: transform the extracted JSON into a clean DataFrame.

Example:

```text
regionName | dataDate   | minT | maxT | weather | pop
------------------------------------------------------
臺中市      | 2026-09-16 | 25   | 32   | 多雲    | 30
```

Tasks:

- Create a DataFrame.
- Rename columns when necessary.
- Convert numeric fields to numeric types.
- Normalize dates/times.
- Check missing values.
- Filter by region.
- Sort by date.
- Inspect min/max temperatures.

---

### Milestone 4 — SQLite Database

Goal: persist the cleaned forecast data.

Suggested database:

```text
data.db
```

Suggested table:

```sql
CREATE TABLE TemperatureForecasts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    regionName TEXT NOT NULL,
    dataDate TEXT NOT NULL,
    minT REAL,
    maxT REAL,
    weather TEXT,
    pop REAL
);
```

Tasks:

- Create the SQLite database.
- Create the forecast table.
- Insert parsed API data.
- Avoid unintended duplicate records.
- Query stored data.
- Validate that API data and database data match.

Important SQL to learn:

```sql
SELECT * FROM TemperatureForecasts;
SELECT DISTINCT regionName FROM TemperatureForecasts;
SELECT * FROM TemperatureForecasts WHERE regionName = '臺中市';
SELECT * FROM TemperatureForecasts ORDER BY dataDate;
```

---

### Milestone 5 — Streamlit Basics

Goal: build the basic web interface before connecting every component.

Tasks:

- Install Streamlit.
- Create `app.py`.
- Add a page title.
- Add a region `selectbox`.
- Display text and metrics.
- Display a DataFrame.

Example concept:

```python
import streamlit as st

st.title("Taiwan Weather Forecast")
region = st.selectbox("選擇地區", ["臺北市", "臺中市", "高雄市"])
```

---

### Milestone 6 — SQLite + Streamlit

Goal: make the web application read real stored data.

```text
User selects region
        |
        v
Streamlit
        |
        v
SQL query
        |
        v
SQLite
        |
        v
DataFrame
        |
        v
Dashboard
```

Tasks:

- Connect Streamlit to SQLite.
- Query the selected region.
- Display the forecast table.
- Handle empty query results.
- Separate database logic from UI logic where practical.

---

### Milestone 7 — Visualization and Map

Goal: make the data easier to understand visually.

Add:

- Minimum/maximum temperature line chart.
- Forecast table.
- Weather metrics.
- Taiwan regional map.

Suggested map flow:

```text
Region
  + latitude
  + longitude
  + temperature
       |
       v
Interactive Taiwan map
```

Possible technologies:

- Streamlit charts for simple charts.
- Folium + `streamlit-folium` for a more interactive map.

---

### Milestone 8 — GitHub + Streamlit Deployment

Goal: publish the application and establish an automatic deployment workflow.

Repository:

`Lannjiarong/0916`

Recommended project structure:

```text
0916/
├── app.py
├── weather_api.py
├── parser.py
├── database.py
├── requirements.txt
├── README.md
├── workflow.md
└── data.db
```

Development/deployment flow:

```text
Local development
      |
      v
Test locally
      |
      v
Git add / commit
      |
      v
Git push
      |
      v
GitHub repository
      |
      v
Streamlit Community Cloud
      |
      v
Automatic deployment / update
      |
      v
Public Weather Dashboard
```

---

## 5. GitHub Workflow

For each development cycle:

```bash
git status
git add .
git commit -m "Describe the change"
git push
```

Recommended commit progression:

```text
Initial Streamlit project
Add CWA API request
Add JSON parser
Add Pandas data processing
Add SQLite database
Connect database to Streamlit
Add temperature chart
Add Taiwan map
Prepare deployment
```

Keep commits small enough that each commit represents one understandable change.

---

## 6. Streamlit Deployment

The GitHub repository is the source of the deployed application.

Basic process:

1. Push the project to GitHub.
2. Open Streamlit Community Cloud.
3. Connect/select the GitHub repository.
4. Select the branch (`main`).
5. Select the Streamlit entry file (`app.py`).
6. Configure required secrets.
7. Deploy.
8. After future GitHub pushes, Streamlit can rebuild/redeploy the application.

The deployed application should always be tested after a deployment change.

---

## 7. Python Dependencies

Maintain a `requirements.txt` file.

Initial example:

```text
streamlit
requests
pandas
```

If the map implementation uses Folium:

```text
folium
streamlit-folium
```

Only include packages that the application actually imports.

---

## 8. API Key / Secrets

**Never commit the real CWA API key to GitHub.**

Do NOT write:

```python
API_KEY = "real-secret-key"
```

Use Streamlit secrets instead, for example:

```python
import streamlit as st

API_KEY = st.secrets["CWA_API_KEY"]
```

Then configure the secret in the Streamlit deployment settings.

The repository should contain code that references the secret, but not the secret value itself.

---

## 9. Suggested Code Responsibilities

### `app.py`

Responsible for:

- Streamlit page layout.
- User controls.
- Calling application functions.
- Displaying metrics, charts, tables, and maps.

### `weather_api.py`

Responsible for:

- CWA API URL/parameters.
- HTTP requests.
- Authentication headers.
- Receiving JSON.
- API error handling.

### `parser.py`

Responsible for:

- Parsing nested CWA JSON.
- Extracting required weather fields.
- Cleaning/converting values.
- Producing a consistent DataFrame or data structure.

### `database.py`

Responsible for:

- SQLite connection.
- Table creation.
- Data insertion/updating.
- SQL queries.
- Database-related operations.

This separation keeps the project easier to understand and maintain than putting the entire application in one large `app.py`.

---

## 10. Final Architecture

```text
                  CWA Open Data
                       |
                       | API
                       v
               +---------------+
               | weather_api.py|
               +-------+-------+
                       |
                     JSON
                       |
                       v
                 +-----------+
                 | parser.py |
                 +-----+-----+
                       |
                  DataFrame
                       |
                       v
                 +-----------+
                 | database.py|
                 +-----+-----+
                       |
                    SQLite
                       |
                    SQL Query
                       |
                       v
                 +-----------+
                 |   app.py   |
                 | Streamlit  |
                 +-----+-----+
                       |
                       v
             Weather Dashboard
                       |
              +--------+--------+
              |                 |
           Charts             Map
              |                 |
              +--------+--------+
                       |
                    Browser
```

---

## 11. Future AI Extension

AI should be added after the core data pipeline works.

Possible extensions:

```text
Weather Database
      |
      v
AI analysis
      |
      +--> Natural-language weather summary
      +--> Weekend activity suggestions based on weather data
      +--> Rain/temperature alerts
      +--> Weather Q&A
      +--> Personalized forecast explanations
```

The important principle is:

**First build a reliable data pipeline. Then use AI to analyze the data.**

---

## 12. Definition of Done

The first complete version is finished when:

- [ ] CWA API data can be retrieved successfully.
- [ ] JSON can be parsed into structured records.
- [ ] Forecast data is converted into a DataFrame.
- [ ] Data is stored in SQLite.
- [ ] SQL queries can retrieve and validate the data.
- [ ] Streamlit can read the database.
- [ ] Users can select a region.
- [ ] Forecast information is displayed correctly.
- [ ] Temperature trends are visualized.
- [ ] A Taiwan weather map is displayed.
- [ ] `requirements.txt` is complete.
- [ ] API secrets are not committed to GitHub.
- [ ] The project is pushed to `Lannjiarong/0916`.
- [ ] Streamlit Community Cloud successfully deploys the application.
- [ ] A GitHub push can trigger the deployment/update workflow.

---

## 13. Learning Principle

Do not start by copying the complete final application.

Build and verify one layer at a time:

```text
1. Can I call the API?
        ↓
2. Can I understand the JSON?
        ↓
3. Can I extract the fields I need?
        ↓
4. Can I turn them into a DataFrame?
        ↓
5. Can I store them in SQLite?
        ↓
6. Can I retrieve them with SQL?
        ↓
7. Can Streamlit display them?
        ↓
8. Can users interact with them?
        ↓
9. Can GitHub + Streamlit deploy it?
```

The goal is not only to finish the dashboard, but to understand the complete path from **real-world data source → backend processing → database → frontend → deployment**.