//Course  class
class Course {
    constructor(title , instructor,image) {
        this.courseId=Math.floor(Math.random()*10000);
        this.title = title;
        this.instructor=instructor;
        this.image=image;
    }
}

//UI class
class UI {
    // burda tabloya gelen verileri ekliyoruz
    addCourseToList(course) {
        const list = document.getElementById('course-list');

        var html=`
    
            <tr>
                <td><img src="img/${course.image}"/></td>
                <td>${course.title}</td>
                <td>${course.instructor}</td>
                <td> <a href="#" data-id="${course.courseId}" class="btn btn-danger btn-sm delete">Delete</a> </td>
            </tr>
        `;
        list.innerHTML+=html;
    }
    //burda elemanları ekledikten sonra formları temizlemek için kullanıyoruuz
    clearControls() {
        const title =document.getElementById('title').value="";
        const instructor =document.getElementById('instructor').value="";
        const image =document.getElementById('image').value="";
    }
    //burda elemanın silme işlemi yapılıyor
    deleteCourse(element) {
        if(element.classList.contains('delete')){
            element.parentElement.parentElement.remove();
            return true;
        }
    }
    //Mesaj vermek için kullanırız
    showAlert(message, className) {
            var alert =`
            <div class="alert alert-${className}">
                ${message}
            </div>
        `;

        const row =document.querySelector('.row');
        //beforeBegin , afterBegin , beforeEnd , afterEnd
        row.insertAdjacentHTML('beforeBegin',alert);

        // geleen uyarı mesajınınn belli bir süre sonra yok olmasını saglıyor
        setTimeout(()=>{

            document.querySelector('.alert').remove();

        },1500);    
    }
}

class Storage {

    //storageden bilgileri getirir
    static getCourses() {

        let courses;

        if (localStorage.getItem('courses')===null) {
            courses=[];
        }
        else {
            //burda format ayarı yaptık ve eger bir bilgi varsa ordan bu bilgileri aldık
            courses = JSON.parse(localStorage.getItem('courses'));
        }
        return courses ;
    }

    // getCourses tan aldıgı bilgileri ekranda göstericek
    static displayCourses() {
        const courses =Storage.getCourses();

        courses.forEach(course => {
            const ui =new UI();
            ui.addCourseToList(course);
        });

    }

    //dişarıdan aldıgı course bilgisini localstorage a eklesin
    static addCourse(course) {
            //yukarıdan aldık bilgiyi
            const courses =Storage.getCourses();
           //push metodu ile storageye ekliyoruz 
            courses.push(course);
            localStorage.setItem('courses',JSON.stringify(courses));
    }

    //dişarıdan aldıgı course bilgisini localstorageden silsin
    static deleteCourse(element) {
        if(element.classList.contains('delete')) {
            //id yi bulduk
            const id =element.getAttribute('data-id');

            const courses =Storage.getCourses();
            courses.forEach((course,index)=>{
                if(course.courseId == id) {
                    courses.splice(index,1);
                }
            });
            localStorage.setItem('courses',JSON.stringify(courses));
        }
    }

}

//bu komut eger storagede bil bilgi varsa hemen ekranda gösterecek
document.addEventListener('DOMContentLoaded',Storage.displayCourses);


document.getElementById("new-course").addEventListener('submit',function(e){
    
    //inputlara girilen bilgileri alıyoruz
    const title =document.getElementById('title').value;
    const instructor =document.getElementById('instructor').value;
    const image =document.getElementById('image').value;

    //  create course object

    //Gelen değerleri Course Fonksiyonuna gönderiyoruz
    const course =new Course(title,instructor,image);

    

    // create UI

    const ui = new UI();
   

    if(title==='' || instructor===''|| image===''){
        ui.showAlert('please complete the form','warning');
    }else {
        // add course to list 
        ui.addCourseToList(course);

        //save to localStorage

        Storage.addCourse(course);

        // clear controls
        ui.clearControls();

        ui.showAlert('The course has been added','success');
    }
   
    

    e.preventDefault(); //submit olayı kesilir ve yenilenme olmaz 
});


//Burda elemanı silme işlemleri yapılır.Kontrol dişarıda yapılır ve nesneye bilgi gönderilip ona göre silinir.
document.getElementById('course-list').addEventListener('click',function(e){

    const ui =new UI();

    //delete course
    if(ui.deleteCourse(e.target)==true) {
        
        //delete from LocalStorage
        Storage.deleteCourse(e.target);


        //sildikten sonraki mesaj
        ui.showAlert('The course has been deleted','danger');
    }

    

    

});