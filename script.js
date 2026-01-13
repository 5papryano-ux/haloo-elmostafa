let cart = {};
let total = 0;
let count = 0;

function changeQty(name, price, change){
  if(!cart[name]){
    cart[name] = { qty:0, price:price };
  }

  cart[name].qty += change;
  if(cart[name].qty < 0) cart[name].qty = 0;

  const qtyEl = document.getElementById("qty-"+name);
  if(qtyEl) qtyEl.innerText = cart[name].qty;

  calculateTotals();
}

function calculateTotals(){
  total = 0;
  count = 0;

  for(let item in cart){
    total += cart[item].qty * cart[item].price;
    count += cart[item].qty;
  }

  document.getElementById("total").innerText = total;
  document.getElementById("count").innerText = count;
}

function sendWhatsApp(){
  if(count === 0){
    alert("اختار منتجات الأول 🍰");
    return;
  }

  let name = document.getElementById("name").value || "غير مكتوب";
  let phoneUser = document.getElementById("phone").value || "غير مكتوب";
  let address = document.getElementById("address").value || "غير مكتوب";
  let payment = document.getElementById("payment").value;
  let phone = document.getElementById("whatsappNumber").value;

  let msg = "🧾 طلب جديد من حلو المصطفي\n\n";
  msg += "👤 الاسم: "+name+"\n";
  msg += "📞 الهاتف: "+phoneUser+"\n";
  msg += "📍 العنوان: "+address+"\n";
  msg += "💳 الدفع: "+payment+"\n\n";
  msg += "🍰 الطلب:\n";

  for(let item in cart){
    if(cart[item].qty > 0){
      msg += `- ${item} × ${cart[item].qty} = ${cart[item].qty * cart[item].price} جنيه\n`;
    }
  }

  msg += "\n🧮 الإجمالي: "+total+" جنيه";

  window.open("https://wa.me/"+phone+"?text="+encodeURIComponent(msg));
}
