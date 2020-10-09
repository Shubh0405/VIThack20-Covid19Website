async function getUsers() {
    let url = 'https://api.rootnet.in/covid19-in/hospitals/beds';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function renderUsers() {
    let users = await getUsers();
    let html = '';

    let summary = users.data.summary;
    let html_summary = `<div>
                          <ul>
                            <li>Rural hospitals: ${summary.ruralHospitals}</li>
                            <li>Rural Beds: ${summary.ruralBeds}</li>
                            <li>Urban Hospitals: ${summary.urbanHospitals}</li>
                            <li>Urban Beds: ${summary.urbanBeds}</li>
                            <li>TotalHospitals: ${summary.totalHospitals} </li>
                            <li>Total Beds: ${summary.totalBeds}</li>
                          </ul>
                        </div>`;

    html += html_summary;

    let sources = users.data.sources
    let html_sources = `<div>
                          <a href="${sources[0].url}">Sources</a>
                        </div>`

    html += html_sources;

    let regional = users.data.regional;
    regional.forEach(x => {
      let html_regional = `<div>
                              <h3>State: ${x.state}</h3>
                              <p>Rural Hospitals: ${x.ruralHospitals}</p>
                              <p>Rural Beds: ${x.ruralBeds}</p>
                              <p>urbanHospitals: ${x.urbanHospitals}</p>
                              <p>urbanBeds: ${x.urbanBeds}</p>
                              <p>totalHospitals: ${x.totalHospitals}</p>
                              <p>totalBeds: ${x.totalBeds}</p>
                          </div>`

        html += html_regional;
    });

    let container = document.querySelector('.container');
    container.innerHTML = html;
}

renderUsers();
