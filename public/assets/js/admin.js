
var data = {
    vuzs: [],
    groups: [],
    reload: reload
}
window.onload = function() {
    document.getElementById('createGroupBtn').onclick = createGroup;
    document.getElementById('createVuzBtn').onclick = createVuz;
    document.getElementById('compareType').onchange = changeSelect;
    data.reload();

}

function changeSelect() {
    if (this.value == 'gr') {
        document.querySelector('.compare-two').style.display = 'none';
        document.querySelector('.compare-one').style.display = 'block';
    } else {
        document.querySelector('.compare-two').style.display = 'inline';
        document.querySelector('.compare-one').style.display = 'none';

    }
}

function reload(type, localData) {    
    changeData();
    if (type == 'vuz') {
        data.vuzs.push(localData);
    }
    if (type == 'gr') {
        data.groups.push(localData);
    }
    addDelayEvents();
    refreshSelect();
    console.log(data.vuzs);
    rebuildVuzs();
    rebuildGroups();
}
function changeData() {
    data.vuzs = [];
    data.groups = [];
    for (value of document.querySelectorAll('.vuz-title')) {
        data.vuzs.push({name: value.innerText, id: value.parentElement.dataset.id})
    }
    console.log(data.vuzs)
    for (value of document.querySelector('.groups').children) {
        data.groups.push({name: value.innerText, vuz: value.dataset.vuz, _id: value.dataset._id})
    }
}
function addDelayEvents() {
    for (btn of document.querySelectorAll('.vuz-group-delete')) {
        btn.addEventListener('click', removeGr)
    }
    document.querySelectorAll('.delayVuzBtn').forEach(el => {
        el.addEventListener('click', removeVuz);
    })
    document.querySelectorAll('.delayVuz').forEach(el => {
        el.addEventListener('click', removeVuz);
    })
}
function refreshSelect() {
    let select = document.querySelector('.selectVuzForCreateBtn');
    select.innerHTML = '';
    for (vuz of data.vuzs) {
        let opt = document.createElement('option');
        opt.innerText = vuz.name;
        opt.value = vuz.name;
        select.appendChild(opt);
    };
    selects = document.querySelectorAll('.selectGrForCompare');
    for (select of selects) {
        select.innerHTML = '';
        for (gr of data.groups) {
            let opt = document.createElement('option');
            opt.innerText = gr.name;
            opt.value = gr._id;
            select.appendChild(opt);
        };
    }
    selects = document.querySelectorAll('.selectVuzForCompare');
    for (select of selects) {
        select.innerHTML = '';
        for (vuz of data.vuzs) {
            let opt = document.createElement('option');
            opt.innerText = vuz.name;
            opt.value = vuz.id;
            select.appendChild(opt);
        };
    }
}   
function rebuildVuzs() {
        insertedVuzs = document.querySelectorAll('.vuz-title');
        for (let vuz of data.vuzs) {
            let builder = true;
            for (insrVuz of insertedVuzs) {
                if (insrVuz.innerText === vuz.name) {
                    builder = false;
                }
            }
            if (builder) buildVuz(vuz);
        }
    function buildVuz(vuz) {
        let div = document.createElement('section');
        div.className = 'vuz';
        div.dataset.id = vuz._id;
        div.innerHTML = `
        <a name="${vuz.name}"></a>
        <h2 class="vuz-title">${vuz.name}</h2>
        <div class="vuz-body">
            <div class="vuz-headers">
                <div class="vuz-header">Имя группы</div>
                <div class="vuz-header">Кол-во студентов</div>
                <div class="vuz-header">Средняя оценка группы</div>
            </div>
            <div class="vuz-group-list">

            </div>
        </div>
        `;
        document.querySelector('.content').appendChild(div);
        let li = document.createElement('li');
        li.className = 'section-example';
        li.innerHTML = `${vuz.name} <button class="delayVuzBtn" data-id="${vuz._id}">Удалить</button>`;
        document.querySelector('.section-list').appendChild(li);
    }
    document.getElementById('createVuzInp').value = "";
}
function rebuildGroups() {
    insertedGroups = document.querySelector('.groups').children;
    for (let gr of data.groups) {
        let builder = true;
        for (insrGr of insertedGroups) {
            if (insrGr.innerText === gr.name) {
                builder = false;
            }
        }
        if (builder) buildGr(gr);
    }

    function buildGr(gr) {

        let div = document.createElement('div');
        div.className = 'vuz-group';
        div.dataset.id = gr._id;
        console.log(gr.students);
        div.innerHTML = `
            <div class="vuz-group-title"><a href="/group:${gr._id}" title="Подробнее о группе">${gr.name}</a></div>
            <div class="vuz-group-students-length">${gr.students.length}</div>
            <div class="vuz-group-ball">${gr.middleBall}</div>
            <button class="vuz-group-delete" data-id="${gr._id}">Удалить группу</button>
        `;
        for (vuz of document.querySelectorAll('.vuz-title')) {
            if (vuz.innerText == gr.vuz) {
                vuz.nextElementSibling.children[1].appendChild(div);
                div.children[3].addEventListener('click', removeGr);
            }
        }
        let li = document.createElement('li');
        li.className = 'section-example';
        li.innerText = gr.name;
        li.dataset._id= gr._id;
        li.dataset.vuz = gr.vuz;
        if (document.querySelector('.groups').children.length == 0) {
            document.querySelector('.groups').innerText = "";
        }
        document.querySelector('.groups').appendChild(li);
        document.querySelector('.createGroupsSpinner').style.opacity = 0;
    }
}
function removeGr(ev) {
    let el = ev.target;
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `/delayGroup:${el.dataset.id}`, true);
    xhr.send();
    xhr.onload = function() {
        if (xhr.responseText == 'OK' ) {
            for (elem of document.querySelectorAll('.section-example')) {
                if (el.parentElement.children[0].innerText == elem.innerText) elem.remove();
            }
            el.parentElement.remove();
            data.reload();
        }
    }
}

