class Modal {
    constructor() {
        getAjax('/form.html', true).then(html => {
            let wrapper = document.querySelector('.wrapper');
            wrapper.innerHTML = html;
            document.querySelector('.line').addEventListener('transitionend', function() {
                this.parentElement.parentElement.parentElement.parentElement.toggleAttribute('hidden');
            })
        })
    }
    setTitle(title) {
        document.querySelector('.form_inner_title').innerText = title;
    }
    setBody(body) {
        document.querySelector('.form_inner_body').innerHTML = body;
    }
}

let modal = new Modal();
let formTest = {};

function createForm () {
    toggleBackground();
    modal.setTitle('Haha');
    let body = `
    <div>
        <h4>Введите название теста</h4>
        <input type="text" id="test_name">
    </div>
    <div>
        <h4>Введите кол-во вопросов</h4>
        <input type="number" id="test_count">
    </div>
    <button onclick="nextSlide()">Далее</button>
    `
    modal.setBody(body);
}


function toggleBackground() {
    document.querySelector('.form_inner_close').classList.remove('closes');
    let wrapper = document.querySelector('.wrapper');
    wrapper.toggleAttribute('hidden');
    wrapper.style.height = document.documentElement.offsetHeight + 'px';
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
        groups: [],
        tests: [],
        userTests: [],
        selectedTest: ''
    },
    created: function () {
      
        getAjax('/vuzs').then(vuzs => this.vuzs = vuzs).catch(err => console.log(err));
        getAjax('/groups').then(groups => this.groups = groups).catch(err => console.log(err));
        getAjax('/forms').then(tests => {this.tests = tests; for (gr of this.groups) {gr.test = tests[0]._id}}).catch(err => console.log(err));
        getAjax('/tests').then(userTests => this.userTests = userTests).catch(err => console.log(err));
    },
    methods: {
        changeSelect: changeSelect,
        compare: compare,
        addGrSelect: function (ev) {
            let select = document.createElement('select');
            select.className = 'selectGrForCompare';
            for (gr of this.groups) {
                let option = document.createElement('option');
                option.value = gr._id;
                option.innerText = gr.name;
                select.appendChild(option);
            }
            ev.path[1].insertBefore(select, ev.target);
        },
        removeGr: removeGr,
        removeVuz: removeVuz,
        createGr: createGroup,
        toggleBackground: toggleBackground,
        createVuz: createVuz,
        viewTest: viewTest,
        removeTest: removeTest,
        createForm: createForm,
        getMidPercent: function(el, chooser) {
                let midPercent = 0;
                let selectedTest = el.test;
                if (!el.test) el.test = 0;
                console.log(selectedTest);
                if (chooser == 2) {
                    console.log('yes')
                    for (usrTest of this.userTests) {
                        if (el.name == usrTest.group && usrTest.test == selectedTest && usrTest.try == 2) {
                            midPercent += usrTest.procents;
                        }
                    }
                } else {
                    for (usrTest of this.userTests) {
                        if (el.name == usrTest.group && usrTest.test == selectedTest && usrTest.try == 1) {
                            midPercent += usrTest.procents;
                        }
                    }
                }
                midPercent /= el.students.length || 0;
                if (!midPercent) {
                    midPercent = 0
                }
    
                return midPercent.toFixed(2) + '%'
        },
        cangeSel: cangeSel
    }
})

function cangeSel (event) {
    console.log(event)
    let group; 
    for(gr of this.groups) {
        if (gr._id == event.target.className) {
            gr.test = event.target.value;
            group = gr;
        }
    }
    let parent = event.target.parentElement.parentElement;
    let firstPr = parent.children[3],
        secondPr = parent.children[4];
    firstPr.innerText = this.getMidPercent(group);
    secondPr.innerText = this.getMidPercent(group, 2);

}

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
function postJson(url, data) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        console.log('json data, ', data);
        xhr.send(JSON.stringify(data));
        xhr.onload = () => {
            resolve(JSON.parse(xhr.responseText));
        }
        xhr.onerror = () => {
            reject(err);
        }
    })
}
function getAjax(url, noParse) {
    return new Promise(function(resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.send();
        xhr.onload = function () {
            if (noParse) {
                resolve(this.responseText);
            } else {
                if (JSON.parse(this.responseText).length == 0) reject('{status: 404}');
                resolve(JSON.parse(this.responseText));
            }
            
        }
        xhr.onerror = function(err) {
            reject(err);
        }
    })
    
}

