document.getElementById('compareType').onchange = changeSelect;
function changeSelect() {
    if (this.value == 'gr') {
        document.querySelector('.compare-two').style.display = 'none';
        document.querySelector('.compare-one').style.display = 'block';
    } else {
        document.querySelector('.compare-two').style.display = 'inline';
        document.querySelector('.compare-one').style.display = 'none';

    }
}

function removeGr(ev) {
    let el = ev.target;
    let vue = this;
    getAjax(`/delayGroup:${el.dataset.id}`).then(res => {
        for (gr of vue.groups) {
            if (gr._id == el.dataset.id) {
                let i = vue.groups.indexOf(gr);
                vue.groups.splice(i, 1);
            }
        }
    })
}

function removeVuz(el) {
    document.querySelector('.loader-remove').style.opacity = 1;
    if (!el.hasOwnProperty('dataset')) {
        el = el.target;
    }
    getAjax(`/delayVuz:${el.dataset.id}`).then(res => {
        for (vuz of vue.vuzs) {
            if (vuz._id == el.dataset.id) {
                let i = vue.vuzs.indexOf(gr);
                vue.vuzs.splice(i, 1);
                document.querySelector('.loader-remove').style.opacity = 0;
            }
        }
    })   
}

function createGroup () {
    document.querySelector('.createGroupsSpinner').style.opacity = 1;
    let name = document.getElementById('createGroupInp').value;
    let vuz = document.getElementById('createGroupVuz').value;
    let vue = this;
    postAjax('/createGroup', `name=${name}&vuz=${vuz}`).then(res => {
        document.getElementById('createGroupInp').value = "";
        vue.groups.push(res);
        document.querySelector('.createGroupsSpinner').style.opacity = 0;
    })
}

function createVuz (ev) {
    let loader = ev.target.nextElementSibling;
    loader.style.opacity = 1;
    let name = document.getElementById('createVuzInp').value;
    let vue = this;
    postAjax('/createVuz', `name=${name}`).then(res => {
        loader.style.opacity = 0;
        vue.vuzs.push(res);
    })
}

function compare() {
    if (document.getElementById('compareType').value == 'gr') {
        let answ = document.querySelectorAll('.selectGrForCompare');
        document.querySelector('.wrapper').hidden = false;
        document.querySelector('body > div > div > table > tbody > tr > th:nth-child(6)').innerText = 'Соотношение сдавших за 1 тест';
        document.querySelector('body > div > div > table > tbody > tr > th:nth-child(7)').innerText = 'Соотношение сдавших за 2 тест';
        for (let an of answ) {
            let xhr2 = new XMLHttpRequest();
            xhr2.open('GET', `/group:${an.value}?onlygr=true`, 'true');
            xhr2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr2.send();
            xhr2.onload = function() {
                let resp = JSON.parse(xhr2.responseText);
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
        document.querySelector('body > div > div > table > tbody > tr > th:nth-child(6)').innerText = 'Кол-во групп';
        document.querySelector('body > div > div > table > tbody > tr > th:nth-child(7)').innerText = 'Кол-во студентов';
        for (let an of answ) {
            let xhr2 = new XMLHttpRequest();
            xhr2.open('GET', `/vuz:${an.value}`, 'true');
            xhr2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr2.send();
            xhr2.onload = function () {
                if (xhr2.responseText) {
                    let resp = JSON.parse(xhr2.responseText);
                    let el = document.createElement('tr');
                    for (prop in resp ) {
                        if (resp[prop] == null) resp[prop] = 0;
                    }
                    el.innerHTML = `<td>${resp.name}</td><td>${resp.midbal}</td><td>${resp.midbal2}</td><td>${resp.per1}%</td><td>${resp.per2}%</td><td>${resp.grps}</td><td>${resp.students}</td>`;
                    document.querySelector('.inner-table').children[0].appendChild(el);
                }
            }
        }
    }
}

document.querySelector('.wrapper').style.minHeight = document.documentElement.offsetHeight + 'px';

document.querySelector('.close').onclick = function (ev) {
    this.parentElement.parentElement.hidden = true; 
    let buf = this.parentElement.children[1].children[0].children[0];
    this.parentElement.children[1].children[0].innerHTML = '';
    this.parentElement.children[1].children[0].appendChild(buf);
}

let header = new Vue({
    el: 'header',
    data: {
        name: ''
    },
    created: function () {
        getAjax('/users/me').then(res => {
            this.name = res.fio;
        }).catch(err => console.log(err))

    }
})

let main = new Vue({
    el: 'main', 
    data: {
        vuzs: [],
        groups: []
    },
    created: function () {
        getAjax('/vuzs').then(vuzs => this.vuzs = vuzs);
        getAjax('/groups').then(groups => {this.groups = groups;});
        
    },
    methods: {
        compare: compare,
        addGrSelect: function (ev) {
            let select = document.createElement('select');
            select.className = 'selectGrForCompare';
            for (gr of this.groups) {
                let option = document.createElement('option');
                option.value = gr.name;
                option.innerText = gr.name;
                select.appendChild(option);
            }
            ev.path[1].insertBefore(select, ev.target);
        },
        removeGr: removeGr,
        removeVuz: removeVuz,
        createGr: createGroup,
        createVuz: createVuz,
        getMidPercent: function(el, chooser) {
            let midPercent = 0;
            if (chooser == 2) {
                if (el.percents2) {
                    for (percent of el.percents2) {
                        midPercent += Number(percent.procents);
                    }
                }
            } else {
                if (el.percents) {
                    for (percent of el.percents) {
                        midPercent += Number(percent.procents);
                    }
                } 
            }
            midPercent /= el.students.length || 0;
            if (!midPercent) {
                midPercent = 0
            }
            console.log(el);
            return midPercent.toFixed(2) + '%'
        }
    }
})

function postAjax(url, data) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(data);
        xhr.onload = () => {
            resolve(JSON.parse(xhr.responseText));
        }
        xhr.onerror = () => {
            reject(err);
        }
    })
}
function getAjax(url) {
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.send();
        xhr.onload = function () {
            resolve(JSON.parse(this.responseText));
        }
        xhr.onerror = function(err) {
            reject(err);
        }
    })
    
}