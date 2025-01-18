

const container = document.getElementById("dots-container");

function createDot() {
  const dot = document.createElement("div");
  dot.classList.add("dot");

  // Randomize size, position, and animation timing
  const size = Math.random() * 4 + 4; // Random size between 4px and 8px
  const xPos = Math.random() * window.innerWidth; 
  const yPos = Math.random() * window.innerHeight; 
  const animationDuration = Math.random() * 4 + 6; // Random duration between 6s and 10s
  const delayDuration = Math.random() * 4 + 2; // Random delay between 2s and 6s

  dot.style.width = `${size}px`;
  dot.style.height = `${size}px`;
  dot.style.left = `${xPos}px`;
  dot.style.top = `${yPos}px`;
  dot.style.animationDuration = `${animationDuration}s`;
  dot.style.animationDelay = `${delayDuration}s`;

  container.appendChild(dot);

  // Remove dot after animation ends
  dot.addEventListener('animationend', () => {
    dot.remove();
  });
}

// Create dots at random intervals
setInterval(createDot, 150);




        let id = '9505fd1df737e20152fbd78cdb289b6a';
        let url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid=' + id;
        let city = document.querySelector('.name');
        let form = document.querySelector("form");
        let temperature = document.querySelector('.temperature');
        let description = document.querySelector('.description');
        let valueSearch = document.getElementById('name');
        let clouds = document.getElementById('clouds');
        let humidity = document.getElementById('humidity');
        let pressure = document.getElementById('pressure');
        let main = document.querySelector('main');
        let result = document.querySelector('.result');

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            if (valueSearch.value !== '') {
                searchWeather();
            }
        });

        const searchWeather = () => {
            fetch(url + '&q=' + valueSearch.value)
                .then(response => response.json())
                .then(data => {
                    if (data.cod == 200) {
                        city.querySelector('figcaption').innerHTML = data.name;
                        city.querySelector('img').src = `https://flagsapi.com/${data.sys.country}/shiny/32.png`;
                        temperature.querySelector('img').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
                        temperature.querySelector('span').innerText = data.main.temp;
                        description.innerText = data.weather[0].description;
                        clouds.innerText = data.clouds.all;
                        humidity.innerText = data.main.humidity;
                        pressure.innerText = data.main.pressure;

                        // Show the result section
                        result.style.display = 'block';
                    } else {
                        main.classList.add('error');
                        setTimeout(() => {
                            main.classList.remove('error');
                        }, 1000);
                    }
                    valueSearch.value = '';
                });
        };

        // Optional: Uncomment to search default
        // const initApp = () => {
        //     valueSearch.value = 'Washington';
        //     searchWeather();
        // };
        // initApp();