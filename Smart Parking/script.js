const gates = {
  1: [
    { id: "A1", status: "green" },
    { id: "A2", status: "red" },
    { id: "A3", status: "green" },
    { id: "A4", status: "reserved" }
  ],
  2: [
    { id: "B1", status: "green" },
    { id: "B2", status: "green" },
    { id: "B3", status: "red" },
    { id: "B4", status: "reserved" }
  ],
  3: [
    { id: "C1", status: "red" },
    { id: "C2", status: "green" },
    { id: "C3", status: "green" },
    { id: "C4", status: "reserved" }
  ],
  4: [
    { id: "D1", status: "green" },
    { id: "D2", status: "red" },
    { id: "D3", status: "green" },
    { id: "D4", status: "reserved" }
  ]
};

let selectedSlotStatus = null;

/* ===== LOAD GATE SLOTS ===== */
function loadGate() {
  const gate = document.getElementById("gateSelect").value;
  const container = document.getElementById("slotContainer");

 if(!container) return;
  container.innerHTML = "";

  gates[gate].forEach(slot => {
    const div = document.createElement("div");
    div.classList.add("slot", slot.status);
    div.innerText = slot.id;
    div.onclick = () => selectSlot(slot);
    container.appendChild(div);
  });
}

/* ===== SLOT CLICK ===== */
function selectSlot(slot) {
 const slotDisplay= document.getElementById("selectedSlot"); 
 const statusDisplay = document.getElementById("status");
 const reserveBtn =document.getElementById("reserveBtn");

 selectedSlotStatus = slot.status;
 if (slotDisplay) slotDisplay.innerText = slot.id;
  
  if (statusDisplay) {
    statusDisplay.innerText = slot.status === "green" ? "Available" : 
                             slot.status === "red" ? "Occupied" : "Reserved";
    statusDisplay.style.color = slot.status === "green" ? "green" : "red";
  }

  if (reserveBtn) {
    reserveBtn.disabled = slot.status !== "green";
  }
// Optional: Alert for main page
  if (!slotDisplay && slot.status === "green") {
      if(confirm(`Slot ${slot.id} is available. Go to booking?`)) {
          window.location.href = "reservation.html";
      }
  }
}

function reserveSlot(){
    if(selectedSlotStatus === "green") {
     window.location.href = "reservation.html";
    }
}
/* ===== RESERVE POPUP ===== */
function confirmReservation() {
  alert("Parking spot successfully reserved!");
}

/* ===== REAL TIME CLOCK ONLY ===== */
const timeElement = document.getElementById("time");

if (timeElement) {
  setInterval(() => {
    timeElement.innerText = new Date().toLocaleTimeString();
  }, 1000);
}

/* INIT */
window.onload = loadGate;
