import './style/style.scss';
import specialtyItem from './specialtyItem.js'

class Specialty {
    constructor(url){
        this.url = url;
        this.data;
        this.specialty = [];
    }
    getJson() {
        fetch(this.url)
        .then(response => response.json())
        .then(obj => this.getData(obj))
    }
    getData (obj) {
        this.data = obj.data;
        this.addSpecialty()
    }
    addSpecialty() {
        for(let i = 0; i < 20; i=i+4) {
            let obj = {};
            obj.title = this.data[i].title;
            obj.specializedSubjects = [...this.data[i].specializedSubjects];
            this.specialty.push(obj);
        }
        this.render()
    }
    render() {
        const modules = document.getElementById('modules');
        for(let item of this.specialty) {
            const module = new specialtyItem(item.title, item.specializedSubjects);
            modules.insertAdjacentHTML('beforeend', module.render())
        }
    }
}

let dataObj = new Specialty('https://ipo-cp.ru/api/v1/bootcamps/605c5f71bc557b46b4f42a56/courses');
dataObj.getJson();