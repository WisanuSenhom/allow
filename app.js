async function getProfile() {
     const profile = await liff.getProfile();
     const xurl = `https://script.google.com/macros/s/AKfycbykotbNoAs9Qzn7ITWb4I-f2rU1c3siVQZ25TEibeFpcqhUE84UFXImpyewqp4IMzaEbQ/exec?user=${profile.userId}&name=${profile.displayName}`
   
   const records = await fetch(xurl);
   const data = await records.json();
   
   let output = '';

     data.user.forEach(function(user){
       output += `
       <div class="col">
       <div class="card text-center border-0">
       <img class="card-img-top" src="${user.pic}" alt="Card image cap">
            <h5 class="card-header">
           ${user.name} 
            </h5>
         <h7 class="card-header">
         (${user.position})
         </h7>
         <ul class="list-group list-group-flush">
         <li class="list-group-item">การปฏิบัติงาน : ${user.work}</li>
           <li class="list-group-item">วันที่ เวลามา : ${user.datein}</li>
           <li class="list-group-item">วันที่ เวลากลับ : ${user.outin}</li>
           <li class="list-group-item">ระยะห่างจากสำนักงาน : ${user.distance}</li>
           <li class="list-group-item">ชี้แจง : ${user.note}</li>
           <div class="d-grid gap-2 d-md-block">
           <a href="#" class="btn btn-outline-success" type="button">อนุญาต</a>
           <a href="#" class="btn btn-outline-danger" type="button">ไม่อนุาต</a>
           </div>
         </ul>
       </div>
         <div class="card shadow-sm">Datetimestamp : ${user.dupdate}
         </div>
       </div>    
       `
     });
     console.log(output)
     document.getElementById('output').innerHTML = output; 

}

async function main() {
    await liff.init({ liffId: "1654797991-7WxG3pGZ" })
      if (liff.isLoggedIn()) {
        getData()
      } else {
        liff.login()
      }
  }
  main()