document.getElementById('compareType').onchange = function () {
    
}
function changeSelect() {
    let select = document.getElementById('compareType');
    console.log(select)
    if (select.value == 'gr') {
        document.querySelector('.compare-two').style.display = 'none';
        document.querySelector('.compare-one').style.display = 'block';
    } 
    if (select.value == 'vuz') {
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
    let vue = this;
    getAjax(`/delayVuz:${el.dataset.id}`).then(res => {
        for (vuz of vue.vuzs) {
            if (vuz._id == el.dataset.id) {
                let i = vue.vuzs.indexOf(vuz);
                vue.vuzs.splice(i, 1);
                console.log('removed vuz is ', vuz);
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

function cloose () {
    document.querySelector('.form_inner_close').classList.add('closes');
}

function saveTest() {
    let form = {};
    form.title = formTest.title;
    form.queastions = [];
    for (quest of document.querySelectorAll('.quest')) {
        let ask = {};
        ask.question = quest.querySelector('.quest-title').value;
        ask.answers = [];
        ask.trueAnsw = [];
        quest.querySelectorAll('label').forEach(element => {
            ask.answers.push(element.children[1].innerText);
            ask.number = element.children[0].dataset.number;
            if (element.children[0].checked) ask.trueAnsw.push(element.children[0].dataset.asknumber);
        });
        form.queastions.push(ask);
    }
    console.log(form)
    postJson('/forms', form).then(form => {main.tests.push(form); cloose()}).catch(err => new Error(err));
}
function nextSlide() {
    formTest.title = document.getElementById('test_name').value;
    formTest.count = document.getElementById('test_count').value;
    let body = '';
    for (let i= 1; i<= Number(formTest.count); i++) {
        body += `
        <div class="quest">
            <div>
                <h4>Содержание вопроса №${i}</h4>
                <input type="text" placeholder="Введите вопрос" class="quest-title">
            </div>
            <h4>Ответы на вопрос</h4>
            <div class="quest_result">

            </div>
            <div>
                <input type="text" placeholder="Текст ответа">
                <button onclick="addAnsw(this)" data-number="${i}">Добавить вариант ответа</button>
            </div>
        </div>
        `
    }

    body += '<button onclick="saveTest()">Сохранить</button>'
    modal.setBody(body);
}
function addAnsw(btn) {
    let answ = btn.parentElement.children[0].value;
    let el = document.createElement('label');
    let i = btn.parentElement.previousElementSibling.children.length;
    el.innerHTML = `<input type="checkbox" data-number="${btn.dataset.number}" data-askNumber="${i}" name="quest-${btn.dataset.number}"><span>${answ}</span>`;
    btn.parentElement.previousElementSibling.appendChild(el);
    answ = "";
}

function removeTest(ev) {
    let id = ev.target.parentElement.dataset._id;
    let vue = this; 
    postJson(`/remove/form`, {_id: id}).then(res => {
        console.log(res)
        for (test of vue.tests) {
            if (id == test._id) {
                let i = vue.tests.indexOf(test);
                vue.tests.splice(i, 1);
            }
        }
    }).catch(err => new Error(err));
}

function viewTest(event) {
    let el = event.target;
    toggleBackground();
    modal.setTitle(el.previousElementSibling.innerText);
    let test;
    for (testt of this.tests) {
        if (el.parentElement.dataset._id == testt._id) test = testt;
    }
    console.log(test.queastions)
    let body = "";
    for (quest of test.queastions) {
        body+= `<li><span class="title">${quest.number}. ${quest.question}</span>
        <div class="answers">`;
        for (let i = 0; i < quest.answers.length; i++) {
            if (quest.trueAnsw.length > 1) console.log(quest.answers)
            body += `<span class="`;
            for (trueAnsw of quest.trueAnsw) {
                if (i == Number(trueAnsw)) {body +='green ';}
            } 
            body += 'answ">' + quest.answers[i] + '</span>';
        }
        body += '</div></li>'
    }
    modal.setBody(body);
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

function compare (ev) {
    // modal.setTitle('Сравнение групп');
    // let parentEl = ev.target.parentElement;
    // let type = document.getElementById('compareType').value;
    // let body = '';
    // if (type == 'gr') {
    //     // GR
    //     let grps = [];
    //     for (gr of parentEl.querySelectorAll('.selectGrForCompare')) {
    //         for (groups of this.groups) {
    //             if (gr.value == group._id) {
    //                 body +=`
                        
    //                 `
    //             }
    //         }
    //     }
    // } else {
    //     // VUZ
    // }
    // console.log(ev.target.parentElement.)
}