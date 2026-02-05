let products = JSON.parse(localStorage.getItem("products")||"[]");
let members = JSON.parse(localStorage.getItem("members")||"[]");
let buyers  = JSON.parse(localStorage.getItem("buyers")||"[]");

const productList = document.getElementById("productList");

if(localStorage.getItem("creator")==="true"){
  document.body.classList.add("creator");
}

function openPage(id){
  document.querySelectorAll("section").forEach(s=>s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

function openLogin(){document.getElementById("loginModal").style.display="flex"}
function openSignup(){document.getElementById("signupModal").style.display="flex"}
function openAddProduct(){document.getElementById("addProductModal").style.display="flex"}

function login(){
  const email=document.getElementById("loginEmail").value;
  localStorage.setItem("user",email);
  if(!members.includes(email)){members.push(email)}
  localStorage.setItem("members",JSON.stringify(members));
  location.reload();
}

function signup(){login()}

function creatorPrompt(){
  const p=prompt("Creator Password");
  if(p==="exestore"){
    document.getElementById("unlockFx").classList.add("active");
    setTimeout(()=>{
      localStorage.setItem("creator","true");
      location.reload();
    },1500);
  }
}

function creatorLogout(){
  localStorage.removeItem("creator");
  location.reload();
}

function addProduct(){
  products.push({
    name:pName.value,
    price:pPrice.value,
    img:pImg.value,
    link:pLink.value
  });
  localStorage.setItem("products",JSON.stringify(products));
  location.reload();
}

function renderProducts(){
  productList.innerHTML="";
  products.forEach(p=>{
    productList.innerHTML+=`
      <div class="card">
        <img src="${p.img}">
        <h4>${p.name}</h4>
        <b>₹${p.price}</b>
        <button onclick="buy('${p.name}','${p.link}')">Buy</button>
      </div>
    `;
  });
}

function buy(name,link){
  if(!localStorage.getItem("user")){
    alert("Login required");
    return;
  }
  buyers.push({email:localStorage.getItem("user"),product:name});
  localStorage.setItem("buyers",JSON.stringify(buyers));
  if(link) window.open(link,"_blank");
}

function showMembers(){
  dataTitle.innerText="Members";
  dataList.innerHTML=members.join("<br>");
  dataModal.style.display="flex";
}

function showBuyers(){
  dataTitle.innerText="Buyers";
  dataList.innerHTML=buyers.map(b=>b.email+" → "+b.product).join("<br>");
  dataModal.style.display="flex";
}

function closeData(){dataModal.style.display="none"}

renderProducts();
