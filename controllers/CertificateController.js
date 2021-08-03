const { Order, User } = require("../models");

class CertificateController {
  static async get(req, res, next){
    try {
    const { id } = req.params;
    const order = await Order.findByPk(id, {include: [User]});
    if(!order) throw({ msg: "Invalid Certificate" })
    let {name, nik, dob} = order.User
    let {status_swab, date_swab} = order
    dob = dob.toLocaleDateString('id-ID')
    date_swab = date_swab.toLocaleDateString('id-ID')
    // console.log(name, nik, dob, status_swab, date_swab);
    // console.log(order);
    console.log(status_swab);

    if(status_swab !== 'Negatif'){
      throw({ msg: "Invalid Certificate" })
    }
    
    res.send(
      `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <!-- <link rel="stylesheet" href="style.css"> -->
        <style>
          @page{
        size:A4 landscape;
        margin:10mm;
       }
      
      body{
        margin:0rem;
        padding:0;
        /* border:1mm solid #991B1B; */
        height:188mm;
      
      }
      
      .border-pattern{
        position:absolute;
        left:4mm;
        top:-6mm;
        height:200mm;
        width:267mm;
        border:1mm solid #991B1B;
        /* http://www.heropatterns.com/ */
        background-color: #d6d6e4;
        background-image: url("data:image/svg+xml,%3Csvg width='16' height='16' viewBox='0 0 16 16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h16v2h-6v6h6v8H8v-6H2v6H0V0zm4 4h2v2H4V4zm8 8h2v2h-2v-2zm-8 0h2v2H4v-2zm8-8h2v2h-2V4z' fill='%23991B1B' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E");
      }
      
      .content{
        position:absolute;
        left:10mm;
        top:10mm;
        height:178mm;
        width:245mm;
        border:1mm solid #991B1B;
        background: white;
      
      }
      
      .content::before{
        content: "";
        background-image: url("https://www.dropbox.com/s/4tju7zw88uexiq7/oclinic.png?dl=1");
        background-repeat: no-repeat;
        background-size: 50%;
        background-position: center;
        position: absolute;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;
        opacity: 0.3;
        
      }
      
      .inner-content{
        border:1mm solid #991B1B;
        margin:4mm;
        padding:10mm;
        height:148mm;
        text-align:center;
      }
      
      h1{
        text-transform:uppercase;
        font-size:48pt;
        margin-bottom:0;
      }
      
      h2{
        font-size:24pt;
        margin-top:0;
        padding-bottom:1mm;
        display:inline-block;
        border-bottom:1mm solid #991B1B;
      }
      
      h2::after{
        content:"";
        display:block;
        padding-bottom:4mm;
        border-bottom:1mm solid #991B1B;
      }
      
      h3{
        font-size:20pt;
        margin-bottom:0;
        margin-top:10mm;
      }
      
      p{
        font-size:16pt;
        padding: 0;
        margin: 0;
        text-align: left;
      }
      
      .badge{
        width:40mm;
        height:40mm;
        position:absolute;
        right:10mm;
        bottom:10mm;
        background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='currentColor'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z' /%3E%3C/svg%3E");
      }
      
      .result {
        display: flex;
        align-content: center;
        justify-content: center;
      }
      
      table {
        
        margin-top: 1rem;
        align-self: center;
      }
        </style>
        <title>Document</title>
      </head>
        <body>
          <div class="border-pattern">
            <div class="content">
              <div class="inner-content">
                <h1>Certificate</h1>
                <h2>of PCR Result</h2>
                <h3>This Certificate Is The Official Result From O'Clinic</h3>
                <div class="result">      
                  <table>
                    <tr>
                      <th><p>NAME</p></th>
                      <td><p>: </p></td>
                      <td><p>${name}</p></td>
                    </tr>
                    <tr>
                      <th><p>DOB</p></th>
                      <td><p>: </p></td>
                      <td><p>${dob}</p></td>
                    </tr>
                    <tr>
                      <th><p>NIK</p></th>
                      <td><p>: </p></td>
                      <td><p>${nik}</p></td>
                    </tr>
                    <tr>
                      <th><p>RESULT</p></th>
                      <td><p>: </p></td>
                      <td><p>${status_swab}</p></td>
                    </tr>
                    <tr>
                      <th><p>Sample Taken On</p></th>
                      <td><p>: </p></td>
                      <td><p>${date_swab}</p></td>
                    </tr>
                  </table>
                </div>
                <div class="badge">
                </div>
              </div>
            </div>
          </div>
        </body>
      </html>`
    )

    } catch (error) {
        next(error)
    }
  }
}

module.exports = CertificateController;