function removeVuz(el) {
    document.querySelector('.loader-remove').style.opacity = 1;
    if (!el.hasOwnProperty('dataset')) {
        el = el.target;
    }
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `/delayVuz:${el.dataset.id}`, true);
    xhr.send();
    xhr.onload = function() {
        if (xhr.responseText == 'OK' ) {
            let vuzs = document.querySelectorAll('.vuz');
            vuzs.forEach(vuz => {
                if (vuz.dataset.id === el.dataset.id) {
                    console.log('vuz', vuz);
                    vuz.remove();
                    el.parentElement.remove();
                }
            })
            data.reload();
        }
        document.querySelector('.loader-remove').style.opacity = 0;
    }
}

function createGroup () {
    console.log(document.querySelector('.createGroupsSpinner'));
    document.querySelector('.createGroupsSpinner').style.opacity = 1;
    let name = document.getElementById('createGroupInp').value;
    let vuz = document.getElementById('createGroupVuz').value;
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/createGroup', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(`name=${name}&vuz=${vuz}`);
    xhr.onload = function() {
        document.getElementById('createGroupInp').value = "";
        data.reload('gr', JSON.parse(xhr.responseText));
    }
}

    function createVuz () {
    let loader = this.nextElementSibling;
    loader.style.opacity = 1;
    let name = document.getElementById('createVuzInp').value;

    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/createVuz', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(`name=${name}`);
    xhr.onload = function() {
        loader.style.opacity = 0;
        resp = JSON.parse(xhr.responseText);
        for (btn of document.querySelectorAll('.delayVuzBtn')) {
            if (btn.dataset.id == resp._id) {
            btn.onclick = removeVuz;
            }
        }
        data.reload('vuz', {'name': resp.name, '_id': resp._id});
    }
}

