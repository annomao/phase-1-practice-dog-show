document.addEventListener('DOMContentLoaded', () => {
  getDogs()
  updateRecord()
})

  function getDogs(){
    fetch("http://localhost:3000/dogs")
    .then(res => res.json())
    .then(data=> {
      console.log(data)
      return renderDog(data)
    })
  }

  function renderDog(records){
    let tableBody = document.querySelector("#table-body")
    tableBody.innerHTML = ""
    records.forEach(record => {
      let tr = document.createElement("tr")
      tr.id = record.id
      let tdName = document.createElement("td")
      tdName.textContent = record.name

      let tdBreed = document.createElement("td")
      tdBreed.textContent = record.breed

      let tdSex = document.createElement("td")
      tdSex.textContent = record.sex
      
      let tdEdit = document.createElement("td")
      let editBtn = document.createElement("button")
      editBtn.textContent = "Edit Dog"
      tdEdit.appendChild(editBtn)

      tr.append(tdName,tdBreed,tdSex,tdEdit)
      tableBody.appendChild(tr)

      editBtn.addEventListener("click",editRecord)
    });
  }

  function editRecord(event){
    let tr = event.target.closest("tr") 
    //declare it without a var to make it available globallly
    globalId = Number(event.target.closest("tr").id)
    
    let tdArray = tr.cells
    let inputArray = document.querySelectorAll("input")
    inputArray[0].value = tdArray[0].innerText
    inputArray[1].value = tdArray[1].innerText
    inputArray[2].value = tdArray[2].innerText
  }

function updateRecord(){
  let form = document.querySelector("#dog-form") 
    form.addEventListener("submit",(event)=>{
      event.preventDefault()
      let name = document.getElementsByName("name")
      let breed = document.getElementsByName("breed")
      let sex = document.getElementsByName("sex")
      const dataObj = {
        name:name[0].value,
        breed:breed[0].value,
        sex:sex[0].value
      }
      fetch(`http://localhost:3000/dogs/${globalId}`,{
        method:"PATCH",
        headers:{
            "content-type": 'application/json',
            accept: 'application/json'
        },
        body: JSON.stringify(dataObj)
      })
      .then(res => res.json())
      .then(data =>{
        getDogs()
      })
      form.reset()
  })
}