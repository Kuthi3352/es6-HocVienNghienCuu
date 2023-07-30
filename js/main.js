import Student from '../models/Student.js'
import Customer from '../models/Customer.js'
import Employee from '../models/Employee.js'
import ListPerson from '../models/ListPerson.js'

const getElement = (element) => document.querySelector(element)
let personList = new ListPerson()
let selected;
const danhSach = () => {
    const ds = getElement('#loai')
    ds.addEventListener('change', (event) =>{
        hideAllInput()
        selected = event.target.value;
        if(selected === "Student"){
            showInput('#toan')
            showInput('#ly')
            showInput('#hoa')
        }else if(selected === "Employee"){
            showInput('#soNgayLam')
            showInput('#luongTheoNgay')
        }else if(selected === "Customer"){
            showInput('#tenCongTy')
            showInput('#hoaDon')
            showInput('#danhGia')
        }
    })
    //ẩn các input
const hideAllInput = () =>{
    const inputs = document.querySelectorAll('.hideInput');
    inputs.forEach(input =>{
        input.style.display = 'none';
    });
}
const showInput = (num) =>{
    getElement(num).style.display = 'block'
 }  
 return hideAllInput()
}
danhSach()

//onclick
getElement('#btnThemNV').onclick = () =>{
    addUser();
    setLocalStorages(personList.personList)
    renderUsers();

}
//addUser
const addUser = () =>{
    const ma = getElement('#Ma').value
    const name = getElement('#name').value
    const diaChi = getElement('#diaChi').value
    const email = getElement('#email').value
    const type = getElement('#loai')
    let thongTinUser = [];
    if(selected === "Student"){
        const toan = getElement('#toanInput').value
        const ly = getElement('#lyInput').value
        const hoa = getElement('#hoaInput').value
        thongTinUser = new Student(ma, 'Student', name, diaChi, email, toan, ly, hoa)
        console.log(thongTinUser);
    }else if(selected === "Employee"){
        const soNgayLam = getElement('#soInput').value
        const luongTheoNgay = getElement('#ngayInput').value
        thongTinUser = new Employee(ma, 'Employee', name, diaChi, email, soNgayLam, luongTheoNgay)
        console.log(thongTinUser);
    }else if(selected === "Customer"){
        const tenCongTy = getElement('#tenInput').value
        const hoaDon = getElement('#hoaDonInput').value
        const danhGia = getElement('#giaInput').value
        thongTinUser = new Customer(ma, 'Customer', name, diaChi, email, tenCongTy, hoaDon, danhGia)
        console.log(thongTinUser);

    }
    personList.addPerson(thongTinUser);
}
//render ra ui
const renderUsers = (users = personList.personList) => {
    const showUser = getElement("#tableDanhSach");
    showUser.innerHTML = "";
    const userElements =  users.map(user =>{
        if(user instanceof Student){
            return ` <tr>
           <td>${user.ma}</td>
           <td>${user.type}</td>
           <td>${user.name}</td>
           <td>${user.diaChi}</td>
           <td>${user.email}</td>
           <td><button class='btn btn-danger' target='${user.ma}'>Delete</button></td>
           <td><button class='btn btn-warning' data-edit='${user.ma}'data-toggle="modal"
									data-target="#myModal">Edit</button></td>
            </tr> `
        } else if(user instanceof Employee){
            return ` <tr>
            <td>${user.ma}</td>
            <td>${user.type}</td>
            <td>${user.name}</td>
            <td>${user.diaChi}</td>
            <td>${user.email}</td>
            <td><button class='btn btn-danger' target='${user.ma}'>Delete</button></td>
            <td><button class='btn btn-warning' data-edit='${user.ma}'data-toggle="modal"
									data-target="#myModal">Edit</button></td>
             </tr> `
        }else if(user instanceof Customer){
            return ` <tr>
            <td>${user.ma}</td>
            <td>${user.type}</td>
            <td>${user.name}</td>
            <td>${user.diaChi}</td>
            <td>${user.email}</td>
            <td><button class='btn btn-danger' target='${user.ma}'>Delete</button></td>
            <td><button class='btn btn-warning' data-edit='${user.ma}'data-toggle="modal"
									data-target="#myModal">Edit</button></td>
             </tr> ` 
        }
    });
    showUser.innerHTML = userElements.join("");
}
//luu lên local storage
function setLocalStorages(a){
    localStorage.setItem("personList", JSON.stringify(a));
  
}
//render từ local ra ui
const getLocalStorage = () => {
const data = localStorage.getItem('personList') ? JSON.parse(localStorage.getItem('personList')) : [];
personList.personList = data.map(b =>{
    const{ma,name, diaChi, email, toan, ly, hoa, soNgayLam, luongTheoNgay, tenCongTy, hoaDon, danhGia} = b
    if(b.type === "Student"){
        return new Student(ma, 'Student', name, diaChi, email, toan, ly, hoa)
    }else if(b.type === "Employee"){
        return new Employee(ma, 'Employee', name, diaChi, email, soNgayLam, luongTheoNgay)
    }else if(b.type === "Customer"){
        return new Customer(ma, 'Customer', name, diaChi, email, tenCongTy, hoaDon, danhGia)
    }
});
renderUsers()

}
getLocalStorage()

//delete Ui
getElement('#tableDanhSach').onclick = m => {
const taget = m.target.getAttribute("target");
deleteUser(taget)
const edit = m.target.getAttribute("data-edit")
const date = m.target.getAttribute("data-user")
editUser(edit, data)
}
const deleteUser = (ma)=>{
    personList.xoaUser(ma)
    setLocalStorages(personList.personList)
    renderUsers()
}
// const editUser = (m,n) =>{
//     personList.editPerson(m,n);
//     setLocalStorages(personList.personList);
//   // dom va show ra ui
// getElement('#Ma').value = user.ma
// getElement('#name').value = user.name
// getElement('#diaChi').value = user.diaChi
// getElement('#email').value = user.email
// getElement('#toanInput').value = user.toan
// getElement('#lyInput').value = user.ly
// getElement('#hoaInput').value = user.hoa
// getElement('#soInput').value = user.soNgayLam
// getElement('#ngayInput').value = user.luongTheoNgay
// getElement('#tenInput').value = user.tenCongTy
// getElement('#hoaDonInput').value = user.hoaDon
// getElement('#giaInput').value = user.danhGia
// getElement('#formUser').reset()
// }
// //capnhat
// getElement('#btnCapNhat').onclick = function(){
//     var g = addUser()
//     personList.capNhatUser(g)
//     renderUsers()
//     setLocalStorages()
//     getElement('#formUser').reset()

// } 
const capnhatUser = document.querySelector('#btnCapNhat');
capnhatUser.addEventListener('click', () =>{
getElement('#Ma').value = user.ma
getElement('#name').value = user.name
getElement('#diaChi').value = user.diaChi
getElement('#email').value = user.email
getElement('#toanInput').value = user.toan
getElement('#lyInput').value = user.ly
getElement('#hoaInput').value = user.hoa
getElement('#soInput').value = user.soNgayLam
getElement('#ngayInput').value = user.luongTheoNgay
getElement('#tenInput').value = user.tenCongTy
getElement('#hoaDonInput').value = user.hoaDon
getElement('#giaInput').value = user.danhGia
personList.editPerson(ma, { name , diaChi, email, toan, ly, hoa, soNgayLam, luongTheoNgay, tenCongTy, hoaDon, danhGia})
renderUsers(personList);
setLocalStorages(personList);
})
