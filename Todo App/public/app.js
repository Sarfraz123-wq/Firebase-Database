//check whether firebase is connected or not.
//console.log(firebase)
let input = document.querySelector('.input');
let addbtn = document.querySelector('.add');
let ul = document.querySelector('.ul');
let deleteallbtn = document.querySelector('.deleteall');

addbtn.addEventListener('click',function(){
  let li = document.createElement('li');
  li.innerHTML = input.value;
  // is sey hm todos object tk puhanch gaye.
  var database = firebase.database().ref("todos");
  // is sey random unique key generate hoi he.
  var key = database.push().key;
 // console.log(key); 
  var todo = {
    value: li.innerHTML,
    key: key
  }
  // to save data in firebase database.
  // is sey aik child key object banayega jisme iski key hogi or 
  // data jo hoga wo save krdega.
  database.child(key).set(todo)


})
// to get data from firebase database.
firebase.database().ref('todos').on('child_added',function(data){
 // console.log(data.val());
  // on method b realtime database he matlab jab b page refresh krn to run ho or child_added matlab jab b koi
  // data add ho to ye function run ho
  let li = document.createElement('li');
  li.innerHTML = data.val().value;
  // to check whether input value in console.
 // console.log(li.innerHTML)
  ul.appendChild(li); 
  li.style.display = 'inline-block';
  input.value = '';
  // Creating add and delete btns
  var Edit = document.createElement('button');
  Edit.className = 'editBtn';
  Edit.innerHTML = 'Edit';
  ul.appendChild(Edit);
  var deleteBtn = document.createElement('button');
  deleteBtn.className = 'deleteBtn';
  deleteBtn.innerHTML = 'Delete';
  ul.appendChild(deleteBtn);
  
  
// // For delete all
deleteallbtn.addEventListener('click',function(){
  ul.innerHTML = '';
  firebase.database().ref('todos').remove();
  // is me hm child ki baat he nahi kr rahe delete all matlab poora 
  // object matlab todo work he delete krdo. 
})
// For delete btn
  deleteBtn.addEventListener('click',function(e){
  deleteBtn.id = data.val().key;
  //console.log(deleteData.value)
  // this is delete code for database delete
  firebase.database().ref("todos").child(deleteBtn.id).remove();
  // this is for dom delete code
  li.remove();
  Edit.remove();
  deleteBtn.remove();
})
// For edit btn
  Edit.addEventListener('click',function(e){
  let editText = prompt('Change your list item',li.innerHTML);
  e.li = firebase.database().ref("todos").push().key;
  //console.log(e.id)
  li.innerHTML = editText;
 
  firebase.database().ref("todos").child(e.li).set(li.innerHTML);  

})
})

