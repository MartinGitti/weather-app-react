const api_key = "c5f4a3fa7a9bc8983ea5b48d1f35eeb3";

test("City feched from API should be Durban", async () => {
    const URL = `http://api.openweathermap.org/data/2.5/weather?q=Durban&units=metric&appid=${api_key}`
    const apiCall = await fetch(URL);
    const data = await apiCall.json();

    expect(data.name).toBe('Durban')
})