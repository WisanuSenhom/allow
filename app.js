async function getProfile() {
     document.getElementById("loading").style.display = "block";
     const profile = await liff.getProfile()
     const xurl = `https://script.google.com/macros/s/AKfycbzrQS-rfF5_PDlMf2UIl2Q74p9wK1_x2PiPuF3rKpe_RLycNi-yYimlNx7qKfbe3WQdaw/exec?user=${profile.userId}&name=${profile.displayName}`;
   
   const records = await fetch(xurl);
   const data = await records.json();
   if (data.user === null || data.user === undefined ||data.user == 0 ) {
    let timerInterval
    Swal.fire({
      icon: 'warning',
      title: 'ไม่พบข้อมูล!',
      html: 'กำลังนำพาไปหน้าบุคลากร <b></b> มิลลิวินาที',
      timer: 5000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading()
        const b = Swal.getHtmlContainer().querySelector('b')
        timerInterval = setInterval(() => {
          b.textContent = Swal.getTimerLeft()
        }, 100)
      },
      willClose: () => {
        clearInterval(timerInterval)
      }
    }).then((result) => {
      /* Read more about handling dismissals below */
      if (result.dismiss === Swal.DismissReason.timer) {
        location.replace("https://liff.line.me/1654797991-gPq2xR2n");
       // console.log('I was closed by the timer')
      }
    });

    document.getElementById("loading").style.display = "none";
  } else {
    
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'success',
      title: 'พบข้อมูล'
    })
  };
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
           <div class="d-grid gap-3 d-md-block">
           <a href="${user.y}" class="btn btn-success btn-lg" type="button">     อนุญาต    </a>
           <a href="${user.n}" class="btn btn-outline-danger disabled" type="button">ไม่อนุาต</a>
           </div>
         </ul>
       </div>
         <div class="card shadow-sm">อาจใช้เวลานาน ในการเป็นสถานะเป็นอนุญาตแล้ว เนื่องจากข้อมูลมีจำนวนมาก</div>
         <div class="card shadow-sm">ส่งคำขอเมื่อวันที่ เวลา : ${user.dupdate}
         </div>
       </div>    
       `
     });

     document.getElementById('output').innerHTML = output; 
     document.getElementById("loading").style.display = "none";
}

async function main() {
    await liff.init({ liffId: "1654797991-7WxG3pGZ" })
      if (liff.isLoggedIn()) {
        getProfile() 
      } else {
        liff.login()
      }
  }
  main()