document.querySelector('.addSelect').onclick = function() {
    let parent = this.parentElement;
    this.remove();
    let select = document.createElement('select');
    select.className = "selectGrForCompare";
    parent.appendChild(select);
    data.reload();
    parent.appendChild(this);
}
document.querySelector('.compare').onclick = function() {
    if (document.getElementById('compareType').value == 'gr') {
        let answ = document.querySelectorAll('.selectGrForCompare');
        document.querySelector('.wrapper').hidden = false;
        for (let an of answ) {
            let xhr2 = new XMLHttpRequest();
            xhr2.open('GET', `/group:${an.value}?onlygr=true`, 'true');
            xhr2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr2.send();
            xhr2.onload = function() {
                let resp = JSON.parse(xhr2.responseText);
                console.log(xhr2.responseText);
                let midBal = 0, midBal2 = 0,  percent1 = 0, percent2 = 0, otn1 = 0, otn2 = 0;
                for (bal of resp.group.balls) {
                    midBal += bal;
                    if (bal >2) {
                        otn1++;
                    }
                }
                for (bal of resp.group.balls2) {
                    midBal2 += bal;
                    if (bal >2) {
                        otn2++;
                    }
                }
                for (bal of resp.group.midBalls) {
                    percent1 += bal;
                }
                for (bal of resp.group.midBalls2) {
                    percent2 += bal;
                }
                midBal = midBal / resp.group.balls.length || 0;
                midBal2 = midBal2 / resp.group.balls2.length || 0;
                percent1 = percent1 / resp.group.midBalls.length || 0;
                percent2 = percent2 / resp.group.midBalls2.length || 0;
                otn1 = `${otn1}/${resp.group.balls.length}`;
                otn2 = `${otn2}/${resp.group.balls2.length}`;
                el.innerHTML = `<td>${resp.group.name}</td><td>${midBal}</td><td>${midBal2}</td><td>${percent1}%</td><td>${percent2}%</td><td>${otn1}</td><td>${otn2}</td>`;
                document.querySelector('.inner-table').children[0].appendChild(el);
            }
            let el = document.createElement('tr');
        }
    } else {
        let answ = document.querySelectorAll('.selectVuzForCompare');
        document.querySelector('.wrapper').hidden = false;
        for (let an of answ) {
            let xhr2 = new XMLHttpRequest();
            console.log(an);
            xhr2.open('GET', `/vuz:${an.value}`, 'true');
            xhr2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr2.send();
            xhr2.onload = function () {
                let resp = JSON.parse(xhr2.responseText);
                console.log(xhr2.responseText);
                let midBal = 0,
                    midBal2 = 0,
                    percent1 = 0,
                    percent2 = 0,
                    otn1 = 0,
                    otn2 = 0;
                for (bal of resp.group.balls) {
                    midBal += bal;
                    if (bal > 2) {
                        otn1++;
                    }
                }
                for (bal of resp.group.balls2) {
                    midBal2 += bal;
                    if (bal > 2) {
                        otn2++;
                    }
                }
                for (bal of resp.group.midBalls) {
                    percent1 += bal;
                }
                for (bal of resp.group.midBalls2) {
                    percent2 += bal;
                }
                midBal = midBal / resp.group.balls.length || 0;
                midBal2 = midBal2 / resp.group.balls2.length || 0;
                percent1 = percent1 / resp.group.midBalls.length || 0;
                percent2 = percent2 / resp.group.midBalls2.length || 0;
                otn1 = `${otn1}/${resp.group.balls.length}`;
                otn2 = `${otn2}/${resp.group.balls2.length}`;
                el.innerHTML = `<td>${resp.group.name}</td><td>${midBal}</td><td>${midBal2}</td><td>${percent1}%</td><td>${percent2}%</td><td>${otn1}</td><td>${otn2}</td>`;
                document.querySelector('.inner-table').children[0].appendChild(el);
            }
            let el = document.createElement('tr');
        }
    }
}

document.querySelector('.wrapper').style.minHeight = document.documentElement.offsetHeight + 'px';
document.querySelector('.wrapper').onclick = function (ev) {
    console.log(ev.target);
    if (ev.target.className != 'inner') {
        this.hidden = true;
        let buf = this.children[0].children[0].children[0].children[0];
        this.children[0].children[0].children[0].innerHTML = '';
        this.children[0].children[0].children[0].appendChild(buf);
    }
}