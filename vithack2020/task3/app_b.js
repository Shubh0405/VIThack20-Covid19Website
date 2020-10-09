async function getUsers() {
    let url = 'https://api.rootnet.in/covid19-in/hospitals/medical-colleges';
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

    let colleges = users.data.medicalColleges;
    colleges.forEach(x => {
      let html_colleges = `<div>
                              <h3>Name: ${x.name}</h3>
                              <p>State: ${x.state}</p>
                              <p>City: ${x.city}</p>
                              <p>Ownership: ${x.ownership}</p>
                              <p>Admission Capacity: ${x.admissionCapacity}</p>
                              <p>Hospital Beds: ${x.hospitalBeds}</p>
                          </div>`;

        html += html_colleges;
    });

    let container = document.querySelector('.container');
    container.innerHTML = html;
}

renderUsers();
