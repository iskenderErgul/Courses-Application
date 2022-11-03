//Course constructor
function Course(title , instructor , image) {
    this.title = title;
    this.instructor = instructor;
    this.image = image;
}

// UI constructor
function UI() {
}


// burda UI üzerinden tabloya gelen verileri ekliyoruz
UI.prototype.addCourseToList = function(course) {
    const list = document.getElementById('course-list');
    var html=`

        <tr>
            <td><img src="img/${course.image}"/></td>
            <td>${course.title}</td>
            <td>${course.instructor}</td>
            <td> <a href="#" class="btn btn-danger btn-sm delete">Delete</a> </td>
        </tr>
    `;
    list.innerHTML+=html;
}

//burda elemanları ekledikten sonra formları temizlemek için kullanıyoruuz
UI.prototype.clearControls = function(){
   
    const title =document.getElementById('title').value="";
    const instructor =document.getElementById('instructor').value="";
    const image =document.getElementById('image').value="";
}

//burda elemanın silme işlemi yapılıyor
UI.prototype.deleteCourse=function(element){

    if(element.classList.contains('delete')){
        element.parentElement.parentElement.remove();
    }
}


//Mesaj vermek için kullanırız
UI.prototype.showAlert = function(message,className){

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

document.getElementById("new-course").addEventListener('submit',function(e){
    
    //inputlara girilen bilgileri alıyoruz
    const title =document.getElementById('title').value;
    const instructor =document.getElementById('instructor').value;
    const image =document.getElementById('image').value;

    //  create course object

    //Gelen değerleri Course Fonksitonuna gönderiyoruz
    const course =new Course(title,instructor,image);

    // create UI

    const ui = new UI();

    if(title==='' || instructor===''|| image===''){
        ui.showAlert('please complete the form','warning');
    }else {
        // add course to list 
        ui.addCourseToList(course);

        // clear controls
        ui.clearControls();

        ui.showAlert('The course has been added','success');
    }
   
    

    e.preventDefault(); //submit olayı kesilir ve yenilenme olmaz 
});


//Burda elemanı silme işlemleri yapılır.Kontrol dişarıda yapılır ve nesneye bilgi gönderilip ona göre silinir.
document.getElementById('course-list').addEventListener('click',function(e){

    const ui =new UI();
    ui.deleteCourse(e.target);

    //sildikten sonraki mesaj
    ui.showAlert('The course has been deleted','danger');

    

});