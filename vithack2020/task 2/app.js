async function getUsers() {
    let url = 'https://api.rootnet.in/covid19-in/notifications';
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
    users.data.notifications.forEach(user => {
        let htmlSegment = `<div class="user">
                            <a href="${user.link}">${user.title}</a>
                        </div>`;

        html += htmlSegment;
    });

    let container = document.querySelector('.container');
    container.innerHTML = html;


}

renderUsers();
