async function getUsers() {
    let url = 'https://api.rootnet.in/covid19-in/contacts';
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
    let primary_html = '';
    users.data.contacts.regional.forEach(user => {
        let htmlSegment = `<div class="user">
                            <h2>${user.loc} ${user.number}</h2>
                        </div>`;

        html += htmlSegment;
    });

    let container = document.querySelector('.container');
    container.innerHTML = html;

    let primary_contact = users.data.contacts.primary;
    let html_Segment = `<div class="user">
                        <ul>
                          <li>Number: ${primary_contact.number}</li>
                          <li>${primary_contact.number-tollfree}</li>
                          <li>email: ${primary_contact.email}</li>
                          <li>twitter: ${primary_contact.twitter}</li>
                          <li>facebook: ${primary_contact.facebook}</li>
                          <li>Media: ${primary_contact.media[0]}</li>
                        </ul>
                    </div>`;

    primary_html += html_Segment;

    let a = document.querySelector('.primary_data');
    a.innerHTML = primary_html;
}

renderUsers();
